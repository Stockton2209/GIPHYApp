
$(document).ready(function() {

var buttonChoices = ["Cats", "Moar Cats", "Ryan Gosling", "Ready Player One", "Coding", "Cheesburgers", "Pizza",]
// append an array of buttons at the top.
for (var i = 0; i < buttonChoices.length; i++) {
    $("#gifButtonArea").append("<button class='gifButtons' value="+ buttonChoices[i] + ">" + buttonChoices[i] + "</button>");
}

// Search field and search button for "Add an Animal"
$("#searchDiv").append

// Append HTML button to "gifButtonArea" after search butto is clicked.


$(".gifButtons").on("click", function() {
    // variable to hold the link for the API. api.giphy.com will show the syntax. 
    // Attach API key property and value
    // attach tag=cats
    var gifSearch = $(this).val().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=1mwvVwbDJXA13TmnYXLJKAX0whsoKDHc&limit=2";
    
    // AJAX - API Query getter.
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='col-sm-3'>")
        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img class='img-fluid img-thumbnail'>").attr("src", results[i].images.fixed_height.url);
        
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#gifs").prepend(gifDiv);
        }
      });
  });

});

// $("#gifs").on("click", function() {

// FOR PAUSING AND STARTING GIFs
// var state = $(this).attr("data-state");
// if (state === "still") {
//     $(this).attr('src', $(this).attr("data-animate"));
//     $(this).attr("data-state", "animate")
//   }
//   if (state === "animate") {
//     $(this).attr('src', $(this).attr("data-still"));
//     $(this).attr("data-state", "still")
//   }
// });