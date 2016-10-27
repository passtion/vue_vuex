<script>
    import UrlTool from '../../../tool/lib/UrlTool'
    import Post from '../../../source/lib/Post'
    import {appid,secret} from '../../vuex/index/getters'
    import {queryOpenId,addOpenIdInCacheFun} from '../../vuex/index/actions'
    export default{
        data(){
            return{
                uri : encodeURIComponent(window.location.href),
                sourceOpenId :  new UrlTool().getValue('sourceOpenId'),
                scope : new UrlTool().getValue('sourceOpenId') ? 'snsapi_base' : 'snsapi_userinfo',
                code :  new UrlTool().getValue('code'),
                state : '123'//返回参数
            }
        },
        vuex:{
            actions:{
                queryOpenId,
                addOpenIdInCacheFun
            },
            getters:{
                appid,
                secret
            }
        },
        methods:{
            weiChatLogin(){
                //回调链接一定要进行url encode编码
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.uri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect`;
            },
            query(){
                const params = {appid:this.appid,code:this.code,secret:this.secret}
                this.queryOpenId({params:params,result:(result)=>{
                    this.addOpenIdInCacheFun(result.openid);
                }})
            }
        },
        created(){
            !this.code ? this.weiChatLogin() : this.query();
        }

    }
</script>
