import axios from 'axios'
import router from '../../router/index'

let http = axios.create({
    baseURL:'/api'
})

http.interceptors.request.use(req=>{
    console.log(req,"请求拦截");
    let token = sessionStorage.getItem('loginInfo')?JSON.parse(sessionStorage.getItem('loginInfo')).token:''
    req.headers.authorization = token
    return req
})

http.interceptors.response.use(res=>{
    console.log(res,'响应');
    if(res.data.code===500){
        alert(res.data.msg)
        router.push('/login')
    }else if(res.data.code===403){
        alert(res.data.msg)
        router.push('/login')
    }else{
        return res
    }
})

export default http

