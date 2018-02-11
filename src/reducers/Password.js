import {UPDATA_PASSWORD} from '../../actions/Password'
import {fromJS} from 'immutable'

export function updataPassword(state=fromJS({}),action){
	let json=action.json;

	switch(action.type){
		case UPDATA_PASSWORD;

		return fromJS(json)

		default:
		return state
	}
}