(() => {
	'use strict';
	const {MongoClient} = require('mongodb');

	const {addPair, getPairs, findPair, removePair} = require('./pairs.js');
	connectToMongo();

	function connectToMongo() {
    const url = 'mongodb://localhost:27017';

    const dbName = 'worsie';

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
      if (err !== null) {
        console.log('error connecting to the server');
        return;
      }

      console.log("Connected successfully to server");
      const db = client.db(dbName);
      
      addPair(db, {id: 12122, name: 'peleu'}).catch((e) => {
      	console.log(e);
      });
      removePair(db, 12122).then(() => {
      	getPairs(db).then((pairs) => {
      		console.log(pairs);
      	}).catch((e) => {
      		console.log(e);
      	})
      }).catch((e) => {
      	console.log(e);
      });
      // getPairs(db).then((pairs) => {
      // 	console.log(pairs);
      // }).catch((e) => {
      // 	console.log(e);
      // });
      // findPair(db, 12122).then((pair) => {
      // 	console.log(pair);
      // }).catch((e) => {
      // 	console.log(e);
      // });
    });
  }
})();