
<template>
    <div>
        <scroller lock-x height="100vh" v-ref:scroller>
            <div class="box2">
                <My-hone-tab
                        :reset-scorll="resetScorll">
                </My-hone-tab>
                </div>
        </scroller>
        <Public-footer
                click="4">
        </Public-footer>
    </div>
</template>
<script>
    import PublicFooter from './public/Public-footer.vue';
    import MyHoneTab from './others/MyHoneTab.vue';
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'

    export default{
        components:{
            PublicFooter,
            MyHoneTab,
            Scroller
        },
        methods:{
            resetScorll(){
                this.$refs.scroller.reset()
            },
        }
    }
</script>
