<style>
    ul.rateds-lst{
        background-color: white;
    }
    ul.rateds-lst  li {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        width: 100%;
        padding: .74074074rem;
        border-bottom: solid 1px #e4e4e4;
    }

    ul.rateds-lst  li em.head-img {
        width: 1.7037037rem;
        border-radius: 50%;
        height: 1.7037037rem;
        background: url("../../images/head-test.jpg") center/150% no-repeat transparent;
    }

    ul.rateds-lst li div.rated-content {
        width: 19.074074074074073rem;
        height: auto;
        font-size: 0.9629629629629629rem;

    }

    ul.rateds-lst li div.rated-content p.rated-title {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        height: 1.7037037rem;
        line-height: 1.7037037rem;
    }

    ul.rateds-lst li div.rated-content p.rated-title span.rated-name :after {
        color: #ef1837;
        margin-left: 0.5555555555555556rem;
    }

    ul.rateds-lst li div.rated-content p.rated-title span.rated-time {
        font-size: 0.6666666666666666rem;
        color: #8a8a8a;
    }

    ul.rateds-lst li div.rated-content p.rated-title span.rated-grades.satisfactory-icon {
        color: #8a8a8a;
    }

    ul.rateds-lst li div.rated-content p.rated-info {
        color: #686767;
        line-height: 1rem;
        font-size: 0.7407407407407407rem;
    }

    ul.rateds-lst li div.rated-content p.show-img {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-top: 0.7407407407407407rem;
    }

    ul.rateds-lst li div.rated-content  p.show-img em {
        display: inline-block;
        box-sizing: border-box;
        width: 3.7037037rem;
        height: 3.7037037rem;
        border: 1px solid #f3f3f3;
        border-radius:10px;
        background:url("../../images/pro-test01.jpg") 0/100% transparent no-repeat;
    }

    .satisfactory-icon:before{
        color: #EF1837;
    }
    .rated-name:after{
        color: #EF1837;
        margin-left: 0.42592592592592593rem;
    }
    span.rated-time{
        align-self: center;
    }
</style>
<template>
    <div>

        <ul v-if="isInfo" class="rateds-lst">
            <li style="border:none;padding-bottom:0;" v-if="lst[0]" >
                <em class="head-img" :style="'background-image:url('+lst[0].logo_url+')'"></em>
                <div class="rated-content">
                    <p class="rated-title">
                        <span class="rated-name iconfont badge">{{lst[0].username}}</span>
                        <span class="rated-time">{{lst[0].create_time | date}}</span>
                        <span class="rated-grades">
                            <span v-for="item in five" class="iconfont {{item<lst[0].ssi ? 'satisfactory-icon' : 'no-grade-icon'}}"></span>

                        </span>
                    </p>
                    <p class="rated-info">{{lst[0].content}}</p>
                    <p class="show-img" v-if="lst[0].comment_logo">
                        <em  :style="'background-image:url('+lst[0].comment_logo+')'"></em>
                    </p>
                </div>
            </li>
        </ul>
        <ul v-else class="rateds-lst">
            <li v-for="it in lst">
                <em class="head-img" :style="'background-image:url('+it.logo_url+')'"></em>
                <div class="rated-content">
                    <p class="rated-title">
                        <span class="rated-name iconfont badge">{{it.username}}</span>
                        <span class="rated-time">{{it.create_time | date}}</span>
                        <span class="rated-grades">
                            <span v-for="item in five" class="iconfont {{item<it.ssi ? 'satisfactory-icon' : 'no-grade-icon'}}"></span>
                        </span>
                    </p>
                    <p class="rated-info">{{it.content}}</p>
                    <p class="show-img" v-if="it.comment_logo">
                        <em :style="'background-image:url('+it.comment_logo+')'"></em>
                    </p>
                </div>
            </li>
        </ul>

    </div>
</template>
<script>

    export default{
        props:['isInfo','resetSco',"lst"],
        data(){
            return{
                five:5
            }
        },

    }
</script>
