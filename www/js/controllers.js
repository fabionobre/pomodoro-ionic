angular.module('starter.controllers', [])

.controller('TaskCtrl', function($scope, $state, Tasks) {

  $scope.tasks = Tasks.all();
  $scope.remove = function(task) {
    Tasks.remove(task);
  };
  $scope.add = function() {
    $state.go('tab.add'); 
  };

  $scope.show = function(taskId) {
    $state.go('tab.show'); 
  };

  $scope.save = function(task) {
    Tasks.add(task);
    $state.go('tab.dash'); 
  }
})

.controller('TaskShowCtrl', function($scope, $stateParams, Tasks) {

console.log($stateParams.taskId);
  $scope.task = Tasks.get($stateParams.taskId);

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.activateDelete = function() {
    console.log('ok');
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
