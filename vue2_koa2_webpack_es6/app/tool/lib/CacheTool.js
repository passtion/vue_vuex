/**
 * Created by pengfeng on 2016/11/15.
 */

export  const localCache = (key=false,value=false) => {
  return  value ? setValue(key,value) : getValue(key)
}

function setValue(key,value){
    let type  = {value:value ,type:'string'};
    Array.isArray(value) && (type ={value:JSON.stringify(value),type:'array'} );
    (typeof value == 'object' &&  !Array.isArray(value)) && (type = {value:JSON.stringify(value),type:'obj'});
    localStorage.setItem(key,JSON.stringify(type));
}

function getValue(key){
    const value = localStorage.getItem(key);
    const obj  = JSON.parse(value);
    return value ? obj.type ==='string ' ? obj.value : JSON.parse(obj.value)  : !!value;

}


