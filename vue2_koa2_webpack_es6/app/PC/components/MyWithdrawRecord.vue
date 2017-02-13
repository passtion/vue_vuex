<template>
    <div>
        <scroller v-if="list[0]" style="padding-bottom: 2rem;" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="100vh" @pullup:loading="load" v-ref:scroller>
            <div style="background-color:white;">
                <Public-table
                        :list="list"
                        is-query="withdrawReLst"
                >
                </Public-table>
          </div>
            <div style="padding-bottom:2rem;">
            </div>
        </scroller>
        <Public-no-info v-else>
        </Public-no-info>
    </div>
</template>
<script>
    import {getWithdrawRecordFun} from '../actions/myManageActions'
    import PublicTable from './public/Public-table.vue'
    import PublicNoInfo from './public/Public-noInfo.vue'
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'

    export default{
        components: {
            PublicTable,
            Scroller,
            PublicNoInfo
        },
        data(){
            return {
                list: [],
                params: {
                    pageno: 1
                },
                pullupConfig2: {
                    content: '',
                    downContent: '松开进行加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...'
                },
            }
        },
        vuex: {
            actions: {
                getWithdrawRecordFun
            }
        },
        methods: {
            init(){
                this.query((res)=>{
                    if(res.status == 200){
                        this.list =  res.list;
                        const resetScro =()=>{
                            this.resetScorll();
                            this.$refs.scroller.goTop();
                            return (res.pageinfo.pagecount <= res.pageinfo.pageno) ? this.$broadcast('pullup:done', this.$refs.scroller.uuid) :'';
                        }
                    res.list && setTimeout(resetScro,10)

                    }
                })
            },
            query(result){
                this.getWithdrawRecordFun({params: this.params, result: result})
            },
            resetScorll(){
                this.$refs.scroller.reset()
            },
            load (uuid) {
                this.params.pageno += 1;
                this.query((res)=> {
                    if (res.status == 200) {
                        let reset = 'pullup:reset';
                    this.list=(this.list.concat(res.list));
                    !!( res.pageinfo.pageno < res.pageinfo.pagecount) ?  '' : reset='pullup:done';
                    this.$broadcast(reset, uuid);
                    (reset=='pullup:done') && this.resetScorll();
                    }
                });
            }
        },
        ready(){
            this.init();
        }
    }
</script>
