(() => {
  const routing = require('./routing');
  const {MongoClient} = require('mongodb');
  const {checkAuthenticated, authenticate, register} = require('./app/authentication');
  const {getUserRoute} = require('./app/user_routes');
  const {intervalPairs, intervalEvents, interval1Day, interval2Day, interval3Day} = require('./app/product_actions');
  const {getPairsRoute, getPairRoute} = require('./app/pair_routes');
  const {getEventsRoute, getEventRoute} = require('./app/event_routes');
  const {addBetRoute, getBetsRoute} = require('./app/bet_routes');
  const {getAtomFeed} = require('./app/feed_routes');
  const {getEventsStatistics, getUserStatistics} = require('./app/statistics_routes');
  const port = 3000;

  routing.applyMiddleware('/api', checkAuthenticated);

  routing.post('/authenticate', authenticate);
  routing.post('/register', register);

  routing.get('/feed', getAtomFeed);


  routing.get('/api/user', getUserRoute);
  
  routing.get('/api/pairs', getPairsRoute);
  routing.get('/api/pair', getPairRoute);

  routing.get('/api/events', getEventsRoute);
  routing.get('/api/event', getEventRoute);

  routing.get('/api/statistics_events', getEventsStatistics);
  routing.get('/api/statistics_users', getUserStatistics);

  routing.post('/api/bet', addBetRoute);
  routing.get('/api/bets', getBetsRoute);
  routing.start(port);
  intervalPairs();
  intervalEvents();
  // interval1Day();
  interval2Day();
  interval3Day();
})();