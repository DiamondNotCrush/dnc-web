angular
  .module('app.view', [])
  .controller('viewController', ['view', 'user', function(view, user) {
    var _this = this;
    _this.user = user.details;

    view.File.files()
      .$promise
      .then(function(data) {
        console.log(data);
        _this.files = data;
      });
    //Service to pull library and format links

    //Functions to set source of media player and start playing

    //Functions to determine type of media from extension
  }]);