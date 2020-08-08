import axios from 'axios';
import {ITEMS_LOADING} from './types';
export const getItems = ()=>{//should be here
  return (dispatch)=>{
    let currentItems;
    axios
    .get('/api/items').then(res=>{
      currentItems = res.data;
    }).then(()=>{dispatch({type: 'GET_ITEMS', payload: currentItems})}) 
      .catch((err)=>{
        dispatch({type: 'ERROR'});  
      })
  }
}
export const deleteItem = (id)=>{
  return (dispatch) =>{
    axios({method:'DELETE', url:`/api/items/${id}`})
      .then(res =>{
        dispatch({type: 'DELETE_ITEM', payload:id})
      })
  }
};

export const addItem = (item)=>{
  return (dispatch)=>{  //post request.
    axios({method:'POST', url:'/api/items', data: item}) 
      .then(res =>{
        dispatch({type:'ADD_ITEM', payload: res.data})
      })
      .catch((err)=>{  //If error
        dispatch({type:'ERROR'});
      })
    }
};

export const setItemsLoading = ()=>{
  return{
    type: ITEMS_LOADING  
  }
}