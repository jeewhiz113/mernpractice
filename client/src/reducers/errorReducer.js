//reducer to changethe state of erros of our application.

import {GET_ERRORS, CLEAR_ERRORS} from '../actions/types';

const initialState = {
  msg:{},
  status:null,
  id:null
};

//So the error reducer can change the state of our application from currently with an error
//and attached with it a msg and a status code and an id to clearing of the error which resets 
//the state of the msg to the empty object and status and id to be null.

export default function(state=initialState, action){
  switch(action.type){
    case GET_ERRORS:
      return{
        msg:action.payload.msg,  //error msg in the form of an object and the message comes from the server.
        status: action.payload.status,
        id: action.payload.id,
      }
      case CLEAR_ERRORS:
        return {
          msg: {},
          status: null,
          id: null
        }
      default:
        return state
  }
}