<style  scoped>
    ul.address-lst{
        padding-bottom: 4rem;
    }
    ul.address-lst li.one-address{
        min-height: 5rem;
        width: 100%;
        font-size: 0.8333333333333334rem;
        background-color: white;
        margin-bottom: 0.7222222222222222rem;
        padding-top: 1rem;
        box-sizing: border-box;
        position: relative;
    }

    ul.address-lst li.one-address p{
        padding-left: 0.5555555555555556rem;
        padding-right: 0.5555555555555556rem;
    }

    ul.address-lst li p:first-child{
        font-size: 1rem;
        margin-bottom: 1.2777777777777777rem;
        position: relative;
    }

    ul.address-lst li p:first-child span.choice-cnee{
        color: #ef1837;
    }
    ul.address-lst li p:first-child span.choice-cnee:before{
        margin-right: 0.4rem;
        font-size: 1.3rem;
    }

    ul.address-lst li p:first-child span.addr-phone{
        position: absolute;
        right: 0.8333333333333334rem;
    }
    ul li.sure-btn {
        padding: 0;
        height:3.5rem;
        width:27.88888888888889rem;
        text-align: center;
        font-size: 1.2777777777777777rem;
        line-height: 3.5rem;
        background-color: #ef1837;
        color: white;
        margin: auto;
        border-radius: 62px;
        margin-top: 6.388888888888889rem;
    }
    ul.address-lst li.one-address p.one-address-menu{
        height: 2.2222222222222223rem;
        box-sizing: border-box;
        /*border-top:#efefef 1px solid;*/
        margin-top:0.8333333333333334rem;
        position: relative;
        line-height: 2.2222222222222223rem;
        font-size: 0.8333333333333334rem;

    }

    ul.address-lst li.one-address p.one-address-menu a{
        display: inline-block;
        line-height: 2.2222222222222223rem;
    }


    .margin-before-15:before{
        margin-right: 0.8333333333333334rem;
    }

    ul.address-lst li.one-address p a.editor-address,ul.address-lst li.one-address p a.delete-address{
        position: absolute;
        line-height: 2.2222222222222223rem;

    }

    ul.address-lst li.one-address p a.editor-address:before,ul.address-lst li.one-address p a.delete-address:before{
        margin-right: 0.8333333333333334rem;

    }

    ul.address-lst li.one-address p a.editor-address{
        right: 6.944444444444445rem;
    }

    ul.address-lst li.one-address p a.delete-address{
        right: 0.8333333333333334rem;
    }
    .border-top-bottom {
        /*border-top: 1px solid #dfdfdf;*/
        /*border-bottom: 1px solid #dfdfdf;*/
    }
    p.address-info{
        color:#686868;
        margin-bottom:0.722222rem;
    }
    p.address-info span{
        line-height: 1.2rem;
    }

    ul.address-lst li.choice-cnee.set-default-icon:before{
        display: inline-block;
        color: #EF1837;
        position: absolute;
        font-size: 1rem;
        top: 2.33333333rem;
        left: .740740740740rem;
    }

</style>
<template>
    <div>
        <ul class="address-lst" v-if="orderInfo" style="padding-bottom:0;">
            <li style="position:relative;" class="one-address vux-tap-active iconfont choice-cnee set-default-icon"   >
                <p style="padding-left:2.222222222222rem;">
                    <span  >收货人:{{orderInfo.contactor}}</span>
                    <span class="addr-phone" >{{orderInfo.mobile}}</span>
                </p>
                <p style="padding-left:2.222222222222rem;" class="address-info">
                    <label >收货人地址:</label>
                    <span >{{orderInfo.province+orderInfo.city+orderInfo.area+orderInfo.address}}</span>
                </p>
            </li>
        </ul>
        <ul class="address-lst" v-if="choiceAds && !orderInfo && choiceItem" style="padding-bottom:0;">
            <li style="position:relative;" class="one-address vux-tap-active iconfont choice-cnee set-default-icon"  @click.stop="goUrl({name:'AddressLst'})"  >
                <p style="padding-left:2.222222222222rem;">
                    <span  >收货人:{{choiceItem.receiver}}</span>
                    <span class="addr-phone" >{{choiceItem.mobile}}</span>
                </p>
                <p style="padding-left:2.222222222222rem;" class="address-info">
                    <label >收货人地址:</label>
                    <span >{{choiceItem.province+choiceItem.city+choiceItem.area+choiceItem.address}}</span>
                </p>
            </li>
        </ul>
        <ul class="address-lst" style="padding-bottom:0;" v-if="!choiceItem && choiceAds" @click.stop="goUrl({name:'AddressInfo'})">
                <li style="margin:0;min-height:3rem;" class="one-address " class="'border-top-bottom" >
                    <p style="margin-bottom:0">
                        <span class="iconfont choice-cnee set-default-icon"  ><label style="color:#686868;">添加收货地址</label></span>
                    </p>
                </li>
        </ul>
        <scroller v-if="!choiceAds && !orderInfo && addressGetLst.list[0]" lock-x height="100vh" v-ref:scroller>
            <ul class="address-lst">
            <div class="box2" v-if="isMyAds" >
                <li  class="one-address vux-tap-active"  v-for="item in addressGetLst.list | orderBy 'seqid' -1" :class="isMyAds ? '' : 'border-top-bottom'" >
                    <p>
                        <span class=" {{!!item.is_default && !isMyAds ? 'iconfont choice-cnee set-default-icon' : '' }}" >收货人:{{item.receiver}}</span>
                        <span class="addr-phone" >{{item.mobile}}</span>
                    </p>
                    <p class="address-info" >
                        <label>收货人地址:</label>
                        <span >{{item.province+item.city+item.area+item.address}}</span>
                    </p>
                    <p class="one-address-menu vux-1px-t"  >
                        <a v-if="!parseInt(item.is_default)" class="set-default iconfont set-default-icon2 margin-before-15"  @click.prevent="setDefault(item.seqid)">设为默认地址</a>
                        <a v-else style="color: #ef1837;"  class="set-default iconfont set-default-icon margin-before-15">默认地址</a>
                        <a class="editor-address iconfont editor-icon" @click.prevent="goUrl({name:'AlertAddressInfo',params:{ id: item.seqid }})">编辑</a>
                        <a class="delete-address iconfont delete-icon" @click.prevent="showDelPop(item.seqid)" >删除</a>
                    </p>
                </li>
            </div>
            <div class="box2" v-else >
                <li  class="one-address vux-tap-active"  v-for="item in addressGetLst.list | orderBy 'is_default' -1" :class="isMyAds ? '' : 'border-top-bottom'"  @click.prevent="choice(item.seqid)"  >
                    <p>
                        <span class=" {{!!item.is_default && !isMyAds ? 'iconfont choice-cnee set-default-icon' : '' }}" >收货人:{{item.receiver}}</span>
                        <span class="addr-phone" >{{item.mobile}}</span>
                    </p>
                    <p class="address-info">
                        <label >收货人地址:</label>
                        <span >{{item.province+item.city+item.area+item.address}}</span>
                    </p>
                </li>
            </div>
        </ul>
        </scroller>
        <Public-no-info v-if="!addressGetLst.list[0] && !choiceAds">
        </Public-no-info>
        <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="操作提示" @on-confirm="deleteAddress">
            <p style="text-align:center;">确定要删除该地址吗?</p>
        </confirm>
    </div>
</template>
<script>
    import  Scroller from '../../../../vux/vux/src/components/scroller/index.vue'
    import  Confirm from '../../../../vux/vux/src/components/confirm/index.vue'
    import PublicNoInfo from './../public/Public-noInfo.vue'
    import {
            queryAddressLstFun,
            deleteAddressFun,
            setDefaultAddressFun
    } from '../../actions/addressActions';
    import {goToFun} from '../../vuex/index/actions'
    import {
        addressGetLst
    } from '../../getters/addressGetter';
    export default{
        props:['isMyAds','choiceAds','choiceSeqid','orderInfo'],
        components:{
            Scroller,
            PublicNoInfo,
            Confirm
        },
        data(){
          return{
              show:false,
              seqid:'',
              choiceItem:'',
              choiceSeqId:sessionStorage.getItem('choiceSeqId')
          }
        },
        vuex:{
            getters:{
                addressGetLst
            },
            actions:{
                queryAddressLstFun, //查询地址列表
                deleteAddressFun,
                setDefaultAddressFun,
                goToFun

            }
        },
        methods:{
            init(){
                !!this.addressGetLst.list.length || this.queryAddressLstFun();
                this.choiceAds
                        ? (()=>{ this.choiceAddress();this.$watch('addressGetLst.list',this.choiceAddress)})()
                        : this.$watch('addressGetLst.list.length',(res)=>{if(res)this.resetScorll();})
            },
            setDefault(seqid){
                const  params = {seqid:seqid};
                this.setDefaultAddressFun({params:params});
            },
            deleteAddress(){
                const  params = {seqid:this.seqid};
                this.deleteAddressFun({params:params});
            },
            choice(seqid){
                sessionStorage.setItem('choiceSeqId',seqid);
                history.go(-1);
            },
            goUrl(link){
                this.goToFun({params:link,obj:this})
            },
            resetScorll(){
                this.$refs.scroller.reset()
            },
            showDelPop(seqid){
                this.show = true;
                this.seqid = seqid;
            },
            choiceAddress(){    //订单页面选择的地址
                this.addressGetLst.list.forEach((item)=>{
                    if(!this.choiceSeqId && !!item.is_default) {
                        this.choiceItem = item;
                    };
                    if(item.seqid == this.choiceSeqId) {
                        this.choiceItem = item;
                        sessionStorage.removeItem('choiceSeqId')
                    }
                })
                this.choiceItem || (this.choiceItem=this.addressGetLst.list[0])
                this.choiceItem && (this.choiceAds = this.choiceItem.seqid);
            }
        },
        ready(){
            this.init();
        }
    }
</script>
