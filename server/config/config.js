/// When running Heroku, NODE_ENV will have value equal to "production"; when running test
/// through test script, NODE_ENV will have the value equal to "test"; If we don't run
/// Heroku or the test script, the NODE_ENV has no value, so env = 'production'
var env  = process.env.NODE_ENV || 'development';

console.log("****** env = ", env);


if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppDB';      //dBase for development
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTestDB';  //dBase for test
}
