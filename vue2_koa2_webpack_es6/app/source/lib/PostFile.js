/**
 * Created by girl on 16/7/28.
 */
// import '../../tool/lib/FileTool'
// import $ from 'jquery'
// $.ajaxFileUpload({
//     url:"/escar/employee/import",
//     secureuri:false,
//     fileElementId:'Member_headimg',                        //文件选择框的id属性
//     dataType: 'json',
//     date:'',
//     success: function (data) {
//         obj.setState({resulte:data});
//     }
// });


/**
 * Created by girl on 16/5/25.
 */
import core from './core.js';
const fileUpload = (obj,date={},result,contentType,async,fileElementId) => {
    const params ={date:date,contentType:contentType,async:async,fileElementId:fileElementId};
    result && (params.success=result);
    core(obj,params);
}

module.exports =  fileUpload;
