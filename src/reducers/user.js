

import {GET_USER_INFO, UPDATA_USER_INFO,
 USER_LOGIN,UPDATE_WECHAT,UPDATE_SEX,SET_CIPHER,} from '../actions/user'
import {storage} from '../utils/tools';
import {fromJS} from 'immutable'

const initialState = {};

export function userInfo(state = {}, action) {
    let json = action.json;
    switch (action.type) {
        case USER_LOGIN:
            storage.setObj({
                userInfo: json.data
            })
            return Object.assign({}, state, json.data);
        case GET_USER_INFO:
            storage.setObj({
                userInfo: json.data
            })
            return Object.assign({}, json.data);
        case UPDATA_USER_INFO:
            storage.setObj({
                userInfo: json
            })
            return Object.assign({}, json);
        default:
            return state
    }
}


// export function getCipher(state = {}, action) {
//     let json = action.json;
//     switch (action.type) {
//         case GETCIPHER:
//         storage.setObj({
//                 userInfo: json.data
//             })
//             return json.data;
//         default:
//             return state
//     }
// }

/*export function wechat(state=fromJs({}),action){
     let json = action.json;
    switch (action.type) {
        case UPDATE_WECHAT:
        return fromJs(json)
        default:
        return state
    }
}
*/

// export function wechatVerification(state=fromJS({}),action){
//      let json = action.json;
//     switch (action.type) {
//         case WECHAT_VERIFICATION:
//         return fromJS(json)
//         default:
//         return state
//     }
// }

export function oldPassWord(state=fromJS({}),action){
     let json = action.json;
    switch (action.type) {
        case SET_CIPHER:
        return fromJS(json)
        default:
        return state
    }
}

