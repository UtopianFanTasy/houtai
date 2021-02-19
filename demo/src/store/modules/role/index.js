import {getroleList} from '../../../util/axios'

const state={
    roleList:[]
}

const getters={
    getRoleList(state){
        return state.roleList
    }
}

const mutations={
    req_rolelist(state,payload){
        state.roleList = payload
    }
}

const actions={
    getRoleListAction({commit}){
        getroleList()
        .then(res=>{
            console.log(res);
            if(res.data.code===200){
                commit('req_rolelist',res.data.list)
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

