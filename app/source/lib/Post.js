/**
 * Created by girl on 16/5/25.
 */
import core from './core.js';

const Post = (obj,date={},result) => {
    const params ={date:date};
    result && (params.success=result);
    core(obj,params);
}

module.exports =  Post;
