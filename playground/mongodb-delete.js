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
/// read and write


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to mongoDB Server');

    // /// Use deleteMany() to delete all documents having text="Eat lunch"
    // db.collection('Todos').deleteMany({text: 'Eat lunch'})
    //   .then( (result) => {
    //       console.log(`${result.result.n} document(s) removed from the dBase: `);
    //   })
    //   .catch ( (err) => {
    //       console.log('Error accessing dBase: ', err);
    //   });


      // /// Use deleteOne() to delete the first document to fit the query criteria. It deletes the
      // ///  first document, then it stops
      // db.collection('Todos').deleteOne({text:'Eat lunch'})
      //   .then ( (result) => {
      //       console.log(`${result.result.n} document(s) removed from the dBase`);
      //
      //   })
      //   .catch ( (err) => {
      //       console.log('Error accessing dBase: ', err);
      //   });


      /// Use findOneAndDelete(), actually gets the document back.
      ///   example using it to delete a document when we know its id
      db.collection('Todos').findOneAndDelete({_id: new ObjectID('5953273acf56eab9c94eaa9d')})
        .then ( (result) => {
            //console.log( `Document id: ${result.value._id} removed`);
            console.log( "removed Document details: ", JSON.stringify(result.value, undefined, 2));
        })
        .catch ( (err) => {
            console.log(`Unable to connect to dBase: ${err}`);
        });




    /// Closes the connection with the mongoDB server
    //db.close();
});
