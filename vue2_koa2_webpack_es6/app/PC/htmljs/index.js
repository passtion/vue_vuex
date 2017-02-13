import Vue from 'vue';
import Router from 'vue-router';
import routers from '../vuex/index/routers';
import index from '../views/index.vue';
// import vTap from 'v-tap';
// Vue.use(vTap);
import filter from '../js/vue.filter';
import FastClick from'fastclick'
FastClick.attach(document.body)

Vue.use(Router);
Vue.use(filter);

var router = new Router({
    linkActiveClass: 'active'
});

routers(router);
router.start(index, '#app');
