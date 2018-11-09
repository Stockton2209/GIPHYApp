
$(document).ready(function() {

  var buttonChoices = ["Cats", "Moar Cats", "Ryan Gosling", "Ready Player One", "Coding", "Cheesburgers", "Pizza"];

  function renderButtons() {
    $("#gifButtonArea").empty();
    for (var i = 0; i < buttonChoices.length; i++) {
        $("#gifButtonArea").append("<button class='gifButtons' value="+ buttonChoices[i] + ">" + buttonChoices[i] + "</button>");
        }
        $(".gifButtons").on("click", populateGifs);
  };
  renderButtons();

 
  function searchArea() {
    $("#searchDiv").append("<input class='form-control mr-sm-2' type='text' placeholder='Search' aria-label='Search'></input><button class='btn btn-unique btn-rounded btn-sm my-0' id='searchBtn' type='submit'>Add Gif Button</button>");
  }
  searchArea();


  $("#searchBtn").on("click", function() {
    console.log("search button clicked")
    var searchItem = $("#searchDiv > input").val();
    buttonChoices.push(searchItem);
    renderButtons();
  });


  
  function populateGifs() {
    console.log(this);
    var gifSearch = $(this).val().trim();
    
    var queryURL = "https://cors-ut-bootcamp.herokuapp.com/https://api.giphy.com/v1/gifs/random?tag=" + gifSearch + "&api_key=1mwvVwbDJXA13TmnYXLJKAX0whsoKDHc";
    for (var i = 0; i < 1; i++) {
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var gifDiv = $("<div>")
        var gifData = response.data.images;
        var gifImage = $("<img class='img-fluid img-thumbnail'>");
        gifImage.attr("src", gifData.fixed_height_still.url);
        gifImage.attr("data-still", gifData.fixed_height_still.url);
        gifImage.attr("data-animate", gifData.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifDiv.prepend(gifImage);
        $("#gifs").prepend(gifDiv);
      });
    }
  };

  
  $("#gifs > div > img").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
    if (state === "animate") {
      $(this).attr('src', $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }); 
        
});
