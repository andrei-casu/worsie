import {USER} from '../constants/user';

export default function eventsReduce(state = {
  userInfo: {},
  loading: false
}, action) {
  switch (action.type) {
    case USER:
      return Object.assign({}, state, {userInfo: action.user});
    default:
      return state;
  }
}