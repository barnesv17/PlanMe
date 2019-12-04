$(document).ready(function() {

  var option=1;

	if (option==1) {

  	$.ajax({
   	 	type: "GET",
   	 	url: "FAQdatabase.js",
   	 	dataType: "json",
   	 	success: function(responseData, status){
   	  	var output = "";
    	 	$.each(responseData.items, function(i, item) {
       		output += '<p2>' + item.question + '<br>' + item.answer + '<br>' + '</p2>' + '<hr>';
      	});
      	$('#questionAnswer').html(output);
    	}, error: function(msg) {
      				// there was a problem
      	alert("There was a problem: " + msg.status + " " + msg.statusText);
    	}
  	});
	}
});
