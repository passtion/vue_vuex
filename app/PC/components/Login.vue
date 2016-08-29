<template>
    <div>
        <Login-tab></Login-tab>
        <Public-footer></Public-footer>
    </div>
</template>
<script>
    import LoginTab from './others/LoginTab.vue';
    import PublicFooter from './public/PublicFooter.vue';
    export default{
        components: {
            LoginTab,
            PublicFooter
        }
    }
</script>
