
<template>
    <div>
        <index-tab></index-tab>
        <Public-footer
                click="1"
        ></Public-footer>
    </div>
</template>
<script>
    import PublicFooter from './public/Public-footer.vue';
    import IndexTab from './others/IndexTab.vue';

    export default{
        components:{
            PublicFooter,
            IndexTab
        }
    }
</script>
