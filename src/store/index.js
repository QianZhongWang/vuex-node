/*
    VueX最核心的管理模块stroe
*/
import Vue from "vue";
import Vuex from "vuex"
import state from "./state"
import mutations from "./mutations"
import actions from "./action"
import getters from "./getters"

//使用vuex-persist 做vuex持久化
import VuexPersist from "vuex-persist"
Vue.use(Vuex)

// //创建一个对象并进行配置
const vuexLocal = new VuexPersist({
    supportCircular:true,
    storage:window.localStorage
})


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins:[vuexLocal.plugin]
})