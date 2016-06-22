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

.controller('TimerCtrl', function($scope, $stateParams, Timer, Tasks, Settings, $timeout, $state) {

  var timer = null;
  var in_a_break = false;
  $scope.timeLeftString = dateToString(Timer.getCounter());

  var audio = new Audio('audio/alarm.mp3');

  if (Timer.getTask() != null && timer == null) {
    $scope.task = Timer.getTask();
    Timer.setCounter(Timer.getCounter() || getNextCounter());
    $scope.counter = Timer.getCounter();
    timer = $timeout(function() { $scope.onTimeout(); }, 1000);    
  }
  
  $scope.onTimeout = function() {

    if (Timer.getCounter() ===  0) {

      if (hasPomodoro()) {

        Timer.setCounter(getNextCounter());
        timer = $timeout(function() { $scope.onTimeout(); }, 1000); 

      } else {

        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(timer);
      }
      return;
    }

    Timer.setCounter(Timer.getCounter() - 1);
    timer = $timeout(function() { $scope.onTimeout();}, 1000);
    $scope.timeLeftString = dateToString(Timer.getCounter());
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

  function hasPomodoro() {
    return Timer.getQntPomodoro() > 0;
  }

  function getNextCounter() {

    in_a_break = !in_a_break;

    if (in_a_break) {  
      
      Timer.setQntPomodoro(Timer.getQntPomodoro() - 1);
      console.log('start pomodoro ' + Timer.getQntPomodoro());
      return Settings.all().work_time;   

    } else {
      
      if (Timer.getQntShortBreak() < 3) {

        console.log('start short break ' + Timer.getQntShortBreak());
        Timer.setQntShortBreak(Timer.getQntShortBreak() + 1);
        return Settings.all().short_break;   

      } else {

        console.log('start long break');
        Timer.setQntShortBreak(0);
        return Settings.all().long_break;   
      }
    }    
  }
})

function dateToString(timeLeft) {
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft - minutes * 60;
  return str_pad_left(minutes,'0',2) + ":" + str_pad_left(seconds,'0',2);
}

function str_pad_left(string,pad,length) { 
  return (new Array(length+1).join(pad)+string).slice(-length); 
}