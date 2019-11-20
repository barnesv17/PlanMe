$(document).ready(function() {

  $(window).alert("Hi");

  $.ajax({
    type: 'GET',
    url: 'database.js',
    dataType: 'json',
    success: function(responseData, status){
      var output = ''; // where the html we want to output will be stored
      $.each(responseData.items, function(i, item) { // loop through each item in the json file
        output += '<h4>' + item.title + '</h4>'; // add the title
      });
      $('#searchOutput').html(output); // after every lab is added, output to the html doc
    }, error: function(msg) {
            // there was a problem
      alert('There was a problem: ' + msg.status + ' ' + msg.statusText);
    }
  });
});
