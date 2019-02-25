/**
 * 请求函数
 * 返回promise对象
 */
import ajax from './ajax'

let BASE_URL = "./apis" //根据config里面index配置的代理
//1.获取验证码
export const reqCaptcha = ()=> ajax (`/apis/users/captcha`)
//登录
export const reqLogin = ({userName,passWord,captcha}) => ajax (`/apis/users/login`,{userName,passWord,captcha},'post')
//注册
export const reqregister = ({userName,passWord}) =>ajax(`/apis/users/register`,{userName,passWord},"post")