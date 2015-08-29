var express = require('express');
var bodyParser = require('body-parser');
var model = require('./ConnectionModel.js');

var app = express();

app.set('view engine', 'html');
app.use('/', express.static('./public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Route for /connect
app.post('/connect', model.addConnection);

//Route for /view
app.post('/view', model.getConnections);

//Route for user
app.post('/user', model.addUser);

module.exports = app;