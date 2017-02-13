<style>

</style>
<template>
    <alert :show.sync="show" title="" button-text="好的">
        <p style="text-align:center;">{{publicError.msg}}</p>
    </alert>
</template>
<script>
    import  Alert from './../../../../vux/vux/src/components/alert/index.vue'
    import {publicError} from '../../vuex/index/getters';
    import {hideError} from '../../vuex/index/actions';
    export default{
        components:{
            Alert
        },
        data(){
            return{
                show:this.publicError.show
            }

        },
        vuex:{
          getters:{
              publicError
          },
            actions:{
                hideError
            }
        },
        methods:{
          init(){
              this.hideError()
          }
        },
        ready(){
            this.$watch('publicError',()=>{
                this.show = this.publicError.show;
            })
           this.init();
        }

    }
</script>
