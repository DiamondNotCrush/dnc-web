//User Router
module.exports = function (app, Users, Connections) {
  var userController = require('./UserController.js')(Users, Connections);
  
  app.post('/login', userController.userLogin);
  app.post('/addUser', userController.addUser);
  app.post('/update', userController.updateUser);
  app.get('/find/:id(\\d+)', userController.findUser);
};