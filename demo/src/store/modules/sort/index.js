import {getCateList} from '../../../util/axios'

const state={
    cateList:[]
}

const getters={
    getCateList(state){
        return state.cateList
    }
}

const mutations={
    req_cateList(state,padload){
        state.cateList = padload
    }
}

const actions={
    getCateListAction({commit}){
        getCateList()
        .then(res=>{
            if(res.data.code===200){
                commit('req_cateList',res.data.list)
            }
            console.log(res,'菜单列表');
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}

