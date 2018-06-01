import * as types from '../constants/pairs';
// import fetch from 'isomorphic-fetch';
import pair from '../dummy/pair_info';
import axios from 'axios';


const hostName = "192.168.2.170:3000";
const token = localStorage.getItem("token");
const apiLink = `http://${hostName}/api/pairs?token=${token}`;

export function getPair(id) {
  return dispatch => {
      dispatch({
        type: types.PAIR,
        id,
        pair: pair.pair
      });
  };
}

export function getPairs() {
  
  return dispatch => {

    axios.get(apiLink)
    .then(function(response ){

        // console.log(response.data);
        dispatch({
          type: types.PAIRS,
          pairs: response.data.pairs
        });
    })
  };
}
