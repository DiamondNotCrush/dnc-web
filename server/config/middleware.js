var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session     = require('express-session'),
    SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = function (app, express, sequelize, Users, Connections) {
  var connectionRouter = express.Router();
  var userRouter = express.Router();

  app.enable('trust proxy');
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  //Session Cookie
  app.use(session({
    secret: "Fahgettaboutit",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    }),
    cookie: {
      maxAge: 1000 * 60 * 12,
      }
    }
  ));

  app.use('/connection', connectionRouter); // user connection router for connection updates
  app.use('/user', userRouter); // use user router for all user request

  // inject our routers into their respective route files
  require('../connections/ConnectionRoutes.js')(connectionRouter, Connections);
  require('../users/UserRoutes.js')(userRouter, Users);
};