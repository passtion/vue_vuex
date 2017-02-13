<template>
    <div>
        <Public-adress
                is-my-ads="true"
        ></Public-adress>
        <Public-btn
                btn-name="添加新地址"
                :link="link"
        ></Public-btn>
    </div>
</template>
<script>
    import PublicAdress from './others/AdressLst.vue';
    import PublicBtn from './public/Public-btn.vue';
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
