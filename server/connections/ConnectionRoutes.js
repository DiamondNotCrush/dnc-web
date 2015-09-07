//Connection router
module.exports = function (app, Connections) {
  var connectionController = require('./ConnectionController.js')(Connections);
  
  //Update or Create client-server connection  
  app.post("/addConnection", connectionController.addConnection);
  //Library route for user
  app.get('/library/:id(\\d+)', connectionController.fetchUserLibrary);
  //Verify user's connection
  app.get('/verify/:port(\\d+)', connectionController.verifyConnection);
};