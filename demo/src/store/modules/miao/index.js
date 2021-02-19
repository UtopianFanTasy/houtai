import {
  getSeckList
} from '../../../util/axios'

const state = {
  SeckList: [],
}

const getters = {
  getSeckList(state) {
    return state.SeckList
  },
}

const mutations = {
  REQ_SeckLIST(state, payload) {
    state.SeckList = payload
  },
}

const actions = {
  getSeckListAction(payload) {
    console.log(payload, '上下文对象');
    getSeckList({})
      .then(res => {
        console.log(res);
        if (res.data.code === 200) {
          let list = res.data.list ? res.data.list:[]
          //提交一个mutation去修改state中的mangerList
          payload.commit('REQ_SeckLIST',list)

          
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
