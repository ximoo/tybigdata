const platformBigData = localStorage.$platformBigData

const state = {
    platformBigData: platformBigData ? JSON.parse(platformBigData) : {
        baseData: {
            data: []
        },
        oprateData:{
            data:[]
        }
    }
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}