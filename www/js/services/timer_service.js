angular.module('starter.services').factory('Timer', function(Settings) {

  var task = loadLocalSorange("actualTask");
  var qnt_short_break = 0;
  var counter = Settings.all().work_time;
  var qnt_pomodoro = null;

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

      if (qnt_pomodoro == null) {
        qnt_pomodoro = task.qnt_pomodoro;
      }

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
      // timer = null;
      // task = null;
      // qnt_short_break = 0;
      this.save();
    },
    start: function(newTask) {
      task = newTask;
      qnt_short_break = 0;
      qnt_pomodoro = task.qnt_pomodoro;
      this.setCounter(0);
      this.save();
    },
    save: function() {
      localStorage.setItem("actualTask", angular.toJson(task));
    }
  };
});