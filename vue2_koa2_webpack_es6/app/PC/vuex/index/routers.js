import AddressLst from '../../components/AddressLst.vue';
import AddressInfo from '../../components/AddressInfo.vue';
import AddressManage from '../../components/AddressManage.vue';
import noFind from '../../components/404.vue';
export default (router) => router.map(
    {
        '/': {
            name: 'AddressLst',
            component: AddressLst
        },
         '/AddressInfo': {
            name: 'AddressInfo',
            component: AddressInfo
        },
        '/AddressManage': {
            name: 'AddressManage',
            component: AddressManage
        },
        // ,
        // '/forgetPwd': {
        //     name: 'forgetPwd',
        //     component: ForgetPwd
        // },
        // '/index': {
        //     name: 'index',
        //     component: noFind
        // },
        // '/procRecruitment': {
        //     name: 'procRecruitment',
        //     component: ProcRecruitment
        // },
        // '/taskIndex':{
        //     name: 'taskIndex',
        //     component: TaskIndex
        //     //subRoutes: {
        //     //    '/taskInfo': {
        //     //        name: 'taskInfo',
        //     //        component: TaskInfo
        //     //    }
        //     //}
        // },
        // '/taskIndex/:id':{
        //     name: 'taskInfo',
        //     component: TaskInfo
        // },
        '*': {
            component: noFind
        }
    }
);

