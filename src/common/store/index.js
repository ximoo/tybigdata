import Vue from 'vue'
import Vuex from 'vuex'

import platData from './modules/platData'
import baseData from './modules/baseData'
import bigData from './modules/bigData'
import opratData from './modules/baseData'

Vue.use(Vuex)

export default new Vuex.Store({
        modules: {
                platData,
                baseData,
                opratData,
                bigData
        }
})