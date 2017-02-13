
<template>
    <div>
        <scroller v-if="list[0]" lock-x height="100vh" v-ref:scroller>
            <div class="box2">
                <Public-table
                        :list="list"
                        is-query="app_members_list">

                </Public-table>
            </div>
        </scroller>
        <Public-no-info v-else>
        </Public-no-info>
    </div>
</template>

<script>
    import {getVipListFun} from '../actions/myManageActions'
    import PublicTable from './public/Public-table.vue'
    import PublicNoInfo from './public/Public-noInfo.vue'
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'

    export default{
        components:{
            PublicTable,
            Scroller,
            PublicNoInfo,
        },
        data(){
            return{
                params:{
                    level:this.$route.params.level
                },
                list:[]
            }
        },
        vuex:{
            actions:{
                getVipListFun
            }
        },
        methods:{
            init(){
                this.query((res)=>{
                    if(res.status == 200){
                        this.list =  res.list;
                        const resetScro =()=>{
                            this.resetScorll();
                        }
                        setTimeout(resetScro,10)
                    }
                })
            },
            query(result){
                this.getVipListFun({params:this.params,result:result})
            },
            resetScorll(){
                this.$refs.scroller.reset()
            }
        },
        ready(){
            this. init();
        }

    }
</script>
