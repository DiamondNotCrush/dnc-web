angular
  .module('app.view', [])
  .controller('viewController', ['view', 'user', function(view, user) {
    var _this = this;
    _this.user = user.details;

    view.Files.get({id:_this.user.id})
      .$promise
      .then(function(files) {
        console.log(files);
        _this.files = files;
      });
    //Service to pull library and format links

    //Functions to set source of media player and start playing

    //Functions to determine type of media from extension
  }]);