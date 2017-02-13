/* globals Vue */
(function () {
  var Filter = {};
  Filter.install = (Vue)=>{
    Vue.filter('number', function (value) {
      return parseInt(value);
    });

    Vue.filter('referred', function (value) {
      return value.indexOf('黑龙江') > -1 ? '黑龙江' :value.substr(0,2);
    });
    Vue.filter('date', function (value) {
      return value.substr(0,10);
    });
      Vue.filter('dateTime', function (value) {
          return value ? value.substr(0,value.length-2) : 0;
      });
    Vue.filter('zero', function (value) {
      return  value ? value : ~~value;
    });
      // status:"订单状态", // 0:待付款, 1:待发货, 2:待收货, 3:交易成功
    Vue.filter('orderStatus', function (value) {
      switch (parseInt(value)){
          case 0: return '等待付款';
          case 1: return '等待发货';
          case 2: return '已发货';
          case 3: return '交易成功';
          case 4: return '交易取消';
      }
    });
    Vue.filter('VIPlevel', function (value) {
      switch (parseInt(value)){
          case 0: return '普通会员';
          case 1: return '银级';
          case 2: return '金级';
      }
    });
      Vue.filter('process', function (value) {
      switch (parseInt(value)){
          case 0: return '审核中';
          case 1: return '发放中';
          case 2: return '已发放';
      }
    });
      Vue.filter('Month', function (value) {
          switch (parseInt(value)){
              case 0: return '一月';
              case 1: return '二月';
              case 2: return '三月';
              case 3: return '四月';
              case 4: return '五月';
              case 5: return '六月';
              case 6: return '七月';
              case 7: return '八月';
              case 8: return '九月';
              case 9: return '十月';
              case 10: return '十一月';
              case 11: return '十二月';
          }
      });
    Vue.filter('money', function (value) {
      return  parseFloat(value)
          ? (()=>{
            const str = Math.round(value*100).toString();
            const len = str.length;
            const $1 = str.substring(0,len-2);
            let $2 = str.substring(len-2,len);
            $2 = $2.length == 2 ? $2 :`0${$2}`;
             const format$1 = !$1 ? '0' :  $1.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
            return `${format$1}.${$2}`
          })()
          : (`${~~value}.00`);

    });
  };
  module.exports =  Filter;
})();
