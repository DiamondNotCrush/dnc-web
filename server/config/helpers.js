module.exports = function () {
  return {
    isAuthenticated: function(req, res, next) {
      var sess = req.session;
      var loggedIn = req.session ? !!req.session.user : false;
      if (!loggedIn) {
        res.redirect(301, '/');
        res.send();
      } else {
        next();
      }
    }
  }
}