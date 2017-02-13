/**
 * Created by girl on 16/8/24.
 */
var fs = require('fs');
var date = require('./date.js');
date.forEach(function(item){
    var jsName = item.replace(/^\D/,function(word){
        return word.substring(0,1).toLowerCase()+word.substring(1);});
    fs.writeFileSync('getters/'+jsName+'Getter.js','');
    fs.writeFileSync('actions/'+jsName+'Actions.js','');
    fs.writeFileSync('initState/'+jsName+'State.js','');
    fs.writeFileSync('modules/'+jsName+'Modules.js','');
    fs.writeFileSync('mutation/'+jsName+'Mutation.js','');
});
