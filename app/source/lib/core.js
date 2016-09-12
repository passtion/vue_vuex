/**
 * Created by girl on 16/5/25.
 */
import $ from 'jquery';
const core = (  obj,{
                    url=obj.props.source,
                    type="POST",
                    date="",
                    dateType='JSON',
                    success=(result)=>{obj.setState({result:result},true)},
                    error=()=>{obj.setState({result:{'message':'请求超时,检查网络','status':'9' }},true)}
                }={}) => {
            for (let key in date){
                date[key] = $.trim(date[key]);
            }

        let otp ={
            'url': url,
            'type':type,
            'data':date,
            'dataType':dateType,
            'error':error,
            'success':success
        };
    //jsop特殊处理
    if(dateType=="JSONP"){
        otp.jsonpCallback="success_jsonpCallback";
        otp.jsonp="callback";
    }
       return $.ajax(otp);
};

module.exports =  core;
