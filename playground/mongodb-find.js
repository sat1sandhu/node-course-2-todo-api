/// This is used to demo the finding process


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

    // db.collection('Todos').find({}, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to get data from the DataBase', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    /// using methods such as toArray() specified in http://mongodb.github.io/node-mongodb-native/2.2/api/
    //db.collection('Todos').find({completed: false}).toArray().then ( (docs) => {
    db.collection('Todos').find({_id: new ObjectID('595200b74ca92832c64042a0')}).toArray().then ( (docs) => {
        //console.log(JSON.stringify(docs, undefined, 2));
        console.log(docs);
    }). catch ( (err) => {
        console.log('Unable to fetch Todos: ', err);
    });

    /// Give number of users located in Brisbane
    db.collection('Users').find({location: 'Brisbane'}).count().then ( (data) => {
          console.log("\nTotal users living in Brisbane is ", data);
    }).catch ( (err) => {
          console.log('Unable to fetch Users: ', err);
    })

    /// Give listing of users living in Brisbane
    db.collection('Users').find({location: "Brisbane"}).toArray().then ( (docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }). catch ( (err) => {
        console.log('Unable to fetch Users: ', err);
    })



    /// Closes the connection with the mongoDB server
    db.close();
});
