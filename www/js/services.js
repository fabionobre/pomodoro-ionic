angular.module('starter.services', [])

.factory('Tasks', function() {

  var tasks = [];

  if(typeof(Storage) != "undefined") {
    if (JSON.parse(localStorage.getItem("listOfTasks")) != null) {
      tasks = JSON.parse(localStorage.getItem("listOfTasks"));
    } 
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }

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
    change: function(task) {

      task_saved = this.get(task.id);
      task_saved = task;
      this.save();
    },    
    save: function() {
      localStorage.setItem("listOfTasks", angular.toJson(tasks));
    }
  };
})

.factory('Settings', function() {

  var settings = {'short_break': 5, 'long_break': 30};

  if(typeof(Storage) != "undefined") {

    if (JSON.parse(localStorage.getItem("settings")) != null) {
      settings = JSON.parse(localStorage.getItem("settings"));
    }

  } else {
    
    console.log("Sorry, your browser does not support Web Storage...");
    
  }

  return {
    all: function() {
      return settings;
    },
    save: function(settings) {
      this.settings = settings;
      localStorage.setItem("settings", angular.toJson(settings));
    }
  };
});
