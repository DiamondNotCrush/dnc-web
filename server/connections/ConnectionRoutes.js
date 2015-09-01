//Connection router
module.exports = function (app, Connections) {
  var connectionController = require('./ConnectionController.js')(Connections);
  //Update or Create client-server connection  
  app.post("/addConnection/:id(\\d+)", connectionController.addConnection);
};