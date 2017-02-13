<style scoped>
    div.raffle-active {
        background-color: #ef1837;
    }

    div.raffle-active .raffle-title {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        height: 15.27777777777778rem;
    }

    div.raffle-active .raffle-title .raffle-content {
        height: 16.666666666666668rem;
        width: 16.666666666666668rem;
        border-radius: 50%;
        background-image: url(../images/turnplate-bg.png);
        background-size: 100% 100%;

    }

    /* 大转盘样式 */
    .banner {
        display: block;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .banner .turnplate {
        display: block;
        width: 100%;
        position: relative;
    }

    .banner .turnplate canvas.item {
        width: 100%;
    }

    .banner .turnplate img.pointer {
        position: absolute;
        width: 4.444444444444445rem;
        height: 6.944444444444445rem;
        left: 40.4%;
        top: 23.6%;
    }

    .banner .turnplate img.shadow {
        width: 9.74074074074074rem;
        position: absolute;
        left: 28%;
        top: 106%;
    }
    div.raffle-info{
        padding: 0 0.7407407407407407rem;
    }
    div.raffle-info section{
        font-size: 0.48148148148148145rem;
        color: #000000;
        margin-top: 1.0185185185185186rem;
    }
    div.raffle-info section h3{
        color: #ef1837;
        font-size: 0.6666666666666666rem;
        margin-bottom: 0.7962962962962963rem;
    }
    div.raffle-info section p {
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        padding: 0 0.7407407407407407rem;
    }
    div.raffle-info section p span{
        margin-left: 1.1rem;
        margin-bottom: .5rem;
    }

</style>
<template>
    <div style="background-color: white; min-height:100vh;">
        <div class="raffle-active banner">
            <img width="100%" src="../images/raffle-head.png" style="padding-bottom:1.1111111111111112rem;">
            <div class="raffle-title turnplate">
                <div class="raffle-content">
                    <canvas id="wheelcanvas" class="item" width="422px" height="422px"></canvas>
                    <img class="pointer" @touchstart="rateClick" src="../images/turnplate-pointer.png"/>
                    <img class="shadow" src="../images/turnplate-shadow.png"/>
                </div>
            </div>
        </div>
        <img width="100%" src="../images/turnplate-bottom.png">
        <div class="raffle-info ">
            <section>
                <h3>游戏奖品</h3>
                <p >
                    <span v-for="item in activeList">{{item}}</span>
                </p>
            </section>
            <section>
                <h3>1.游戏活动</h3>
                <p>至 {{activeInfo.valid_date}}   </p>

            </section>
            <section style="padding-bottom: 1.0185185185185186rem;">
                <h3>2.游戏说明</h3>
                <p>{{activeInfo.active_name}}</p>
            </section>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import  '../../tool/lib/JQRotateTool'
    import {activeDoFun} from '../actions/activeActions'
    import {showError} from '../vuex/index/actions'
    export default{
        vuex:{
            actions:{
                activeDoFun,
                showError
            }
        },
        data(){
            return {
                activeInfo:JSON.parse(this.$route.params.activeInfo),
                activeList:[],
                turnplate: {
                    restaraunts: [],				//大转盘奖品名称
                    colors: [],					//大转盘奖品区块对应背景颜色
                    outsideRadius: 192,			//大转盘外圆的半径
                    textRadius: 155,				//大转盘奖品位置距离圆心的距离
                    insideRadius: 68,			//大转盘内圆的半径
                    startAngle: 0,				//开始角度
                    bRotate: false				//false:停止;ture:旋转
                }
            }
        },
        methods: {
            init(){
                this.proList();
                this.drawRouletteWheel();
            },
            proList(){
                let i =1;
                for(let key in this.activeInfo){
                    const key = `prizeid${i}`;
                    const value = this.activeInfo[key];
                    if(value) {
                        this.activeList.push(`${this.MathInChina(i)}等奖:${value}`);
                        this.turnplate.restaraunts.push(`${this.MathInChina(i)}等奖`,'谢谢参与')
                        this.turnplate.colors.push('#FFFFFF','#FFF4D6')
                    }else {
                        return ;
                    }
                    i++;
                }
            },
            MathInChina(i){
                switch(i){
                    case 1:  return'一';
                    case 2:  return'二';
                    case 3:  return'三';
                    case 4:  return'四';
                    case 5:  return'五';
                    case 6:  return'六';
                    case 7:  return'七';
                }
            },
            rotateTimeOut(){
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: 2160,
                    duration: 8000,
                    callback:  () =>{
                        alert('网络超时，请检查您的网络设置！');
                    }
                });
            },
            //旋转转盘 item:奖品位置; txt：提示语;
            rotateFn(item, txt){
                var angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2));
                if (angles < 270) {
                    angles = 270 - angles;
                } else {
                    angles = 360 - angles + 270;
                }
                $('#wheelcanvas').stopRotate();
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: angles + 1800,
                    duration: 8000,
                    callback:  ()=>{
                        const errorMsg = {show:true,msg:txt,status:''};
                        this.turnplate.bRotate = false;
                        return this.showError(errorMsg);
                    }
                });
            },
            rateClick(){
                if (this.turnplate.bRotate)return;
                this.activeDoFun({params:{activeid:this.activeInfo.activeid},result:(res)=>{
                    if(res.status !='200'){
                        this.turnplate.bRotate=false;
                        const errorMsg = {show:true,msg:res.info,status:''}
                        return this.showError(errorMsg);
                    }
                    const num = (res.result-1)*2+1;
                    const item = num<0 ? 2 : num ;
                    this.turnplate.bRotate = !this.turnplate.bRotate;
                    this.rotateFn(item, num<0 ? this.turnplate.restaraunts[item - 1] : this.activeList[res.result-1]);
//                    console.log(item);
                }});
                //获取随机数(奖品个数范围内)
//                var item = this.rnd(1, this.turnplate.restaraunts.length);
                //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]

            },
            rnd(n, m){
                var random = Math.floor(Math.random() * (m - n + 1) + n);
                return random;

            },
            drawRouletteWheel() {
                var canvas = document.getElementById("wheelcanvas");
                if (canvas.getContext) {
                    //根据奖品个数计算圆周角度
                    var arc = Math.PI / (this.turnplate.restaraunts.length / 2);
                    var ctx = canvas.getContext("2d");
                    //在给定矩形内清空一个矩形
                    ctx.clearRect(0, 0, 422, 422);
                    //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                    ctx.strokeStyle = "#FFBE04";
                    //font 属性设置或返回画布上文本内容的当前字体属性
                    ctx.font = '16px Microsoft YaHei';
                    for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
                        var angle = this.turnplate.startAngle + i * arc;
                        ctx.fillStyle = this.turnplate.colors[i];
                        ctx.beginPath();
                        //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                        ctx.arc(211, 211, this.turnplate.outsideRadius, angle, angle + arc, false);
                        ctx.arc(211, 211, this.turnplate.insideRadius, angle + arc, angle, true);
                        ctx.stroke();
                        ctx.fill();
                        //锁画布(为了保存之前的画布状态)
                        ctx.save();

                        //----绘制奖品开始----
                        ctx.fillStyle = "#E5302F";
                        var text = this.turnplate.restaraunts[i];
                        var line_height = 17;
                        //translate方法重新映射画布上的 (0,0) 位置
                        ctx.translate(211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius);

                        //rotate方法旋转当前的绘图
                        ctx.rotate(angle + arc / 2 + Math.PI / 2);

                        /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                        if (text.indexOf("M") > 0) {//流量包
                            var texts = text.split("M");
                            for (var j = 0; j < texts.length; j++) {
                                ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
                                if (j == 0) {
                                    ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                                } else {
                                    ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                                }
                            }
                        } else if (text.indexOf("M") == -1 && text.length > 6) {//奖品名称长度超过一定范围
                            text = text.substring(0, 6) + "||" + text.substring(6);
                            var texts = text.split("||");
                            for (var j = 0; j < texts.length; j++) {
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                            }
                        } else {
                            //在画布上绘制填色的文本。文本的默认颜色是黑色
                            //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                        }

                        //添加对应图标
//                        if (text.indexOf("闪币") > 0) {
//                            var img = document.getElementById("shan-img");
//                            img.onload = function () {
//                                ctx.drawImage(img, -15, 10);
//                            };
//                            ctx.drawImage(img, -15, 10);
//                        } else if (text.indexOf("谢谢参与") >= 0) {
//                            var img = document.getElementById("sorry-img");
//                            img.onload = function () {
//                                ctx.drawImage(img, -15, 10);
//                            };
//                            ctx.drawImage(img, -15, 10);
//                        }
                        //把当前画布返回（调整）到上一个save()状态之前
                        ctx.restore();
                        //----绘制奖品结束----
                    }
                }
            },
        },
        ready(){
            this.init();
        }
    }
</script>
