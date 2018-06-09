module.exports = (() => {
  'use strict';
  const {addPair, getPairs, updatePair} = require('./actions')('Pair', 'pairs');
  const {addEvent, getEvents, updateEvent} = require('./actions')('Event', 'events');
  const {getBets, updateBet} = require('./actions')('Bet', 'bets');
  const {getCredits, updateCredit} = require('./actions')('Credit', 'credits');
  const {ObjectID} = require('mongodb');
  const faker = require('faker');

  const interval = 2 * 60 * 1000; // 2 minutes
  const day1 = 24 * 60 * 60 * 1000; // 2 minutes
  const min5 = 5 * 60 * 1000;
  const intervalP = 24 * 60 * 60 * 1000; // 24 hours

  const addNewEvent = (diff) => {
    // generate random event

    // 5 pairs for event
    const event = {
      name: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      timestamp: new Date().getTime() + diff,
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

  const interval1Day = () => {
    for (let i = 0; i < day1 / min5; ++i) {
      console.log(i);
      addNewEvent(min5 * i);
    }
    // addNewEvent(day1 + min5 * 5);
    // addNewEvent(day1 + min5 * 15);

    setTimeout(interval1Day, day1);
  };

  const interval2Day = () => {
    return;
    addNewEvent(2 * day1 + min5 * 5);
    addNewEvent(2 * day1 + min5 * 15);

    setTimeout(interval2Day, 2 * day1);
  };

  const interval3Day = () => {
    return;
    addNewEvent(3 * day1 + min5 * 5);
    addNewEvent(3 * day1 + min5 * 15);

    setTimeout(interval3Day, 3 * day1);
  };

  const intervalEvents = () => {
    // do smth
    // addNewEvent(interval);
    // addNewEvent(min5);

    getEvents({timestamp: {$lt: new Date().getTime(), $gt: new Date().getTime() - 1000 * 60 * 1000}}).then((events) => {

      events.map((event) => {
        if (event.pairs[0].result === undefined) {
          console.log(event);
          const pairs =  event.pairs;
          const used = {};
          pairs.map((pair) => {
            while (pair.result === undefined) {
              let rand = Math.floor(Math.random() * 5) + 1;
              if (used[rand] === undefined) {
                used[rand] = 1;
                pair.result = rand;

                // console.log(event._id, pair.pair);
                // getBets({event_id: event._id + '', pair_id: pair.pair + ''}).then((bets) => {
                //   console.log(bets);
                //   be
                // });

                getPairs({_id: ObjectID(pair.pair)}).then((pairs) => {
                  if (pairs.length === 0) return;
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

          getBets({event_id: event._id + ''}).then((bets) => {
            bets.map((bet) => {
              const {pair_id} = bet;
              let status;

              pairs.map((pair) => {
                if (pair.pair + '' === pair_id) {
                  if (pair.result === 1) {
                    status = 'won';
                    getCredits({user_id: bet.user_id}).then((credits) => {
                      const credit = credits[0];
                      updateCredit({user_id: bet.user_id}, {$set: {amount: credit.amount + pair.odd * bet.amount}});
                    });
                  }
                  else status = 'lost';
                }
              });

              console.log(status);
              updateBet({_id: ObjectID(bet._id)}, {$set: {status}}).then(() => {
                console.log('updated bet');
              });
            });
          });

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
    interval1Day,
    interval2Day,
    interval3Day,
    intervalPairs
  }
})();