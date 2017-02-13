/**
 * Created by girl on 16/5/25.
 */
import $ from 'jquery';
import  '../../tool/lib/FileTool';
const core = (  obj,{
                    url=obj.props.source,
                    async,
                    type="POST",
                    fileElementId=false,
                    date={},
                    dateType='JSON',
                    contentType='application/x-www-form-urlencoded',
                    success=(result)=>{obj.setState({result:result},true)},
                    error=()=>{obj.setState({result:{'message':'请求超时,检查网络','status':'9' }},true)}
                }={}) => {
        let otp ={
            'url': url,
            'type':type,
            'data':date,
            'async':async,
            'dataType':dateType,
            'contentType':contentType,
            'error':error,
            'success':success
        };
    //jsop特殊处理
    if(dateType=="JSONP"){
        otp.jsonpCallback="success_jsonpCallback";
        otp.jsonp="callback";
    }

    if( typeof fileElementId == 'String' ){
        otp.secureuri = false;
        otp.type = null;
        otp.fileElementId = fileElementId;
       return $.ajaxFileUpload(otp);
    }else if(fileElementId){
        const formdata = new FormData();
        formdata.append('data', date)
        formdata.append('blob',fileElementId)
        otp.processData=false;
        otp.contentType=false;
        otp.dataType=false;
        otp.data=formdata;
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', obj.props.source, true);
        // xhr.send(formdata);
        // return ;
    }
    return $.ajax(otp);



};

module.exports =  core;
