import * as types from '../constants/user';
// import fetch from 'isomorphic-fetch';
import profile from '../dummy/profile';
import axios from 'axios';


let apiLink = 'http://0.0.0.0:3000/api/user';

export function getUserInfo(token) {
  return dispatch => {

    apiLink += '?token=';
    apiLink += token;
    axios.get(apiLink)
      .then(function(response){
          
          profile.profile.name = response.data.user.name;
          dispatch({type: types.USER, user: profile.profile});
      });
    
  };
}