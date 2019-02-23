/**
 * 直接更新state的多个方法
 */
import{
    RECIVE_USERNAME,
    RECIVE_TOKEN,
} from './mutation-types'
export default{
    [RECIVE_USERNAME] ( state, userName) {
        state.userName = userName
    },
    [RECIVE_TOKEN] ( state, token) {
        state.token = token
    },
   
}