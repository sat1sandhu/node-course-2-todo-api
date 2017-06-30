const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

/// Grab the _id of any document in the todos collections
var id = '5954a2fd25c4e3175961b014zz';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');

}

/// Mongoose can take an id as a String, convert it to ObjectId, then use it in the query
/// This means we don't hv to manually convert our id from a string into an ObjectId


// /// Use Todo.find() to list all todos documents - Returns an Array of document objects
// ///   Returns an empty Array if the todos collection has zero documents found for the query
// Todo.find({ _id: id })
//   .then ( (docs) => {
//       console.log('Todo.find() docs: ', docs);
//   })
//   .catch ( (err) => {
//       console.log('Todo.find() error: ', err);
//   });
//
//
//   /// Use Todo.fineOne() to return the document matching the id - Returns the document object
//   ///   Returns null if the todos collection has zero documents found for the query
//   Todo.findOne({_id: id})
//     .then ( (doc) => {
//         console.log('Todo.findOne() doc: ', doc);
//     })
//     .catch ( (err) => {
//         console.log('Todo.findOne() error: ', err);
//     })

    // ///Use Todo.findById to list the document matching the id
    // Todo.findById(id)
    //   .then ( (doc) => {
    //       if (!doc) {
    //           return console.log('Id not found');
    //       }
    //       console.log('Todo.findById() doc: ', doc);
    //   })
    //   .catch ( (err) => {
    //       console.log('Todo.findById() error: ', err);
    //   });


    /// Use User.findById() to list the document matching the Id
    User.findById(id)
      .then ( (user) => {
          if (!user) {
              console.log('Unable to find user');
          }
          console.log(JSON.stringify(user, undefined, 2));
      })
      .catch ( (err) => {
          console.log(err);
      });
