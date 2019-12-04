

$(document).ready(function() { //runs when the page is loaded

  var option=1;

	if (option==1) {

  	$.ajax({
   	 	type: "GET",
   	 	url: "FAQdatabase.js",
   	 	dataType: "json",
   	 	success: function(responseData, status){ //this code runs if there are no errors
        var output = "";
    	 	$.each(responseData.items, function(i, item) { //searching through each item in the database of FAQ (FAQdatabase.js)
       		output += '<p2>' + item.question + '<br>' + item.answer + '<br>' + '</p2>' + '<hr>';
          //code that is going to go into the html file and create the format needed
      	});
      	$('#questionAnswer').html(output); //outputs the html code to the div block ID questionAnswer in FAQpage.html
    	}, error: function(msg) { //error checking to ensure it is running smoothlys
      				// there was a problem
      	alert("There was a problem: " + msg.status + " " + msg.statusText);
    	}
  	});
	}
});
