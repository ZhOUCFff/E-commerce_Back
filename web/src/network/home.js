import { request } from './request'
//左侧边栏
function homeReq() {
  return request({
    url: '/menus'
  })
}
//用户管理--------------------------------------------------------------------------
//用户列表
function userListReq(params) {
  return request({
    url: '/users',
    params
  })
}
//保存状态
function saveState(id, state) {
  return request({
    url: `users/${id}/state/${state}`,
    method: 'put'
  })
}
// 添加用户
function addUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}
// 编辑用户信息
function editUser(id) {
  return request({
    url: `/users/${id}`
  })
}
// 保存编辑后的用户信息
function saveEditUser(id, email, mobile) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data: {
      email,
      mobile
    }
  })
}
// 删除用户
function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}
// 分配用户角色
function setRole(id, rid) {
  return request({
    url: `/users/${id}/role`,
    method: 'put',
    data: {
      rid
    }
  })
}
//权限管理-----------------------------------------------------------------------------------------
// 获取权限列表
function getRightsList(type) {
  return request({
    url: `/rights/${type}`
  })
}
// 获取角色列表
function getRolesList() {
  return request({
    url: '/roles'
  })
}
// 删除权限
function deleteRights(roleId, rightId) {
  return request({
    url: `/roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
//分配权限
function allotRights(roleId, rids) {
  return request({
    url: `/roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}
//添加角色
function addRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}
//根据id查询角色
function findRole(roleId) {
  return request({
    url: `/roles/${roleId}`
  })
}
//编辑提交角色
function editRole(roleId, roleName, roleDesc) {
  return request({
    url: `/roles/${roleId}`,
    method: 'put',
    data: {
      roleName,
      roleDesc
    }
  })
}
//删除角色
function deleteRole(roleId) {
  return request({
    url: `/roles/${roleId}`,
    method: 'delete'
  })
}
//商品管理-------------------------------------------------------------------------------
function getCategories(params) {
  return request({
    url: '/categories',
    params
  })
}
//添加商品分类
function addCate(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}
//根据id查询分类
function getCateById(cateId) {
  return request({
    url: `/categories/${cateId}`
  })
}

//编辑商品分类
function editCate(cateId, cat_name) {
  return request({
    url: `/categories/${cateId}`,
    method: 'put',
    data: {
      cat_name
    }
  })
}
//删除分类
function deleteCate(cateId) {
  return request({
    url: `/categories/${cateId}`,
    method: 'delete'
  })
}
// 分类参数-------------------------------------------------------
// 获取分类参数列表
function getCateParams(cateId, sel) {
  return request({
    url: `/categories/${cateId}/attributes`,
    params: {
      sel
    }
  })
}
//添加动态参数或者静态属性
function addParams(cateId, attr_name, attr_sel) {
  return request({
    url: `/categories/${cateId}/attributes`,
    method: 'post',
    data: {
      attr_name,
      attr_sel
    }
  })
}

//根据 ID 查询参数
function getCateParamById(cateId, attr_id, attr_sel) {
  return request({
    url: `/categories/${cateId}/attributes/${attr_id}`,
    params: {
      attr_sel
    }
  })
}
//编辑提交参数
function editParam(cateId, attr_id, attr_name, attr_sel, attr_vals) {
  return request({
    url: `/categories/${cateId}/attributes/${attr_id}`,
    method: 'put',
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}
// 删除参数 
function deleteParam(cateId, attr_id) {
  return request({
    url: `/categories/${cateId}/attributes/${attr_id}`,
    method: 'delete'
  })
}
//商品列表--------------------------------------------------------------
//商品列表数据
function getGoodsList(params) {
  return request({
    url: '/goods',
    params
  })
}
//删除商品
function deleteGoods(goodsId) {
  return request({
    url: `/goods/${goodsId}`,
    method: 'delete'
  })
}
//添加商品
function addGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}
//根据商品列表查询商品
function findGoods(goodsId) {
  return request({
    url: `/goods/${goodsId}`
  })
}
//编辑提交商品
function editGoods(goodsId, data) {
  return request({
    url: `/goods/${goodsId}`,
    method: 'put',
    data
  })
}
// 订单管理-----------------------------------------------------
// 获取订单列表
function getOrderList(params) {
  return request({
    url: '/orders',
    params
  })
}

//查看物流信息
function getLogistics() {
  return request({
    url: '/kuaidi/1106975712662'
  })
}


//获取报表数据
function getReports() {
  return request({
    url: '/reports/type/1'
  })
}

export {
  homeReq,
  userListReq,
  saveState,
  addUser,
  editUser,
  saveEditUser,
  deleteUser,
  getRightsList,
  getRolesList,
  deleteRights,
  allotRights,
  setRole,
  editRole,
  deleteRole,
  addRole,
  findRole,
  getCategories,
  addCate,
  editCate,
  deleteCate,
  getCateParams,
  getCateById,
  addParams,
  getCateParamById,
  editParam,
  deleteParam,
  getGoodsList,
  deleteGoods,
  addGoods,
  findGoods,
  editGoods,
  getOrderList,
  getLogistics,
  getReports
}