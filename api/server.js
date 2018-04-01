(() => {
  const routing = require('./routing');
  const {MongoClient} = require('mongodb');
  const port = 3000;

  routing.get('/', (req, res) => {
    res.end('Marcelee');
  });

  routing.get('/text', (req, res) => {
    res.end('COSTELEEE');
  });
  
  routing.start(port);
})();