function filter() {
  var priceOp = document.getElementById("Price").value;                         // Extract the user's price from the search page (could be prefilled from homepage)
  var dateOp = document.getElementById("Date").value;                           // Extract the user's date from the search page (could be prefilled from homepage)
  var capacityOp = document.getElementById("Capacity").value;                   // Extract the user's capcity from the search page (could be prefilled from homepage)
  var sortOp = document.getElementById("Sort").value;                           // Extract the user's sort option from the search page

  $.ajax({                                                                      // API for reading in JSON files
    type: 'GET',                                                                // GET Request
    url: '../resources/database.js',                                            // The path to the JSON file containing a list of venues
    dataType: 'json',                                                           // The file is of the type JSON
    success: function(responseData, status){                                    // On success...

      var availableDate = true;                                                 // Boolean to keep track of if the date entered by the user is an available date for a venue
      var count = 0;                                                            // Count to keep track of how many venues have been displayed to the user
      var output = '';                                                          // String to store the HTML we want to output
      $('.searchOutput').html(output);                                          // Empty the "searchOutput" div in searchpage.html

      if ( sortOp == 1 ) {                                                      // Sort price: Low to High
        responseData.items.sort(function(a,b) {                                 // The sort functions takes two items at a time: a and b
          if ( a.price < b.price ) return -1;                                   // If a's price is less than b's, return -1
          if ( a.price > b.price ) return 1;                                    // If a's price is greater than b's, return 1
          return 0;                                                             // If a's price is equal to b's, return 0
        });
      }
      else if ( sortOp == 2 ) {                                                 // Sort price: High to Low
        responseData.items.sort(function(a,b) {                                 // The sort functions takes two items at a time: a and b
          if ( a.price < b.price ) return 1;                                    // If a's price is less than b's, return 1
          if ( a.price > b.price ) return -1;                                   // If a's price is greater than b's, return -1
          return 0;                                                             // If a's price is equal to b's, return 0
        });
      }
      else if ( sortOp == 3 ) {                                                 // Sort Alphabetically: A to Z
        responseData.items.sort(function(a,b) {                                 // The sort functions takes two items at a time: a and b
          if ( a.title < b.title ) return -1;                                   // If a's title is less than b's, return -1
          if ( a.title > b.title ) return 1;                                    // If a's title is greater than b's, return 1
          return 0;                                                             // If a's title is equal to b's, return 0
        });
      }
      else if ( sortOp == 4 ) {                                                 // Sort Alphabetically: A to Z
        responseData.items.sort(function(a,b) {                                 // The sort functions takes two items at a time: a and b
          if ( a.title < b.title ) return 1;                                    // If a's title is less and b's, return 1
          if ( a.title > b.title ) return -1;                                   // If a's title is greater than b's, return -1
          return 0;                                                             // If a's title is equal to b's, return 0
        });
      }

      $.each(responseData.items, function(i, item) {                            // Loop through each item in the JSON file
        availableDate = true;                                                   // Reset that the date is available before checking every item
        for ( var x=0; x < item.bookedDates.length; x++ ) {                     // Loop through every date the venue has booked
          if ( item.bookedDates[x] == dateOp ) {                                // If the date the user wants is already booked for this venue...
            availableDate = false;                                              // Set that the date is NOT available
          }
        }

        if ( (priceOp == 0 || item.price < (priceOp * 100) )                    // If the user did not enter a price limit, or the current venue's price limit is below the one entered by the users...
        && availableDate == true ) {                                            // AND the date the user entered is available for this venue...
          if ( capacityOp == 0 || (item.capacity > (capacityOp * 100)) ) {      // If the user did not enter a capacity, or the current venue's capacity limit is above the one entered by the users...

            count += 1;                                                         // Increment the count of how many venues are displayed to the user
            var url = 'http://localhost/iit/termProject/PlanMe';                // Create the URL for the venue page
            url += '/venuepage/VenuePage.html?Title=' + item.title;
                                                                                // The URL would not format correctly with spaces, so we put "_" instead of spaces in the venue title
            new_title = item.title.replace(/_/g, ' ');                          // Replace any occurrence of "_" in the venue title for outputting

            output += '<div id="item"><p>';                                     // Begin formatting the HTML for the output
            output += '<img src="' +item.media+ '" alt="' + item.media + '"/>'; // Insert the picture of the venue
            output += '<a href='+ url +'><span id ="title">' + new_title;       // Insert the title of the venue that includes the link to the venue page
            output += '</span></a><br>';
            output += '<span id="address">' + item.address + '</span><br>';     // Insert the address of the venue
            output += '<span id="number">' + item.number + '</span><br>';       // Insert the phone number of the venue
            if ( item.website == "Website not found" ) {                        // If the venue does not have a website...
              output += item.website + '<br>';                                  // Output the "website" without a hyperlink to it
            }
            else {                                                              // If the venue does have a website...
                output += '<a href="' + item.website + '">'                     // Output the website with a hyperlink to it
                output += '<span id="website">'+item.website+'</span></a><br>';
            }
            output += '<span id="price"> $' +item.price+ '</span> per night,';  // Insert the price of the venue
            output += '<span id="capacity"> Capacity: '+item.capacity+'</span>';// Insert the capcity of the venue
            output += '</p></div>';                                             // End of adding things from the JSON file
          }
        }
      });

      if ( count == 0 ) {                                                       // If no venues fit the user's filters...
        $('.searchOutput').html("No results found");                            // Output to the searchpage.html, "No results found"
        $('.resultCount').html("");                                             // Don't output the count of how many results were found
      }
      else {                                                                    // If there were venues that fit the user's filters...
        $('.searchOutput').html(output);                                        // Output every venue that fits the user's filters
        $('.resultCount').html("Displaying " + count + " results");             // Output the number of venues that were found
      }
    }, error: function(msg) {                                                   // If something went wrong with the JSON file...
      alert('There was a problem: ' + msg.status + ' ' + msg.statusText);       // Alert that there was a problem
    }
  });
}

function getParameterByName(name, url) {                                        // https://stackoverflow.com/questions/38377675/parsing-url-with-js
    if (!url) url = window.location.href;                                       // Parses URL into key-value pairs
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function() {                                                  // On the documents intial load...
  var dateOp = getParameterByName('Date');                                      // Use the URL parser to get the date entered by the user
  var priceOp = getParameterByName('Price');                                    // Use the URL parser to get the price limit entered by the user
  var capacityOp = getParameterByName('Capacity');                              // Use the URL parser to get the capcity entered by the user

  $("#Date").val(dateOp);                                                       // Fill the date filter with the date entered by the user on the homepage
  $("#Price").val(priceOp);                                                     // Fill the price filter with the price entered by the user on the homepage
  $("#Capacity").val(capacityOp);                                               // Fill the capacity with the capacity entered by the user on the homepage

  filter();                                                                     // Call the filter function to display all venues that fit the user's filters
});
