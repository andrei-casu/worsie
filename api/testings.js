(() => {
	'use strict';
	const {MongoClient} = require('mongodb');

	const {addPair, getPairs, findPair, removePair} = require('./pairs.js');
	connectToMongo();

	function connecttomongo() {
    const url = 'mongodb://localhost:27017';

    const dbname = 'worsie';

    // use connect method to connect to the server
    mongoclient.connect(url, function (err, client) {
      if (err !== null) {
        console.log('error connecting to the server');
        return;
      }

      console.log("connected successfully to server");
      const db = client.db(dbname);
      
      addpair(db, {id: 12122, name: 'peleu'}).catch((e) => {
      	console.log(e);
      });
      removepair(db, 12122).then(() => {
      	getpairs(db).then((pairs) => {
      		console.log(pairs);
      	}).catch((e) => {
      		console.log(e);
      	})
      }).catch((e) => {
      	console.log(e);
      });
      // getpairs(db).then((pairs) => {
      // 	console.log(pairs);
      // }).catch((e) => {
      // 	console.log(e);
      // });
      // findpair(db, 12122).then((pair) => {
      // 	console.log(pair);
      // }).catch((e) => {
      // 	console.log(e);
      // });
    });
  }
})();