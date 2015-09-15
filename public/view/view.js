angular
  .module('app.view', [])
  .controller('viewController', ['view', 'user', function(view, user) {
    var _this = this;
    _this.user = user.details;
    _this.showAudio = false;
    _this.showVideo = true;
    _this.mediaSrc = '';

    _this.setFilter = function(filter) {
      _this.filter = '';

      if (filter === 'audio') {
        _this.filter = {isAudio: true};
      }

      if (filter === 'video') {
        _this.filter = {isVideo: true};
      }
    };

    _this.play = function(file) {
      // _this.mediaSrc = file.url;
      //Anti-pattern. Change to not alter DOM from controller.
      var video = document.getElementsByTagName('video')[0];
      video.src = file.url;
      video.load();
    };

    _this.getLibrary = function(){
      view.Files.query({id:_this.user.id})
        .$promise
        .then(function(files) {
          _this.files = files;
        });
    };

    _this.getLibrary();
  }]);
