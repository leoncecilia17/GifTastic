$(document).ready(function () {

    var pastries = ["Donuts", "Cakes", "Cookies", "Croissants"];

    function displayPastryInfo() {
        $("#pastry-view").empty(); 
        var pastry = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pastry + "&api_key=vVHamWQLXMQwmmskv4pEAW0dKY245tEE&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response)

            for (var i = 0; i < response.data.length; i++) {

                var pastryDiv = $("<div class = 'pastry'>");

                // getting pastry image info
                var imgURL = response.data[i].images.original_still.url;
                var image = $("<img>").attr("src", imgURL); 
                image.addClass("gifs");
                image.attr("data-state", "still"); 
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                pastryDiv.append(image);

                // getting pastry rating 
                var Rated = response.data[i].rating;
                var pOne = $("<p>").text("Rating: " + Rated);
                pastryDiv.append(pOne);

                $("#pastry-view").prepend(pastryDiv);
            }
        });

    }

    $(document).on("click", ".gifs", function(){
        var state = $(this)//.attr("className");
        console.log(this)
        console.log(state.attr("data-state"))

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }); 

    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < pastries.length; i++) {
            var a = $("<button>");
            a.addClass("pastry-btn");
            a.attr("data-name", pastries[i]);
            a.text(pastries[i]);
            $("#buttons-view").append(a);
        }
    }

    $("#add-pastry").on("click", function (event) {
        event.preventDefault();
        var pastry = $("#pastry-input").val().trim();
        pastries.push(pastry);
        renderButtons();
    });

    renderButtons();

   $(document).on("click", ".pastry-btn", displayPastryInfo); 

});