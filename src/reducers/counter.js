import * as actionType from '../constants/counter'

const INITIAL_STATE = {
  list: [],
  num:0,
  userinfo:[],
  isShow:false
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionType.LIST:
      return {
        ...state,
        list: action.types ? action.list : state.list.concat(action.list)
      }
    case actionType.ADD:
      return{
        ...state,
        num:state.num + 1
      }
    case actionType.USERINFO:
      return{
        ...state,
        userinfo: action.userinfo
      }
    case actionType.isShow:
      return{
        ...state,
        isShow:!state.isShow
      }
     default:
       return state
  }
}
