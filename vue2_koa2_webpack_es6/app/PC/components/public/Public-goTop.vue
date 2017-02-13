<style scoped>
    div.goTop-icon{
        position: absolute;
        bottom: 6rem;
        height: 3rem;
        width: 3rem;
        right: .5rem;
        z-index: 99;
        text-align: center;
        font-size: 3rem;
        opacity: .7;
        color:#ef1837 ;
    }
</style>
<template>
    <div class="iconfont goTop-icon" @click.stop="goTop">
    </div>
</template>
<script>
    export default{
       props:['goTop']
    }
</script>
