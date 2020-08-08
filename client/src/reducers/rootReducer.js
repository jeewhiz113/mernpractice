//import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from '../actions/types';
//Implement the backend now
//import {v4 as uuid} from 'uuid';
const initState  = {
  items: [],
  loading: false  //set to true when the system is in the act of retrieving data, once the data is retrieved, set the property back to false.
};

const rootReducer = (state = initState, action) =>{
  if (action.type === 'DELETE_ITEM'){
    return {
      ...state,
      items:state.items.filter(item=> item._id !== action.payload)  //do the same thing to the front end.
    }
  }
  if (action.type === 'ERROR'){
    console.log('Error getting items from the server.')
    return { 
      ...state
    }
  }
  if (action.type === 'GET_ITEMS'){
   console.log("running get Items")
    return {
      ...state,
      items: action.payload,  
    }
  }
  if (action.type === 'ADD_ITEM'){
    return {
      ...state,
      items: [action.payload, ...state.items]
    }
  }
  if (action.type === 'ITEMS_LOADING'){
    return{
      ...state, 
      loading:true
    }
  }
  return state;
}

export default rootReducer;