import fetch from "isomorphic-fetch";
import {hashHistory} from 'react-router'
import {storage} from "../utils/tools"

/**
 * @desc 格式化一个对象为字符串如 name=pat&city_no=020&old=99;
 * @param data string
 **/
function parseParams(data) {
    if (data == null) {
        return '';
    }
    let list = [];
    for (let item in data) {
        list.push(`${item}=${data[item]}`)
    }
    return list.join("&");
}

const option = {
    timeout: 10000,
    credentials: 'include',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "token": storage.get("token")||''
    }

};
const optionfrom = {
    timeout: 10000,
    credentials: 'include'

};

const jsonoption = {
    timeout: 10000,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        "token": storage.get("token")
    }

};

export function get(url = "", data = null, callback = (json) => {
}, reducersConnect = (json) => {
}) {
    const params = parseParams(data), tarUrl = data == null ? url : `${url}?${params}`;
    return dispatch => {
        return fetch(tarUrl, {
            method: "GET",
            timeout: 10000,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "token": storage.get("token")||''
            }
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.code == 1001) {
                    //用户未登录
                    hashHistory.push("/login")
                }
                dispatch(reducersConnect(json));
                callback(json);
            })
    }
}

export function postjson(url = "", data = null, callback = (json) => {
}, reducersConnect = (json) => {
}) {
    return dispatch => {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            timeout: 10000,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "token": storage.get("token")||''
            }
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                dispatch(reducersConnect(json));
                callback(json);
            })
    }
}

export function postfrom(url = "", data = null, callback = (json) => {
}, reducersConnect = (json) => {
}) {
   /* let form = new FormData(data);
    for (let i in data) {
        if ((typeof data[i] === "object") && (data[i].constructor === Array)) {
            data[i].map((item, index) => {
                form.append(i + "[" + index + "]", item)
            })
        } else {
            form.append(i, data[i])
        }
    }
    console.log(form)*/
     let formData = new FormData();
      for (var key in data){
          formData.append(key, data[key]);
      }
    return dispatch => {
        return fetch(url, {
            method: "POST",
            body: formData,
            timeout: 10000,
            credentials: 'include',
            headers: {
                "token": storage.get("token")||''
            }
        })
            .then((response, onRejected) => {
                 if(response.ok){
                    return response.json();
                  }else{
                    return {};
                  }
            })
            .then(json => {
                dispatch(reducersConnect(json));
                callback(json);
            })
          
    }
}

export function post(url = "", data = null, callback = (json) => {
}, reducersConnect = (json) => {
}) {

    const params = parseParams(data)
    return dispatch => {
        return fetch(url, {
            method: "POST",
            body: params,
            timeout: 10000,
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "token": storage.get("token")||''
            }
        })
        .then(response => {
            if (url.indexOf('login/userLogin')>-1 || url.indexOf('login/quickLogin')>-1 &&response.headers.get("token")) {
                storage.setObj({
                    token: response.headers.get("token")||''
                })
            }
            if(response.ok){
                return response.json();
              }else{
                return {};
              }
        })
        .then(json => {
            if (json.code == 1001) {
                //用户未登录
                storage.remove("userInfo")
                hashHistory.push("/login")
            }

            dispatch(reducersConnect(json));
            callback(json);

        })
    }
}


export function commonPost(url = "", data = null, callback = (json) => {
}) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        timeout: 10000,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "token": storage.get("token")||''
        }
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            callback(json);
        })
}


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
