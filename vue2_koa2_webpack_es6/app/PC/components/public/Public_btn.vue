<style scoped>
    a.sure-btn {
        display: inline-block;
        z-index: 2;
        padding: 0;
        height:126px;
        width:1004px;
        text-align: center;
        font-size: 46px;
        line-height: 126px;
        background-color: #ef1837;
        color: white;
        border-radius: 62px;
        position: absolute;
        bottom: 4vh;
        margin-left: 10vw
    }
</style>
<template>
    <div>
        <a v-if="link" class="sure-btn" v-link="link" >{{btnName}}</a>
        <a v-else class="sure-btn" @click="click" >{{btnName}}</a>
    </div>
</template>
<script>
    export default{
        props:['btnName','click','link'],
    }
</script>
