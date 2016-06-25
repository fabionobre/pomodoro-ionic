app.filter('dateToString', function () {

	function str_pad_left(string,pad,length) { 
		return (new Array(length+1).join(pad)+string).slice(-length); 
	}

  return function (time) {
	  var minutes = Math.floor(time / 60);
	  var seconds = time - minutes * 60;
	  return str_pad_left(minutes,'0',2) + ":" + str_pad_left(seconds,'0',2);
  };
});

