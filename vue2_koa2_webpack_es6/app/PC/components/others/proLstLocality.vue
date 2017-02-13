<style scoped>
    .choice-locality {
        width: 80%;
        z-index: 99;

    }

    .choice-locality ul.locality-lst {
        width: 100%;
        font-size: 0.6666666666666666rem;
        background-color: white;
    }

    .box2 {
        z-index: 99;
    }

    .choice-locality ul.locality-lst li {
        /*height: 4.3888888888rem;*/
        width: 100%;
        padding: .64815815rem .62962963rem;

    }

    .choice-locality ul.locality-lst li:nth-child(2), .choice-locality ul.locality-lst li:first-child {
        /*border-bottom: 1px solid #e4e4e4;*/
    }

    .choice-locality ul.locality-lst li h3 {
        font-size: 0.7777777777777778rem;
        margin-bottom: .68518519rem;
    }

    .choice-locality ul.locality-lst li p {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .choice-locality ul.locality-lst li.prioved p {
        /*justify-content: flex-start;*/

    }

    .choice-locality ul.locality-lst li.prioved p span {
        margin-left: .66rem;
    }

    .choice-locality ul.locality-lst li.prioved p span:nth-child(3n+1) {
        /*margin-left: 0;*/
    }

    .choice-locality ul.locality-lst li.price-points p input {
        border-radius: 15px;
        background-color: #e8e8e8;
        width: 4.5rem;
        line-height: 1.3333333333333333rem;
        text-align: center;
    }

    .choice-locality ul.locality-lst li p span {
        display: inline-block;
        width: 22%;
        height: 1.3333333333333333rem;
        line-height: 1.3333333333333333rem;
        background: #e8e8e8;
        border-radius: .62962963rem;
        text-align: center;
        margin-bottom: .59259259rem;
        position: relative;
    }

    .choice-locality ul.locality-lst li p span.choice {
        color: #ef1837;
        background-color: white;
        box-sizing: border-box;
        border: 1px solid #ef1837;
        text-align: left;
        text-indent: .5rem;
    }

    .choice-locality ul.locality-lst li p span.choice:after {
        position: absolute;
        right: 0;
        top: -1px;
        font-family: "iconfont" !important;
        width: 1.2962963rem;
        border-top-right-radius: .62962963rem;
        border-bottom-right-radius: .62962963rem;
        content: '\e609';
        background-color: #ef1837;
        color: white;
        display: inline-block;
        text-align: center;
        text-indent: 0;

    }

    .choice-locality ul.locality-lst li.btn {
        padding: 0;
        height: 2.7962963rem;
        display: inline-flex;
        display: -webkit-inline-flex;
        font-size: 1.074074074rem;
        position: absolute;
        bottom: 0;
    }

    .choice-locality ul.locality-lst li.btn a {
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 2.7962963rem;
        background-color: #e8e8e8;

    }

    .choice-locality ul.locality-lst li.btn a.finish {
        background-color: #ef1837;
        color: white;

    }

    .sliding-screen-transition {
        transition: right .5s ease;
        height: 100%;
        width: 80%;
        right: 0;
        position: absolute;
        top: 0;
        background-color: white;
        box-shadow: 0 0.12962962962962962rem 0.3888888888888889rem rgba(0, 0, 0, .15);
        -moz-box-shadow: 0 0.12962962962962962rem 0.3888888888888889rem rgba(0, 0, 0, .15);
        -o-box-shadow: 0 0.12962962962962962rem 0.3888888888888889rem rgba(0, 0, 0, .15);
        opacity: .95;
    }

    .sliding-screen-enter, .sliding-screen-leave {
        right: -80%;
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        -o-transform: translateX(0);
        transform: translateX(0);
    }

    .choice-locality ul.locality-lst li p span.choice {
        color: #ef1837;
        background-color: white;
        box-sizing: border-box;
        border: 1px solid #ef1837;
        text-align: left;
        text-indent: .5rem;
    }

    .choice-locality ul.locality-lst li p span.choice:after {
        position: absolute;
        right: 0;
        top: -1px;
        font-family: "iconfont" !important;
        width: 1.2962963rem;
        border-top-right-radius: .62962963rem;
        border-bottom-right-radius: .62962963rem;
        content: '\e609';
        background-color: #ef1837;
        color: white;
        display: inline-block;
        text-align: center;
        text-indent: 0;

    }

    .choice-locality ul.locality-lst li.btn {
        padding: 0;
        height: 2.7962963rem;
        display: inline-flex;
        display: -webkit-inline-flex;
        font-size: 1.074074074rem;
        position: absolute;
        bottom: 0;
    }

    .choice-locality ul.locality-lst li.btn a {
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 2.7962963rem;
        background-color: #e8e8e8;

    }

    .choice-locality ul.locality-lst li.btn a.finish {
        background-color: #ef1837;
        color: white;

    }

    .sliding-screen-transition {
        transition: right .5s ease;
        height: 100%;
        width: 80%;
        right: 0;
        position: absolute;
        top: 0;
        background-color: white;
        box-shadow: 0 0.12962962962962962rem 0.3888888888888889rem rgba(0, 0, 0, .15);
        -moz-box-shadow: 0 0.12962962962962962rem 0.3888888888888889rem rgba(0, 0, 0, .15);
        -o-box-shadow: 0 0.12962962962962962rem 0.3888888888888889rem rgba(0, 0, 0, .15);
        opacity: .95;
    }

    .sliding-screen-enter, .sliding-screen-leave {
        right: -80%;
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        -o-transform: translateX(0);
        transform: translateX(0);
    }
</style>
<template>
    <div class="choice-locality" v-if="showFlg" transition="sliding-screen" transition-mode="out-in">

        <ul class="locality-lst">
            <scroller lock-x height="100vh" v-ref:scroller>
                <div class="box2">
                    <li class="price-points vux-1px-b">
                        <h3>价格区间（元）</h3>
                        <p>
                            <input type="tel" :placeholder="queryParams.price_l ? queryParams.price_l :  '最低价' "
                                   v-model="params.price_l">
                            <em>-</em>
                            <input type="tel" :placeholder="queryParams.price_h ? queryParams.price_h :  '最高价' "
                                   v-model="params.price_h">
                        </p>
                    </li>
                    <li class="vux-1px-b">
                        <h3>折扣和服务</h3>
                        <p>
                            <span :class="params.is_free_shipping ?'choice':''" @click.stop="clickFree($event)">包邮</span>
                        </p>
                    </li>
                    <li class="salesArea">
                        <h3>销售地区</h3>
                        <p>
                            <span @click.stop="cancelProv" class='choice'
                                  v-if="params.city ? params.city :params.province">{{(params.city ? params.city :params.province) | referred}}</span>
                            <span style="background-color:white;" v-else></span>
                            <span class="iconfont where" style="align-self:center;" @click.stop="choiceLocation">{{getLocationCity() | referred}}</span>
                            <span class="iconfont location" @click.stop="getLocationFun({loadFlg:true})">定位</span>
                        </p>
                    </li>
                    <li class="prioved">
                        <h3>省份</h3>
                        <p>
                            <span v-for="item in provinces" @click.stop="clickProv($event,item.value,item.name)"
                                  :class="params.province==item.name ?'choice':''">{{item.name | referred }}</span>
                        </p>
                    </li>
                    <li class="prioved">
                        <h3>城市</h3>
                        <p>
                            <span v-for="item in citys" @click.stop="clickCity($event,item)"
                                  :class="params.city==item ?'choice':''">{{item | referred}}</span>
                        </p>
                    </li>
                    <li style="height:2.037037037037037rem;border:none;"></li>
                </div>
            </scroller>
            <li class="btn">
                <a class="reset" @touchstart="reset">重置</a>
                <a class="finish" @touchstart="finish">完成</a>
            </li>
        </ul>
    </div>
    <Public-box
            v-if="showFlg"
            :click="hidenFun"
    >
    </Public-box>

</template>
<script>
    import  Scroller from '../../../../vux/vux/src/components/scroller/index.vue'
    import  PublicBox from '../public/Public-box.vue'
    import  address from '../../js/address.json'
    import  JsonTool from '../../../tool/lib/JsonTool'
    import  {getLocation} from './../../getters/activeGetter'
    import  {getLocationFun} from './../../actions/activeActions'
    export default{
        props: ['showFlg', 'hidenFun', 'queryParams', 'queryFun'],
        components: {
            Scroller,
            PublicBox
        },
        vuex: {
            getters: {
                getLocation
            },
            actions: {
                getLocationFun
            }
        },
        data(){
            return {
                provinces: address.list.slice(0, 34),
                citys: [],
                params: {
                    price_l: "",
                    price_h: "",
                    is_free_shipping: "", // 0:否, 1:是
                    province: "",
                    city: ""
                },

            }
        },
        methods: {
            init(){
                (this.getLocation.status == 200) || this.getLocationFun();
            },
            getLocationCity(){
              return this.getLocation.result ? this.getLocation.result.addressComponent.city  :'未定位';
            },
            choiceLocation(){
                if(this.getLocation.result){
                    this.params.province = this.getLocation.result.addressComponent.province;
                    this.params.city = this.getLocation.result.addressComponent.city;
                    this.showCity()
                }
            },
            showCity(){
                const addLst = address.list;
                let key = false;
                addLst.forEach((item)=> {
                    if (item.name == this.params.province) {
                        key = item.value;
                    }
                    ( key && item.parent == key) && (this.citys.push(item.name));
                })
                this.resetScorll();
            },
            finish(){
                new JsonTool().concat(this.queryParams, this.params);
                this.queryFun();
            },
            reset(){
                for (let key in this.params) {
                    this.params[key] = '';
                }
            },
            clickFree(){
                this.params.is_free_shipping = ~~!this.params.is_free_shipping;
            },
            clickProv(e, key, value){
                e.target.classList[0] == 'choice' ? this.cancelProv() : this.choiceProv(key, value)
                this.resetScorll();
            },
            clickCity(e, value){
                e.target.classList[0] == 'choice' ? this.cancelCity() : this.choiceCity(value)
            },
            cancelProv(){
                this.params.province = "";
                this.params.city = "";
                this.citys = [];
                this.resetScorll();
            },
            choiceProv(key, value){
                this.params.province = value;
                this.params.city = "";
                this.citys = [];
                if (key == '110000' || key == '120000' || key == '500000' || key == '310000') {
                    return;
                }
                const addLst = address.list;
                addLst.forEach((item)=> {
                    (item.parent == key) && (this.citys.push(item.name));
                })

            },
            choiceCity(value){
                this.params.city = value;

            },
            cancelCity(){
                this.params.city = "";
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
