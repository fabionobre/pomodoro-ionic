angular.module('starter.services').factory('Settings', function() {

  var settings = loadLocalSorange("settings") || {'short_break': 5, 'long_break': 30};
  settings.work_time = 25;

  return { 
    all: function() {
      return settings;
    },
    save: function(settings) {
      this.settings = settings;
      localStorage.setItem("settings", angular.toJson(settings));
    }
  };
})