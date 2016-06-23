
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
 
  $ionicConfigProvider.tabs.position('bottom'); 

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'task-dash': {
        templateUrl: 'templates/task-dash.html',
        controller: 'TaskCtrl'
      }
    }
  })

  .state('tab.add', {
    url: '/add',
    views: {
      'task-dash': {
        templateUrl: 'templates/task-add.html',
        controller: 'TaskCtrl'
      }
    }
  })

  .state('tab.show', {
    url: '/show/:taskId',
    views: {
      'task-dash': {
        templateUrl: 'templates/task-show.html',
        controller: 'TaskShowCtrl'
      }
    }
  })

  .state('tab.edit', {
    url: '/edit/:taskId',
    views: {
      'task-dash': {
        templateUrl: 'templates/task-add.html',
        controller: 'TaskEditCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings-edit.html',
        controller: 'SettingsCtrl'
      }
    }
  })
   
  .state('tab.timer', {
    url: '/timer',
    views: {
      'tab-timer': {
        templateUrl: 'templates/timer-show.html',
        controller: 'TimerCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/tab/dash');

});
