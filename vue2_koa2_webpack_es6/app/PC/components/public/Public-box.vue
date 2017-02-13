<style scoped>
    .proj-info-mask {
        background-color: #000;
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 11;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.6;
    }


    .show-hiden-transition {
        transition: all .5s ease;
    }

    .sliding-screen-enter, .sliding-screen-leave {
        right: -75%;
        opacity: 0;
    }

</style>
<template>
    <div class="proj-info-mask"  @click.prevent="click" > </div>
</template>

<script>
    export default{
        props:['click']
    }
</script>