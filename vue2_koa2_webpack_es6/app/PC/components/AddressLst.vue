<template>
    <div>
        <Public-adress
        ></Public-adress>
        <Public-btn
                btn-name="管理收货地址"
                :link="link"
        ></Public-btn>
    </div>
</template>
<script>
    import PublicAdress from './others/AdressLst.vue';
    import PublicBtn from './public/Public-btn.vue';
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
