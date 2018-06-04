import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SUCCESS_FALSE} from '../constants/login';

export default function loginReduce(state = {
  token: "",
  success: false,
  loading: false,
  message: ""
  }, action){

  switch (action.type) {

    case LOGIN_START:
      return Object.assign({}, state, {
        loading: true 
      });
    case LOGIN_SUCCESS:{

      return Object.assign({}, state, {
        token: action.token,
        success: action.success,
        loading: false
      });}
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        success: action.success,
        loading: false,
        message: action.message
      });
    case SUCCESS_FALSE:
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;
    
  }
}