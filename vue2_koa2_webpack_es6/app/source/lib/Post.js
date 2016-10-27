/**
 * Created by girl on 16/5/25.
 */
import core from './core.js';

const Post = (obj,date={},result,contentType,async) => {
    const params ={date:date,contentType:contentType,async};
    result && (params.success=result);
    core(obj,params);
}

module.exports =  Post;
