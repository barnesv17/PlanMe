function filterByPrice() {
  var option = document.getElementById("Price").value;

  $.ajax({
    type: 'GET',
    url: 'database.js',
    dataType: 'json',
    success: function(responseData, status){
      count = 0;
      var output = ''; // where the html we want to output will be stored
      $('.searchOutput').html(output);
      $.each(responseData.items, function(i, item) { // loop through each item in the json file

        if ( option == 0 || item.price < (option * 100)) {
          count += 1;

          output += '<div id="item"><p>';
          output += '<img src="' + item.media + '" alt="' + item.media + '"  />';
          output += '<span id ="title">' + item.title + '</span><br>'; // add the title
          output += '<span id="address">' + item.address + '</span><br>';
          output += '<span id="number">' + item.number + '</span><br>';
          output += '<span id="website">' + item.website + '</span><br>';
          output += '<span id="price"> $' + item.price + '</span> per night';
          output += '</p></div>';
        }

      });
      
      if ( count == 0 ) {
        $('.searchOutput').html("No results found"); // after every lab is added, output to the html doc
      }
      else {
        $('.searchOutput').html(output); // after every lab is added, output to the html doc
      }

    }, error: function(msg) {
            // there was a problem
      alert('There was a problem: ' + msg.status + ' ' + msg.statusText);
    }
  });
}


$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'database.js',
    dataType: 'json',
    success: function(responseData, status){
      var output = ''; // where the html we want to output will be stored
      $.each(responseData.items, function(i, item) { // loop through each item in the json file
        output += '<div id="item"><p>';
        output += '<img src="' + item.media + '" alt="' + item.media + '"  />';
        output += '<span id ="title">' + item.title + '</span><br>'; // add the title
        output += '<span id="address">' + item.address + '</span><br>';
        output += '<span id="number">' + item.number + '</span><br>';
        output += '<span id="website">' + item.website + '</span><br>';
        output += '<span id="price"> $' + item.price + '</span> per night';
        output += '</p></div>';
      });
      $('.searchOutput').html(output); // after every lab is added, output to the html doc
    }, error: function(msg) {
            // there was a problem
      alert('There was a problem: ' + msg.status + ' ' + msg.statusText);
    }
  });


});
