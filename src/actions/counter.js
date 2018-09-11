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
export {getList,add}
