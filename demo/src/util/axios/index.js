import http from './axios'

export function getMenuList(){
    return http.get('/api/menulist?istree=true')
}

export function addMenu(data){
    return http.post('/api/menuadd',data)
}

export function deleteMenu(data){
    return http.post('/api/menudelete',data)
}

export function infoMenu(params){
    return http.get('/api/menuinfo',{params})
}

export function editMenu(data){
    return http.post('/api/menuedit',data)
}
//角色列表

export function roleAdd(data){
    return http.post('/api/roleadd',data)
}

export function getroleList(){
    return http.get('/api/rolelist')
}

export function roleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })
}

export function roleEdit(data){
    return http.post('/api/roleedit',data)
}

export function roleDelete(data){
    return http.post('/api/roledelete',data)
}

//管理员列表

export function mangerAdd(data){
    return http.post('/api/useradd',data)
}

export function getMangerList(params){
    return http.get('/api/userlist',{
        params
    })
}

export function mangerInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}

export function mangerCount(){
    return http.get('/api/usercount')
}

export function mangerEdit(data){
    return http.post('/api/useredit',data)
}

export function mangerDelete(data){
    return http.post('/api/userdelete',data)
}

export function mangerLogin(data){
    return http.post('/api/userlogin',data)
}

/* 分类管理接口 */
//封装分类添加接口
export function getCateAdd(data){
    let file = new FormData();
          //FormData 数据的添加只能用append ,获取值也只能用get方式获取
          //循环添加 对象 转化成了 FormData这种格式
          for (let i in data) {
            file.append(i, data[i]);
          }
    return http.post('/api/cateadd',file)
}
//封装分类列表接口
export function getCateList(){
    return http.get('/api/catelist',{
        params:{
            istree:true
        }
    })
}
//封装分类获取（一条）接口
export function getCateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
//封装分类修改接口
export function getCateEdit(data){
    return http.post('/api/cateedit',data)
}
//封装分类删除接口
export function getCateDelete(data){
    return http.post('/api/catedelete',data)
}

export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}

export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}

export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}

export function getSpecsCount(){
    return http.get('/api/specscount')
}

export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}

export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}

//商品管理添加
export function getGoodsAdd(data){
  let file = new FormData();
  //FormData 数据的添加只能用append ,获取值也只能用get方式获取
  //循环添加 对象 转化成了 FormData这种格式
  for (let i in data) {
    file.append(i, data[i]);
  }
  return http.post('/api/goodsadd',file)
}
//商品管理列表
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
//商品管理获取（一条）
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
//商品管理修改
export function getGoodsEdit(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
      file.append(i, data[i]);
    }
    return http.post('/api/goodsedit',file)
  }
//商品管理删除
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
//商品管理总数（用于计算分页)
export function getGoodsCount(){
    return http.get('/api/goodscount')
}

// 封装会员管理接口
//封装会员管理列表接口
export function getMemberList(){
    return http.get('/api/memberlist')
}
//封装会员管理获取（一条）接口
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
//封装会员管理修改接口
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}

/* 轮播图管理接口 */
//封装轮播图添加接口
export function getBannerAdd(data) {
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
       file.append(i, data[i]);
    }
    return http.post('/api/banneradd', file)
  }
//封装轮播图列表接口
export function getBannerList(){
    return http.get('/api/bannerlist')
}
//封装轮播图获取（一条）接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
//封装轮播图修改接口
export function getBannerEdit(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
       file.append(i, data[i]);
    }
    return http.post('/api/banneredit',file)
}
//封装轮播图删除接口
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}

/* 限时秒杀管理接口 */
//封装限时秒杀添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
//封装限时秒杀列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}
//封装限时秒杀获取（一条）接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
//封装限时秒杀修改接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
//封装限时秒杀删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}