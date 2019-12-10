function getParameterByName(name, url) {                                        // https://stackoverflow.com/questions/38377675/parsing-url-with-js
    if (!url) url = window.location.href;                                       // Parses URL into key-value pairs
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function() {                                                  // On the document's intial load...
  var venueName = getParameterByName('Title');                                  // Use the URL parser to get the venueName clicked on on the searchPage

  $.ajax({                                                                      // API for reading in JSON files
    type: "GET",                                                                // GET Request
    url: "../resources/database.js",                                            // The path to the JSON file containing a list of venues
    dataType: "json",                                                           // The file is of the type JSON
    success: function(responseData, status){                                    // On success...

      var output = "";                                                          // String to store the HTML we want to output

      $.each(responseData.items, function(i, item) {                            // Loop through each item in the JSON file
        if ( item.title == venueName ) {                                        // If the current venue's title is equal to the venue name clicked on by the user...
          new_title = item.title.replace(/_/g, ' ');                            // Replace any occurrence of "_" in the venue title for outputting

          output += '<img src="' +item.media+ '" alt="' + item.media + '"  />'; // Insert the picture of the venue
          output += "<div id = 'text'>";                                        // Begin inserting the information for the venue
          output += '<h1 id ="title">' + new_title + '</h1>';                   // Insert the title of the venue
          output += '<p>';
          output += '<span id="address">Address: ' + item.address;              // Insert the address of the venue
          output += '</span><br><br>';
          output += '<span id="number">Phone Number: ' + item.number;           // Insert the phone number of the venue
          output += '</span><br><br>';
          if ( item.website == "Website not found" ) {                          // If the venue does not have a website...
            output += item.website + '<br><br>';                                // Output the "website" without a hyperlink to it
          }
          else {                                                                // If the venue does have a website...
              output += 'Website: <span id="website"><a href="' + item.website; // Output the website with a hyperlink to it
              output += '">' + item.website + '</span></a><br><br>';
          }
          output += 'Price: <span id="price">$' + item.price;                   // Insert the price of the venue
          output += '</span> per night,';
          output += '<span id="capacity"> Capacity : ' + item.capacity;         // Insert the capacity of the venue
          output += '</span>';
          output += '</p></div>';                                               // End of adding things for this venue
        }
      });

      $('.venueOutput').html(output);                                           // Output to venuepage.html
    }, error: function(msg) {                                                   // If something went wrong with the JSON file...
      alert("There was a problem: " + msg.status + " " + msg.statusText);       // Alert that there was a problem
    }
  });
});
