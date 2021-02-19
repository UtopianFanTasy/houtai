import {
  getGoodsList,getGoodsCount
} from '../../../util/axios'

const state = {
  GoodsList: [],
  size: 4,
  page: 1,
  countNum: 0
}

const getters = {
  getGoodsList(state) {
    return state.GoodsList
  },
  getGoodsSize(state) {
    return state.size
  },
  getCountNum(state) {
    return state.countNum
  }
}

const mutations = {
  REQ_GoodsLIST(state, payload) {
    state.GoodsList = payload
  },
  REQ_COUNT(state, payload){
    state.countNum = payload
  },
  CHANGE_PAGE(state,payload){
    state.page = payload
  }
}

const actions = {
  getGoodsListAction(payload) {
    console.log(payload, '上下文对象');
    getGoodsList({
        size: payload.state.size,
        page: payload.state.page
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 200) {
          let list = res.data.list ? res.data.list:[]
          //提交一个mutation去修改state中的mangerList
          payload.commit('REQ_GoodsLIST',list)

          if(payload.state.page!=1 && list.length==0){
            payload.dispatch('changePageAction',payload.state.page-1)
            return
          }
        }
      })
  },

  getCountNumAction(payload){
    getGoodsCount()
    .then(res=>{
      if (res.data.code === 200) {
          //提交一个mutation去修改state中的mangerList
          payload.commit('REQ_COUNT', res.data.list[0].total)
        }
    })
  },
  changePageAction(op,payload){
    op.commit('CHANGE_PAGE',payload)
    op.dispatch('getGoodsListAction')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
