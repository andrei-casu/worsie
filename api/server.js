(() => {
  const http = require('http');
  const {MongoClient} = require('mongodb');
  const port = 3000;

  const requestHandler = (request, response) => {
    console.log(request);
    // console.log(request.url)
    response.end('Hello Node.js Server!');
  }

  const server = http.createServer(requestHandler);

  server.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
    connectToMongo();
  });

  const connectToMongo = () => {
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

      const collection = db.collection('documents');
      // Insert some documents
      collection.find({}).toArray(function(err, docs) {
        // assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        // callback(docs);
      });
      // collection.insertMany([
      //   { a: 1 }, { a: 2 }, { a: 3 }
      // ], function (err, result) {
      //   // assert.equal(err, null);
      //   // assert.equal(3, result.result.n);
      //   // assert.equal(3, result.ops.length);
      //   console.log("Inserted 3 documents into the collection");
      //   console.log(result);
      // });
      // client.close();
    });
  };
})();