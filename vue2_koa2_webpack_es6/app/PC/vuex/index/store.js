import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';
import mutations from './mutations';
import state from './states';
import addressModules from '../../modules/addressModules'
import productModules from '../../modules/productModules'
import myManageModules from '../../modules/myManageModules'
import activeModules from '../../modules/activeModules'
Vue.use(Vuex);
/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  middlewares,
  modules: {
    addressModules,
    productModules,
    myManageModules,
    activeModules,
  }
});

