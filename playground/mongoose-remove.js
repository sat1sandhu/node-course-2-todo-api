const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

// /// To remove all the documents in the todos collection
// /// We don't get the documents back in result
// Todo.remove({})
//   .then ( (result) => {
//       console.log(result);
// });

/// To remove a document by Id
Todo.findByIdAndRemove("5958cabce6f9d46ef1db1fb8")
  .then ( (todo) => {
      console.log(todo);
  });
