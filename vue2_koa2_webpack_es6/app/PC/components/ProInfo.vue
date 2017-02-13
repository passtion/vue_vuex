
<template>
    <div>
        <scroller lock-x height="100vh" v-ref:scroller>
            <div class="box2">
                <Pro-info-tab
                        isInfo="true"
                        :reset-sco="resetScorll"
                >
                </Pro-info-tab>
                <div style="height:2.5555555555555554rem"></div>
            </div>
        </scroller>
        <Public-btn
                btn-name="立即购买"
                is-check="true"
                :link="link">
        </Public-btn>
    </div>
</template>
<script>
    import ProInfoTab from './others/ProInfoTab.vue';
    import PublicBtn from './public/Public-btn.vue';
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'
    export default{
        components:{
            ProInfoTab,
            PublicBtn,
            Scroller,
        },
        data(){
            return{
                link:{name:'sureOrder'}
            }
        },
        methods:{
            resetScorll(){
                this.$refs.scroller.reset();
            },
        }
    }
</script>
