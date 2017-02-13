<style scoped>
    .editable {white-space:normal; word-break:break-all;word-wrap:break-word;cursor: pointer;outline:none; -webkit-tap-highlight-color:rgba(0,0,0,0);}
    /*.border-bottom{border-bottom: 1px solid #efefef;  }*/
    .margin20{margin-top: 1.1111111111111112rem;}
    .right{position: absolute;  right:0.8333333333333334rem; max-width:21.666666666666668rem;}
    ul.input-form {font-size: 1rem;}
    ul.input-form span{  display: inline-block;}
    ul.input-form li {min-height:3rem; padding: 0.8333333333333334rem; position: relative;background-color: white;}
    ul.input-form li label{text-align: left;min-width: 8.333333333333334rem; }
    ul.input-form li input{border: 0;text-align: right; outline: none;line-height: 2.7777777777777777rem; font-size: 1rem;top:0;}
    ul.input-form li textarea{border: 0;outline: 0;width: 100%;font-size: 1rem;line-height:1.1111111111111112rem; overflow: hidden;height:2.2222222222222223rem;resize:none;padding: 0;}
    .switch-style:after{ position: absolute; display: inline-block; right: 0.8333333333333334rem; font-size: 3.3333333333333335rem; color: #ef1837; top: 1.1111111111111112rem;}
    ul.input-form li.choice-address {padding: 0; padding-top: .5rem;}
    .close-icon:after{color: #686868;}
</style>
<template>
    <!--修改-->
    <div v-if="seqid" >
       <div v-for="item in addressGetLst.list">
            <ul class="input-form" v-if="item.seqid == seqid">
                <input type="hidden" name="seqid" :value="seqid" >
                <li class="vux-1px-b">
                    <label>收货人</label>
                   <input class="right" type="active" placeholder="姓名" name="receiver" :value="item.receiver">
                </li>
                <li class="vux-1px-b">
                    <label>联系电话</label>
                    <input class="right"   type="tel" placeholder="手机号" name="mobile" oninput="if(value.length>11)value=value.slice(0,11)" :value="item.mobile">
                </li>
                <li class="vux-1px-b choice-address" >
                    <address
                            title="所在区域"
                            :value.sync="value2"
                            raw-value
                            :list="addressData"></address>
                    <input type="hidden" name="province" :value="getName()[0]">
                    <input type="hidden" name="city" :value="getName()[1]">
                    <input type="hidden" name="area" :value="getName()[2]">
                </li>
                <li>
                    <textarea class="editable" placeholder="请输入详细地址" name="address"  :value="item.address"></textarea>
                </li>
                <li class="margin20" @click.prevent="setDefault">
                    <label class="iconfont open-icon switch-style" v-if="dft"   >默认地址</label>
                    <label class="iconfont close-icon switch-style" v-else >设为默认地址</label>
                    <input type="hidden" name='is_default'  :value='~~dft' >
                </li>

                <li class="margin20" @click.prevent="showDelPop">
                    <label class="switch-style" style="color:#EF1837" >删除地址</label>
                </li>
            </ul>
        </div>
        <confirm :show.sync="delShow" confirm-text="确定" cancel-text="取消" title="操作提示" @on-confirm="deleteAddress">
            <p style="text-align:center;">确定要删除该地址吗?</p>
        </confirm>
    </div>
<!--新增地址-->
    <div v-else>
        <ul class="input-form" >
            <li class="vux-1px-b">
                <label>收货人</label>
                <input class="right" type="active" placeholder="姓名" name="receiver" >
            </li>
            <li class="vux-1px-b">
                <label>联系电话</label>
                <input class="right"  type="tel" placeholder="手机号" name="mobile"  oninput="if(value.length>11)value=value.slice(0,11)" >
            </li>
            <li class="vux-1px-b choice-address">
                <address
                        title="所在区域"
                        :value.sync="value2"
                        raw-value
                        :list="addressData"></address>
                <input type="hidden" name="province" :value="getName()[0]">
                <input type="hidden" name="city" :value="getName()[1]">
                <input type="hidden" name="area" :value="getName()[2]">
            </li>
            <li>
                    <textarea class="editable" type="active" placeholder="请输入详细地址" name="address" ></textarea>
            </li>
            <li class="margin20" @click.prevent="setDefault"  >
                <label class="iconfont open-icon switch-style"   v-if='dft' >默认地址</label>
                <label class="iconfont close-icon switch-style" v-else   >设为默认地址</label>
                <input type="hidden" name='is_default'  :value='~~dft' >
            </li>
        </ul>
    </div>

</template>

<script>
    import {queryAddressLstFun,
            deleteAddressFun} from '../../actions/addressActions';
    import {addressGetLst} from '../../getters/addressGetter';
    import {getLocation} from '../../getters/activeGetter';
    import  Address from '../../../../vux/vux/src/components/address/index.vue'
    import  Confirm from '../../../../vux/vux/src/components/confirm/index.vue'
    import  AddressChinaData from '../../js/address.json'
    export default{
        props:['seqid'],
        components:{
            Address,
            Confirm
        },
        vuex:{
            getters:{
                addressGetLst,
                getLocation
            },
            actions:{
                queryAddressLstFun,
                deleteAddressFun
            }
        },
        data(){
            return{
                dft: false,
                value2: this.seqid ? this.getValue2() : this.getLocation.result?[this.getLocation.result.addressComponent.province, this.getLocation.result.addressComponent.city, this.getLocation.result.addressComponent.district]:['广东省','广州市','天河区'],
                addressData:AddressChinaData.list,
                show: false,
                delShow:false
            }
        },
        methods:{
            init(){
                !!this.addressGetLst.list.length || this.queryAddressLstFun();
                !!this.seqid && this.getDft();
            },
            setDefault(){
                this.dft = !this.dft;
            },
            deleteAddress(){
                const  params = {seqid:this.seqid};
                this.deleteAddressFun({params:params,isBack:true});
            },
            getValue2(){
                const lst = [];
                this.addressGetLst.list.forEach((item) => {
                    if(item.seqid == this.seqid)  {
                        lst[0] = item.province;
                        lst[1] = item.city;
                        lst[2] = item.area;
                    }

                });
                return lst;
            },
            showDelPop(){
                this.delShow = true;
            },
            getDft(){
                this.addressGetLst.list.forEach((item) => {
                    if(item.seqid == this.seqid)  {
                        this.dft = parseInt(item.is_default);
                    }

                })

            },
            changeData() {
                this.value2 = ['430000', '430400', '430407']
            },
            getName() {
                const lst = [null,null,null];
                 AddressChinaData.list.forEach((item)=>{
                    if(item.value == this.value2[0])  lst[0] = item.name;
                    if(item.value == this.value2[1])  lst[1] = item.name;
                    if(item.value == this.value2[2])  lst[2] = item.name;
                 })
               return lst;
            }
        },
        ready(){
            this.init();

        }
    }
</script>
