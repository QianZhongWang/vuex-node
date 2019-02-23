/**
 * 对axios函数进行封装
 * 返回值:promise对象(异步返回的res.data)
 */

 import axios from "axios"
 export default function ajax( url, params = {}, type="get"){

    return new Promise((resolve,reject)=>{

        let promise;
        if( type === 'get'){
            //准备url query参数数据
            let paramsStr = "";//参数拼接字符创
            Object.keys(params).forEach(key=>{
                paramsStr += `${key}=${params[key]}&`;
            })
            paramsStr ? url =`${url}?${paramsStr.substring(0,paramsStr.lastIndexOf('&'))}` : '';
            promise = axios.get(url)
        }else{ //发送post请求
            promise = axios.post(url,params)
        }

        promise.then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })

    })
    
    
 }


