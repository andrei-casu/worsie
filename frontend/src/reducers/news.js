import {NEWS} from '../constants/news';

export default function newsReducer(state = {
  news: []
}, action) {
  switch (action.type) {
    case NEWS:
      return Object.assign({}, state, {news: action.news});
   default:
      return state;
  }
}