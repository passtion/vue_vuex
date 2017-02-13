import  {SOURCE} from  '../js/publicParams'
export default {
    // 应用启动时，初始化的state
    queryAddressLst:{//查询地址列表
        source: `${SOURCE}app_delivery_address_list`,
        result:{
            list:[]
        }
    },
    addAddress:{ //增加地址
        source: `${SOURCE}app_delivery_address_add`
    },
    deleteAddress:{//删除地址列表
        source: `${SOURCE}app_delivery_address_del`
    },
    alertAddress:{//修改地址列表
        source: `${SOURCE}app_delivery_address_update`
    },
    setDeafultAddress:{//修改地址列表
        source: `${SOURCE}app_delivery_address_default`
    }
};
