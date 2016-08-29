<template>
    <Tool-form
        :params="params"
    ></Tool-form>
</template>
<script>
    import ToolForm from '../../components/public/ToolForm.vue';
    import '../../css/bootstrap.css'
    /**
     *[{
     * labelClass: 默认form-group clearfix
     * valueClass: 默认form-control
     * type,  text,file,input,textarea,selection,checkbox,span,table
     * label,
     * value,type =select [{type,value,class}]
     * placeholder, //当类型为input才存在,显示
     * name,
     * double:true,
     * rows     //当类型为textarea才存在,存在合并多少行
     * }]*/
    export default{
        data(){
            return{
                params:[
                    {trClass:'',td:[{type:'text',label:'案例',labelClass:'',textClass:'',typeClass:'',value:'世界第一',name:'test1'},{type:'input',label:'案例',value:'世界第一',name:'test2'}]},
                    {td:[{type:'file',label:'上传照片',name:'test3'}]},
                    {td:[{type:'textarea',label:'文字喻',name:'test4',rows:'4',textClass:'col-sm-10'}]},
                    {td:[{type:'span',label:'文字喻',name:'test5',value:'我是测试'}]},
                    {td:[{type:'checkbox',typeClass:'checkbox-inline',label:'选择想',name:'test6',value:[{text:'123',value:'123'},{text:'456',value:'456'}]}]},
                    {td:[{type:'selection',label:'选择想',name:'test6',value:[{text:'123',value:'123'},{text:'456',value:'456'}]}]}
                ]
            }
        },
        components:{
            ToolForm
        }
    }
</script>
