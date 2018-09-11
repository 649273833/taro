import * as actionType  from '../constants/counter'

const getList = (list,type) =>{
  return{
    type:actionType.LIST,
    list:list,
    types:type
  }
}
const add = () =>{
  return{
    type:actionType.ADD
  }
}
const userinfo = (data) =>{
  return{
    type:actionType.USERINFO,
    userinfo:data
  }
}
const isShow = () =>{
  return{
    type:actionType.isShow
  }
}
export {getList,add,userinfo,isShow}
