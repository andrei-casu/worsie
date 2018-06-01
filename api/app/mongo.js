module.exports = (() => {
  'use strict';
  const {MongoClient} = require('mongodb');
  const url = 'mongodb://localhost:27017';
  const dbname = 'worsie';

  let mongo = null;

  const initialize = () => new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err) reject();
      else resolve(client);
    });
  });

  const getMongo = () => new Promise((resolve, reject) => {
    if (mongo === null) {
      initialize().then((client) => {
        const db = client.db(dbname);

        mongo = db;
        resolve(mongo);
      }).catch((e) => {
        console.log(e);
        reject();
      });
    }
    else {
      resolve(mongo);
    }
  });

  return {
    getMongo
  };
})();