$(document).ready(function() {                                                  // On the document's initial load
	$.ajax({                                                                      // API for reading in JSON files
 	 	type: "GET",                                                                // GET Request
 	 	url: "FAQdatabase.js",                                                      // The path to the JSON file containing a list of venues
 	 	dataType: "json",                                                           // The file is of the type JSON
 	 	success: function(responseData, status){                                    // On success...

 	  	var output = "";                                                          // String to store the HTML we want to output
  	 	$.each(responseData.items, function(i, item) {                            // Loop through each item in the JSON file
     		output += '<p2>' + item.question + '<br>' + item.answer;                // Insert the question and answer from the item
        output += '<br>' + '</p2>' + '<hr>';
    	});
    	$('#questionAnswer').html(output);                                        // Output to FAQpage.html
  	}, error: function(msg) {                                                   // If something went wrong with the JSON file...
    	alert("There was a problem: " + msg.status + " " + msg.statusText);       // Alert that there was a problem
  	}
	});
});
