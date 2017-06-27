


/// Step 3: ES6 De-structuring

  /// We comment out this because we use destructuring to pull out MongoClient property from mongodb
  //const MongoClient = require('mongodb').MongoClient;

  /// This creates a variable called MongoClient, setting it equal to the MongoClient property of require('mongodb')
  /// This is identical to  const MongoClient = require('mongodb').MongoClient;
  //const {MongoClient} = require('mongodb');

  /// Note: Can create a number of destructured variables from the object, example MongoClient and ObjectID from
  ///       the require('mongodb') object
  const {MongoClient, ObjectID} = require('mongodb');

  /// If we wanted to create our own objectId from the destructured ObjectID, we can do so
  /// Tested ok. SO I comment out as we allow mongo to auto create the objectId
  //var objId = new ObjectID();
  //console.log("new objectId = ", objId);



/// Use the mongo Library to connect to the mongoDB Server, print a message, then disconnect from the mongoDB Server
/// call connect() to connect to the database. We create a database we will name as TodoApp
/// in the callback function, we have err if there was an error during the dBase connection,
/// else err will not exist if connection succeeded; else we process the db object we can use to
/// read and write data
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to mongoDB Server');

    /// Step 1: Create a collection called Todos. Then use method insertOne to insert a new document into the collection
    // db.collection('Todos').insertOne({
    //     text:"Walk the dog on Friday",
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Todos', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // /// Step 2: Create a collection called Users. Then use method insertOne to insert a new document into the collection
    // db.collection('Users').insertOne ({
    //     name: "Sat Sandhu",
    //     age: 52,
    //     location: 'Brisbane'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Users', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //
    //     /// To get the timestamp when the objectId was created
    //     console.log(result.ops[0]._id.getTimestamp());
    // });



    /// Closes the connection with the mongoDB server
    db.close();
});
