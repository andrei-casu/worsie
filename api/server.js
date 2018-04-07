(() => {
  const routing = require('./routing');
  const {MongoClient} = require('mongodb');
  const {checkAuthenticated, authenticate, register} = require('./app/authentication');
  const {getUserRoute} = require('./app/user_routes');
  const port = 3000;

  routing.applyMiddleware('/api', checkAuthenticated);

  routing.post('/authenticate', authenticate);
  routing.post('/register', register);


  routing.get('/api/user', getUserRoute);
  
  routing.start(port);
})();