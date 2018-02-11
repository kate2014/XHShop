import {get,post,postfrom,postjson} from "./BaseAction";
import {host} from "./hostConf";
export const GET_USER_INFO = "GET_USER_INFO";
export const USER_REGISTER_SMS ="USER_REGISTER_SMS";
export const USER_REGISTER='USER_REGISTER';
export const UPDATA_USER_INFO='UPDATA_USER_INFO';
export const USER_LOGIN='USER_LOGIN';
export const UPDATE_WECHAT='UPDATE_WECHAT';
export const UPDATE_IDENTITY='UPDATE_IDENTITY';
export const UPDATE_SEX='UPDATE_SEX';
export const UPLOAD_IMAGE='UPLOAD_IMAGE';
export const WECHAT_VERIFICATION='WECHAT_VERIFICATION';
export const WECHAT_CODE='WECHAT_CODE';
export const DEPOSIT = 'DEPOSIT';
export const SET_CIPHER = 'SET_CIPHER';
export const MODIFY_PASSWORD = 'MODIFY_PASSWORD';
export const MODIFY_PASSWORD_S = 'MODIFY_PASSWORD_S'

//获取用户信息
export function getUserInfo(data, callback=(json)=>{}){
  return get(`${host.test_host}user/refresh`, data,callback, (json)=>{
    return {
      type : GET_USER_INFO,
      json
    }
  })
}
//更新用户信息
export function updataUserInfo(json){
        return {
            type : UPDATA_USER_INFO,
            json
        }
}
//登录
export function userLogin(data, callback=(json)=>{}){
  return post(`${host.test_host}login/userLogin`, data,callback, (json)=>{
    return {
      type : USER_LOGIN,
      json
    }
  })
}
//注册获取验证码
export function getRegisterSms(data, callback=(json)=>{}){
  return post(`${host.test_host}login/registerSms`, data,callback, (json)=>{
    return {
      type : USER_REGISTER_SMS,
      json
    }
  })
}
//发送忘记密码验证码
export function resetPasswordSms(data, callback=(json)=>{}){
  return post(`${host.test_host}login/resetPasswordSms`, data,callback, (json)=>{
    return {
      type : USER_REGISTER_SMS,
      json
    }
  })
}
//快速登录获取验证码
export function getLoginSms(data, callback=(json)=>{}){
  return post(`${host.test_host}login/loginSms`, data,callback, (json)=>{
    return {
      type : USER_REGISTER_SMS,
      json
    }
  })
}
//快速登录
export function quickLogin(data, callback=(json)=>{}){
  return post(`${host.test_host}login/quickLogin`, data,callback, (json)=>{
    return {
      type : USER_LOGIN,
      json
    }
  })
}
//退出登录
export function LoginOut(data,callback=(json) =>{}){
  return get(`${host.test_host}user/removeUser`, data,callback, (json)=>{
    return {
      type : USER_LOGIN,
      json
    }
  })
}
//注册
export function userResister(data, callback=(json)=>{}){
  return post(`${host.test_host}login/userRegister`, data,callback, (json)=>{
    return {
      type : USER_REGISTER,
      json
    }
  })
}
//忘记密码
export function resetPassword(data, callback=(json)=>{}){
  return post(`${host.test_host}login/resetPassword`, data,callback, (json)=>{
    return {
      type : USER_REGISTER,
      json
    }
  })
}
//修改微信
export function updateWechat(data, callback=(json)=>{}){
  return postjson(`${host.test_host}user/wechat/account`, data,callback, (json)=>{
    return {
      type : UPDATE_WECHAT,
      json
    }
  })
}
//修改身份验证信息
export function updateIdentity(data, callback=(json)=>{}){
  return postjson(`${host.test_host}user/id-card/submit`, data,callback, (json)=>{
    return {
      type : UPDATE_IDENTITY,
      json
    }
  })
}
//修改性别
export function updateSex(data, callback=(json)=>{}){
  return post(`${host.test_host}user/sex`, data,callback, (json)=>{
    return {
      type : UPDATE_SEX,
      json
    }
  })
}
//修改头像
export function uploadImage(data, callback=(json)=>{}){
  return post(`${host.test_host}user/head-image`, data,callback, (json)=>{
    return {
      type : UPLOAD_IMAGE,
      json
    }
  })
}
//发送修改微信的短信验证码
export function wechatVerification(data, callback=(json)=>{}){
  return post(`${host.test_host}user/wechat-by-sms/send-sms`, data,callback, (json)=>{
    return {
      type : WECHAT_VERIFICATION,
      json
    }
  })
}

////短信修改提现密码/user/withdraw-password-by-sms  code newPassWord confirmPassword
export function ModifyPasswordS(data, callback=(json)=>{}){
  return postjson(`${host.test_host}user/withdraw-password-by-sms`, data,callback, (json)=>{
    return {
      type : MODIFY_PASSWORD_S,
      json
    }
  })
}

//短信修改提现密码user/withdraw-password-by-sms/sms-code-verify  只有万能验证码
export function ModifyPassword(data, callback=(json)=>{}){
  return post(`${host.test_host}user/withdraw-password-by-sms/sms-code-verify`, data,callback, (json)=>{
    return {
      type : MODIFY_PASSWORD,
      json
    }
  })
}


//提现密码验证

// export function deposit(data, callback=(json)=>{}){
//   return postjson(`${host.test_host}user/withdraw-password-by-old`, data,callback, (json)=>{
//     return {
//       type : DEPOSIT,
//       json
//     }
//   })
// }


//保存提现密码
// export function setCipher(json, callback=(json)=>{}){
//    return {
//       type : SET_CIPHER,
//       json
//     }
// }


//提现密码验证
export function deposit(data, callback=(json)=>{}){
  return postjson(`${host.test_host}user/withdraw-password-by-old`, data,callback, (json)=>{
    return {
      type : DEPOSIT,
      json
    }
  })
}

//保存提现密码
export function setCipher(json, callback=(json)=>{}){
   return {
      type : SET_CIPHER,
      json
    }
}

//短信修改提现密码user/withdraw-password-by-sms/sms-code-verify  只有万能验证码
// export function ModifyPassword(data, callback=(json)=>{}){
//   return post(`${host.test_host}user/withdraw-password-by-sms/sms-code-verify`, data,callback, (json)=>{
//     return {
//       type : MODIFY_PASSWORD,
//       json
//     }
//   })
// }


////短信修改提现密码/user/withdraw-password-by-sms  code newPassWord confirmPassword
// export function ModifyPasswordS(data, callback=(json)=>{}){
//   return postjson(`${host.test_host}user/withdraw-password-by-sms`, data,callback, (json)=>{
//     return {
//       type : MODIFY_PASSWORD_S,
//       json
//     }
//   })
// }



