$(document).ready(function () {

    var pastries = ["Donuts", "Cakes", "Cookies", "Croissants"];

    function displayPastryInfo() {
        var pastry = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pastry + "&api_key=vVHamWQLXMQwmmskv4pEAW0dKY245tEE&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                var pastryDiv = $("<div class ='pastry'>");
                var Rated = response.data[i].rating;
                var pOne = $("<p>").text("Rating: " + Rated);
                pastryDiv.append(pOne);

                // getting pastry image info
                var imgURL = response.data[i].images.original_still.url;
                var image = $("<img>").attr("src", imgURL);
                pastryDiv.append(image);
                $("#pastries-view").prepend(pastryDiv); 
            }
        });

    }

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

    $("#add-movie").on("click", function (event) {
        event.preventDefault();
        var pastry = $("pastry-input").val().trim();
        pastries.push(pastry);
        renderButtons();
    });

    $(document).on("click", ".pastry-btn", displayPastryInfo);
    renderButtons();
});

