<template>
    <Public-adress
            is-my-ads="true"
    ></Public-adress>
    <Public-btn
            btn-name="添加新地址"
            :link="link"
    ></Public-btn>
</template>
<script>
    import PublicAdress from './public/Public_adress.vue';
    import PublicBtn from './public/Public_btn.vue';
    import {addAddressFun} from '../actions/addressActions'
    export default{
        components: {
            PublicAdress,
            PublicBtn
        },
        data(){
            return{
                link:{name:'AddressInfo'}
            }
        }

    }
</script>
