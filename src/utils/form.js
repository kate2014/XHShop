

import fetch from 'isomorphic-fetch'
import {storage} from "./tools"



module.exports = (url,data,callback)=>{
  var headers = new Headers();
  headers.append('token',storage.get("token"))
  return (function(url,data){
 
     let formData = new FormData();
      for (var key in data){
          formData.append(key, data[key]);
      }
     /* let file = {url: data.path, type: 'application/octet-stream', name: 'image.jpg'};
      formData.append("file", file);*/
    return fetch(url,{
      method: 'POST',
      credentials: 'same-origin',
      headers:{
      
        'token':storage.get("token")
      },
      body:formData
    })
    .then((res)=>{
      /*if(res.ok){
        return res.json();
      }else{
        return {};
      }*/
      return res.json();
    })
    .then((res)=>{
      callback(res)
      //return res;
    })
    .catch(function(err) {
      alert('error----'+err)
      // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
  });
  })(url,data)
  
}