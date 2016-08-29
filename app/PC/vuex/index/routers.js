import Login from '../../components/Login.vue';
import ForgetPwd from '../../components/ForgetPwd.vue';
import ProcRecruitment from '../../components/ProcRecruitment.vue';
import noFind from '../../components/404.vue';
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
        '*': {
            component: noFind
        }
    }
);

