

$(document).ready(function() {

  // Excercise 1: Flickr feed
  var option=1;

	if (option==1) {

  	$.ajax({
   	 	type: "GET",
   	 	url: "FAQdatabase.js",
   	 	dataType: "json",
   	 	success: function(responseData, status){
   	  	var output = "<ul>";
    	 	$.each(responseData.items, function(i, item) {
       		output += item.question + item.answer
      	});
      	output += "</ul>";
      	$('#questionAnswer').html(output);
    	}, error: function(msg) {
      				// there was a problem
      	alert("There was a problem: " + msg.status + " " + msg.statusText);
    	}
  	});
	}
