angular.module('starter.services', [])

.factory('Tasks', function() {

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

  var settings = loadLocalSorange("settings") || {'short_break': 5, 'long_break': 30};
  settings.work_time = 25;

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

.factory('Timer', function(Settings) {

  var task = loadLocalSorange("actualTask");
  var qnt_short_break = 0;
  var qnt_pomodoro = task.qnt_pomodoro;
  var counter = Settings.all().work_time;

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
    
    getCounter: function() {
      return counter; 
    },
    setCounter: function(parameter) {
      counter = parameter; 
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
      counter = Settings.all().work_time;
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