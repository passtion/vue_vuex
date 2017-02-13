<style scoped>
    div.alert {
        position:relative;
        margin-top: 1rem;
    }
    div.alert input {
        min-height: 2.4074074074074074rem;
        font-size: 0.9629629629629629rem;
        line-height: 1em;
        width: 100%;
        padding: 0.9259259259259259rem 0.7407407407407407rem;
    }

    div.alert span{
        display: inline-block;
        height: 1rem;
        width: 1rem;
        position: absolute;
        right: .6407407407407407rem;
        top:.9259259259259259rem;
    }
</style>
<template>
    <div>
        <div class="alert" >
            <input :type="params.type"  :placeholder="params.value =='false' ? '' : params.value " v-model="value" :maxlength="maxL()"  >

        </div>
        <Public-btn
                btn-name="保&nbsp;&nbsp;存"
                :click="alertFun"
        ></Public-btn>
    </div>
</template>
<script>
    import {alterInfoFun} from  '../actions/myManageActions'
    import {showError} from  '../vuex/index/actions'
    import PublicBtn from './public/Public-btn.vue';

    export default{
        components:{
            PublicBtn
        },
        data(){
            return{
                params:this.$route.params,
                value:''
            }
        },
        vuex:{
          actions:{
              alterInfoFun,
              showError
          }
        },
        methods:{
            maxL(){
                switch(this.params.type){
                    case 'tel':  return 11;
                    case 'email':  return 30;
                    default:  return 30;
                }

            },
            alertFun(){
               if(!this.params.value) {
                   showError('您填入的值为空');
                   return;
               }
               if(!this.value.trim()){
                   history.go(-1)
                   return;
               }
                const params2={};
                params2[this.params.key] = this.value.trim();
                this.alterInfoFun({params:params2})
            }

        }
    }
</script>
