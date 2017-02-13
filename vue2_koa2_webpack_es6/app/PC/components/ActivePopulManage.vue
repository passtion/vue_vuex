<template>
    <div>
        <scroller v-if="list" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="100vh" @pullup:loading="load"
                  v-ref:scroller>
            <Active
                    type="populManage"
                    :lst="list"
            >
            </Active>
        </scroller>
        <Public-no-info v-else>
        </Public-no-info>
    </div>
</template>
<script>
    import Active from './public/Public-activeTable.vue'
    import {activeManageFun} from './../actions/activeActions'
    import PublicNoInfo from './public/Public-noInfo.vue'
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'
    export default{
        components: {
            Active,
            PublicNoInfo,
            Scroller
        },
        vuex: {
            actions: {
                activeManageFun
            }
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
        methods:{
            init(){
                this.query((res)=>{
                    if(res.status == 200){
                        this.list =  res.list;
                    const resetScro =()=>{
                        this.resetScorll();
                        return (res.pageinfo.pagecount <= res.pageinfo.pageno) ? this.$broadcast('pullup:done', this.$refs.scroller.uuid) :'';
                    }
                    res.list && setTimeout(resetScro,10)

                    }
                })
            },
            query(result){
                this.activeManageFun({params: this.params, result: result})
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
