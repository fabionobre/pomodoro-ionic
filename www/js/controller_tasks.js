controllers.controller('TaskCtrl', function($scope, $state, Tasks, $ionicActionSheet) {

  $scope.tasks = Tasks.all();
  $scope.task = {};

  $scope.add = function() {
    $state.go('tab.add'); 
  };

  $scope.show = function(taskId) {
    $state.go('tab.show'); 
  };

  $scope.save = function(task) {
    if (Tasks.isValid(task)) {
      Tasks.add(task)
      $state.go('tab.dash'); 
    }
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

controllers.controller('TaskShowCtrl', function($scope, $stateParams, Tasks, Timer, $state) {
  
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
    if (Tasks.isValid(task)) {
      Tasks.change(task);
      $state.go('tab.dash'); 
    }
  }
})