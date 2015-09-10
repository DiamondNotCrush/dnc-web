//User Router
module.exports = function (app, Users, Connections) {
  var userController = require('./UserController.js')(Users, Connections);
  
  app.post('/login', userController.userLogin);
  app.post('/addUser', userController.addUser);
  app.post('/updateUser', userController.updateUser);
  app.get('/findUser/:id(\\d+)', userController.findUser);
  app.post('/changePassword', userController.changePassword);
};