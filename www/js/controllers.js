angular.module('starter.controllers', [])

.controller('TaskCtrl', function($scope, $state, Tasks, $ionicActionSheet) {

  $scope.tasks = Tasks.all();

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

  $scope.onHold = function(task) {

   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Edit' }
     ],
     destructiveText: 'Delete',
     cancelText: 'Cancel',
     cancel: function() {
         
        },
     buttonClicked: function(index) {

        if (index == 0) {
          $state.go('tab.edit', { taskId: task.id }); 
        }
        return true;
     },
     destructiveButtonClicked: function() {
        Tasks.remove(task);
        $scope.tasks = Tasks.all(); 
        return true;
     }
   });
  }   
})

.controller('TaskShowCtrl', function($scope, $stateParams, Tasks, Timer, $state) {
  
  $scope.task = Tasks.get($stateParams.taskId);

  $scope.remove = function() {
    Tasks.remove($scope.task);
    $state.go('tab.dash'); 
  }

  $scope.start = function() {
    Timer.start($scope.task);
    $state.go('tab.timer', { taskId: $scope.task.id }); 
  }
})

.controller('TaskEditCtrl', function($scope, $stateParams, Tasks, $state) {

  $scope.task = Tasks.get($stateParams.taskId);

  $scope.save = function(task) {
    Tasks.change(task);
    $state.go('tab.dash'); 
  }
})

.controller('SettingsCtrl', function($scope, Settings, $ionicPopup) {
  $scope.settings = Settings.all();
  $scope.save = function(settings) {
    Settings.save(settings);
    $scope.showAlert();
  }  

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Success',
      template: 'Settings saved with success'
    });
  };
})

.controller('TimerCtrl', function($scope, $stateParams, Timer, Tasks, $timeout) {

  var timer = null;
  $scope.counter = 0;
  $scope.task = Timer.getTask();

  if ($scope.task != null && timer == null) {
    $scope.counter = 25*60;
    timer = $timeout(function() { $scope.onTimeout(); }, 1000);    
  }
  
  $scope.onTimeout = function() {

    if ($scope.counter ===  0) {
      $scope.$broadcast('timer-stopped', 0);
      $timeout.cancel(timer);
      return;
    }
    $scope.counter--;
    timer = $timeout(function() { $scope.onTimeout();}, 1000);
    console.log($scope.counter);
  };

  $scope.stopTimer = function() {
    $scope.$broadcast('timer-stopped', $scope.counter);
    // $scope.counter = 90;
    // $timeout.cancel(timer);
  };

  $scope.$on('timer-stopped', function(event, remaining) {
    if(remaining === 0) {
        console.log('your time ran out!');
    }
  });

  $scope.finish = function() {
    Timer.finish();
    $timeout.cancel(timer);
    $scope.task = null;
  }  
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
