module.exports = (() => {
	'use strict';

	const addPair = (db, pair) => new Promise((resolve, reject) =>{
		//collection pairs
		//add
		const collection = db.collection('pairs');
		findPair(db, pair.id).then((pair) => {
			if (pair === null) {
				console.log(pair);
				collection.insertOne(pair, function(err, res) {
  		 			if (err) reject();
  		 			resolve();
  				});
			} else {
				reject('EXISTA DEJA BA CAP DE PULA');
			}
		})

	});


	const getPairs = (db) => new Promise((resolve, reject) => {
		const collection = db.collection('pairs');
		collection.find().toArray(function(err, docs) {
			if (err !== null) reject();
        	resolve(docs);
      	});
	});

	const findPair = (db, id) => new Promise((resolve, reject) => {
		const collection = db.collection('pairs');
		collection.findOne({'id': id}, function(err, pair) {
			if (err !== null) reject();
			resolve(pair);
		});
	});

	return {
		addPair, getPairs, findPair
	};


})();