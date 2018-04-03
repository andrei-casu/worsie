import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import eventsReducer from './events';
import userReducer from './user';
import pairsReducer from './pairs';
import newsReducer from './news';
import registerReducer from './register';
import loginReducer from './login';

const rootReducer = combineReducers({
  routing: routerReducer,
  pairs: pairsReducer,
  events: eventsReducer,
  user: userReducer,
  news: newsReducer,
  register: registerReducer,
  login: loginReducer
});

export default rootReducer;
