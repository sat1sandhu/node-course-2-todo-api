const {ObjectID} = require ('mongodb');
const jwt        = require ('jsonwebtoken');

const {Todo}     = require ('./../../models/todo');
const {User}     = require ('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
      _id: userOneId,
      email: "andrew@example.com",
      password: 'userOnePass',
      tokens: [{
            access: 'auth',
            token: jwt.sign ({_id: userOneId, access: 'auth'}, 'abc123').toString()
      }]
},{
      _id: userTwoId,
      email: 'jen@example.com',
      password: 'userTwoPass'
}];

/// When running POST /todos, we remove all todos documents. This is not good for the GET /todos,
///  which requires documents in the todos collection. So we add some todos documents for the GET /todos
///  test
const todos = [{
    _id: new ObjectID(),
    text: "First test todos document"
},{
    _id: new ObjectID(),
    text: "Second test todos document",
    completed: true,
    completedAt: 987654
}];

const populateTodos = (done) => {
    Todo.remove({})
      .then ( () => {
          return Todo.insertMany(todos);
      })
      .then ( () => done() );
};

const populateUsers = (done) => {
      User.remove ({})
        .then ( () => {
            var userOne = new User (users[0]).save();
            var userTwo = new User (users[1]).save();

            return Promise.all ([userOne, userTwo])
        })
        .then ( () => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
