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

  var settings = loadLocalSorange("settings") || {'short_break': 5, 'long_break': 30};;

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

.factory('Timer', function() {

  var task = loadLocalSorange("actualTask");
  var qnt_short_break = 0;
  var qnt_pomodoro = task.qnt_pomodoro;

  return {
    getTask: function() {
      return task; 
    },
    getQntShortBreak: function() {
      return qnt_short_break; 
    },
    setQntShortBreak: function(amount) {
      qnt_short_break = amount; 
    },
    getQntPomodoro: function() {
      return qnt_pomodoro; 
    },
    setQntPomodoro: function(amount) {
      qnt_pomodoro = amount; 
    },    
    finish: function() {
      timer = null;
      task = null;
      qnt_short_break = 0;
      this.save();
    },
    start: function(newTask) {
      task = newTask;
      qnt_short_break = 0;
      qnt_pomodoro = task.qnt_pomodoro;
      this.save();
    },
    save: function() {
      localStorage.setItem("actualTask", angular.toJson(task));
    }
  };
});

function loadLocalSorange(data) {

  if(typeof(Storage) != "undefined") {
    if (localStorage.getItem(data) != null && localStorage.getItem(data) != "undefined") {
      return JSON.parse(localStorage.getItem(data));
    }
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}