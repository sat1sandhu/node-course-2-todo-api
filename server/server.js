require('./config/config');


/// server.js is now only going to be responsible for our routes
const _          = require('lodash');
const express    = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

/// Using ES6 destructuring to get from the mongoose object coming back from /db/mongoose.js
var {mongoose}  = require('./db/mongoose');

/// Using ES6 destructuring to get from the Todo object coming back from /db/todo.js
var {Todo} = require('./models/todo');

/// Using ES6 destructuring to get from the User object coming back from /db/user.js
var {User} = require('./models/user');

var {authenticate} = require ('./middleware/authenticate');


/// create a var called app that stores the express application
var app = express();

/// Add for HEROKU deployment
/// process.env.PORT will have a value if the app is running on Heroku; it will NOT be set if
///   the app is running locally (on localhost). SO we add OR 3000
//const port = process.env.PORT || 3000;
const port = process.env.PORT;

/// Middleware for bodyParser
app.use(bodyParser.json());


/// create a POST route that allows us to create new todos
app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo ({
      text: req.body.text
  });
  todo.save()
    .then ( (doc) => {
        res.send(doc);
    })
    .catch ( (err) => {
        res.status(400).send(err);

    });
});

app.get('/todos', (req, res) => {
    Todo.find()
      .then ( (docs) => {
          res.send({docs});
      })
      .catch ( (err) => {
          res.status(400).send(err);
      });
});


app.get('/todos/:id', (req,res) => {
      var id = req.params.id;
      if (!ObjectID.isValid(id)) {
          return res.status(404).send();
      }

      Todo.findById(id)
        .then ( (todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            //res.send(JSON.stringify(todo, undefined, 2));
            res.send({todo});
        })
        .catch ( (err) => {
            res.status(400).send(err);
        });
});


app.delete('/todos/:id', (req, res) => {
      var id = req.params.id;
      if (!ObjectID.isValid(id)) {
          return res.status(404).send();
      };

      Todo.findByIdAndRemove(id)
        .then ( (todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            /// The removed document
            res.send({todo});
        })
        .catch ( (err) => {
            res.status(400).send(err);
        });
});

app.delete ('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken (req.token)
      .then ( () => {
          res.status(200).send();
      }, () => {
          res.status(400).send();
      });
});

/// Create a patch route. Patch is what we use to update a resource
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    /// We only want user to be able to update some of the properties, not all
    ///  with pick(), we can specify which properties can be updated by user
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    /// Verify that completed is a boolean and is True
    if (_.isBoolean(body.completed) && body.completed) {
          /// Return a javaScript timestamp since epoch
          body.completedAt = new Date().getTime();
    } else {
          body.completed = false;
          body.completedAt = null;
    }

    //console.log('body = ', body);

    Todo.findByIdAndUpdate (id, {$set: body}, {new: true})
      .then ( (todo) => {
          if (!todo) {
              return res.status(404).send();
          }
          //console.log('todo = ', todo);
          res.send({todo});

      })
      .catch ( (err) => {
          res.status(400).send(err);
      });
});

/// Create a new User
app.post ('/users', (req, res) => {
    var body = _.pick (req.body, ['email', 'password']);
    var user = new User (body);
    user.save()
      .then ( () => {
            return user.generateAuthToken();
      })
      .then ( (token) => {
            res.header('x-auth',token).send(user);
      })
      .catch ( (err) => {
            res.status(400).send(err);
      });

});

/// Login
app.post ('/users/login', (req, res) => {
    var body = _.pick (req.body, ['email', 'password']);
    console.log("body = ", body);

    User.findByCredentials (req.body.email, req.body.password)
      .then ( (user) => {
            return user.generateAuthToken()
             .then ( (token) => {
                 res.header ('x-auth', token).send(user);
             });
      })
      .catch ( (err) => {
            res.status(400).send();
      });

});

/// Test out the authentication
app.get ('/users/me', authenticate, (req, res) => {
      res.send(req.user);
});


// /// Call to listen to localhost ( a very basic server)
// app.listen(3000, () => {
//     console.log('Listening on port 3000');
// })


/// Call to listen to heroku or localhost ( a very basic server)
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

module.exports = {
    app
}
