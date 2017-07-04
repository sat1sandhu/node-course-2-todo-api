/// npm run test-watch

const expect  = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const {app}   = require('./../server');
const {Todo}  = require('./../models/todo');

// /// Useful for the POST /todos - Remove all todos collection documents
// /// This was used only to test POST /todos
// beforeEach( (done) => {
//     Todo.remove({})
//       .then ( () => done());
// });


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


/// Useful for both GET /todos and  POST /todos
beforeEach( (done) => {
    Todo.remove({})
      .then ( () => {
          return Todo.insertMany(todos);
      })
      .then ( () => {
          done();
      })
      .catch ( (err) => {
          return done(err);
      });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect( (res) => {
              expect(res.body.text).toBe(text);
          })
          .end( (err, res) => {
                if (err) {
                    return done(err);
                }

                /// Search the todos collection for document with text =  'Test todo text'
                Todo.find({text})
                  .then ( (todos) => {
                      expect(todos.length).toBe(1);
                      expect(todos[0].text).toBe(text);
                      done();
                  })
                  .catch ( (err) => {
                      done(err);
                  })
          });
    });


    it('Should not create todo with invalid body data', (done) => {
        //var text = "     ";
        var text = "";

        request(app)
          .post('/todos')
          .send({text})
          .expect(400)
          .end( (err, res) => {
              if (err) {
                  return done(err);
              }

              Todo.find()
                .then ( (todos) => {
                    expect(todos.length).toBe(2);
                    done();
                })
                .catch ( (err) => {
                    done(err);
                });
          });
    });


});



describe ( 'GET /todos', () => {

    it ('Should get all todo documents', (done) => {
          request(app)
            .get('/todos')
            .expect(200)
            .expect ( (res) => {
                expect(res.body.docs.length).toBe(2);
            })
            .end( done);
    });
});


describe ('GET /todos/:id', () => {

    it ('Should return todo doc', (done) => {
          request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it ('Should return 404 if todo not found', (done) => {
          var id = new ObjectID().toHexString();
          request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done)
    });


    it ('Should return 404 for non-object ids', (done) => {
          request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done)
    });
});



describe ('DELETE /todos/:id', () => {

    it('Should remove todo document', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect( (res) => {
              expect(res.body.todo._id).toBe(hexId);
          })
          .end( (err, res) => {
            if (err) {
                return done(err);
            }
            /// Query dBase using id to confirm it has been removed
            Todo.findById(hexId)
              .then ( (todo) => {
                  expect(todo).toNotExist();
                  done();
              })
              .catch ( (err) => {
                  done(err);
              });
          })
    });


    it('Should return 404 if todo not found', (done) => {
        var id = new ObjectID().toHexString();
        request(app)
          .delete(`/todos/${id}`)
          .expect(404)
          .end(done);
    });

    it('Should return 404 for non-object ids', (done) => {
        request(app)
          .delete('/todos/123abc')
          .expect(404)
          .end(done);
    });

});



describe('PATCH /todos/:id', () => {

  it('Should clear completeAt when todo is not completed', (done) => {
      var hexId = todos[1]._id.toHexString();
      request(app)
        .patch(`/todos/${hexId}`)
        .send({"completed": false})
        .expect(200)
        .expect( (res) => {
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.comletedAt).toNotExist();
        })
        .end ( (err, res) => {
              if (err) {
                  return done(err);
              }

              Todo.findById(hexId)
                .then ( (todo) => {
                    expect(todo.completed).toBe(false);
                    expect(todo.completedAt).toNotExist();
                    done();
                })
                .catch ( (err) => {
                    done(err);
                });
        });
    });


    it('Should update todo document', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
          .patch(`/todos/${hexId}`)
          .send({"completed": true})
          .expect(200)
          .expect( (res) => {
            expect( res.body.todo.completed).toBe(true);
          })
          .end ( (err, res) => {
              if (err) {
                  return done(err);
              }

              Todo.findById(hexId)
                .then ( (todo) => {
                    expect(todo.completed).toBe(true);
                    done();
                })
                .catch ( (err) => {
                    done(err);
                });
          });
      });


      // it('Should clear completeAt when todo is not completed', (done) => {
      //     var hexId = todos[1]._id.toHexString();
      //     request(app)
      //       .patch(`/todos/${hexId}`)
      //       .send({"completed": false})
      //       .expect(200)
      //       .expect( (res) => {
      //           expect(res.body.todo.completed).toBe(false);
      //           expect(res.body.todo.comletedAt).toNotExist();
      //       })
      //       .end ( (err, res) => {
      //             if (err) {
      //                 return done(err);
      //             }
      //
      //             Todo.findById(hexId)
      //               .then ( (todo) => {
      //                   expect(todo.completed).toBe(false);
      //                   expect(todo.completedAt).toNotExist();
      //                   done();
      //               })
      //               .catch ( (err) => {
      //                   done(err);
      //               });
      //       });
      //   });


});

//});
