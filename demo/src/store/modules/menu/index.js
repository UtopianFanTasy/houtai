import {getMenuList} from '../../../util/axios'

const state={
    menuList:[]
}

const getters={
    getmenuList(state){
        return state.menuList
    }
}

const mutations={
    req_menulist(state,payload){
        state.menuList = payload

    }
}

const actions={
    getMenuListAction({commit}){
        getMenuList()
        .then(res=>{
            if(res.data.code===200){
                commit('req_menulist',res.data.list)
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

