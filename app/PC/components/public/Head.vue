<template>
    <div class="g-hd">
        <div class="m-logo g-fl">
            <a href="">logo</a>
        </div>
        <nav-bar
                :onclick="HeadTabs"
        ></nav-bar>
        <div class="m-user g-fr g-marginR30">
            <div class="name g-fl" v-bind:class="{ 'active': active}" v-on:mouseover="this.active = true;" v-on:mouseleave="this.active = false;">
                <img src="../../images/userimg.png" width="34" height="34"/>
                <span class="g-paddingF10">马小刚</span>
                <strong class="m-space2"></strong>
                <div class="arc">
                    <i class="triangle"></i>
                    <div>
                        <h3>个人档案</h3>
                        <div class="main">
                            <img class="g-fl" src="../../images/mm.jpg" width="100" height="100" />
                            <div class="g-tr">
                                <h5>马小刚</h5>
                                <p>星星专车/MIS产品部</p>
                                <p>手机：13800000000</p>
                                <p>maxiaogang@xingxingcar.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Message></Message>
            <div class="setting g-fl g-marginL25" v-bind:class="{ 'active': active1}" v-on:mouseover="this.active1 = true;" v-on:mouseleave="this.active1 = false;">
                <i class="u-icon"></i>
                <div class="m-space"></div>
                <ul>
                    <li><a :onclick="loginOut" class="loginOut" href="javascript:;">退出</a></li>
                    <li><a href="javascript:;">反馈</a></li>
                </ul>
            </div>
        </div>
        <div class="m-search g-fr">
            <input class="u-icon" placeholder="查找通讯录，按姓名或按技能">
        </div>
    </div>
</template>
<script>
    import '../../css/bootstrap.css';
    import '../../css/reset.css';
    import '../../css/gird.css';
    import '../../css/module.css';
    import '../../css/unit.css';
    import '../../css/media.css';

    import NavBar from './NavBar.vue'
    import Message from './Message.vue'

    export default {
        data: function () {
            return {
                active : false,
                active1 : false
            }
        },
        components: {
            NavBar: NavBar,
            Message: Message
        },
        ready: function () {
            this._getData(undefined, true);
            // 路由带的父菜单index
            let     path = this.$route.path,
                    res = path.match(/^\/\w+/);

            this.curRoute = !res ? this.curRoute : res[0];
        },
        methods: {
            //退出登录
            loginOut : function(){
                $.ajax({
                    type: 'GET',
                    url: startUp.getRootPath() + startUp.frontPath + '/logout',
                    dataType: "json",
                    success: function (data) {
                        window.location.href = startUp.getRootPath() + "/home/login.html";
                    },
                });
            }
        }
    }
</script>