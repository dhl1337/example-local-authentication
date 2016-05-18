/**
 * Created by danle on 5/16/16.
 */
'use strict';
// External Modules
var bodyParser = require('body-parser'),
    express = require('express'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    passport = require('passport');

// Config
var config = require('./config/config');

// Controllers
var UserCtrl = require('./controllers/UserController');

// Polices

// Express
var app = express();
// Express Middleware
app.use(bodyParser.json());
app.use(expressSession({
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../'));
// Middleware




require('./services/passport.js')(passport);

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
