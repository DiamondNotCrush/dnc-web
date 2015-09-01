//User Router
module.exports = function (app, Users) {
  var userController = require('./UserController.js')(Users);
  //Login route for user
  app.post('/login', userController.userLogin);
  //Sign up route for user
  app.post('/addUser', userController.addUser);
  //Update User info
  app.post('/updateUser/:id(\\d+)', userController.updateUser);
  //Library route for user
  app.get('/library', userController.fetchUserLibrary);
  
  app.get('/findUser/:id(\\d+)', userController.findUser);
};