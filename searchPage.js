$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: 'database.js',
    dataType: 'json',
    success: function(responseData, status){
      var output = ''; // where the html we want to output will be stored
      $.each(responseData.items, function(i, item) { // loop through each item in the json file
        output += '<div id="item">';

        output += "<p>";
        output += '<img src="' + item.media + '" alt="' + item.media + '"  />';
        output += '<span id ="title">' + item.title + '</span><br>'; // add the title
        output += '<span id="address">' + item.address + '</span><br>';
        output += '<span id="number">' + item.number + '</span><br>';
        output += '<span id="website">' + item.website + '</span>';
        output += '<span id="price">' + item.price + '</span>';
        output += '</p></div>';
      });
      $('.searchOutput').html(output); // after every lab is added, output to the html doc
    }, error: function(msg) {
            // there was a problem
      alert('There was a problem: ' + msg.status + ' ' + msg.statusText);
    }
  });
});
