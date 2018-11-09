
$(document).ready(function() {

  var buttonChoices = ["Cats", "Moar Cats", "Ryan Gosling", "Ready Player One", "Coding", "Cheesburgers", "Pizza"];

  // Empties button area. Loops through array, creating a button and a click listener for each button.
  function renderButtons() {
    $("#gifButtonArea").empty();
    for (var i = 0; i < buttonChoices.length; i++) {
        $("#gifButtonArea").append("<button class='gifButtons' value="+ buttonChoices[i] + ">" + buttonChoices[i] + "</button>");
        }
        $(".gifButtons").on("click", populateGifs);
  };
  renderButtons();


  // Creates search field and button.
  function searchArea() {
    var blankSearchField = "<input class='form-control mr-sm-2' type='text' placeholder='Search' aria-label='Search'></input>";
    var searchButton = "<button class='btn btn-unique btn-rounded btn-sm my-0' id='searchBtn' type='submit'>Add Gif Button</button>";
    $("#searchDiv").append(blankSearchField + searchButton);
  }
  searchArea();


  // Click and Enter key listeners for button adding feature.
  $("#searchBtn").on("click", addSearchButton);
  $("#searchDiv > input").on('keyup', function (e) {
    if (e.keyCode == 13) {
      addSearchButton();
    }
  });


  // Search input value is added to array then buttons are rendered again. Search input cleared.
  function addSearchButton() {
    var searchItem = $("#searchDiv > input").val();
    buttonChoices.push(searchItem);
    renderButtons();
    $("#searchDiv > input").val("");
  }


  // Query info. AJAX Query. Response. Gif div creation with attributes. Click listeners for animation.
  function populateGifs() {
    var gifSearch = $(this).val().trim();
    var CORSLink = "https://cors-ut-bootcamp.herokuapp.com/";
    var GIPHYPath = "https://api.giphy.com/v1/gifs/";
    var GIPHYRandom = "random?tag="
    var apiKey = "&api_key=1mwvVwbDJXA13TmnYXLJKAX0whsoKDHc";
    var queryURL = CORSLink + GIPHYPath + GIPHYRandom + gifSearch + apiKey;
    for (var i = 0; i < 1; i++) {
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var gifData = response.data.images;
        var gifDiv = $("<div>")
        var gifImage = $("<img class='img-fluid img-thumbnail'>");
        gifImage.attr("src", gifData.fixed_height_still.url);
        gifImage.attr("data-still", gifData.fixed_height_still.url);
        gifImage.attr("data-animate", gifData.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifDiv.prepend(gifImage);
        $("#gifs").prepend(gifDiv);
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
    }
  };        
});
