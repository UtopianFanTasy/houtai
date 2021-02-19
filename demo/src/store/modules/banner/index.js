import {
  getBannerList
} from '../../../util/axios'

const state = {
  bannerList: [],
}

const getters = {
  getBannerList(state) {
    return state.bannerList
  },
}

const mutations = {
  REQ_BANNERLIST(state, payload) {
    state.bannerList = payload
  },
}

const actions = {
  getBannerListAction(payload) {
    console.log(payload, '上下文对象');
    getBannerList({})
      .then(res => {
        console.log(res);
        if (res.data.code === 200) {
          let list = res.data.list ? res.data.list:[]
          //提交一个mutation去修改state中的mangerList
          payload.commit('REQ_BANNERLIST',list)

          
        }
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
