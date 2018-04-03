import {REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED} from '../constants/register';

export default function registerReduce(state = {
  success: false,
  loading: false,
  message: ""
  }, action){

  
  switch (action.type) {

    case REGISTER_START:
      return Object.assign({}, state, {
        loading: true 
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        success: action.success,
        loading: false
      });
    case REGISTER_FAILED:
      return Object.assign({}, state, {
        success: action.success,
        loading: false,
        message: action.message

      });
    
    default:
      return state;
  }
}