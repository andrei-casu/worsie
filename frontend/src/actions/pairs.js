import * as types from '../constants/pairs';
// import fetch from 'isomorphic-fetch';
// import pair from '../dummy/pair_info';
import axios from 'axios';


const hostName = '206.189.30.132:3000';
const token = localStorage.getItem("token");
const apiLink = `http://${hostName}/api/pairs?token=${token}`;


export function getPair(id) {
  return dispatch => {

    const apiLinkPair = `http://${hostName}/api/pair?id=${id}&token=${token}`;
    axios.get(apiLinkPair)
    .then(function(response ){

        // console.log(response.data);

        if (response.data.success === true){
          dispatch({
            type: types.PAIR,
            id,
            pair: response.data.pair
          });
        }
    });
  };
}

export function getPairs() {
  
  return dispatch => {

    axios.get(apiLink)
    .then(function(response ){

        // console.log(response.data);
        if (response.data.success === true){
          dispatch({
            type: types.PAIRS,
            pairs: response.data.pairs
          });
        }
    });
  };
}
