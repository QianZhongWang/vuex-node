/**
 * 对axios函数进行封装
 * 返回值:promise对象(异步返回的res.data)
 */

 import axios from "axios"
import store from "../store";



//请求拦截器
axios.interceptors.request.use(
    config => {
        if(store.state.token){//判断token是否存在，如果存在的话。则每个http header都加上token
            config.headers.Authorization=`${store.state.token}`
        }

        return config;
    },
    error=>{
        return Promise.reject(error)
    }
)

//响应拦截器
axios.interceptors.response.use(
    response=>{
        console.log(response)
        return response
    },
    error=>{
        if(error.response){
            console.log(error.response)
        }
        return Promise.reject(error.response.data)
    }
)

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


