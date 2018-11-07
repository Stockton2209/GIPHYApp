



$(document).ready(function() {
$("#gifArea").append("<button class='gifButtons' value='cats'>Cats</button>");
$("#gifArea").append("<button class='gifButtons' value='Ryan Gosling'>Ryan Gosling</button>");
//create id=gifButtons buttons for id=gifArea which include a few preset with certain values


$(".gifButtons").on("click", function() {
    // variable to hold the link for the API. api.giphy.com will show the syntax. 
    // Attach API key property and value
    // attach tag=cats
    var gifSearch = $(this).val().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=1mwvVwbDJXA13TmnYXLJKAX0whsoKDHc&limit=5";
    
    // AJAX - API Query getter.
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
        
        console.log(results);

        var gifImage = $("<img>");
        
        gifImage.attr("src", results[i].images.fixed_height.url);
        console.log(gifImage);

        $("#gifs").prepend(gifImage);
        }
      });
  });

});