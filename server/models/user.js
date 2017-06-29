/// Don't need to load in the db/mongoose.js file; just need the mongoose library
var mongoose = require('mongoose');

/// Create a Mongoose model for user
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }

});

/// Export the model. Else we can't use in other files that need User
module.exports = {
    User
};
