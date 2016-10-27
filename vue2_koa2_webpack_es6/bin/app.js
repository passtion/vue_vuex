process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

import Koa from 'koa'
import cors from 'koa-cors'
import compress from 'koa-compress'
import json from 'koa-json'
// import send from 'koa-send'
import serve from 'koa-static'
import logger from 'koa-logger'
import convert from 'koa-convert'
// import artTemplate from 'koa-artTemplate'
import bodyParser from 'koa-bodyparser'
import path from 'path'
// import fs from 'fs'
// import serialize  from 'serialize-javascript' //序列化 JavaScript 库成含有正则表达式和功能的 JSON 包
import getOpenId from './redis'
import { KoaErr } from './helper'
import proxy,{postJava} from './proxy'
import uuid from 'node-uuid';
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
app.use(async(ctx,next) =>{
    console.log(ctx.request.body)
    const body =ctx.request.body;
    const webType = body.head.webType;
    const openid = body.head.openid;
    const htBodyBody = body.body;
    const reg = /^\/doAction\//;
    const path =ctx.path.replace(reg,'');
    if (webType!='wx') return await next();
    if(path == 'access_token') {    //返回签名级所有信息
        const access_token = await getOpenId('access_token');
        ctx.body = {status:'200',access_token:access_token}
    }

    if(path == 'userInfo'){     //首次获取微信用户信息
        const appid =htBodyBody.appid;
        const code =htBodyBody.code;
        const secret =htBodyBody.secret;
        const userInfo = await postJava(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`,{'method': 'GET'});
        console.log(userInfo);
        ctx.body = userInfo;
    }
    else{
        const flag = await getOpenId(openid);
        ctx.body = flag ? await proxy({func:path,openid:openid,bodyBody:htBodyBody})
            :  {status:'E0002',info:'未关注公众号'}
    }
})



app.listen(process.env.PORT || 3001)
console.log(`Server up and running! On port ${process.env.PORT || 3001}!`)


import './getToken' //获取令牌的自动任务



