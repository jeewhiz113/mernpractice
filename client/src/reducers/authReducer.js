//A reducer to change the state of the authentication process.

import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/types';

const initialState = {
  //token: "I like cheese",
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null 
}

export default function(state = initialState, action){
  switch (action.type){
    case USER_LOADING:  //get the user from the backend.
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:   //runs all the time at every request to see if logged in or not.
      return{
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload  //send the user as the payload.
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return{
        ...state,
        ...action.payload, //will have user and token
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token:null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return{
        ...state
      }
  }
}

