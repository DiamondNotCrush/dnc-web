var morgan      = require('morgan'), // used for logging incoming request
<<<<<<< HEAD
    bodyParser  = require('body-parser')

module.exports = function (app, express) {
  var userRouter = express.Router();
  var controllerRouter = express.Router();
=======
    bodyParser  = require('body-parser');

module.exports = function (app, express, Users, Connections) {
  var connectionRouter = express.Router();
  var userRouter = express.Router();
>>>>>>> cebffd3f5e69842b8787212ee1ac651f62f4d4c6

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../public'));

<<<<<<< HEAD
  app.use('/user', userRouter); // use user router for all user request

  app.use('/connection', controllerRouter); // user connection router for connection updates

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../connections/connectionRoutes.js')(controllerRouter);
=======
  app.use('/connection', connectionRouter); // user connection router for connection updates
  app.use('/user', userRouter); // use user router for all user request


  // inject our routers into their respective route files
  require('../connections/connectionRoutes.js')(connectionRouter, Connections);
  require('../users/userRoutes.js')(userRouter, Users);
>>>>>>> cebffd3f5e69842b8787212ee1ac651f62f4d4c6
};