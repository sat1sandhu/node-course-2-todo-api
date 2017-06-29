var mongoose = require('mongoose');

/// Tell mongoose which promise library to use
/// We want to use the built-in promise library as opposed to some 3rd party promise library
mongoose.Promise = global.Promise;

/// connect using mongoose
mongoose.connect('mongodb://localhost:27017/TodoAppDB');


///allows mongoose properties and methoods to be used in other files
module.exports = {
    mongoose
};
