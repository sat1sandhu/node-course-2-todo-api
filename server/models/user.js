/// Don't need to load in the db/mongoose.js file; just need the mongoose library
const mongoose   = require ('mongoose');
const validator  = require ('validator');
const jwt        = require ('jsonwebtoken');
const _          = require ('lodash');
const bcrypt     = require ('bcryptjs');

var UserSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
      var user = this;
      var access = 'auth';
      var token  = jwt.sign ({_id: user._id.toHexString(), access}, 'abc123').toString();

      user.tokens.push ({access, token});

      return user.save()
        .then ( () => {
            return token;
        });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
          decoded = jwt.verify (token, 'abc123');
    } catch (e) {
          return Promise.reject();
    }

    return User.findOne ({
        '_id':  decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
      var User = this;

      return User.findOne ({email})
        .then ( (user) => {
              if (!user) {
                  return Promise.reject();
              }

              return new Promise ( (resolve, reject) => {
                bcrypt.compare (password, user.password, (err, res) => {
                      if (res) {
                          resolve(user);
                      } else {
                          reject();
                      }
                });

              });
        })
}

/// Middleware to create a hash for the user's password on signup
UserSchema.pre ('save', function(next) {
      var user = this;
      var password = user.password;

      if ( user.isModified('password')) {
          bcrypt.genSalt (10, (err, salt) => {
              bcrypt.hash (password, salt, (err, hash) => {
                  user.password = hash;
                  next();
              });
          });
      } else {
          next();
      }
});

/// Create a Mongoose model for user
var User = mongoose.model('User', UserSchema);

/// Export the model. Else we can't use in other files that need User
module.exports = {
    User
};
