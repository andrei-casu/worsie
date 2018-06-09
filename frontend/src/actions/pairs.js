import * as types from '../constants/pairs';
// import fetch from 'isomorphic-fetch';
// import pair from '../dummy/pair_info';
import axios from 'axios';

const hostName = '206.189.30.132:3000';

export function getPair(id) {

  const token = localStorage.getItem("token");
  const apiLinkPair = `http://${hostName}/api/pair?id=${id}&token=${token}`;

  return dispatch => {

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
  
  const token = localStorage.getItem("token");
  const apiLink = `http://${hostName}/api/pairs?token=${token}`;

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
