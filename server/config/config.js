/// When running Heroku, NODE_ENV will have value equal to "production"; when running test
/// through test script, NODE_ENV will have the value equal to "test"; If we don't run
/// Heroku or the test script, the NODE_ENV has no value, so env = 'production'
var env  = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require ('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach ( (key) => {
        process.env[key] = envConfig[key];
    });
}
