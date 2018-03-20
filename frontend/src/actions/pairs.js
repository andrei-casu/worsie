import * as types from '../constants/pairs';
// import fetch from 'isomorphic-fetch';
import pair from '../dummy/pair_info.json';

export function getPair(id) {
  return dispatch => {
      dispatch({
        type: types.PAIR,
        id,
        pair: pair.pair
      });
  };
}
