import {GET_ADDRESS} from '../actions/activity.js'
import {storage} from '../utils/tools';

let initAddress={
    code:-1,
    result:{
        contact:'',
        phone:'',
        province:'',
        detail:'',
        city:'',
        area:''
    }
}
export  function activityAddress(state = initAddress, action) {
    let json = action.json;
    switch (action.type) {
        case GET_ADDRESS:
            storage.setObj({
                activityAddress: json
            })
            return json
        default:
            let _activityAddress=storage.get('activityAddress')||initAddress
            state = state.code ==-1 ? _activityAddress:state
            return state
    }
}
