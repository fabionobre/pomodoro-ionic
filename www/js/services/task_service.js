angular.module('starter.services').factory('Tasks', function() {

  var tasks = loadLocalSorange("listOfTasks") || [];

  return {
    all: function() {
      return tasks;
    },
    remove: function(task) {
      tasks.splice(tasks.indexOf(task), 1);
      this.save();
    },
    get: function(taskId) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          return tasks[i];
        }
      }
      return null;
    },
    add: function(task) {

      task.id = 0;

      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id > task.id) {
          task.id = tasks[i].id;
        }
      }      

      task.id = task.id + 1;
      tasks.push(task);
      this.save();
    },
    update: function(task) {
      var index = tasks.indexOf(this.get(task.id));
      tasks.splice(index, 1, task);
      this.save();
    },    
    save: function() {
      localStorage.setItem("listOfTasks", angular.toJson(tasks));
    },
    isValid: function(task) {

      task.title = task.title || "";
      task.qnt_pomodoro = task.qnt_pomodoro || 0;

      if (task.title == '' || task.title == null
        || task.qnt_pomodoro <= 0) {
        return false;
      }
      return true;
    }
  };
})