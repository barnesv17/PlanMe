
$(document).ready(function() {
  
    $.ajax({
      type: "GET",
      url: "../resources/database.json",
      dataType: "json",
      success: function(responseData, status){
        var output = "";  
        $.each(responseData.items, function(i, item) {
          output += '<div class="column">';
          output += '<div class="content">';
          output += '<img src="'+item.media+'" alt="'+item.title+'" style="100%"">';
          output += '<h3>'+ item.title +'</h3>';
          output += '<p>';
          output += 'Price: ' + item.price;
          output += 'Address: ' + item.address;
          output += 'Capacity: ' + item.capacity;
          output += 'Website: ' + item.website;
          output += '</p>';
          output += '</div>';
          output += '</div>';
        });
        
        $('#row').html(output);
      }, error: function(msg) {
              // there was a problem
        alert("There was a problem: " + msg.status + " " + msg.statusText);
      }
    });
  });
   