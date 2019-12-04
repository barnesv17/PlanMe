// Taken from stackoverflow
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function() {


  var venueName = getParameterByName('Title');

  $.ajax({
    type: "GET",
    url: "../resources/database.js",
    dataType: "json",
    success: function(responseData, status){
      var output = "";
      $.each(responseData.items, function(i, item) {
        if ( item.title == venueName ) {
          new_title = item.title.replace(/_/g, ' ');

          output += '<img src="' + item.media + '" alt="' + item.media + '"  />';

          output += "<div id = 'text'>";
          output += '<h1 id ="title">' + new_title + '</h1>'; // add the title
          output += '<p>';
          output += '<span id="address">Address: ' + item.address + '</span><br><br>';
          output += '<span id="number">Phone Number: ' + item.number + '</span><br><br>';
          if ( item.website == "Website not found" ) {
            output += item.website + '<br><br>';
          }
          else {
              output += 'Website: <span id="website"><a href="' + item.website + '">' + item.website + '</span></a><br><br>';
          }
          output += '<span id="price">Price: $' + item.price + '</span> per night,';
          output += '<span id="capacity"> Capacity : ' + item.capacity + '</span>';
          output += '</p></div>';

        }
      });
      $('.venueOutput').html(output);
    }, error: function(msg) {
            // there was a problem
      alert("There was a problem: " + msg.status + " " + msg.statusText);
    }
  });
});
