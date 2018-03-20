import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import eventsReducer from './events';
import userReducer from './user';
import pairsReducer from './pairs';
import newsReducer from './news';

const rootReducer = combineReducers({
  routing: routerReducer,
  pairs: pairsReducer,
  events: eventsReducer,
  user: userReducer,
  news: newsReducer
});

export default rootReducer;
