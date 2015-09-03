angular
  .module('app.view', [])
  .controller('viewController', ['view', 'user', function(view, user) {
    var _this = this;
    _this.user = user.details;
    _this.showAudio = false;
    _this.showVideo = true;
    _this.mediaSrc = '';


    _this.play = function(file) {
      _this.mediaSrc = file.url;
    };

    _this.getLibrary = function(){
      view.Files.query({id:_this.user.id})
        .$promise
        .then(function(files) {
          console.log(files);
          _this.files = files;
        });
    };

    _this.getLibrary();
  }]);