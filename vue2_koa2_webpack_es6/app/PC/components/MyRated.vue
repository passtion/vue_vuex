<style scoped>
    ul.rateds-list {
        background-color: white;
    }

    ul.rateds-list li {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        width: 100%;
        padding: .74074074rem;
    }

    ul.rateds-list li div.rated-content {
        width: 100%;
        height: auto;
        font-size: 0.9629629629629629rem;

    }

    ul.rateds-list li div.rated-content textarea.rated-info {
        color: #686767;
        line-height: 1rem;
        min-height: 4.888888888888889rem;
        font-size: 0.7407407407407407rem;
        width: 100%;
        outline: none;
        word-wrap: break-word;
        word-break: normal;
        white-space: normal;
        resize: none;
        border:0;
    }

    ul.rateds-list li div.rated-content p.show-img {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    ul.rateds-list li div.rated-content p.show-img em {
        display: inline-block;
        box-sizing: border-box;
        width: 3.7037037rem;
        height: 3.7037037rem;
        border: 1px solid #f3f3f3;
        border-radius: 10px;
        background: 0/100% transparent no-repeat;
    }

    ul.rateds-list li div.rated-content p.show-img em.add-img {
        border: 0;
        border-radius: 0;
        color: #f3f3f3;
        font-size: 3.7037037rem;
        line-height: 3.7037037rem;
        text-align: center;
        font-style: normal;
    }
    #fileImg{
        opacity: 0;
        width: 3.7037037rem;
        height: 3.7037037rem;
        position: absolute;
        left: .74074074rem;
    }

    ul.rateds-list li div.rated-content p.rated-title {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        height: 1.7037037rem;
        line-height: 1.7037037rem;
    }

    ul.rateds-list li div.rated-content p.rated-title span.rated-name :after {
        color: #ef1837;
        margin-left: 0.5555555555555556rem;
    }

    ul.rateds-list li div.rated-content p.rated-title span.rated-time {
        font-size: 0.6666666666666666rem;
        color: #8a8a8a;
    }

    ul.rateds-list li div.rated-content p.rated-title span.rated-grades.satisfactory-icon {
        color: #8a8a8a;
    }
</style>
<template>
    <div>
        <ul class="rateds-list">
            <li class="vux-1px-b">
                <div class="rated-content">
                    <textarea  class="rated-info" v-model="params.content" placeholder="亲，说点什么吧...">
                    </textarea>
                    <p class="show-img">
                        <em v-if="imgUrl" :style="'background-image:url('+imgUrl+')'" >
                        </em>
                        <em v-else class="add-img add-icon iconfont"  >
                        </em>
                        <input id="fileImg" name="fileImg"  type="file" @change="addImg($event)" accept="image/*"  />
                    </p>
                </div>
            </li>
            <li class="vux-1px-b">
                <div class="rated-content">
                    <p class="rated-title">
                        <span class="rated-name ">满意度</span>
                        <span class="rated-grades">
                        <span v-for="(item,i) in five" @touchstart="howStar(i)"
                              class="iconfont {{item<params.ssi ? 'satisfactory-icon' : 'no-grade-icon'}}">
                        </span>
                    </span>
                    </p>
                </div>
            </li>
        </ul>
        <Public-btn
                btn-name="发表评论"
                :click="click">
        </Public-btn>
            <input type="hidden" :value="params.productid" name="productid" />
            <input type="hidden" :value="params.productid" name="orderid" />
            <input type="hidden" :value="params.content" name="content" />
            <input type="hidden" :value="params.ssi" name="ssi" />
            <input type="hidden" :value="params.img" name="img" />
            <input type="hidden" :value="" name="logo_img" />

    </div>
</template>
<script>
    import PublicBtn from './public/Public-btn.vue';
    import lrz from 'lrz';
    import {submitRated} from './../actions/myManageActions';
    import $ from 'jquery'
    import '../../tool/lib/FileTool'

    export default{
        components: {
            PublicBtn
        },
        vuex:{
            actions:{
                submitRated
            }
        },
        data(){
            return {
                five: 5,
                blob:null,
                imgUrl:'',
                params: {
                    productid: this.$route.params.productid,
                    orderid: this.$route.params.orderid,
                    content: "",
                    ssi: 0, // 1-5
                    img: "", //非NodeJS调用时需要传入此参数，否则不传入
                    logo_img: ""
                }
            }
        },
        methods: {
            howStar(i){
                const index = i + 1;
                this.params.ssi = index;
            },

            click(){
                this.submitRated({blob:this.blob,result:(res)=>{
                    if(res.status == 200){
                        history.go(-1);
                    }
                }})
            },
            addImg(e){
                lrz(e.target.files[0], {
//                    width: 200
                }).then((rst)=> {
                    this.imgUrl = rst.base64;
                    const baseArr = rst.base64.split(',');
                    const byteString = window.atob(baseArr[1]);
                    const fileType = baseArr[0].replace('data:','').replace(';base64','')
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                   this.blob = new Blob([ab],{type:fileType});
                });
            },
            sub(){
                 $.ajaxFileUpload({
//                     url:"http://localhost:10000/files",
                     url:"/doAction/app_product_comment_add",
                     secureuri:false,
                     fileElementId:'fileImg',                        //文件选择框的id属性
                     dataType: 'json',
                     date: '',
                     success: function (data) {
                         alert(JSON.stringify(data))
                     }
                 });
            }
        },
        ready(){

        }
    }
</script>
