
<template>
    <div>
        <scroller v-if="list[0]" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="100vh" @pullup:loading="load" v-ref:scroller>           <div class="box2">
            <Public-table
                    :list="list"
                    is-query="app_prize_list">
            </Public-table>
            <div style="padding-bottom:3rem;">
            </div>
           </div>
        </scroller>
        <Public-no-info v-else>
        </Public-no-info>
    </div>
</template>

<script>
    import {getPrizeFun} from '../actions/myManageActions'
    import PublicTable from './public/Public-table.vue'
    import PublicNoInfo from './public/Public-noInfo.vue'
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'

    export default{
        components:{
            PublicTable,
            PublicNoInfo,
            Scroller
        },
        data(){
            return{
                params:{
                    pageno:1
                },
                list:[
                ],
                pullupConfig2: {
                    content: '',
                    downContent: '松开进行加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...'
                },
            }
        },
        vuex:{
            actions:{
                getPrizeFun
            }
        },
        methods:{
            init(){
                this.query((res)=>{
                    if(res.status == 200){
                        this.list =  res.list;
                        const resetScro = ()=>{
                            this.resetScorll();
                            return (res.pageinfo.pagecount <= res.pageinfo.pageno) ? this.$broadcast('pullup:done', this.$refs.scroller.uuid) :'';

                        }
                    res.list[0] && setTimeout(resetScro,10)
                    }
                })
            },
            query(result){
                  this.getPrizeFun({params:this.params,result:result})
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
            this. init()
        }

    }
</script>
