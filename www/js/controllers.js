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

.controller('TimerCtrl', function($scope, $stateParams, Timer, Tasks, $timeout, $state) {

  var timer = null;
  var in_a_break = false;

  $scope.counter = 0;
  $scope.task = Timer.getTask();
  $scope.timeLeftString = "25:00";

  var audio = new Audio('audio/alarm.mp3');

  if ($scope.task != null && timer == null) {
    $scope.counter = 25*60;
    $scope.counter = 1;
    timer = $timeout(function() { $scope.onTimeout(); }, 1000);    
  }
  
  $scope.onTimeout = function() {

    if ($scope.counter ===  0) {

      console.log(Timer.getQntPomodoro());
      console.log(Timer.getQntShortBreak());

      if (Timer.getQntPomodoro() > 0) {
        if (in_a_break) {
          $scope.counter = 10;   
          Timer.setQntPomodoro(Timer.getQntPomodoro() - 1);
        } else {
          if (Timer.getQntShortBreak() < 4) {
            Timer.setQntShortBreak(Timer.getQntShortBreak() + 1);
            $scope.counter = 5;   
          } else {
            Timer.getQntShortBreak(0);
            $scope.counter = 7;   
          }
        }

        in_a_break = !in_a_break;
        timer = $timeout(function() { $scope.onTimeout(); }, 1000);    
      } else {
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(timer);
      }
      return;
    }
    $scope.counter--;
    timer = $timeout(function() { $scope.onTimeout();}, 1000);
    $scope.timeLeftString = dateToString($scope.counter);
  };

  $scope.stopTimer = function() {
    $scope.$broadcast('timer-stopped', $scope.counter);
    // $scope.counter = 90;
    // $timeout.cancel(timer);
  };

  $scope.$on('timer-stopped', function(event, remaining) {
   
    if(remaining === 0) {
      $state.go('tab.timer'); 
      // audio.play();    
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

function dateToString(timeLeft) {
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft - minutes * 60;
  return str_pad_left(minutes,'0',2) + ":" + str_pad_left(seconds,'0',2);
}

function str_pad_left(string,pad,length) { 
  return (new Array(length+1).join(pad)+string).slice(-length); 
}