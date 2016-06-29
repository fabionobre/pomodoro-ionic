angular.module('starter.controllers').controller('TimerCtrl', function($scope, $stateParams, Timer, Tasks, Settings, $timeout, $state, dateToStringFilter) {

  var timer = null;
  var in_a_break = false;
  var audio = new Audio('audio/alarm.mp3');

  if (Timer.getTask() != null && timer == null) {

    $scope.task = Timer.getTask();
    $scope.counter = Timer.getCounter();
    
    if (Timer.getTask().finished) {
      Timer.setCounter(0);
    } else {
      Timer.setCounter(Timer.getCounter() || getNextCounter());
      timer = $timeout(function() { $scope.onTimeout(); }, 1000);    
    }
  }
  
  $scope.timeLeftString = dateToStringFilter(Timer.getCounter());

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
    $scope.timeLeftString = dateToStringFilter(Timer.getCounter());
  };

// On finish
  $scope.$on('timer-stopped', function(event, remaining) {
   
    if(remaining === 0) {
      $state.go('tab.timer'); 
      audio.play();  
      $scope.finish();
    }
  });

  $scope.finish = function() {

    if (Timer == null || Timer.getTask() == null) {
      return;
    }

    task = Timer.getTask();
    task.finished = true;
    Tasks.save(); 
    
    Timer.finish();
    $timeout.cancel(timer);
    Timer.save(); 

    $scope.timeLeftString = dateToStringFilter(0);
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