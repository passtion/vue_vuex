<template>
    <ul class="m-nav g-fl">
        <li class="" v-for="item in navData" :click="HeadTabsClick($index)">
            <a v-link="{path:item.route}">
                <i class="u-icon u-icon-u{{ $index + 1 }}"></i>{{ item.name }}
            </a>
        </li>
    </ul>
</template>
<script>

    import { HeadTabsClick } from '../../actions/HeadAction';
    export default {
        data: function () {
            return {
                navData: [],
                curRoute: '/process' // 默认项
            }
        },
        ready: function () {
            this._getData(undefined, true);
            // 路由带的父菜单index
            let     path = this.$route.path,
                    res = path.match(/^\/\w+/);

            this.curRoute = !res ? this.curRoute : res[0];
        },
        vuex: {
            actions: {
                HeadTabsClick: HeadTabsClick
            }
        },
        methods: {
            _getData: function (pId, isNav) {
                let vm = this;
                if (pId || isNav) {
                    let url = startUp.getRootPath() + startUp.adminPath + '/sys/menu/getMenus';
                    startUp.postData(url, {pId: pId}, function (data) {
                        if (isNav) {
                            let arr = data.result;
                            for (let i = 0, len = arr.length; i < len; i++) {
                                let temp = arr[i];
                                if (!temp.route || temp.route == '/setting') continue;

                                if (temp.route == vm.curRoute)
                                    vm._getData(temp.id);

                                vm.navData.push(temp);
                            }
                        } else {
                            // 派发事件
                            vm.$dispatch('change-menus', {
                                'list': data.result,
                                'message': data.message
                            });
                        }
                    });
                }
            }
        }
    }
</script>
