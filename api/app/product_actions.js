module.exports = (() => {
  'use strict';
  const {addPair, getPairs, updatePair} = require('./actions')('Pair', 'pairs');
  const {addEvent, getEvents, updateEvent} = require('./actions')('Event', 'events');
  const {getBets, updateBet} = require('./actions')('Bet', 'bets');
  const {ObjectID} = require('mongodb');
  const faker = require('faker');

  const interval = 5 * 60 * 1000; // 5 minutes
  const intervalP = 24 * 60 * 60 * 1000; // 24 hours

  const addNewEvent = () => {
    // generate random event

    // 5 pairs for event
    const event = {
      name: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      timestamp: new Date().getTime() + 5 * 60 * 1000,
      pairs: []
    }

    getPairs().then((pairs) => {
      let added = 0, i;
      const alreadyAdded = {};

      while (added < 5) {
        const rand = Math.floor(Math.random() * pairs.length);
        if (alreadyAdded[rand] === undefined) {
          ++added;
          alreadyAdded[rand] = true;
          event.pairs.push({
            pair: pairs[rand]._id,
            odd: (1 + (Math.random() * 5)).toFixed(2) * 1
          });
        }
      }

      console.log(event);
      addEvent(event);
      // console.log(event.pairs);


    });

  };

  const intervalEvents = () => {
    // do smth
    addNewEvent();

    getEvents({timestamp: {$lt: new Date().getTime()}}).then((events) => {
      // console.log(JSON.stringify(events, true, 2));
      console.log('AAAAAAAA');
      // return;
      // for each events update the result

      events.map((event) => {
        if (event.pairs[0].result === undefined) {
          const pairs =  event.pairs;
          const used = {};
          pairs.map((pair) => {
            while (pair.result === undefined) {
              let rand = Math.floor(Math.random() * 5) + 1;
              if (used[rand] === undefined) {
                used[rand] = 1;
                pair.result = rand;

                getPairs({_id: ObjectID(pair.pair)}).then((pairs) => {
                  const pair = pairs[0];
                  const {history} = pair;
                  history.push({place: rand, timestamp: event.timestamp});
                  console.log('update pair');
                  // console.log(history);
                  updatePair({_id: ObjectID(pair._id)}, {$set: {history}}).then(() => {
                    console.log('updated pair');
                  });
                });
              }
            }
          });
          //update bets

          getBets({event_id: event._id}).then((bets) => {
            console.log('BEEEEEEEEETS');
            console.log(bets);
            bets.map((bet) => {
              const {pair_id} = bet;
              let status;

              pairs.map((pair) => {
                if (pair._id === pair_id) {
                  if (pair.result === 1) status = 'won';
                  else status = 'lost';
                }
              });

              updateBet({_id: ObjectID(bet._id)}, {$set: {status}}).then(() => {
                console.log('updated bet');
              });
            });
          })

          updateEvent({_id: ObjectID(event._id)}, {$set: {pairs}}).then(() => {
            console.log('updated');
          });
        }

      })
    })

    setTimeout(intervalEvents, interval);
  }

  const intervalPairs = () => {
    const pair = {
      name: faker.name.findName() + ' and ' + faker.name.firstName(),
      description: faker.lorem.sentence(),
      full_description: faker.lorem.paragraph(),
      history: [],
      img_url: faker.image.sports()
    };

    return;

    getPairs().then((pairs) => {
      console.log(pairs);
    });

    return;

    addPair(pair).then((pair) => {
      console.log('added pair', pair);
    });


    setTimeout(intervalPairs, intervalP);
  }
  
  return {
    intervalEvents,
    intervalPairs
  }
})();