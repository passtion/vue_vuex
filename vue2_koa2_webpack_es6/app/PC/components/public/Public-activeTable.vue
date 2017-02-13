<style scoped>
    ul.active {
        width:100%;
        background-color: white;
    }
    ul.active li {
        display: flex;
        display: -webkit-flex;
        width: 100%;
        justify-content: space-between;
        padding: 0.5555555555555556rem 0.37037037037037035rem 0.7407407407407407rem 0.7407407407407407rem;
        /*border-bottom:1px solid #e4e4e4;*/
        font-size: 0.9629629629629629rem;

    }
    ul.active li:last-child{
        border-bottom: 0;
    }
    ul.active li em.active-img{
        display: inline-block;
        height: 4.814814814814815rem;
        width: 4.814814814814815rem;
        border-radius:  0.18518518518518517rem;
        background: center/100% no-repeat transparent;

    }
    ul.active li div.active-info{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-between;
        width: 16.11111111111111rem;
        padding-top: 0.16666666666666666rem;
    }
    ul.active li div.active-info p.content{
        font-size: 0.6666666666666666rem;
        line-height: 0.8148148148148148rem;
        height: 2.45rem;
        word-break: break-all;
        white-space: normal;
        -webkit-line-clamp:3;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #8a8a8a;
    }

</style>
<template>
    <div>
        <ul class="active" v-if="type=='preferential'">
            <li v-for="item in lst" class="vux-1px-b" @click="open(item.link_url)">
                <em class="active-img" :style="'background-image:url('+item.logo_url+')'"></em>
                <div class="active-info">
                    <h3 class="title">{{item.subject}}
                        <span class="sponsor">
                            {{item.owner}}
                        </span>
                    </h3>
                    <p class="content">
                        <span class="time">{{item.s_time | date}}至{{item.e_time | date}}</span><br/>
                        {{item.content}}
                    </p>
                </div>
            </li>
        </ul>
        <ul class="active" v-if="type=='populManage'">
            <li v-for="item in lst" class="vux-1px-b" @click="open(item.link_url)">
                <em class="active-img" :style="'background-image:url('+item.logo_url+')'"></em>
                <div class="active-info">
                    <h3 class="title">{{item.subject}}</h3>
                    <p class="content">{{item.content}} </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        props:['lst','type'],
        methods:{
            open(url){
                window.open(url)
            }

        }

    }
</script>
