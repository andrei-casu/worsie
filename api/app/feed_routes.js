module.exports = (() => {
  'use strict';
  const {getEvents} = require('./actions')('Event', 'events');
  const Feed = require('feed');
  
  const getAtomFeed = (req, res) => {
    let feed = new Feed({
      title: 'Worsie',
      description: 'This is a feed for the upcoming horse races',
      link: 'http://206.189.30.132',
      copyright: 'All rights reserved 2018, John Doe',
      author: {
        name: 'Worsie',
        email: 'a@example.com',
        link: 'http://206.189.30.132'
      }
    });

    getEvents({timestamp: { $gt: new Date().getTime() }}).then((events) => {
      console.log(events.length);
      events.map((event, index) => {
        if (index < 10)
          feed.addItem({
            title: event.name,
            description: event.description,
            date: new Date(event.timestamp),
            link: `http://206.189.30.132/#/event/${event._id}`
          });
      });

      res.end(feed.atom1());

      // res.json({success: true, events});
    });
  };
  
  return {
    getAtomFeed
  };
})();