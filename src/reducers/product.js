import {
    GET_PRODUCT,
    ADD_TEMP_PRODUCT,
    UPDATE_TEMP_PRODUCT,
    GET_EVALUATION,
    GET_PRODUCT_COUPONS,
    GET_PRODUCT_SPEC,
    DELETE_TEMPPRODUCT_BY_ID,
    DELETE_TEMPPRODUCT,
    CHECK_ALL_SHOP,
    REPLACE_TEMP_PRODUCT,
    GET_MEMBERPRODUCT_COUPON,
    RADIO_CHECK_STATUS,
    EMPTY_PRODUCT,
    EMPTY_PRODUCT_SPEC,
    EMPTY_EVALUATION,
    CHANGE_PRODUCT_COUPONS,
    ADD_BUY_PRODUCT,
    UPDATE_BUY_PRODUCT,
    DELETE_BUY_PRODUCT,
    GET_SHARE_LIST,
    EMPTY_SHARE_LIST,
    SELECT_TOTAL_PROFIT_AMOUT,
    SHATE_ORDER,
    EMPTY_SHARE_ORDER_LIST,
    WITHDRAW_RECORD,
   SELECT_WITH_DRAW_RECORD_DETAIL
   

} from '../actions/product'

import {storage} from '../utils/tools';
import immutable, { fromJS } from 'immutable'

const initialState = {
    code: -1,
    data:{
        comments:[],
        productBean: {
            bannelImg1: "",
            bannelImg2: "",
            bannelImg3: "",
            bannelImg4: "",
            bannelImg5: "",
            name: "",
            details: ""
        },
        skus:[],
        supplier:{}
    },
    message: "初始数据"
};

export function productDetails(state = initialState, action) {
    let json = action.json;
    switch (action.type) {
        case GET_PRODUCT:
            return Object.assign({}, state, json);
        case EMPTY_PRODUCT:
            return initialState
        default:
            return state
    }
}

/*
 *
 */
export function tempProduct(state = [], action) {
    let json = action.json;
    switch (action.type) {
        case REPLACE_TEMP_PRODUCT:
            state = json;
            return [].concat(state);
        case ADD_TEMP_PRODUCT:
            Object.assign(json, {check: true})
            storage.setObj({
                cart: [].concat(state, json)
            })
            return [].concat(state, json);

        case UPDATE_TEMP_PRODUCT:
            let {id, check, amount, skuId, specDetail} = json;
            let tem = state.filter(item => item.imProductId == id && item.skuId == skuId)
            tem[0].amount = amount;
            tem[0].check = check;
            tem[0].skuId = skuId || '';
            tem[0].specDetail = specDetail || '';
            storage.setObj({
                cart: [].concat(state)
            })
            return [].concat(state);

        case DELETE_TEMPPRODUCT_BY_ID:
            let temData;
            if (json.skuId == '' || !json.skuId) {
                temData = state.filter(item => item.imProductId != json.id)
                
            } else {
               temData = state.filter(item => (item.imProductId == json.id  && item.skuId !=json.skuId) || item.imProductId != json.id) 
            }
            storage.setObj({
                cart: [].concat(temData)
            })
            return [].concat(temData);
        case DELETE_TEMPPRODUCT:
            state=state.filter(item => !item.check)
            storage.setObj({
                cart: state
            })
            return state;

        case CHECK_ALL_SHOP:
            state.map(item => {
                if (json.type === item.productType) {
                    Object.assign(item, {check: json.check})
                }
            })
            storage.setObj({
                cart: [].concat(state)
            })
            return [].concat(state);

        default:
            return state
    }
}

const evaluationinint = {
    code: -1,
    data: {
        datas: [],
        totalPage: 0,
        totalRecord: 0

    },
    message: "初始数据"
}

export function evaluation(state = evaluationinint, action) {
    let json = action.json;
    switch (action.type) {
        case GET_EVALUATION:
            return Object.assign({}, {
                data: {
                    pageOffset: json.data.pageOffset,
                    pageSize: json.data.pageSize,
                    totalPage: json.data.totalPage,
                    totalRecord: json.data.totalRecord,
                    datas: [].concat(state.data.datas, json.data.datas)
                }
            }, {code: json.code});
        case EMPTY_EVALUATION:
            return evaluationinint
        default:
            return state
    }
}

const inintProductCoupons = {
    code: -1,
    data: []
}
export function productCoupons(state = inintProductCoupons, action) {
    let json = action.json;
    switch (action.type) {
        case GET_PRODUCT_COUPONS:
            return Object.assign({}, state, json);
        case CHANGE_PRODUCT_COUPONS:
            state.data.map(item => {
                if (item.id == json.id) {
                    item.hasGet = 1
                }
            })
            return Object.assign({}, state);
        default:
            return state
    }
}

export function productspec(state = {code: -1, data: []}, action) {
    let json = action.json;
    switch (action.type) {
        case GET_PRODUCT_SPEC:
            return Object.assign({}, state, json);
        case EMPTY_PRODUCT_SPEC:
            return {code: -1, data: []}
        default:
            return state
    }
}

export function memberProductCoupons(state = {code: -1, data: {invalidList: [], validList: []}}, action) {
    let json = action.json;
    if(!json) return state
    if(!json.data) return state
    switch (action.type) {
        case GET_MEMBERPRODUCT_COUPON:
                json.data.validList = json.data.validList || [];
                json.data.invalidList = json.data.invalidList || [];
                json.data.validList.map((item, id) => {
                    if (id == 0) {
                        item.check = true
                    } else {
                        item.check = false
                    }

                })
                return Object.assign({}, state,
                    Object.assign({
                        data: {
                            invalidList: json.data.invalidList,
                            validList: json.data.validList
                        },
                        code: json.code
                    })
                );
           

        case RADIO_CHECK_STATUS:
            state.data.validList.map(item => {
                if (item.id === json.id) {
                    item.check = !item.check
                } else {
                    item.check = false
                }
            })

            return Object.assign({}, state)
        default:
            return state
    }
}

//立即购买商品
export function buyProduct(state = [], action) {
    let json = action.json;
    switch (action.type) {
        case ADD_BUY_PRODUCT:
            storage.setObj({
                buyCart: [].concat(json)
            })
            return [].concat(json);
        case UPDATE_BUY_PRODUCT:
            let {id, check, amount, skuId, specDetail} = json;
            let tem = state.filter(item => item.imProductId == id && item.skuId == skuId)
            tem[0].amount = amount;
            tem[0].check = check;
            tem[0].skuId = skuId || '';
            tem[0].specDetail = specDetail || '';
            storage.setObj({
                buyCart: [].concat(state)
            })
            return [].concat(state);
        case DELETE_BUY_PRODUCT:
            storage.setObj({
                buyCart: []
            })
            return []
        default:
            let buyCart=storage.get('buyCart')||[]
            state = state.length==0? buyCart:state
            return state
    }
}


const inintShare = fromJS({
    all: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    ascCommission: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    descCommission: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
     ascPrice: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
     descPrice: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    cost: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
})


export function shareGoodsforCommission(state=inintShare, action) {
    let json = action.json;
    let sortType= !action.sortType?'all':action.sortType
    switch (action.type) {
        case GET_SHARE_LIST:
            let result=state.toJS()
            result=result[sortType]
            if(json.data.pageOffset == result.data.pageOffset){
                return state
            }
            
            result.data={
                pageOffset:json.data.pageOffset,
                pageSize:json.data.pageSize,
                totalPage:json.data.totalPage,
                totalRecord:json.data.totalRecord,
                datas:[].concat(result.data.datas,json.data.datas||[])
            }
            result.code=json.code
            let _state={...state.toJS(),[sortType]:result}
            return fromJS(_state)
            
        case EMPTY_SHARE_LIST:
            return inintShare
           
        default:
          return state ;
    }
}

export function totalProfitAmout(state={code:-1,data:{}},action){
    let json = action.json;
    switch (action.type){
        case SELECT_TOTAL_PROFIT_AMOUT:
            return json;
        default:
            return state
    }
}

const inintShareOrder = fromJS({
    all: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        },
        index:0
    },
    valid: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        },
        index:1
    },
    invalid: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    valid_paid: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    valid_received: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    valid_closed: {
        code: -1,
        data: {
            datas: [],
            pageOffset:0
        }
    },
    
    
})

export function shareOrder(state=inintShareOrder,action){
    let json = action.json;
    let sortType= action.sortType==undefined?'all':action.sortType
 
    switch (action.type){
        case SHATE_ORDER:
            let result=state.toJS()
            result=result[sortType]
            if(json.data.pageOffset == result.data.pageOffset){
                return state
            }
            
            result.data={
                pageOffset:json.data.pageOffset,
                pageSize:json.data.pageSize,
                totalPage:json.data.totalPage,
                totalRecord:json.data.totalRecord,
                datas:[].concat(result.data.datas,json.data.datas||[])
            }
            result.code=json.code
            let _state={...state.toJS(),[sortType]:result}
            return fromJS(_state)
            
        case EMPTY_SHARE_ORDER_LIST:
            return inintShareOrder
        default:
            return state
    }
}
// 提现列表
// 初始化
const initdata={
    code:-1,
    data:{
        datas:[]
    }
}
export function takeMoneyList(state=fromJS(initdata),action){
     let json = action.json;
    switch (action.type) {
        case WITHDRAW_RECORD:
        return fromJS(json)
        default:
        return state
    }
}

//  查询提现记录
export function selectWithdrawRecordDetail (state=fromJS({}),action){
    let json =action.json;
    switch(action.type){
        case SELECT_WITH_DRAW_RECORD_DETAIL:
            return fromJS(json);
            default:return state
    }
}

