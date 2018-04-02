module.exports = (() => {
	'use strict';

	const addPair = (db, newPair) => new Promise((resolve, reject) =>{
		//collection pairs
		//add
		const collection = db.collection('pairs');
		findPair(db, newPair.id).then((oldPair) => {
			if (oldPair === null) {
				collection.insertOne(newPair, function(err, res) {
  		 			if (err) reject();
  		 			console.log('succesfully added object: ' + newPair.toString());
  		 			resolve();
  				});
			} else {
				reject('object already exists in database');
			}
		}).catch((e) => {
			console.log(e);
		});

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

	const removePair = (db, id) => new Promise((resolve, reject) => {
		const collection = db.collection('pairs');
		findPair(db, id).then((foundPair) => {
			if (foundPair === null) {
				console.log('object does not exist in database');
			} else {
				collection.remove(foundPair);
				console.log('object with id ' + id + ' removed succesfully');
			}
		}).catch((e) => {
			console.log(e);
		});
	});

	return {
		addPair, getPairs, findPair, removePair
	};


})();