var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser');

module.exports = function (app, express, Users, Connections) {
  // var connectionRouter = express.Router();
  // var userRouter = express.Router();

  app.set('view engine', 'html');
  // app.use(morgan('dev'));
  // app.use(bodyParser.urlencoded({extended: true}));
  // app.use(bodyParser.json());
  app.use(express.static('public'));

  // app.use('/connection', connectionRouter); // user connection router for connection updates
  // app.use('/user', userRouter); // use user router for all user request


  // // inject our routers into their respective route files
  // require('../connections/connectionRoutes.js')(connectionRouter, Connections);
  // require('../users/userRoutes.js')(userRouter, Users);
};