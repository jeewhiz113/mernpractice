//A reducer to change the state of all the items of our app.

import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from '../actions/types';
const initState  = {
  items: [],
  loading: false  //set to true when the system is in the act of retrieving data, once the data is retrieved, set the property back to false.
};

const itemReducer = (state = initState, action) =>{
  switch(action.type){
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,  
        loading: false
      }
    case DELETE_ITEM:
      return {
        ...state,
        items:state.items.filter(item=> item._id !== action.payload)  //do the same thing to the front end.
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
    case ITEMS_LOADING:
      return{
        ...state, 
        loading:true
      }
    default:
      return state;
  }
}

export default itemReducer;