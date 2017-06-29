var mongoose = require('mongoose');

/// Tell mongoose which promise library to use
/// We want to use the built-in promise library as opposed to some 3rd party promise library
mongoose.Promise = global.Promise;

/// connect using mongoose
mongoose.connect('mongodb://localhost:27017/TodoAppDB');

/// Next: Create a Model for each of the collections we want to store

  /// Model for the Todo collections. First argument in the model method is the string name,
  ///  second argument is the object. And this object is going to define the various properties
  ///  for the model
  var Todo = mongoose.model('Todo', {
      text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      completedAt: {
        type: Number,
        default: null
      }
  })



  /// Create a Mongoose model for user
  var User = mongoose.model('User', {
      email: {
          type: String,
          required: true,
          minlength: 1,
          trim: true
      }

  });

  // /// Create a new instance of the Todo function above. In it, we can specify a property,
  // ///  ex text: 'Cook dinner'. Note: creating this instance does not save it into the TodoAppDb dBase
  // var newTodo = new Todo({
  //     text: 'Cook Dinner'
  // });
  //
  // /// Save the instance newTodo to the dataBase by calling the save() method. This save() method
  // ///  returns a promise
  // newTodo.save()
  //   .then ( (doc) => {
  //       console.log('c)
  //   })
  //   .catch ( (err) => {
  //       console.log('Error saving to the dBase: ', err)
  //   });

    // var otherTodo = new Todo ({
    //     text: 'Feed the cat',
    //     completed: true,
    //     completedAt: 123
    // });
    //
    // otherTodo.save()
    //   .then ( (doc) => {
    //       console.log('saved otherTodo: ', JSON.stringify(doc, undefined, 2));
    //   })
    //   .catch( (err) => {
    //       console.log('Error saving otherTodo to the dBase: ', err);
    //   });

    // var emptyTodo = new Todo ({text:'   Edit this video   '});
    //
    // emptyTodo.save()
    //   .then ( (doc) => {
    //       console.log('Saved emptyTodo: ', JSON.stringify(doc, undefined, 2));
    //   })
    //   .catch ( (err) => {
    //       console.log('Error saving emptyTodo to the dBase: ', err);
    //   });


    var newUser = new User ({
          email: 'sat@sat.com'
    });

    newUser.save()
      .then ( (doc) => {
          console.log(JSON.stringify(doc, undefined, 2));
      })
      .catch ( (err) => {
          console.log ('Error saving newUser to the dBase: ', err);
      });




      
