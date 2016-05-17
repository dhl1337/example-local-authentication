/**
 * Created by danle on 5/16/16.
 */
// External Modules
var bodyParser = require('body-parser'),
    express = require('express'),
    expressSession = require('express-session'),
    mongoose = require('mongoose');


// Config
var config = require('./config/config');

// Controllers
var UserCtrl = require('./controllers/UserController');

// Services
//var passport = require('./services/passport');

// Polices

// Express
var app = express();

app.use(bodyParser.json());
app.use(expressSession({
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));
//app.use(passport.initialize());
//app.use(passport.session());

// Middleware

// Connections
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
    console.log('Connected to Mongo DB at', mongoURI);
    app.listen(port, function() {
        console.log('Listening on port', port);
    })
});
