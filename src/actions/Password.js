import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";

const UPDATA_PASSWORD='UPDATA_PASSWORD'


export function updataPassword(data.callback=(json)=>{}){
	return post (`${host.text_host}user/withdraw-password-by-old`,data,callback,(json)=>{
		return{
			type:UPDATA_PASSWORD,
			json
		}
	})
}