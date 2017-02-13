import AddressLst from '../../components/AddressLst.vue';
import AddressInfo from '../../components/AddressInfo.vue';
import AddressManage from '../../components/AddressManage.vue';
import Index from '../../components/Index.vue';
import MyHome from '../../components/MyHome.vue';
import MyInfo from '../../components/MyInfo.vue';
import ProLst from '../../components/ProLst.vue';
import ProInfo from '../../components/ProInfo.vue';
import ProRatedLst from '../../components/ProRatedLst.vue';
import ProSureOrder from '../../components/ProSureOrder.vue';
import ProPaySucc from '../../components/ProPaySucc.vue';
import Alter from '../../components/Alter.vue';
import MyWinRecord from '../../components/MyWinRecord.vue';
import MyBodeRecord from '../../components/MyBodeRecord.vue';
import MyWithdrawal from '../../components/MyWithdrawal.vue';
import MyWithdrawRecord from '../../components/MyWithdrawRecord.vue';
import MyVipManage from '../../components/MyVipManage.vue';
import MyOrderLst from '../../components/MyOrderLst.vue';
import MyOrderInfo from '../../components/MyOrderInfo.vue';
import MyRated from '../../components/MyRated.vue';
import PopulManage from '../../components/ActivePopulManage.vue';
import Preferential from '../../components/ActivePreferential.vue';
import ProSort from '../../components/ProSort.vue';
import MyIntegralRecord from '../../components/MyIntegralRecord.vue';
import MySign from '../../components/MySign.vue';
import RaffleDu from '../../components/RaffleDu.vue';
import noFind from '../../components/404.vue';
// import Test from '../../components/Test.vue';
export default (router) => router.map(
    {
        '/': {
        name: 'index',
        component: Index
        },
        // '/test': {
        //     name: 'test',
        //     component: Test
        // },
        '/search/:keys': {
            name: 'proLst',
            component: ProLst
        },
        '/alert/:key/:fun/:type/:value': {
            name: 'alert',
            component: Alter
        },
        '/proInfo/:id': {
            name: 'proInfo',
            component: ProInfo
        },
        '/proInfo/:id/sureOrder': {
            name: 'sureOrder',
            component: ProSureOrder
        },
        '/proInfo/:id/rated': {
            name: 'rated',
            component: ProRatedLst
        },
        '/proInfo/:id/sureOrder/succ': {
            name: 'proPaySucc',
            component: ProPaySucc
        },
        '/benefit': {
            name: 'benefit',
            component: Index
        },
        '/classify': {
            name: 'classify',
            component: Index
        },
        '/myHome': {
            name: 'myHome',
            component: MyHome
        },
        '/myWinRecord': {
            name: 'winRecord',
            component: MyWinRecord
        },
        '/myIntegralRecord': {
            name: 'integralRecord',
            component: MyIntegralRecord
        },
        '/bodeRecord': {
            name: 'bodeRecord',
            component: MyBodeRecord
        },
        '/myWithdrawal': {
            name: 'myWithdrawal',
            component: MyWithdrawal
        },
        '/myWithdrawalRates': {
            name: 'myWithdrawalRates',
            component: MyWithdrawRecord
        },
        '/myInfo': {
            name: 'myInfo',
            component: MyInfo
        },
        '/myVipManage/:level': {
            name: 'myVipManage',
            component: MyVipManage
        },
        '/myOrderLst/:type': {
            name: 'myOrderLst',
            component: MyOrderLst
        },
        '/myOrderInfo': {
            name: 'myOrderInfo',
            component: MyOrderInfo
        },
        '/myRated/:productid/:orderid': {
            name: 'myRated',
            component: MyRated
        },
        '/mySign': {
            name: 'mySign',
            component: MySign
        },
        '/addressLst': {
            name: 'AddressLst',
            component: AddressLst
        },
         'addressManage/addressInfo': {
            name: 'AddressInfo',
            component: AddressInfo
        },
        'addressManage/addressInfo/:id': {
            name: 'AlertAddressInfo',
            component: AddressInfo
        },
        '/addressManage': {
            name: 'AddressManage',
            component: AddressManage
        },
        '/populManage': {
            name: 'populManage',
            component: PopulManage
        },
        '/preferential': {
            name: 'preferential',
            component: Preferential
        },
        '/sort': {
            name: 'sort',
            component: ProSort
        },
        '/raffle/:activeInfo': {
            name: 'raffle',
            component: RaffleDu
        },
        '*': {
            component: noFind
        }
    }
);

