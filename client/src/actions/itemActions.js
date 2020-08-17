import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';
import {tokenConfig} from './authActions';  //
import { returnErrors } from './errorActions'

export const getItems = ()=>{//should be here
  return (dispatch)=>{
    dispatch(setItemsLoading());
    let currentItems;
    axios
    .get('/api/items').then(res=>{ //* Is this piece of code here needed? */
      currentItems = res.data;
    }).then(()=>{dispatch({type: GET_ITEMS, payload: currentItems})}) 
      .catch((err)=>{
        dispatch(returnErrors(err.response.data, err.response.status));  
      })
  }
}
export const deleteItem = (id)=>{
  return (dispatch, getState) =>{
    //axios( {method:'DELETE', url:`/api/items/${id}`})  //attaching token to the request header
    axios.delete(`./api/items/${id}`, tokenConfig(getState))  
      .then(res =>{
        dispatch({type: DELETE_ITEM, payload:id})
      }).catch((err)=>{
        dispatch(returnErrors(err.response.data, err.response.status));  
      })
  }
};

export const addItem = (item)=>{
  return (dispatch, getState)=>{  //post request.
    //axios({method:'POST', url:'/api/items', data: item, tokenConfig(getState)}) 
    axios.post('./api/items', item, tokenConfig(getState))
      .then(res =>{
        dispatch({type:ADD_ITEM, payload: res.data})
      })
      .catch((err)=>{
        dispatch(returnErrors(err.response.data, err.response.status));  
      })
    }
};

export const setItemsLoading = ()=>{
  return{
    type: ITEMS_LOADING  
  }
}