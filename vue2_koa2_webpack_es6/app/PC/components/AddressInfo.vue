<template>
    <Public-form-input
            :seqid="seqid"
    ></Public-form-input>
    <Public-btn
            btn-name="保&nbsp;&nbsp;存"
            :click="click"
    ></Public-btn>
</template>
<script>
    import PublicFormInput from './public/Public_addressInfo.vue';
    import PublicBtn from './public/Public_btn.vue';
    import {addAddressFun,alterAddressFun,queryAddressLst,addAddressInCacheFun} from '../actions/addressActions';
    import {openid} from '../vuex/index/getters'
    export default{
        components: {
            PublicFormInput,
            PublicBtn
        },
        vuex: {
            actions: {
                queryAddressLst,
                addAddressFun,
                alterAddressFun
            },
            getters:{
                openid
            }
        },
        data(){
            return {
                seqid: this.$route.params.id
            }
        },
        methods: {
            click(){
                return !!this.seqid ? this.alterAddressFun() : this.addAddressFun();
            }
        }
    }
</script>
