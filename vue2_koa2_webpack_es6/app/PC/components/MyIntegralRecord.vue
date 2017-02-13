<template>
    <div>
        <scroller style="padding-bottom: 2rem;" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="100vh" @pullup:loading="load" v-ref:scroller>             <div class="box2">
                <Public-table
                        :list="list"
                        is-query="integralRecord">
                </Public-table>
            </div>
        </scroller>
    </div>
</template>

<script>
    import {getIntegalFun} from '../actions/myManageActions'
    import PublicTable from './public/Public-table.vue'
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'

    export default{
        components:{
            PublicTable,
            Scroller
        },
        data(){
            return{
                params:{
                    pageno:1
                },
                list:[
//                        {
//                    integal:120,
//                    create_time:'2016-12-12 11:11:11.0',
//                    event_name:'用户签到'},
//                    {
//                    integal:120,
//                    create_time:'2016-12-12 11:11:11.0',
//                    event_name:'用户签到'}
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
                getIntegalFun
            }
        },
        methods:{
            init(){
                this.query((res)=>{
                    if(res.status == 200){
                        this.list =  res.list;
                    if(res.pageinfo.pagecount <= res.pageinfo.pageno) this.$broadcast('pullup:done', this.$refs.scroller.uuid);
                    this.resetScorll();
                    }
                })
            },
            query(result){
                this.getIntegalFun({params:this.params,result:result})
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
