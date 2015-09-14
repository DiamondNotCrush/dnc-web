angular
  .module('app.view', [])
  .controller('viewController', ['view', 'user', function(view, user) {
    var _this = this;
    _this.user = user.details;
    _this.showAudio = false;
    _this.showVideo = true;
    _this.mediaSrc = '';
    _this.video = [];
    _this.audio = [];
    $scope.play = false;


    _this.play = function(file) {
      // _this.mediaSrc = file.url;
      //Anti-pattern. Change to not alter DOM from controller.
      var video = document.getElementsByTagName('video')[0];
      video.src = file.url;
      $scope.play = true;
      video.load();
    };

    _this.getLibrary = function(){
      view.Files.query({id:_this.user.id})
        .$promise
        .then(function(files) {
          _this.files = files;
        });
    };

    _this.showMovies = function(){
      if (_this.video.length > 0) {
        _this.files = _this.video;
      } else {
        _this.files.forEach(file, function (file){
          var ext = file.name.toLowerCase.substring(file.name.length - 3);
          console.log(ext);
          if (ext === 'mp4' || ext === 'ebm' || ext === 'avi' || ext === 'mkv') {
            console.log(file);
            _this.video.push(file);
          }
        });
      }
      _this.files = _this.video;
    };

    _this.showMusic = function(){
      if (_this.audio.length > 0) {
        _this.files = _this.audio;
      } else {
        _this.files.forEach(file, function (file){
          var ext = file.name.toLowerCase.substring(file.name.length - 3);
          if (ext === 'mp3' || ext === 'aac' || ext === 'wma' || ext === 'wav') {
            _this.audio.push(file);
          }
        });
      }
      _this.files = _this.audio;
    }

    _this.getLibrary();
  }]);
