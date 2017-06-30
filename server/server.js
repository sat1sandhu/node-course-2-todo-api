/// server.js is now only going to be responsible for our routes

var express      = require('express');
var bodyParser   = require('body-parser');

const {ObjectID} = require('mongodb');

/// Using ES6 destructuring to get from the mongoose object coming back from /db/mongoose.js
var {mongoose}  = require('./db/mongoose');

/// Using ES6 destructuring to get from the Todo object coming back from /db/todo.js
var {Todo} = require('./models/todo');

/// Using ES6 destructuring to get from the User object coming back from /db/user.js
var {User} = require('./models/user');


/// create a var called app that stores the express application
var app = express();

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

/// Call to listen to localhost ( a very basic server)
app.listen(3000, () => {
    console.log('Listening on port 3000');
})

module.exports = {
    app
}
