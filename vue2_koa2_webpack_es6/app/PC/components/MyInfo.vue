
<template>
    <div style="background:white;">
        <Public-table
                :list="list"
        >
        </Public-table>
    </div>
</template>
<script>
    import PublicTable from './public/Public-table.vue';
    import {getUserInfo} from '../getters/myManageGetter'
    import {alterInfoFun,queryUserInfoFun} from '../actions/myManageActions'
    export default{
        components:{
            PublicTable
        },
        vuex:{
            actions:{
                alterInfoFun,
                queryUserInfoFun
            },
            getters:{
                getUserInfo
            }
        },
        data(){
            return{
                list:[
                    {key:'头像',value:this.getUserInfo.logo_url,type:'img'},
                    {key:'会员编号',value:this.getUserInfo.userid},
                    {key:'微信ID',value:this.getUserInfo.openid},
                    {key:'姓名',value:this.getUserInfo.username,url:{name:'alert',params:{key:'username',value:this.getUserInfo.username?this.getUserInfo.username:'false',fun:'alterInfoFun',type:'text'}}},
                    {key:'手机号码',value:this.getUserInfo.mobile,url:{name:'alert',params:{key:'mobile',value:this.getUserInfo.mobile?this.getUserInfo.mobile:'false',fun:'alterInfoFun',type:'tel' }}},
                    {key:'邮箱',value:this.getUserInfo.email,url:{name:'alert',params:{key:'email',value:this.getUserInfo.email?this.getUserInfo.email:'false',fun:'alterInfoFun',type:'email'}}},

                ],
            }
        },
        ready(){
            this.getUserInfo || this.queryUserInfoFun()
        }

    }
</script>
