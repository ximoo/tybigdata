import Vue from 'vue'
import Vuex from 'vuex'
import mainStore from "../../JzIndex/Configs/store";



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        version: localStorage.$version ? localStorage.$version :  mainStore.state.version,
        platformAdminNav: localStorage.$platformAdminNav ? JSON.parse(localStorage.$platformAdminNav) : mainStore.state.platformAdminNav,
        platformData: localStorage.$platformData ? JSON.parse(localStorage.$platformData) : null

    },
    mutations: {

    },
    getters: {



    }
})