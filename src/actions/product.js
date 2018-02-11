import {get,post,postjson,postfrom} from "./BaseAction";
import {host} from "./hostConf";
export const GET_PRODUCT = "GET_PRODUCT";
export const ADD_TEMP_PRODUCT = "ADD_TEMP_PRODUCT";
export const UPDATE_TEMP_PRODUCT = "UPDATE_TEMP_PRODUCT";
export const GET_EVALUATION = "GET_EVALUATION";
export const GET_PRODUCT_COUPONS = "GET_PRODUCT_COUPONS";
export const GET_PRODUCT_SPEC = "GET_PRODUCT_SPEC";
export const DELETE_TEMPPRODUCT_BY_ID = "DELETE_TEMPPRODUCT_BY_ID";
export const DELETE_TEMPPRODUCT='DELETE_TEMPPRODUCT';
export const CHECK_ALL_SHOP = "CHECK_ALL_SHOP";
export const REPLACE_TEMP_PRODUCT = "REPLACE_TEMP_PRODUCT";
export const GET_MEMBERPRODUCT_COUPON = "GET_MEMBERPRODUCT_COUPON";
export const RADIO_CHECK_STATUS = "RADIO_CHECK_STATUS";
export const SET_TLEMENT = "SET_TLEMENT";
export const EMPTY_PRODUCT = "EMPTY_PRODUCT";
export const EMPTY_PRODUCT_SPEC = "EMPTY_PRODUCT_SPEC";
export const EMPTY_EVALUATION = "EMPTY_EVALUATION";
export const CHANGE_PRODUCT_COUPONS = "CHANGE_PRODUCT_COUPONS";
export const ADD_BUY_PRODUCT='ADD_Buy_PRODUCT'
export const UPDATE_BUY_PRODUCT="UPDATE_Buy_PRODUCT"
export const DELETE_BUY_PRODUCT="DELETE_BUY_PRODUCT"
export const GET_SHARE_LIST ="GET_SHARE_LIST"
export const EMPTY_SHARE_LIST="EMPTY_SHARE_LIST"
export const SELECT_TOTAL_PROFIT_AMOUT='SELECT_TOTAL_PROFIT_AMOUT'
export const SHATE_ORDER='SHATE_ORDER'
export const EMPTY_SHARE_ORDER_LIST='EMPTY_SHARE_ORDER_LIST'
export const WITHDRAW_RECORD='WITHDRAW_RECORD'
export const SELECT_WITH_DRAW_RECORD_DETAIL='SELECT_WITH_DRAW_RECORD_DETAIL'

//结算
export function settlement(data, callback=(json)=>{}){
  return postjson(`${host.test_host}imorder/add?platform=1`, data,callback, (json)=>{
    return {
      type : SET_TLEMENT,
      json
    }
  })
}
//清空商品详情

export function emptyProduct(json){
   return {
      type : EMPTY_PRODUCT,
      json
   }
}

//清空商品评价
export function emptyEvaluation(json){
    return{
        type:EMPTY_EVALUATION,
        json
    }
}

//获取商品详情信息
export function getProduct(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/get/${productId}`, data,callback, (json)=>{
    return {
      type : GET_PRODUCT,
      json
    }
  })
}

//商品评价
export function getEvaluation(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}impcomment/list/${productId}`, data,callback, (json)=>{
    return {
      type : GET_EVALUATION,
      json
    }
  })
}

//获取商品详情信息
export function getProductDetails(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/getProductDetail/${productId}`, data,callback, (json)=>{
    return {
      type : GET_PRODUCT,
      json
    }
  })
}

//获取优惠券
export function getProductCoupons(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}coupon/selectProductCoupons/${productId}`, data,callback, (json)=>{
    return {
      type : GET_PRODUCT_COUPONS,
      json
    }
  })
}

//更改优惠券状态

export function changeProductCoupon(data){
    return {
        type : CHANGE_PRODUCT_COUPONS,
        json : data
    }
}

//获取商品属性
export function getProductSpec(productId,data, callback=(json)=>{}){
  return get(`${host.test_host}improduct/getProductSpec/${productId}`, data,callback, (json)=>{
    return {
      type : GET_PRODUCT_SPEC,
      json
    }
  })
}
//清空商品属性
export function emptyProductSpec(json){
	 return {
      type : EMPTY_PRODUCT_SPEC,
      json
   }
}




//获取可使用优惠券
export function getMemberProductCoupons(data, callback=(json)=>{}){
  return postjson(`${host.test_host}coupon/selectMemberProductCoupons`, data,callback, (json)=>{
    return {
      type : GET_MEMBERPRODUCT_COUPON,
      json
    }
  })
}

//更改优惠券选中状态
export function radioCheckStatus(json){
	 return {
      type : RADIO_CHECK_STATUS,
      json
   }
}


//获取 localStorage 数据覆盖 stroe tempProduct
export function repalceTempProduct(json){
	 return {
      type : REPLACE_TEMP_PRODUCT,
      json
   }
}


//保存购物车数据
export function addTempProduct(json){
   return {
      type : ADD_TEMP_PRODUCT,
      json
   }
}
//更新购物车
export function updateTempProduct(json){
	return {
		type:UPDATE_TEMP_PRODUCT,
		json
	}
}
//删除购物车商品
export function deleteTempProductById(json){
	return {
		type:DELETE_TEMPPRODUCT_BY_ID,
		json
	}
}
//批量删除购物车
export function deleteTempProduct(json){
  return {
    type:DELETE_TEMPPRODUCT,
    json
  }
}
//全选或取消选中
export function checkAllShop(json){
	return {
		type:CHECK_ALL_SHOP,
		json
	}
}

//立即购买商品
export function addBuyProduct(json){
   return {
      type : ADD_BUY_PRODUCT,
      json
   }
}
//更新立即购买
export function updateBuyProduct(json){
  return {
    type:UPDATE_BUY_PRODUCT,
    json
  }
}
//清除立即购买数据
export function deleteBuyProduct(){
  return {
    type:DELETE_BUY_PRODUCT
  
  }
}

//获取分享商品列表
export function getShareList(data, callback=(json)=>{}){
  if(data.sortType =='all')
    delete  data.sortType
  return get(`${host.test_host}improduct/listCanShareProduct`, data,callback, (json)=>{
    return {
      type : GET_SHARE_LIST,
      json,
      sortType:data.sortType ||'all'
    }
  })
}

//清除分享商品列表
export function empotyShareList(){
  return {
    type:EMPTY_SHARE_LIST
  }
}

//查询可提现金额
export function selectTotalProfitAmout(data, callback=(json)=>{}){
  return get(`${host.test_host}withdraw/selectTotalProfitAmout`, data,callback, (json)=>{
    return {
      type : SELECT_TOTAL_PROFIT_AMOUT,
      json
    }
  })
}

//分享订单列表
export function getShareOrder(data, callback=(json)=>{}){
  let obj={
    pageSize:data.pageSize,
    pageNow:data.pageNow
  }
  if(data.sortType =='valid_paid')
    obj.status=3
  else if(data.sortType =='valid_received'){
    obj.status=5
  }else if(data.sortType =='valid_closed'){
    obj.status=100
  }else if(data.sortType =='invalid'){
    obj.status=8
  }
  return get(`${host.test_host}shareOrder/list`, obj,callback, (json)=>{
    return {
      type : SHATE_ORDER,
      json,
      sortType:data.sortType
    }
  })
}

//分享订单列表
export function getShareOrder2(data, callback=(json)=>{}){
  return get(`${host.test_host}shareOrder/list`, data,callback, (json)=>{
    return {
      type : '',
    }
  })
}

//清除分享订单列表
export function empotyShareOrderList(){
  return {
    type:EMPTY_SHARE_ORDER_LIST
  }
}


//申请提现
export function addWithdrawRecord(data, callback=(json)=>{}){

  return post(`${host.test_host}withdraw/addWithdrawRecord`, data,callback, (json)=>{
    return {
      type : 'ADD_WITHDRAW_RECORD',
      json

    }
  })
}


//申请提现列表
export function selectWithdrawRecord(data, callback=(json)=>{}){

  return get(`${host.test_host}withdraw/selectWithdrawRecord`, data,callback, (json)=>{
    return {
      type : WITHDRAW_RECORD,
      json

    }
  })
}

// 查询提现记录
export function selectWithdrawRecordDetail(data,callback=(json)=>{}){
  return get(`${host.test_host}withdraw/selectWithdrawRecordDetail/${data.id}`,data,callback,(json)=>{
    return{
      type:SELECT_WITH_DRAW_RECORD_DETAIL,
      json
    }
  })
}