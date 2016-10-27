import Vue from 'vue';
import Router from 'vue-router';
import routers from '../vuex/index/routers';
import index from '../views/index.vue';
import dragAndDrop from '../js/vue.drag-and-drop';
import filter from '../js/vue.filter';
Vue.use(Router);
Vue.use(dragAndDrop);
Vue.use(filter);
var router = new Router({
    linkActiveClass: 'active'
});

routers(router);
router.start(index, '#app');
