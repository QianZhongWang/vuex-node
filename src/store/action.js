/**
 * 通过更新mutatios 间接更行state的多个方法
 */
import{
    RECIVE_USERNAME,
    RECIVE_TOKEN,
    RECIVE_CAPTCHA
} from './mutatio-types'
import{
    reqCaptcha,
    reqLogin,
}from "../api/index"
export default{
    //异步获取验证码
    async getCaptcha({commit}){
        const result = await reqCaptcha()
        //提交mutation
        if(result.status == 0){
            const captcha = result.msg
            commit( RECIVE_CAPTCHA,{captcha})
        }
    },
    
}