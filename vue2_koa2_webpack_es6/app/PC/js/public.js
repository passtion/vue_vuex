/**
 * Created by pengfeng on 2017/2/6.
 */
export function getOrderType(value){
    switch (parseInt(value)){
        case 0: return '等待付款';
        case 1: return '等待发货';
        case 2: return '已发货';
        case 3: return '交易成功';
        case 4: return '交易取消';
    }
}
