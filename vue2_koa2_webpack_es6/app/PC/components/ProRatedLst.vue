<template>
    <div>
        <scroller style="padding-bottom: 2rem;" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="100vh" @pullup:loading="load" v-ref:scroller>
            <Pro-rated-lst
                    :reset-sco="resetScorll"
                    :lst="lst"
            >
            </Pro-rated-lst>
            <div style="padding-bottom:2rem">
            </div>
        </scroller>
    </div>
</template>
<script>
    import  ProRatedLst from './others/ProRatedLstTab.vue'
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'
    import {
            queryproCommentLstFun
    } from '../actions/productAcrions'
    export default{
        components:{
            Scroller,
            ProRatedLst,
        },
        vuex:{
            actions:{
                queryproCommentLstFun
            }
        },
        data(){
            return{
                pullupConfig2: {
                    content: '',
                    downContent: '松开进行加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...'
                },
                params:{
                    "pageno":1,
                    "productid":this.$route.params.id,
        },
                lst:[]
            }
        },
        methods:{
            resetScorll(){
                this.$refs.scroller.reset();
            },
            init(){
                this.params.pageno =1 ;
                this.query((res)=>{
                    this.lst = res.list;
                if(res.pageinfo.pagecount <= res.pageinfo.pageno) this.$broadcast('pullup:done', this.$refs.scroller.uuid);
                this.resetScorll();
                })
            },
            query(result){
                this.queryproCommentLstFun({params:this.params,result:(res)=>{
                    if(res.status == 200) {
                        result(res);
                    }
                }})
            },
            load (uuid) {
                this.params.pageno +=1;
                this.query((res)=>{
                    let reset = 'pullup:reset';
                this.lst=(this.lst.concat(res.list));
                !!( res.pageinfo.pageno < res.pageinfo.pagecount) ?  '' : reset='pullup:done';
                this.$broadcast(reset, uuid);
                (reset=='pullup:done') && this.resetScorll();
                })
            }
        },
        ready(){
            this.init();
        }

    }
</script>
