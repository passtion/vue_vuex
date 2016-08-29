import noFind from '../../components/404.vue';
export default (router) => router.map(
    {
        '/': {
            component: noFind,
            subRoutes:{
                '/':{
                    component: require('../../components/ProcMyTover.vue')
                }
            }
        },
        '*': {
            component: noFind
        }
    }
);


/**
 *  '/': {
        name: 'index',
        component: {
          template: '<router-view></router-view>'
        },
        subRoutes: {
          '/pro': {
            component: require('../../components/ProcMyCharge.vue')
          }
        }
      },
 */

