import * as types from '../constants/news';
// import fetch from 'isomorphic-fetch';
import news from '../dummy/news';


export function getNews() {
  return dispatch => {
    dispatch({
      type: types.NEWS,
      news: news.news
    });
  };
}