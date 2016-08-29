<template>
  <div class="tip-border">
    <p class="tip">
      {{ tip }}
    </p>
    <slot></slot>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  props: ['tip']
};
</script>
<style scoped>
.tip-border {
  position: relative;
  display: block;
  margin-top: 30px;
  border: 2px solid #dfdfdf;
  background-color: #f9fafc;
  padding: 20px;
}

.tip-border .tip {
  position: absolute;
  top: -16px;
  left: 50%;
  box-sizing: content-box;
  height: 30px;
  padding-right: 26px;
  padding-left: 26px;
  transform: translateX(-50%);
  color: #fff;
  border-radius: 16px;
  background-color: #2f90ea;
  line-height: 30px;
}
</style>
