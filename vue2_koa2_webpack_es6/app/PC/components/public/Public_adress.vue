<style  scoped>
    ul.address-lst {
    }

    ul.address-lst li.one-address{
        min-height: 168px;
        width: 100%;
        font-size: 30px;
        background-color: white;
        margin-bottom: 26px;
        padding-top: 20px;
    }

    ul.address-lst li.one-address p{
        padding-left: 20px;
        padding-right: 20px;
    }

    ul.address-lst li p:first-child{
        font-size: 36px;
        margin-bottom: 46px;
        position: relative;
    }

    ul.address-lst li p:first-child span.choice-cnee{
        color: #ef1837;
    }

    ul.address-lst li p:first-child span.addr-phone{
        position: absolute;
        right: 30px;
    }


    ul li.sure-btn {
        padding: 0;
        height:126px;
        width:1004px;
        text-align: center;
        font-size: 46px;
        line-height: 126px;
        background-color: #ef1837;
        color: white;
        margin: auto;
        border-radius: 62px;
        margin-top: 230px;
    }
    ul.address-lst li.one-address p.one-address-menu{
        height: 80px;
        box-sizing: border-box;
        border-top:#e4e4e4 1px solid;
        margin-top:30px;
        position: relative;
        line-height: 80px;
        font-size: 30px;

    }

    ul.address-lst li.one-address p.one-address-menu a{
        display: inline-block;
    }

    .margin-before-15:before{
        margin-right: 30px;
    }

    ul.address-lst li.one-address p a.editor-address,ul.address-lst li.one-address p a.delete-address{
        position: absolute;
        line-height: 80px;

    }

    ul.address-lst li.one-address p a.editor-address:before,ul.address-lst li.one-address p a.delete-address:before{
        margin-right: 30px;

    }

    ul.address-lst li.one-address p a.editor-address{
        right: 250px;
    }

    ul.address-lst li.one-address p a.delete-address{
        right: 30px;
    }
</style>
<template>
    <ul class="address-lst">
        <li class="one-address" v-for='item in addressGetLst.list' >
            <p>
                <em class="choice-icon" v-if="item.is_default"></em>
                <span class="choice-cnee">收货人:{{item.receiver}}</span>
                <span class="addr-phone" >{{item.mobile}}</span>
            </p>
            <p>
                <label>收货人地址:</label>
                <span>{{item.address}}</span>
            </p>
            <p class="one-address-menu"  v-if="isMyAds">
                <a class="set-default iconfont set-default-icon margin-before-15">设为默认地址</a>
                <a class="editor-address iconfont editor-icon" v-link="{name:'AddressInfo',params:{ id: item.seqid }}">编辑</a>
                <a class="delete-address iconfont delete-icon" >删除</a>
            </p>
        </li>

    </ul>
</template>
<script>
    import {
            queryAddressLst,
            deleteAddressFun,
            deleteAddressInCacheFun
    } from '../../actions/addressActions';

    import {
        addressGetLst
    } from '../../getters/addressGetter';
    export default{
        props:['isMyAds'],
        vuex:{
            getters:{
                addressGetLst
            },
            actions:{
                queryAddressLst, //查询地址列表
                deleteAddressFun,
                deleteAddressInCacheFun

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
