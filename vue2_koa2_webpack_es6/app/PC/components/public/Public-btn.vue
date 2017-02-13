<style scoped>
    a.sure-btn {
        display: inline-block;
        padding: 0;
        height:2.8rem;
        width:90%;
        text-align: center;
        font-size: 1.2777777777777777rem;
        line-height: 2.8rem;
        background-color: #ef1837;
        color: white;
        border-radius: 62px;

    }
    .btns-div{
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 2;
        padding-bottom: 1rem;
        padding-top: 1rem;
        text-align: center;
        background-color: #f4f4f4;
    }
    .cancel {
        background-color:white;
        border: 1px solid #e8e8e8;
        color: #343434;
    }

    div.checke-btn {
        height: 2.5555555555555554rem;
        padding: 0;
    }
    .checke-btn a.sure-btn{
        border-radius: 0;
        width: 100%;
        height: 2.5555555555555554rem;
        line-height: 2.5555555555555554rem;
    }
</style>
<template>
    <div class="btns-div" :class="isCheck ? 'checke-btn': 'btns-div'">
        <a v-if="link" class="sure-btn" v-link="link" @click.prevent="goUrl">{{btnName}}</a>
        <a v-else class="sure-btn" @click.prevent="click" >{{btnName}}</a>
        <a v-if="double" style="margin-top: 3.0555555555555554rem;" class="sure-btn" @click.prevent="click" >{{btnName}}</a>
    </div>
</template>
<script>
    import {goToFun} from '../../vuex/index/actions'
    export default{
        props:['btnName','click','link','double','isCheck'],
        vuex:{
            actions:{
                goToFun
            }
        },
        methods:{
            goUrl(){
                this.goToFun({params:this.link,obj:this})
            }
        }
    }
</script>
