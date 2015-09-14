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

    _this.showMovies = function(){
      if (_this.video.length > 0) {
        _this.files = _this.video;
      } else {
        for (var n = 0; n < _this.files.length; n++) {
          if (_this.files[n] && _this.files[n].isVideo) {
            _this.video.push(_this.files[n]);            
            }
          }
        };
      _this.files = _this.video;
      console.log(_this.files);
    };

    _this.showMusic = function(){
      if (_this.audio.length > 0) {
        _this.files = _this.audio;
      } else {
        for (var n = 0; n < _this.files.length; n++) {
          if (_this.files[n] && _this.files[n].isAudio) {
            _this.audio.push(_this.files[n]);
            }
          }
        };
      _this.files = _this.audio;
    };

    _this.getLibrary();
  }]);
