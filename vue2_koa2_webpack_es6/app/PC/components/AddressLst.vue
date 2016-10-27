<template>
    <Public-adress
    ></Public-adress>
    <Public-btn
        btn-name="管理收货地址"
        :link="link"
    ></Public-btn>
</template>
<script>
    import PublicAdress from './public/Public_adress.vue';
    import PublicBtn from './public/Public_btn.vue';
    export default{
        components: {
            PublicAdress,
            PublicBtn
        },
        data(){
            return{
                link:{name:'AddressManage'}
            }
        }


    }
</script>
