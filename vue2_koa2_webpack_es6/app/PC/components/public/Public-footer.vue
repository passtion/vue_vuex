
<style scoped>
    /*导航条*/
    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3rem;
        background-color:#ffffff;
    }
    footer ul {
        height: 100%;
        display: flex;
        display: -webkit-flex;
        align-items:center;

    }
    footer ul li {
        flex: 1;
        text-align: center;
        line-height: 2rem;
        height: 100%;
        font-size: .5555555555rem;

    }
    footer ul li:before{
        top: 0;
        height: 1rem;
        font-size: 1.111111111rem;
        display: block;
    }
    .iconfont.red{
        color:#ef1837;
    }
    .iconfont.red:before{
        color:#ef1837;
    }
</style>
<template>
    <footer>
        <ul>
            <li class="iconfont home{{click == 1 ? '-click red' : ''}} " @touchstart="go(1,{name:'index'})">首页</li>
            <li class="iconfont benefit{{click == 2 ? '-click red' : ''}}" @touchstart="go(2,{name:'preferential'})">优惠</li>
            <li class="iconfont classify{{click == 3 ? '-click red' : ''}}" @touchstart="go(3,{name:'sort'})">分类</li>
            <li class="iconfont my{{click == 4 ? '-click red' : ''}}" @touchstart="go(4,{name:'myHome'})">我的</li>
        </ul>
    </footer>
</template>

<script>
    import {straightFun} from '../../vuex/index/actions'
    export default{
      props:['click'],
        vuex:{
          actions:{
              straightFun
          }
        },
      methods:{
          go(i,params){
              if (i == this.click) return;
              this.straightFun({params:params,obj:this})
          }
      }
    }
</script>
