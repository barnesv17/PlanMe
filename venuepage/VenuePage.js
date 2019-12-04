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

          output += '<div class="column">';
          output += '<div class="content">';
          output += '<h1>'+ new_title +'</h1>';
          output += '<img src="'+item.media+'" alt="'+item.title+'" style="100%"">';
          output += '<p>';
          output += 'Price: ' + item.price;
          output += 'Address: ' + item.address;
          output += 'Capacity: ' + item.capacity;
          output += 'Website: ' + item.website;
          output += '</p>';
          output += '</div>';
          output += '</div>';
        }
      });
      $('.venueOutput').html(output);
    }, error: function(msg) {
            // there was a problem
      alert("There was a problem: " + msg.status + " " + msg.statusText);
    }
  });
});
