<template>
    <div style="height:100%;">
        <Public-get-open-id></Public-get-open-id>

        <router-view v-if="openid" :transition="'vux-pop-' + direction"></router-view>
        <!--<router-view transition="vux-pop-in"></router-view>-->
        <loading :show="isLoading" text="等待..."></loading>
        <Public-error-pop
        >

        </Public-error-pop>
    </div>

</template>
<script>
    import store from '../vuex/index/store';
    import '../css/iconfont.css'
    import '../css/1px.less'
    import PublicGetOpenId from '../components/public/Public-getOpenId.vue';
    import Loading from '../../../vux/vux/src/components/loading/index.vue';
    import {publicLoadingFun, hideError} from '../vuex/index/actions';
    import {queryWxConfigFun, getLocationFun} from './../actions/activeActions'
    import {getLocation} from './../getters/activeGetter'
    import {openid, appid} from '../vuex/index/getters';
    import  Scroller from './../../../vux/vux/src/components/Scroller/index.vue'
    import  PublicErrorPop from '../components/public/Public-errorPop.vue'
    import '../../tool/lib/DateTool'
    export default{
        components: {
            PublicGetOpenId,
            Loading,
            PublicErrorPop,
            Scroller
        },
        store,
        vuex: {
            getters: {
                isLoading: (state) => state.isLoading,
                direction: (state) => state.direction,
                openid,
                appid,
                getLocation,
            },
            actions: {
                publicLoadingFun,
                hideError,
                queryWxConfigFun,
                getLocationFun,
            }
        },
        data(){
            return {
                loadPage: true
            }
        },
        methods: {
            init(){
                this.queryWx();
                window.addEventListener("popstate", (e)=> {
                    this.publicLoadingFun(false)    //解除loading
                    this.hideError(false)           //解除错误弹框
                    this.queryWx();

                });
            },
            queryWx(){
                const url = window.location.href;
                const paUrl = (url.split('#!/'))[0];
                this.queryWxConfigFun({
                    params: {url: paUrl}, result: (res)=> {
                        wx.config({
//                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            timestamp: res.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.nonceStr, // 必填，生成签名的随机串
                            signature: res.signature,// 必填，签名，见附录1
                            appId: this.appid, // 必填，公众号的唯一标识
                            jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo',
                                'hideMenuItems',
                                'showMenuItems',
                                'hideAllNonBaseMenuItem',
                                'showAllNonBaseMenuItem',
                                'translateVoice',
                                'startRecord',
                                'stopRecord',
                                'onRecordEnd',
                                'playVoice',
                                'pauseVoice',
                                'stopVoice',
                                'uploadVoice',
                                'downloadVoice',
                                'chooseImage',
                                'previewImage',
                                'uploadImage',
                                'downloadImage',
                                'getNetworkType',
                                'openLocation',
                                'getLocation',
                                'hideOptionMenu',
                                'showOptionMenu',
                                'closeWindow',
                                'scanQRCode',
                                'chooseWXPay',
                                'openProductSpecificView',
                                'addCard',
                                'chooseCard',
                                'openCard'
                            ]
                        })
                        const shareUrl = `${url.replace(window.location.search, `?sourceOpenId=${this.openid}`)}`;
                        wx.ready(
                                ()=> {
                                    (this.getLocation.status == 200) || this.getLocationFun()
                                    wx.onMenuShareAppMessage({
                                        title: 'test',
                                        desc: 'test',
                                        link: shareUrl,
                                        imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
                                        trigger: function (res) {
                                        },
                                        success: function (res) {
                                        },
                                        cancel: function (res) {
                                        },
                                        fail: function (res) {
                                        }
                                    })
                                })
                    }
                })
            }
        },
        ready(){
            this.init()
        }
    }
</script>
<style lang="less">
    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    .weui_dialog_confirm .weui_dialog_ft a { //俩层弹框剧中
        line-height: 3;
    }

    .weui_dialog_bd {
        padding: 6px 20px;
    }

    .weui_btn_dialog.primary {
        line-height: 2rem;
    }

    /* v-r-transition, default is {forward: 'forward', back: 'back'}*/
    .forward-enter, .forward-leave {
        transform: translate3d(-100%, 0, 0);
    }

    .back-enter, .back-leave {
        transform: translate3d(100%, 0, 0);
    }

    .weui_tabbar.vux-demo-tabbar {
        backdrop-filter: blur(10px);
        background-color: none;
        background: rgba(247, 247, 250, 0.5);
    }

    .vux-demo-tabbar .weui_bar_item_on .demo-icon-22 {
        color: #F70968;
    }

    .vux-demo-tabbar .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label {
        color: #35495e;
    }

    .vux-demo-tabbar .weui_tabbar_item.weui_bar_item_on .vux-demo-tabbar-icon-home {
        color: rgb(53, 73, 94);
    }

    .demo-icon-22:before {
        content: attr(icon);
    }

    .vux-demo-tabbar-component {
        background-color: #F70968;
        color: #fff;
        border-radius: 7px;
        padding: 0 4px;
        line-height: 14px;
    }

    .weui_tabbar_icon + .weui_tabbar_label {
        margin-top: 0 !important;
    }

    .vux-demo-header-box {
        z-index: 100;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }

    .weui_tab_bd {
        padding-top: 46px;
    }

    /**
    * vue-router transition
    */
    .vux-pop-out-transition,
    .vux-pop-in-transition {
        width: 100%;
        animation-duration: 0.5s;
        animation-fill-mode: both;
        backface-visibility: hidden;
    }

    .vux-pop-out-enter,
    .vux-pop-out-leave,
    .vux-pop-in-enter,
    .vux-pop-in-leave {
        will-change: transform;
        height: 100%;
        position: absolute;
        left: 0;
    }

    .vux-pop-out-enter {
        animation-name: popInLeft;
    }

    .vux-pop-out-leave {
        animation-name: popOutRight;
    }

    .vux-pop-in-enter {
        perspective: 1000;
        animation-name: popInRight;
    }

    .vux-pop-in-leave {
        animation-name: popOutLeft;
    }

    @keyframes popInLeft {
        from {
            transform: translate3d(-100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes popOutLeft {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(-100%, 0, 0);
        }
    }

    @keyframes popInRight {
        from {
            transform: translate3d(100%, 0, 0);
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes popOutRight {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(100%, 0, 0);
        }
    }
</style>