angular.module('starter.services', [])

.factory('Tasks', function() {
  // Might use a resource here that returns a JSON array
  console.log("opa");
  var tasks = [];

  if(typeof(Storage) != "undefined") {

    if (JSON.parse(localStorage.getItem("listOfTasks")) != null) {
      
      tasks = JSON.parse(localStorage.getItem("listOfTasks"));

    } else {

      tasks = [];

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
    save: function() {
      localStorage.setItem("listOfTasks", angular.toJson(tasks));
    }
  };
});
