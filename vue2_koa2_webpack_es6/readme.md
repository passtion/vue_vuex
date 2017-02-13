## 说明：
1. 本系统采用koa2，Async/Await做nodeJs中间层，主要作用于接口二次封装，报文转化以及图片上传。
2. 前端页面编码采用vue1.0 + webpack + es6 + vue-router +vux 组成
3. 请使用Node6以上版本，获得更好的性能与ES6支持。
4. koa2启用Babel-es2017，不再对一些Node6已支持的特性转码。纯ES6/7编写，使用koa2的Async/Await，避免回调地狱
5. vue启用Babel-es2015转码。

## 命令
```
1. 下载依赖包
npm i   （推荐安装cnpm） 

2. koa2命令
开发模式： npm run dev
生产模式： node run

3. webpack命令
开发模式： npm run d
生产模式： npm run pcm （生成压缩后的文件）
```
### 生产模式配合Nginx,apache实现反向代理

## 使用
1. 需要具有ES6,ES7基础。
2. 需要具有vue基础
3. 需要具有vuex基础

## 工程说明
```
--- app                 vueWeb页面项目工程目录
    --- PC                     PC项目工程文件（开发主要文件）
        --- actions                  vuex中的actions
        --- base                     直接复制到工程的静态文件
            --- adapter.js              自适应屏幕的文件
            --- es5-sham.min.js         es5转es3文件
            --- es5-shim.min.js         es5转es3文件
            --- MP_verify_iQbIn7gDcmjwYq2A.txt      微信支付的校验文件（公众号处下载）
        --- components               vue页面以及组建
            --- ohters                  其他组建
                --- AddressInfoTab.vue      地址详情tab组建
                --- AdressLst.vue           地址列表tab组建
                --- IndexTab.vue            首页tab组建
                --- MyHoneTab.vue           个人中心tab组建
                --- MyOrderLstItem.vue      订单列表单个Item组建
                --- ProInfoTab.vue          产品详情tab组建
                --- ProRatedLstlily.vue     产品列表侧滑组合搜索组建
                --- ProRatedLstTab.vue      产品评论组建
                --- SortItemTab.vue         分类子模块组建
                --- SortTab.vue             分类tab组建
            --- public                  公共组建
                --- Public-activeTable.vue  公共tab组建
                --- Public-box.vue          阴影蒙版
                --- Public-btn.vue          公共按钮组建，具体用法参照doc
                --- Public-errorPop.vue     公共错误弹窗
                --- Public-footer.vue       公共底部
                --- Public-getOpenId.vue    微信端获取微信ID的组建
                --- Public-goTop.vue        公共跳转组建
                --- Public-noInfo.vue       表单未有数据的公共无数据组建
                --- Public-proLst.vue       公共列表组建
                --- Public-search2.vue      公共搜索框
                --- Public-table.vue        公共table拼接组建
            --- 404.vue                  404页面
            --- ActivePopulManage.vue    推广管理         
            --- ActivePreferential.vue   优惠活动列表
            --- AddressInfo.vue          增加以及修改地址
            --- AddressLst.vue           选择地址
            --- AddressManage.vue        地址管理   
            --- Alter.vue                修改信息
            --- Index.vue                首页
            --- MyBodeRecord.vue         收益纪录   
            --- MyHome.vue               个人中心
            --- MyInfo.vue               个人信息
            --- MyIntegralRecord.vue     积分纪录
            --- MyOrderInfo.vue          我的订单详情
            --- MyOrderLst.vue           我的订单列表
            --- MyRated.vue              我的订单评论
            --- MySign.vue               签到页面
            --- MyVipManage.vue          会员管理页面
            --- MyWinRecord.vue          中奖记录
            --- MyWithdrawal.vue         申请提现页面
            --- MyWithdrawRecord.vue     提现记录
            --- ProInfo.vue              产品详情
            --- ProLst.vue               产品列表
            --- ProPaySucc.vue           支付购买成功页
            --- ProRatedLst.vue          产品评论列表          
            --- ProSort.vue              产品分类
            --- ProSureOrder.vue         确认订单
            --- RaffleDu.vue             大转盘
            --- Search.vue               搜索页面
        --- css                      项目的公共css
            --- 1px.less                 解决1px solid在手机过粗
            --- iconfont.css             图标字体css
        --- demo                     项目的静态demo
        --- font                     项目需用到的字体
        --- getters                  vuex中的getter
        --- htmlJs                   页面入口（多个文件，形成多个页面）
            --- index.js                 index的单页入口
        --- images                   工程中用到的图片
        --- initState                vuex中初始化state
        --- js                       工程中特殊用到的公共方法以及vue扩展
            --- address.json             中国各大省市区
            --- publicParams.js          公共参数（做了本地以及测试环境访问入口）
            --- vue.drag-and-drop.js     扩展的vue拖拽插件
            --- vue.filter.js            扩展的vue过滤器
            --- wx-sdk.js                微信jssdk方法
        --- modules                  vuex中的modules
        --- mutation                 vuex中的mutation
        --- views                    页面views，每一个.vue对应htmlJS中的一个js
        --- vuex                     vuex的入口文件级，每一个文件夹对应htmlJS的一个入口js
        --- data.js                  快速生成模块的列表插件（可快速生成文件）
        --- fs.js                    快速生成对应文件的小工具入口（执行命令： 到对应文件夹下执行 node fs）
    --- rsa                    封装的rsa加密文件夹
    --- source                 封装的ajax数据源文件夹
    --- tool                   封装的工具类文件夹（可扩展)
    --- validate               封装的检验类文件夹 (可扩展)
--- bin                 koa2中间层工程目录
    --- app.js                 koa2工程主要文件
    --- createImage.js         图片压缩保存文件
    --- getToken.js            获取node验证token的定时任务
    --- helper.js              koa2使用的某些tool类方法文件
    --- parameter.js           koa2使用的常量文件
    --- redis.js               访问redis的数据源文件
--- build               生成开发版未压缩页面目录
--- dist                生成生产版压缩后页面目录
--- doc                 项目文档说明
--- templeates          页面模版
--- vux                 vue使用的第三方UI模块
--- package.json        工程依赖包列表
--- run.js              koa2启动文件
--- webPack.config.js   webpack配置文件
```

## 开发流程

### 创建项目
1. 在app文件夹下创建对应项目的文件夹，比如H5，则创建h5的文件夹。并编写相应文件夹以及文件。具体参照PC文件夹结构
2. 在工程目录中packeage.json中编写相应webpack的开发模式命令以及生产模式命令.
```
例如 H5的工程：
    "h5d": "export WEBPACK_DIR=H5&&webpack-dev-server --inline --port 3003 --devtool eval --progress --colors  --content-base build/H5",(修改端口，以及IP)
    "h5m": "export WEBPACK_DIR=H5&&export NODE_ENV=production && ./node_modules/.bin/webpack",
```
3. 进行项目模块，以及页面编码。请参照新增模块流程。

### 新增模块
1. 在data.js 中写入需要创建的模块名，然后执行 fs命令，将会创建对应了getter，actions,initState,modules,mutation名
```
 fs命令:node fs.js
```
2.  在 vuex 文件夹下对应的store.js中将对应的model加入模块
```
 modules: {
     addressModules
   }
```
3. view页面编码，请参照新增页面流程。

### 新增页面
1. 在components根目录下新建新页面的vue
2. 在vuex中对应文件夹中的routers.js中引入对应页面

## linux部署流程

### 安装流程
1.  将工程移植到linux机子上
2.  centos 64位编译安装 glibc-2.14
```
    cd /opt 
    wget http://ftp.gnu.org/gnu/glibc/glibc-2.14.tar.gz
    tar -xzf glibc-2.14.tar.gz
    cd glibc-2.14
    mkdir build
    cd build
    ../configure --prefix=/usr/local/glibc-2.14
    make -j4
    su
    make install
    看看现在libc.so.6在哪个位置，然后修改软链接
    ln -sf /usr/local/glibc-2.14/lib/libc-2.14.so /lib64/libc.so.6
    完成
```
3. 若安装glibc-2.14途中报查找不到gcc,需安装gcc
```
     yum -y install gcc
      yum -y install gcc-c++
```
4.  安装forever后台管理器
```
    npm install forever -gd 
```
5. 进入工程所在目录
```
$ sudo npm install forever -g   #安装
$ forever start app.js          #启动
$ forever stop app.js           #关闭
$ forever start -l forever.log -o out.log -e err.log app.js   #输出日志和错误
```
此时nodejs中间层已经启动

6. 在本机上生成相对应页面放入linux的前置服务器中对应页面（apache，nginx等）

### 210机子对应目录
```
    /workspace/wx_distribution/vue2_koa2_webpack_es6  #nodejs工程目录
    /var/www/html                                     #页面目录
    /workspace/wx_distribution/start.txt              #nodejs启动说明
```

