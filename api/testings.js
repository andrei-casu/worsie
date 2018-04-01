(() => {
	'use strict';
	const {MongoClient} = require('mongodb');


	const {addPair} = require('./pairs.js');
	const {getPairs, findPair} = require('./pairs.js');
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

      addPair(db, {id: 12122, name: 'peleu'}).then(() => {
      	console.log('AM BAGAT PELEUL');
      }).catch((e) => {
      	console.log('N-AM BAGAT PELEUL PENTRU CA:\n');
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