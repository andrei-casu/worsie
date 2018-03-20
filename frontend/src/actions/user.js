import * as types from '../constants/user';
// import fetch from 'isomorphic-fetch';
import profile from '../dummy/profile.json';


export function getUserInfo() {
  return dispatch => {
    // fetch()
    dispatch({type: types.USER, user: profile.profile});
  };
}