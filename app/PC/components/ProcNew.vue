<template>
    <crumb t-name="新建流程"></crumb>
    <section v-show="!$route.showCnt" class="new_public_process">
        <ul>
            <li v-for="item in navData">
                <dl>
                    <dt>
                    <h1 class="personnel">{{item.name}}</h1>
                    </dt>
                    <dd v-for="obj in item.childerMenu" v-on:click="$route.showCnt = true">
                        <a v-link="{path:$route.path + obj.route, replace: true}">{{obj.name}}</a>
                    </dd>
                </dl>
            </li>
        </ul>
    </section>
</template>

<script>
    import LeftMenu from './public/LeftMenu.vue';
    import Crumb from './public/Crumb.vue';
    export default{
        data (){
        return {
            navData: []
        }
    },
        components: {
            LeftMenu,
            Crumb
        },
        asyncData: function(resolve, reject){
            let id = this.$route.params.id;
            if(id) {
                let url = startUp.getRootPath() + startUp.adminPath + '/sys/menu/getSecondLevelMenus';
                startUp.postData(url, {id: id}, function(data){
                    resolve({
                        navData:  data.result
                    })
                });
            }
        }
    }
</script>