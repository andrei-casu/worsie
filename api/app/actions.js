module.exports = (() => {
  'use strict';
  const {getMongo} = require('./mongo');
  // const uniqid = require('uniqid');

  const addElement = (type) => (element) => new Promise((resolve, reject) => {
    getMongo().then((db) => {
      const elements = db.collection(type);

      // pair.id = uniqid();
      elements.insertOne(element, (err, res) => {
        if (err) return reject(err);
        resolve(element);
      });
    });
  });

  const updateElement = (type) => (query, update) => new Promise((resolve, reject) => {
    getMongo().then((db) => {
      const elements = db.collection(type);

      console.log(update);
      elements.updateOne(query, update, (err, result) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });

  const getElements = (type) => (query) => new Promise((resolve, reject) => {
    getMongo().then((db) => {
      const elements = db.collection(type);
      if (query === undefined) query = {};

      elements.find(query).sort({timestamp: -1}).toArray((err, elements) => {
        if (err) return reject(err);
        resolve(elements.reverse());
      });
    });
  })
  
  return (single, type) => {
    const ret = {};
    ret[`add${single}`] = addElement(type);
    ret[`get${single}s`] = getElements(type);
    ret[`update${single}`] = updateElement(type);

    return ret;
  };
})();