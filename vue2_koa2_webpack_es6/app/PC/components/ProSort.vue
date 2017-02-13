<template>
    <div>
        <tab active-color='#ef1837'>
            <tab-item v-for="(i,item) in sortLst.list" :selected="params.type ==i" @click="choice(i)">{{item.typename}}</tab-item>
        </tab>
        <scroller v-if="sortLst" lock-x height="92vh" v-ref:scroller>
            <div class="box2">
                <Sort-tab
                        :list="sortLst.list[params.type].children">
                </Sort-tab>
            </div>
        </scroller>
        <Public-footer
                click="3">
        </Public-footer>
    </div>
</template>
<script>
    import PublicFooter from './public/Public-footer.vue';
    import SortTab from './others/SortTab.vue';
    import Scroller from '../../../vux/vux/src/components/scroller/index.vue'
    import tab from './../../../vux/vux/src/components/tab/tab.vue'
    import tabItem from './../../../vux/vux/src/components/tab/tab-item.vue'
    import {querySortFun}  from './../actions/productAcrions'
    import {sortLst}  from './../getters/productGetter'
    export default{
        components: {
            PublicFooter,
            Scroller,
            tabItem,
            tab,
            SortTab
        },
        data(){
          return{
              params:{
                  type:0
              }
          }
        },
        vuex: {
            actions: {
                querySortFun
            },
            getters: {
                sortLst
            }
        },
        methods: {
            init(){
                this.sortLst  || this.querySortFun();
            },
            choice(i){
                this.params.type = i;
            },
            resetScorll(){
                this.$refs.scroller.reset()
            },
        },
        ready(){
            this.init();

        }
    }
</script>
