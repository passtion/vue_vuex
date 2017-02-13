## 公共组件调用说明

### Public-activeTable.vue 公共列表
1. 调用示例
```html
import Active from './public/Public-activeTable.vue';
  <Active
          type="preferential"
          :lst="list">
  </Active>
```
2. 参数说明
```
    lst：需呈现的列表数据
    type: 类型，1. preferential 优惠活动的列表 2.populManage  推广管理的列表
    
```
### Public-box.vue 公共蒙版
1. 调用示例
```html
    import  PublicBox from '../public/Public-box.vue'  
    <Public-box
                :click="hidenFun"
        >
        </Public-box>
```
2. 参数说明
```
    click：蒙版是否具可点击 1. 当启用此字段表示默认不可点击 2.传入clcik时表示可点击    
```

### Public-btn.vue 公共按钮
1. 调用示例
```html
import PublicBtn from './public/Public-btn.vue';
    <Public-btn
                    btn-name="发表评论"
                    :click="click"
                    link=""
                    double=""
                    is-check=""
                    >
            </Public-btn>
```
2. 参数说明
```
    btnName : 按钮名称
    click   : 按钮点击事件，与link 两者存一
    link    : 按钮点击后跳转 与click 两者存一
    double  : 按钮样式二1.按钮样式一默认 2.当为true时按钮样式2
    isCheck :     
```
### Public-errorPop.vue 公共错误弹框
1. 调用示例

```
1. 在views 中vue文件中调用此方法 作为全局公共错误弹窗
    import  PublicErrorPop from '../public/Public-errorPop.vue'
    <Public-error-pop
            >
    </Public-error-pop>
2. 此组建的参数位于位居全局vuex文件夹下对应views中vue文件的文件夹下的states中的publicError
    publicError:{   //错误信息
            show:false,
            msg:'',
            status:'',
        },
3. 使用 vuex文件夹下对应views中vue文件的文件夹下的action方法中的 showError 方法
    const errorMsg = {show:true,msg:rel.err_msg,status:''}
    this.showError(errorMsg);
```
2. 参数说明
```
    show    : 是否显示
    msg     : 错误信息
    status  : 错误编码  
```
### Public-footer.vue 底部选择菜单
1. 调用示例
```
import PublicFooter from './public/Public-footer.vue';
    <Public-footer
            click="2">
    </Public-footer>
```
2. 参数说明
```
    click    : 高亮部分 1，2，3，4   
```
### Public-getOpenId.vue 微信端获取openid
1. 调用示例
```
    import PublicGetOpenId from '../components/public/Public-getOpenId.vue';
    <Public-get-open-id></Public-get-open-id>
```
2. 参数说明
```
     暂无
```
### Public-goTop.vue 返回顶部按钮
1. 调用示例
```
import PublicGoTop from './../../../../../app/PC/components/public/Public-goTop.vue';
    <Public-go-top
          :go-top="backTop"
        >
        </Public-go-top>
```
2. 参数说明
```
    goTop    : 返回顶部方法  
```

### Public-noInfo.vue 列表暂无数据的显示
1. 调用示例
```
    import PublicNoInfo from './public/Public-noInfo.vue'
    <Public-no-info >
    </Public-no-info>
```
2. 参数说明
```
   暂无
```

### Public-proLst.vue 列表暂无数据的显示
1. 调用示例
```
    import PublicProLst from './public/Public-proLst.vue'
    <Public-pro-lst
            :lst="list"
            isChecks=""
            isOrder=""
    ></Public-pro-lst>
```
2. 参数说明
```
   lst: 展示的列表数据
   isChecks ： 是否是方块展示 1.默认列表展示数据 2.方块展示数据
   isOrder : 其他列表 1.当不填时展示默认，2.当写不同值 展示不同列表。做扩展作用
```


### Public-search2.vue 列表暂无数据的显示
1. 调用示例
```
    import search from './public/Public-search2.vue'
    <search
            :lst="list"
            isChecks=""
            isOrder=""
    ></search>
```
2. 参数说明
```
   lst: 展示的列表数据
   isChecks ： 是否是方块展示 1.默认列表展示数据 2.方块展示数据
   isOrder : 其他列表 1.当不填时展示默认，2.当写不同值 展示不同列表。做扩展作用
```

### Public-table.vue 列表暂无数据的显示
1. 调用示例
```
    import search from './public/Public-table.vue'
    <Public-table
            :list="list"
            :isQuery
    >
    </Public-table>
```
2. 参数说明
```
   list: 展示的列表数据
   isQuery ： 1.使用表单展示数据 2.值为什么，就使用什么样的特殊表单展示数据
```
##### [测试用例(暂无)]()
