<style scoped>
    div.content img.activity-img{
        width: 100%;
    }

    section.pro-list{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:column;
        flex-wrap: wrap;
        justify-content:space-between;
        margin-bottom: 0;
    }

    section.pro-list h3 {
        text-align: center;
        font-size: 1rem;
        position: relative;
        color:#ef1837;
        line-height: 2.2962962962962963rem;
        font-weight: 400;
        background-color:  #f4f4f4;;
    }

    section.pro-list h3:before {
        position: absolute;
        left: 0;
        content: ' ';
        display: inline-block;
        height: 100%;
        width: 100%;
        background:url('../../images/decorate01.png') 0/100%  no-repeat transparent ;
    }
    /*******hot product********************/
    section.pro-list.hot-pro ul{
        display: flex;
        flex-wrap: wrap;
    }
    section.pro-list.hot-pro ul li {
        box-sizing: border-box;
        position: relative;
        width: 33.33333333vw;
        min-height: 4.944444444rem;
        background-color: white;
        /*border-top: 1px solid #f3f3f3;*/
        padding: .7777777777778rem .2777777777777778rem .370370370rem .5555555555555556rem;
    }
    section.pro-list.hot-pro ul li:nth-child(3n+3),section.pro-list.hot-pro ul li:nth-child(3n+2){
        border-left: 1px solid #f3f3f3;
    }

    section.pro-list.hot-pro ul li em.pro-img{
        display: inline-block;
        width: 3.70370370370rem;
        height: 3.70370370370rem;
        background: url("../../images/index-test02.jpg")  0/100%  no-repeat transparent;
    }
    section.pro-list.hot-pro ul li h3.pro-title {
        position: absolute;
        left:4.388888888888rem;
        top: .1rem;
        font-size: .66666666666666rem;
        color: #343434;
        background-color: white;
        height: 2.2962962962962963rem;
        -webkit-line-clamp:1;
        text-overflow: ellipsis;
        word-break: break-all;
        word-wrap: break-word;
        white-space: normal;
        overflow: hidden;
    }

    section.pro-list.hot-pro ul li p.pro-info {
        position: absolute;
        left:4.388888888888rem;
        width: 3rem;
        height:1.565rem;
        top: 2.7rem;
        font-size: .470370370370rem;
        line-height: 0.5537037rem;
        /*color: #343434;*/
        word-break: break-all;
        word-wrap: break-word;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient: vertical;
    }
    /*******like product********************/
    .pro-list.like-pro h3:before {
        position: absolute;
        left: 0;
        content: ' ';
        display: inline-block;
        height: 100%;
        width: 100%;
        background:url('../../images/decorate02.png') 0/100%  no-repeat transparent ;

    }
</style>
<template>
    <div >
        <!--<Public-search-->
                <!--:go="true">-->
        <!--</Public-search>-->
        <search ></search>
        <scroller style="padding-bottom: 4rem;" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="100vh" :top-flag="topFlag" @pullup:loading="load" v-ref:scroller>
            <div class="box2"  >
                <div class="content">
                <img v-if="activeFlg"  class="activity-img" src="{{activeInfo.logo}}" @click="goActive">
                <section  class="pro-list hot-pro">
                    <h3>热销产品</h3>
                    <ul v-if="hotProLst" >
                        <li  v-for="(i,item) in hotProLst" :class="(i+1)%3==2 ? 'vux-1px-t ':'vux-1px-t' "   @click.prevent="goUrl({name:'proInfo',params:{ id: item.productid }})">
                            <em class="pro-img" :style="'background-image: url('+item.logo_url+')'"></em>
                            <h3 class="pro-title">{{item.packagename}}</h3>
                            <p class="pro-info">{{item.digest}}</p>
                        </li>
                    </ul>
                </section>
                <section  class="pro-list like-pro">
                    <h3>猜你喜欢</h3>
                    <Public-pro-lst
                            :lst="likeProLst"
                    ></Public-pro-lst>
                </section>
            </div>
          </div>
        </scroller>
    </div>
</template>
<script>
    import {localCache} from './../../../tool/lib/CacheTool';
    import PublicProLst from './../public/Public-proLst.vue';
    import Scroller from '../../../../vux/vux/src/components/scroller/index.vue'
    import {goToFun} from '../../vuex/index/actions'
    import {
            queryHotProFun,
            queryLikeProFun,
            queryPrizeActiveFun,
    } from '../../actions/productAcrions'
    import search from './../public/Public-search2.vue'
    export default{
    components:{
        Scroller,
        search,
        PublicProLst,
        },
        data(){
            return{
                activeFlg:false,
                activeInfo:{},
                topFlag:true,
                LikeProPage:1,
                hotProLst:localCache('hotProLst'),
                likeProLst:localCache('likeProLst'),
                pullupConfig2: {
                    content: '',
                    downContent: '松开进行加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...'
                }
            }
        },
        vuex:{
            actions:{
                queryHotProFun,
                queryLikeProFun,
                queryPrizeActiveFun,
                goToFun
            },
            getters:{

            }
        },
        methods:{
            init(){

                this.queryHotProFun({result:(res)=>{
                    if(res.status==200) {
                        const list = res.list.slice(0,6);
                        localCache('hotProLst',list);
                        this.hotProLst = list;
                        this.resetScorll()
                    }}});
                this.queryLikeProFun({
                    params:{"pageno":this.LikeProPage},
                    result:(res)=>{
                        if(res.status == 200) {
                            localCache('likeProLst',res.list);
                            this.likeProLst = res.list;
                            if((res.pageinfo.pagecount <= res.pageinfo.pageno)) {
                                this.$broadcast('pullup:done', this.scrollUuid());
                            }
                            this.resetScorll()
                        }

                    }});
                this.queryPrizeActiveFun({
                    result:(res)=>{
                        res.activeid && (this.activeFlg = true);
                        this.activeInfo = res ;
                    }
                });
            },
            goActive(){
                const activeInfo = {};
                for(let key in this.activeInfo){
                    if(key != 'logo') activeInfo[key]=this.activeInfo[key];
                }

              this.goUrl({name:'raffle',params:{activeInfo:JSON.stringify(activeInfo)}})
            },
            goUrl(params){
                this.goToFun({params:params,obj:this})
            },
            resetScorll(){
                this.$refs.scroller.reset()
                },
            scrollUuid(){
                    return his.$refs.scroller.uuid;
            },
            load(uuid) {
                this.LikeProPage = this.LikeProPage+1;
                this.queryLikeProFun({
                    params:{"pageno":this.LikeProPage},
                    result:(res)=>{
                        if(res.status == 200) {
                            let reset = 'pullup:reset';
                            this.likeProLst=(this.likeProLst.concat(res.list));
                            !!( res.pageinfo.pageno < res.pageinfo.pagecount) ?  '' : reset='pullup:done';
                            this.$broadcast(reset, uuid);
                            (reset=='pullup:done') && this.resetScorll();
                        }
                    }});
            }
        },
        ready(){
            this.init();

        }

    }
</script>
