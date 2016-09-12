<style>
    .item { cursor: pointer; }
    .bold {font-weight: bold; }
    ul {  line-height: 1.5em; list-style-type: dot; }
    .choice-input input{margin: auto;height: 32px;width: 300px;display: inherit;}
    .proj-info-bounced .staff-list,.proj-info-bounced .choice-people{height: 350px;width: 50%;float: left;margin: auto;padding: 15px;}
    .proj-info-bounced .staff-list ul,.proj-info-bounced .choice-people ul{display: inline-block;}
    .proj-info-bounced .staff-list{border-right:1px solid #eeeeee; }
</style>
<template>
    <Tool-box></Tool-box>
    <div class="proj-info-bounced">
        <header style="border:0;">
            <p class="pop-title" >
                <em class="in-block pop-close" ></em>
            </p>
        </header>
        <section class="scroll-lst" >
            <div class="choice-input">
                <input type="text" placeholder="查找成员" v-model="searchQuery" >
            </div>
            <div class="staff-list">
                <ul>
                    <Tool-recur
                            class="item"
                            :filter-key="searchQuery"
                            v-for="model in taskInfoGetPerson.result"
                            :model="model"
                            :add="addName">
                    </Tool-recur>
                </ul>
            </div>
            <div class="choice-people">
                <ul >
                    <li v-for='item in nameLst'>
                        {{item}}
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
    import ToolBox from '../public/ToolBox.vue';
    import ToolRecur from'../public/ToolRecur.vue'
    import {taskInfoGetPerson} from '../../getters/taskInfoGetter';
    import {taskInfoGetPersonFun} from '../../actions/taskInfoActions';
    export default{
        components:{
            ToolBox,
            ToolRecur
        },
        data(){
            return{
                nameLst:[],
                searchQuery:''
            }
        },
        vuex: {
            getters: {
                taskInfoGetPerson    //登录后返回的参数

            },
            actions: {  //行为  所有公共的方法 执行请加bouncedFun()
                taskInfoGetPersonFun
            }
        },
        methods:{
            addName(name){
                this.nameLst.push(name);
            },
            sortBy(){

            }
        },
        ready(){
            this.taskInfoGetPersonFun();
        }
    }
</script>
