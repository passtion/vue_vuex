<style scoped>
    div.noInfo-icon {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-between;
        height: 20rem;
        text-align: center;
        padding-top: 14rem;
        color: #d2d2d2;


    }
    div.noInfo-icon:before{
        font-size: 8rem;
        color: #e6e6e6;
    }
</style>
<template>
    <div class="iconfont noInfo-icon" :style="style">
        {{message ? message:'暂无记录' }}
    </div>
</template>

<script>

    export default{
        props:['style','message']
    }
</script>
