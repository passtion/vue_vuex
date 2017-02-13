process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

import Koa from 'koa'
import cors from 'koa-cors'
import compress from 'koa-compress'
import json from 'koa-json'
import serve from 'koa-static'
import logger from 'koa-logger'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import getOpenId from './redis'
import { KoaErr } from './helper'
import proxy,{postJava,MD5} from './proxy'
import {randomString,sha1} from './helper'
const app =new Koa()
//设置文件根路径
const resolve = file => path.resolve(__dirname, file)

// 全局错误处理
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.body = err
        ctx.status = err.status || 500
    }
})

// 使用自定义错误
app.use(async (ctx, next) => {
  ctx.Err = KoaErr
  await next()
})


// //设置Header
app.use(async (ctx, next) => {
    await next()
    ctx.set('X-Powered-By', 'web-app')

    // console.log("the first")
})


// 设置gzip
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

// 记录所用方式与时间
app.use(convert(logger()))

// 设置跨域
app.use(convert(cors()))

// 传输JSON
app.use(convert(json()))

// body解析
app.use(bodyParser())


// 设置渲染引擎
// app.use(artTemplate(path.resolve(__dirname, '../index.html')))

// 静态文件夹 (开发用，生成静态资源访问静态服务器)
app.use(convert(serve(resolve('../dist'))));

/**
 * 直出页面
 * 如果请求为／doAction／* 则时接口访问
 * 如果不是 则是页面直出
 */
app.use(async(ctx,next) =>{
    const reg = /^\/doAction\//;
    const isPort = reg.test(ctx.path);
    //访问借口
    if (isPort)  return await next();
})



/**
 * 访问接口
 * 页面传入数据格式为 {head:{}body:{}}
 * 页面传入数据head里面有一个页面类型 type:[wx|pc|webApp]
 * wx：微信端访问
 * pc：pc端访问
 * webApp : 移动端访问
 */

//微信访问

import createImg from './createImag'
app.use(async(ctx,next) =>{
    console.log(ctx.request)
    const reg = /^\/doAction\//;
    const path =ctx.path.replace(reg,'');
    let[body,webType,htBodyBody]=['','','']
    // //评价产品
    if(path == 'app_product_comment_add'){
        body = await createImg(ctx,next);
        webType = body.head.webType;  //访问类型
        htBodyBody = body.body;
    }else{
        body =ctx.request.body;
        webType = body.head.webType;  //访问类型
        htBodyBody = body.body;
    }
    console.log(ctx.request.body)

    if (webType!='wx') return await next();
    const openid = body.head.openid;    //微信id


    //签到获取ip
    if(path == 'app_member_sign'){
        htBodyBody.uesr_ipaddress = ctx.request.header['x-forwarded-for'];
        htBodyBody.uesr_ipaddress.indexOf(',')>-1 && (htBodyBody.uesr_ipaddress = htBodyBody.uesr_ipaddress.split(',')[0] );
    }
    //返回签名级所有信息
    if(path == 'access_token') {
        const access_token = await getOpenId('access_token');
        ctx.body = {status:'200',access_token:access_token}
        return;
    }
    //首次获取微信用户信息
    if(path == 'userInfo'){
        const appid =htBodyBody.appid;
        const code =htBodyBody.code;
        const secret =htBodyBody.secret;
        const sourceOpenId =htBodyBody.sourceOpenId;
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
        const userInfo = await postJava(url,{'method': 'GET'});
        url = `https://api.weixin.qq.com/sns/userinfo?access_token=${userInfo.access_token}&openid=${userInfo.openid}`
        ctx.body = (sourceOpenId && userInfo.openid != sourceOpenId)
            ? await postJava(url,{'method': 'GET'})
            : userInfo;
        return;
    }
    //访问baidu地图获取城市信息
    if(path == 'getCity'){
        const latitude =htBodyBody.latitude;
        const longitude =htBodyBody.longitude;
        const url=`http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&location=${latitude},${longitude}&output=json&pois=1`;
        const locationInfo = await postJava(url);
        (locationInfo.status == 0) && (locationInfo.status = 200);
        ctx.body = locationInfo;
        return;
    }
    //微信支付
    if(path == 'app_order_submit'){
        const appId = htBodyBody.appId;
        delete htBodyBody['appId'];
        htBodyBody.ip = ctx.request.header['x-forwarded-for'];
        htBodyBody.ip.indexOf(',')>-1 && (htBodyBody.ip = htBodyBody.ip.split(',')[0] );
      let backBody =  await proxy({func:path,openid:openid,bodyBody:htBodyBody,datatype:1});
      if(backBody.prepay_id){
          const body = await wxPayConfig(backBody.prepay_id,appId);
          for(let key in  body){
              backBody[key] = body[key];
          }
      }
        console.log(backBody);
        ctx.body = backBody;
        return
    }
    //微信加签名 (参数：url) .replace('#!/','')
    if(path == 'wxConfig'){
        const url = htBodyBody.url;
        ctx.body = await wxConfig(url);
    }else{
        console.log(htBodyBody)
        const flag = await getOpenId(openid);
        ctx.body = true ? await proxy({func:path,openid:openid,bodyBody:htBodyBody})
            :  {status:'E0002',info:'未关注公众号'}
    }
})



app.listen(process.env.PORT || 3001,'0.0.0.0')
console.log(`Server up and running! On port ${process.env.PORT || 3001}!`)

//获取令牌的自动任务
import './getToken'
/**
 * 获取微信权限参数
 * @param url
 * @returns {{timestamp: number, nonceStr: String, signature: *}}
 */
async function  wxConfig(url){
    const jsapi_ticket = await getOpenId('jsapi_ticket');
    const noncestr =  randomString(30);
    const timestamp =  Math.round(new Date().getTime()/1000);
    const str1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
    const signature =  sha1(str1);
    return{timestamp: timestamp, nonceStr: noncestr, signature: signature};
}
/**
 * 获取微信支付参数
 * @param url
 * @returns {{timestamp: number, nonceStr: String, signature: *}}
 */
async function  wxPayConfig(prepay_id,appId){
    const noncestr =  randomString(30);
    const timestamp =  `${Math.round(new Date().getTime()/1000)}`;
    const package1 =  `prepay_id=${prepay_id}`;
    const signType =  'MD5';
    let str1 = `appId=${appId}&nonceStr=${noncestr}&package=${package1}&signType=${signType}&timeStamp=${timestamp}&key=mvhFrU0gteVE3GjaS2U30nNBlJv95f4d`
    const paySign =  MD5(str1).toUpperCase();
    return{appId:appId,timestamp: timestamp, nonceStr: noncestr, package1: package1,signType:signType,paySign:paySign};
}
