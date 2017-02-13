<template>
    <div>
        <Public-form-input
                :seqid="seqid"
        ></Public-form-input>
        <Public-btn
                btn-name="保&nbsp;&nbsp;存"
                :click="click"
                :double="double"
        ></Public-btn>
    </div>
</template>
<script>
    import PublicFormInput from './others/AddressInfoTab.vue';
    import PublicBtn from './public/Public-btn.vue';
    import Cell from '../../../vux/vux/src/components/scroller/index.vue'
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
                seqid: this.$route.params.id,
                double:false
            }
        },
        methods: {
            click(){
                return !!this.seqid ? this.alterAddressFun() : this.addAddressFun();
            }
        }
    }
</script>
