import React from 'react'
import {render} from 'react-dom'
import md5 from './md5'
import * as wx  from './wx'
import AlertLayer from '../components/Alert'



const userAgent =  window.navigator.userAgent
const isIos = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
const isAndroid = userAgent.indexOf('Android') > -1
const isWin = isIos||isAndroid ? false : true // 区分电脑版微信，不是安卓，苹果手机
const isWX = userAgent.indexOf('MicroMessenger') > -1 //isIos||isAndroid ? false : true // 区分电脑版微信，不是安卓，苹果手机

const utils={
  width:window.screen.width,//屏幕宽度
  multiple:window.innerWidth/window.screen.width, //用于计算屏幕高度减去底部高度
	expiration:1000*60*60*24*2,  //过期时间
	md5:md5,
  wx:wx,
  isIos:isIos,
  isAndroid:isAndroid,
  isWin:isWin,
  isWX:isWX,
    //通过class来查找元素
  getElementsClass(classnames){ 
        var classobj= new Array();//定义数组 
        var classint=0;//定义数组的下标 
        var tags=document.getElementsByTagName("*");//获取HTML的所有标签 
       for(var i in tags){//对标签进行遍历  
       if(tags[i].nodeType==1){//判断节点类型 
        if(tags[i].getAttribute("class") == classnames)//判断和需要CLASS名字相同的，并组成一个数组
          {  classobj[classint]=tags[i];  classint++;  }  }  }  
          return classobj;//返回组成的数组  
    }  ,
	// Javascript优化后的加减乘除（解决js浮点数计算bug） begin
  add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
  },
  sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
  },

  mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
  },

  div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
  },
   // Javascript优化后的加减乘除（解决js浮点数计算bug） end

   //过滤表情符
  filterEmoji(str){
    var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
    ];
/*    alert(str.replace(new RegExp(ranges.join('|'), 'g'), ''))
    alert(str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,''))*/
    str=str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')
    return str 
  },
  // 弹框
  showLayer(str){
    let _alert = document.getElementById('layer')
    if(!_alert&&str){
      let div=document.createElement('div')
      div.id = 'layer'
      document.body.appendChild(div)
      _alert = document.getElementById('layer')
      render(<AlertLayer utils={utils} str={str} />,_alert)
    }else{
      if(_alert)_alert.remove()
    }
  }
}

module.exports = utils