<script>
    import UrlTool from '../../../tool/lib/UrlTool'
    import Post from '../../../source/lib/Post'
    import {localCache} from './../../../tool/lib/CacheTool';
    import {appid,secret} from '../../vuex/index/getters'
    import {addOpenIdInCacheFun,straightFun} from '../../vuex/index/actions'
    import {queryOpenId,userRecommend} from '../../actions/activeActions'
    export default{
        data(){
            return{
                uri : encodeURIComponent(window.location.href),
                sourceOpenId :  new UrlTool().getValue('sourceOpenId'),
                scope : new UrlTool().getValue('sourceOpenId') ? 'snsapi_userinfo'  : 'snsapi_base',
                state : '123'//返回参数
            }
        },
        vuex:{
            actions:{
                queryOpenId,
                addOpenIdInCacheFun,
                userRecommend,
                straightFun
            },
            getters:{
                appid,
                secret
            }
        },
        methods:{
            getCode(){
                let timeout ;
                (()=>{
                    const flag =  window.location.href.match(new RegExp("" +'code'+ "=([^&?]*)", "ig"));
                    const code = flag ? (decodeURI(flag).split('code='))[1] : false;
                    if(code){
                         clearTimeout(timeout);
                         this.query(code);
                     }else {
                         window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.uri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect`;
                         clearTimeout(timeout);

                     }
                })();
            },
            query(code){
                const params = {appid:this.appid,code:code,secret:this.secret,sourceOpenId:this.sourceOpenId};
                this.queryOpenId({params:params,result:(result)=>{
//                    localCache('openid',result.openid)
//                    alert(localCache('openid'))
                    this.addOpenIdInCacheFun(result);
                    if(this.sourceOpenId && this.sourceOpenId != result.openid ) this.userRecommend({params:{
                        openid:this.sourceOpenId,
                        nickname:result.nickname,
                        headimgurl:result.headimgurl
                    }})
                    this.straightFun(); //界面直接加载
                }})
            },
        },
        created(){
            this.getCode();
        }

    }
</script>
