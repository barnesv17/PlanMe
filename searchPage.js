function filter() {
  var priceOp = document.getElementById("Price").value;
  var sortOp = document.getElementById("Sort").value;
  var dateOp = document.getElementById("Date").value; // yyyy-mm-dd
  var capacityOp = document.getElementById("Capacity").value;

  $.ajax({
    type: 'GET',
    url: 'database.js',
    dataType: 'json',
    success: function(responseData, status){

      var availableDate = true;
      var x = 0;
      var count = 0;
      var output = ''; // where the html we want to output will be stored
      $('.searchOutput').html(output);

      if ( sortOp == 1 ) { // sort price: low to high
        responseData.items.sort(function(a,b){
          if ( a.price < b.price ) return -1;
          if ( a.price > b.price ) return 1;
          return 0;
        });
      }
      else if ( sortOp == 2 ) {// sort price: high to low
        responseData.items.sort(function(a,b){
          if ( a.price < b.price ) return 1;
          if ( a.price > b.price ) return -1;
          return 0;
        });
      }
      else if ( sortOp == 3 ) {// sort A-Z
        responseData.items.sort(function(a,b){
          if ( a.title < b.title ) return -1;
          if ( a.title > b.title ) return 1;
          return 0;
        });
      }
      else if ( sortOp == 4 ) {// sort A-Z
        responseData.items.sort(function(a,b){
          if ( a.title < b.title ) return 1;
          if ( a.title > b.title ) return -1;
          return 0;
        });
      }

      $.each(responseData.items, function(i, item) { // loop through each item in the json file
        availableDate = true;
        for ( x=0; x < item.bookedDates.length; x++ ) { // Check if day is available
          if ( item.bookedDates[x] == dateOp ) {
            availableDate = false;
          }
        }

        if ( (priceOp == 0 || item.price < (priceOp * 100)) && availableDate == true ) { // check that the venues are in price range
          if ( capacityOp == 0 || (item.capacity > (capacityOp * 100)) ) {
            count += 1;
            output += '<div id="item"><p>';
            output += '<img src="' + item.media + '" alt="' + item.media + '"  />';
            output += '<span id ="title">' + item.title + '</span><br>'; // add the title
            output += '<span id="address">' + item.address + '</span><br>';
            output += '<span id="number">' + item.number + '</span><br>';
            output += '<span id="website">' + item.website + '</span><br>';
            output += '<span id="price"> $' + item.price + '</span> per night,';
            output += '<span id="capacity"> Capacity: ' + item.capacity + '</span>';
            output += '</p></div>';
          }
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
        output += '<span id="price"> $' + item.price + '</span> per night,';
        output += '<span id="capacity"> Capacity: ' + item.capacity + '</span>';
        output += '</p></div>';
      });
      $('.searchOutput').html(output); // after every lab is added, output to the html doc
    }, error: function(msg) {
            // there was a problem
      alert('There was a problem: ' + msg.status + ' ' + msg.statusText);
    }
  });

});
