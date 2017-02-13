<style>
div.sty404{
  background: url("../images/404.png") center/100% transparent no-repeat;
  text-align: center;
  height:100%;
}

a.goIndex{
  display: inline-block;
  background-color: #ef1837;
  color:#ffffff;
  width: 4.814814814814815rem;
  height: 1.4814814814814814rem;
  line-height: 1.4814814814814814rem;
  font-size: 0.6666666666666666rem;
  border-radius: 0.7407407407407407rem;
  text-align: center;
  margin-top:27.814814814814815rem ;
}
</style>
<template>
  <div class="sty404">
      <a class="goIndex" @touchstart="go({name:'index'})">返回首页</a>
  </div>
</template>
<script>
  import {goToFun}  from './../vuex/index/actions'
  export default {
    vuex:{
      actions:{
        goToFun
      }
    },
    methods:{
      go(params){
        this.goToFun({params:params,obj:this});
      }
    }
  }
</script>