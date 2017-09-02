/// Don't need to load in the db/mongoose.js file; just need the mongoose library
var mongoose = require('mongoose');

// Model for the Todo collections. First argument in the model method is the string name,
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
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        requred: true
    }
})


/// Export the model. Else we can't use in other files that need Todo
module.exports = {
    Todo
};
