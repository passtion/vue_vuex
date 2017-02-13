## 请求方法详细说明

1. 调用示例
```
    validateAndSubmit({
            dispatch: dispatch,
            getState: state,
            loadFlg:true,//loading状态
            validates: [
                {'name': 'seqid'},
                {'name': 'province'},
                {'name': 'city'},
                {'name': 'area'},
                {'name': 'address', 'rules': [{'rule': 'isEmpty', 'errorMsg': `地址不能为空`}]},
                {'name': 'is_default'},
                {'name': 'receiver' , 'rules': [{'rule': 'isEmpty', 'errorMsg': `姓名不能为空`}]},
                {'name': 'mobile', 'rules': [{'rule': 'isEmpty', 'errorMsg': `手机好不能为空`}]}
            ],
            moreParams:params,
            result:(res)=>{
                if(res.status== 200)  {
                    alterAddressInCacheFun({dispatch:dispatch},{params:params2})
                    backFun({dispatch:dispatch})
                }
            },
            componentLst: ['addressModules', 'alertAddress']
        })
```
2. 参数说明
```
     dispatch      redux dispatch方法
     getState      json  继承redux中的states
     submitType    String 提交类型GET,POST
     moreParams    json格式 更多的参数params 
     isCheck       boolean 只需要校验,默认false,为false只校验提交,不提交 如果为true 校验通过整个函数返回为json且不提交
     loadFlg       boolean 是否显示加载标志 显示为true，默认不现实加载标志
     componentLst  Arrar  数据所在 redux中的states位置，并且请求接口名也写入state 
     result        function 返回后的数据处理的方法
     contentType   String  默认application／json
     fileElementId 当fileElementId为true时，表示文件上传。为file input的id 
     validates     array 校验类 填写时在请求之前根据name校验数据的规则。规则不通过时自动弹窗报错，通过时则返回一个json格式的数据，参考调用示例
         [
             {
               name:      String  input标签的name，成功时默认以此name作为提交params中json的key
               paraName : String  成功时返回json中的key,不填此项则以"name"为key
               checkName: String  另外一个input标签的name,主要用于密码一致性对比
               isParam:   boolean 是否在返回json中包含此项，默认为false 为false时，检验成功的json中不包含此项，繁殖则包含。
               checkClass:String 选择的一项  当多项选择时将以此class标志作为用户选择的一项
               rules:     Arrary  此值的校验规则
                    【{'rule':String 校验规则 扩展详见 validate中的rule.js
                       'errorMsg' String 校验不通过时返回的提示信息
                         
                       }】
             }
         ]
```
