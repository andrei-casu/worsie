module.exports = (() => {
  'use strict';
  const {getPairs} = require('./actions')('Pair', 'pairs');
  const {ObjectID} = require('mongodb');

  const getPairsRoute = (req, res) => {
    getPairs().then((pairs) => {
      res.json({success: true, pairs});
    }).catch((e) => {
      console.log(e);
      res.json({success: false});
    });
  };

  const getPairRoute = (req, res) => {
    console.log(req.query);
    try {
      getPairs({_id: ObjectID(req.query.id)}).then((pairs) => {
        if (pairs.length !== 1) return res.json({success: false});
  
        res.json({success: true, pair: pairs[0]});
      }).catch((e) => {
        console.log(e);
      });
    } catch (error) {
      res.json({success: false});
    }
    
  };
  
  return {
    getPairsRoute,
    getPairRoute
  };
})();