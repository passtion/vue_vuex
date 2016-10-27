<style scoped>
    .editable {white-space:normal; word-break:break-all;word-wrap:break-word;cursor: pointer;outline:none; -webkit-tap-highlight-color:rgba(0,0,0,0);}
    .border-bottom{border-bottom: 1px solid #e4e4e4;  }
    .margin20{margin-top: 40px;}
    .right{position: absolute;  right:30px; max-width:780px;}
    ul.input-form {font-size: 36px;color: #343434;}
    ul.input-form span{  display: inline-block;}
    ul.input-form li {min-height:108px; padding: 30px; position: relative;background-color: white;}
    ul.input-form li label{text-align: left;min-width: 300px; }
    ul.input-form li input{border: 0;text-align: right; outline: none;line-height: 100px; font-size: 36px;top:0;}
    ul.input-form li textarea{border: 0;outline: 0;width: 582px;font-size: 36px;line-height:40px; overflow: hidden;height:80px;resize:none;}
    .switch-style:after{ position: absolute; display: inline-block; right: 30px; font-size: 120px; color: #ef1837; top: 40px;}
</style>
<template>
    <!--查询单个-->
    <div v-if="seqid" >
       <div v-for="item in addressGetLst.list">
            <ul class="input-form" v-if="item.seqid == seqid">
                <li class="border-bottom">
                    <label>收货人</label>
                   <input class="right" type="text" placeholder="姓名" :value="item.receiver">
                </li>
                <li class="border-bottom">
                    <label>联系电话</label>
                    <input class="right"   type="text" placeholder="手机号" maxlength="11" :value="item.mobile">
                </li>
                <li class="border-bottom">
                    <label>所在地区</label>
                    <span class="right">请选择&nbsp;&nbsp;&gt;</span>
                </li>
                <li>
                    <textarea class="editable" placeholder="请输入详细地址" :value="item.address"></textarea>
                </li>
                <li class="margin20">
                    <label class="iconfont open-icon switch-style" v-if="item.is_default" >默认地址</label>
                    <label class="iconfont close-icon switch-style" v-else >设为默认地址</label>
                </li>
            </ul>
        </div>
    </div>
<!--新增地址-->
    <div v-else>
        <ul class="input-form" >
            <li class="border-bottom">
                <label>收货人</label>
                <input class="right" type="active" placeholder="姓名" name="receiver" >
            </li>
            <li class="border-bottom">
                <label>联系电话</label>
                <input class="right"  type="number" placeholder="手机号" name="mobile" maxlength="11" >
            </li>
            <li class="border-bottom">
                <label>所在地区</label>
                <span class="right">请选择&nbsp;&nbsp;&gt;</span>
                <input type="hidden" name="province" value="广东">
                <input type="hidden" name="city" value="广州">
                <input type="hidden" name="area" value="天河区">
            </li>
            <li>
                    <textarea class="editable" type="active" placeholder="请输入详细地址" name="address" ></textarea>
            </li>
            <li class="margin20">
                <label class="iconfont close-icon switch-style"   >设为默认地址</label>
                <input type="hidden" name='is_default'  value='0' >
            </li>
        </ul>
    </div>

</template>

<script>
    import {queryAddressLst} from '../../actions/addressActions';
    import {addressGetLst} from '../../getters/addressGetter';
    export default{
        props:['seqid'],
        vuex:{
            getters:{
                addressGetLst
            },
            actions:{
                queryAddressLst
            }
        },
        methods:{
            init(){
                addressGetLst.list || this.queryAddressLst();
            }
        },
        ready(){
            this.init();
        }
    }
</script>
