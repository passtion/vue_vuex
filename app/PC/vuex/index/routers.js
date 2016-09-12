import Login from '../../components/Login.vue';
import ForgetPwd from '../../components/ForgetPwd.vue';
import ProcRecruitment from '../../components/ProcRecruitment.vue';
import noFind from '../../components/404.vue';
import TaskIndex from '../../components/TaskIndex.vue';
import TaskInfo from '../../components/TaskInfo.vue';
export default (router) => router.map(
    {
        '/': {
            name: 'login',
            component: Login
        },
        '/forgetPwd': {
            name: 'forgetPwd',
            component: ForgetPwd
        },
        '/index': {
            name: 'index',
            component: noFind
        },
        '/procRecruitment': {
            name: 'procRecruitment',
            component: ProcRecruitment
        },
        '/taskIndex':{
            name: 'taskIndex',
            component: TaskIndex
            //subRoutes: {
            //    '/taskInfo': {
            //        name: 'taskInfo',
            //        component: TaskInfo
            //    }
            //}
        },
        '/taskIndex/:id':{
            name: 'taskInfo',
            component: TaskInfo
        },
        '*': {
            component: noFind
        }
    }
);

