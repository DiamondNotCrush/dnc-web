angular
  .module('service.session', [])
  .service('session', ['$cookieStore', function ($cookieStore) {
    var localStoreAvailable = typeof (Storage) !== "undefined";
    var _this = this;
    
    function _store(name, data, persist) {
      persist = persist || false;

      if (localStoreAvailable) {
        if (angular.isObject(data) || angular.isArray(data) || angular.isNumber(+data || data)) {
          window[persist?'localStorage':'sessionStorage'].setItem(name, angular.toJson(data));
        }
      } else {
        $cookieStore.put(name, data);
      }
    }

    _this.store = function (name, details) {
      _store(name, details, false);
    };

    _this.persist = function (name, details) {
      _store(name, details, true);
    };

    _this.get = function (name) {
      return localStoreAvailable ? getItem(name) : $cookieStore.get(name);
    };

    _this.destroy = function (name) {
      if (localStoreAvailable) {
        localStorage.removeItem(name);
        sessionStorage.removeItem(name);
      } else {
        $cookieStore.remove(name);
      }
    };

    function getItem(name) {
      var data,
          localData = localStorage.getItem(name),
          sessionData = sessionStorage.getItem(name);

      data = sessionData || localData;

      if (data === '[object Object]') { return; }
      if (data === undefined || data === null || !data.length) { return; }

      if (data.charAt(0) === "{" || data.charAt(0) === "[" || angular.isNumber(data)) {
        return angular.fromJson(data);
      }

      return data;
    }

    return _this;
  }]);