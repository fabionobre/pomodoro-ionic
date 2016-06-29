angular.module('starter.services', []);

function loadLocalSorange(data) {

  if(typeof(Storage) != "undefined") {
    if (localStorage.getItem(data) != null && localStorage.getItem(data) != "undefined") {
      return JSON.parse(localStorage.getItem(data));
    }
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}