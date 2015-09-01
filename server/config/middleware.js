var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser')

module.exports = function (app, express) {
  var userRouter = express.Router();
  var controllerRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../public'));

  app.use('/user', userRouter); // use user router for all user request

  app.use('/connection', controllerRouter); // user connection router for connection updates

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../connections/connectionRoutes.js')(controllerRouter);
};