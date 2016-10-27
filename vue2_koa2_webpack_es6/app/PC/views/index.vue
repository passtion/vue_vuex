<template>
    <div>
        <Public-get-open-id></Public-get-open-id>
        <router-view></router-view>
    </div>
</template>
<script>
    import store from '../vuex/index/store';
    import '../css/iconfont.css'
//    import '../js/wxJs';
    import PublicGetOpenId from './../components/public/Public_getOpenId.vue';
    export default{
        components:{
            PublicGetOpenId
        },
        store
    }
</script>
