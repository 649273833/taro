import * as actionType from '../constants/counter'

const INITIAL_STATE = {
  list: [],
  num:0
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
     default:
       return state
  }
}
