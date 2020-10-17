const getItemDetail = async () => {
    var url_string = window.location;
    var url = new URL(url_string);
    var mediaType = url.searchParams.get("media-type");
    var id = url.searchParams.get("id");
    var fetchURL = "http://api.themoviedb.org/3/" + mediaType + "/" + id + "?api_key=30cdc58bd6c02570f31cc6a0087bcef5&include_adult=true";
    const response = await fetch(fetchURL);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);

    resultsContainer = document.getElementById("item-container");

    if(mediaType == "movie"){
        var thisResultContainer = document.createElement("div");
        thisResultContainer.classList += "result";
        thisResultContainer.id = "result";
        resultsContainer.appendChild(thisResultContainer);

        var titleContainer = document.createElement("div");
        titleContainer.classList += "title-container";
        titleContainer.id = "title";
        thisResultContainer.appendChild(titleContainer);

        var titleResult = document.createElement("h1");
        titleResult.innerHTML = "Title: " + myJson.title;
        titleResult.style = "display: inline-block;"
        titleContainer.appendChild(titleResult);




        var mediaTypeContainer = document.createElement("div");
        mediaTypeContainer.classList += "media-type-container";
        mediaTypeContainer.id = "media-type";
        thisResultContainer.appendChild(mediaTypeContainer);

        var mediaTypeResult = document.createElement("p");
        mediaTypeResult.innerHTML = "Media Type: " + mediaType;
        mediaTypeResult.style = "display: inline-block;"
        mediaTypeContainer.appendChild(mediaTypeResult);



        var imageContainer = document.createElement("div");
        imageContainer.classList += "image-container";
        imageContainer.id = "image";
        imageContainer.innerHTML = "<img src='https://image.tmdb.org/t/p/w500/" + myJson.backdrop_path + "' alt='" + myJson.title + " Image' onError='imgError(this)'></img>";
        thisResultContainer.appendChild(imageContainer);
    } else if (mediaType == "tv"){
        var thisResultContainer = document.createElement("div");
        thisResultContainer.classList += "result";
        thisResultContainer.id = "result";
        resultsContainer.appendChild(thisResultContainer);

        var titleContainer = document.createElement("div");
        titleContainer.classList += "title-container";
        titleContainer.id = "title";
        thisResultContainer.appendChild(titleContainer);

        var titleResult = document.createElement("h1");
        titleResult.innerHTML = "Title: " + myJson.name;
        titleResult.style = "display: inline-block;"
        titleContainer.appendChild(titleResult);




        var mediaTypeContainer = document.createElement("div");
        mediaTypeContainer.classList += "media-type-container";
        mediaTypeContainer.id = "media-type";
        thisResultContainer.appendChild(mediaTypeContainer);

        var mediaTypeResult = document.createElement("p");
        mediaTypeResult.innerHTML = "Media Type: " + mediaType;
        mediaTypeResult.style = "display: inline-block;"
        mediaTypeContainer.appendChild(mediaTypeResult);



        var imageContainer = document.createElement("div");
        imageContainer.classList += "image-container";
        imageContainer.id = "image";
        imageContainer.innerHTML = "<img src='https://image.tmdb.org/t/p/w500/" + myJson.backdrop_path + "' alt='" + myJson.title + " Image' onError='imgError(this)'></img>";
        thisResultContainer.appendChild(imageContainer);
    } else if (mediaType == "person"){
        var thisResultContainer = document.createElement("div");
        thisResultContainer.classList += "result";
        thisResultContainer.id = "result";
        resultsContainer.appendChild(thisResultContainer);

        var titleContainer = document.createElement("div");
        titleContainer.classList += "title-container";
        titleContainer.id = "title";
        thisResultContainer.appendChild(titleContainer);

        var titleResult = document.createElement("h1");
        titleResult.innerHTML = "Name: " + myJson.name;
        titleResult.style = "display: inline-block;"
        titleContainer.appendChild(titleResult);




        var mediaTypeContainer = document.createElement("div");
        mediaTypeContainer.classList += "media-type-container";
        mediaTypeContainer.id = "media-type";
        thisResultContainer.appendChild(mediaTypeContainer);

        var mediaTypeResult = document.createElement("p");
        mediaTypeResult.innerHTML = "Media Type: " + mediaType;
        mediaTypeResult.style = "display: inline-block;"
        mediaTypeContainer.appendChild(mediaTypeResult);



        var imageContainer = document.createElement("div");
        imageContainer.classList += "image-container";
        imageContainer.id = "image";
        imageContainer.innerHTML = "<img src='https://image.tmdb.org/t/p/w500/" + myJson.profile_path + "' alt='" + myJson.title + " Image' onError='imgError(this)'></img>";
        thisResultContainer.appendChild(imageContainer);
    }

    return firebase.database().ref('/' + mediaType + '/' + id + '/').once('value').then(function(snapshot) {
        if(snapshot.val() == null){
            document.getElementById("currRatingValue").innerText = "0";
        } else {
            averageRating = (snapshot.val() && snapshot.val().averageRating) || '0';
            var averageRatingFloat = parseFloat(averageRating).toFixed(2);
            document.getElementById("currRatingValue").innerText = averageRatingFloat;
            var roundedRating = Math.round(averageRatingFloat);
            if(roundedRating == -2){
                document.getElementById("currRatingValue").innerText += " Far Left";
            } else if (roundedRating == -1){
                document.getElementById("currRatingValue").innerText += " Left";
            } else if (roundedRating == 0){
                document.getElementById("currRatingValue").innerText += " Center";
            } else if (roundedRating == 1){
                document.getElementById("currRatingValue").innerText += " Right";
            } else if (roundedRating == 2){
                document.getElementById("currRatingValue").innerText += " Far Right";
                
            }
        }
    });
}

getItemDetail();

function updateSliderInfo(sliderValue){
    if(sliderValue == "-2"){
        document.getElementById("sliderLabel").innerText = "Far Left";
    } else if(sliderValue == "-1"){
        document.getElementById("sliderLabel").innerText = "Left";
    } else if(sliderValue == "0"){
        document.getElementById("sliderLabel").innerText = "Center";
    } else if(sliderValue == "1"){
        document.getElementById("sliderLabel").innerText = "Right";
    } else if(sliderValue == "2"){
        document.getElementById("sliderLabel").innerText = "Far Right";
    }
};

function submitRating(){
    console.log("start database submission");
    var url_string = window.location;
    var url = new URL(url_string);
    var mediaType = url.searchParams.get("media-type");
    var id = url.searchParams.get("id");

    retrieveExistingRatingData(id, mediaType)
}

function retrieveExistingRatingData(id, mType){
    console.log("retrieving data");
    var averageRating = 0;
    return firebase.database().ref('/' + mType + '/' + id + '/').once('value').then(function(snapshot) {
        averageRating = (snapshot.val() && snapshot.val().averageRating) || '0';
        retrieveNumOfRatings(id, mType, averageRating);
    });
}

function retrieveNumOfRatings(id, mType, averageRating, ratingsSubmitted){
    var ratingsSubmitted = 0;
    return firebase.database().ref('/' + mType + '/' + id + '/').once('value').then(function(snapshot) {
        ratingsSubmitted = (snapshot.val() && snapshot.val().ratingsSubmitted) || '0';
        writeRatingData(id, mType, averageRating, ratingsSubmitted);
    });
}

function writeRatingData(id, mType, existingRating, numOfRatings) {
    console.log("writing to db" + existingRating + " and num of ratings is: " + numOfRatings);
    if(existingRating == null){
        existingRating = 0;
    }
    var sliderValue = document.getElementById("ratingSlider").value;
    console.log("slider val" + sliderValue);
    var existingRatingFloat = parseFloat(existingRating);
    var numOfRatingsInt = parseInt(numOfRatings);
    var sliderValueInt = parseInt(sliderValue);
    var totalRatingPoints = existingRatingFloat * numOfRatingsInt;
    totalRatingPoints += sliderValueInt;
    numOfRatingsInt += 1;
    console.log("num of ratings is: " + numOfRatingsInt);
    var rating = totalRatingPoints / numOfRatingsInt;
    firebase.database().ref(mType + '/' + id).set({
      averageRating: rating,
      ratingsSubmitted: numOfRatingsInt
    });

    window.location.reload();
}