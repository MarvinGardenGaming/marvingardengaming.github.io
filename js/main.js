const submitSearch = async () => {
    var baseURL = "http://api.themoviedb.org/3/search/multi?api_key=30cdc58bd6c02570f31cc6a0087bcef5&page=1&include_adult=true&query="
    var query = document.getElementById("searchQuery").value;
    var fullURL = baseURL + query;
    const response = await fetch(fullURL);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);

    var resultsContainer = document.getElementById("results-container");

    for(i=0;i < myJson.results.length; i++){

        var thisIncrement = i;

        if(myJson.results[i].media_type == "movie"){
            var thisResultContainer = document.createElement("div");
            thisResultContainer.classList += "result";
            thisResultContainer.id = "result" + i;
            resultsContainer.appendChild(thisResultContainer);
    
            var titleContainer = document.createElement("div");
            titleContainer.classList += "title-container";
            titleContainer.id = "title" + i;
            thisResultContainer.appendChild(titleContainer);
    
            var titleResult = document.createElement("h1");
            titleResult.innerHTML = "Title: " + myJson.results[i].title;
            titleResult.style = "display: inline-block;"
            titleContainer.appendChild(titleResult);
    
    
    
    
            var mediaTypeContainer = document.createElement("div");
            mediaTypeContainer.classList += "media-type-container";
            mediaTypeContainer.id = "media-type" + i;
            thisResultContainer.appendChild(mediaTypeContainer);
    
            var mediaTypeResult = document.createElement("p");
            mediaTypeResult.innerHTML = "Media Type: " + myJson.results[i].media_type;
            mediaTypeResult.style = "display: inline-block;"
            mediaTypeContainer.appendChild(mediaTypeResult);



            var imageContainer = document.createElement("div");
            imageContainer.classList += "image-container";
            imageContainer.id = "image" + i;
            imageContainer.innerHTML = "<img src='https://image.tmdb.org/t/p/w500/" + myJson.results[i].backdrop_path + "' alt='" + myJson.results[i].title + " Image' onError='imgError(this)'></img>";
            thisResultContainer.appendChild(imageContainer);



            var rateButton = document.createElement("button");
            rateButton.classList += "rate-button";
            rateButton.classList += "-movie";
            rateButton.id = myJson.results[i].id;
            rateButton.innerText = "Rate this item";
            thisResultContainer.appendChild(rateButton);

        } else if (myJson.results[i].media_type == "tv"){
            var thisResultContainer = document.createElement("div");
            thisResultContainer.classList += "result";
            thisResultContainer.id = "result" + i;
            resultsContainer.appendChild(thisResultContainer);
    
            var titleContainer = document.createElement("div");
            titleContainer.classList += "title-container";
            titleContainer.id = "title" + i;
            thisResultContainer.appendChild(titleContainer);
    
            var titleResult = document.createElement("h1");
            titleResult.innerHTML = "Title: " + myJson.results[i].name;
            titleResult.style = "display: inline-block;"
            titleContainer.appendChild(titleResult);
    
    
    
    
            var mediaTypeContainer = document.createElement("div");
            mediaTypeContainer.classList += "media-type-container";
            mediaTypeContainer.id = "media-type" + i;
            thisResultContainer.appendChild(mediaTypeContainer);
    
            var mediaTypeResult = document.createElement("p");
            mediaTypeResult.innerHTML = "Media Type: " + myJson.results[i].media_type;
            mediaTypeResult.style = "display: inline-block;"
            mediaTypeContainer.appendChild(mediaTypeResult);



            var imageContainer = document.createElement("div");
            imageContainer.classList += "image-container";
            imageContainer.id = "image" + i;
            imageContainer.innerHTML = "<img src='https://image.tmdb.org/t/p/w500/" + myJson.results[i].backdrop_path + "' alt='" + myJson.results[i].title + " Image' onError='imgError(this)'></img>";
            thisResultContainer.appendChild(imageContainer);



            var rateButton = document.createElement("button");
            rateButton.classList += "rate-button";
            rateButton.classList += "-tv";
            rateButton.id = myJson.results[i].id;
            rateButton.innerText = "Rate this item";
            thisResultContainer.appendChild(rateButton);
        } else if (myJson.results[i].media_type == "person"){
            var thisResultContainer = document.createElement("div");
            thisResultContainer.classList += "result";
            thisResultContainer.id = "result" + i;
            resultsContainer.appendChild(thisResultContainer);
    
            var titleContainer = document.createElement("div");
            titleContainer.classList += "title-container";
            titleContainer.id = "title" + i;
            thisResultContainer.appendChild(titleContainer);
    
            var titleResult = document.createElement("h1");
            titleResult.innerHTML = "Name: " + myJson.results[i].name;
            titleResult.style = "display: inline-block;"
            titleContainer.appendChild(titleResult);
    
    
    
    
            var mediaTypeContainer = document.createElement("div");
            mediaTypeContainer.classList += "media-type-container";
            mediaTypeContainer.id = "media-type" + i;
            thisResultContainer.appendChild(mediaTypeContainer);
    
            var mediaTypeResult = document.createElement("p");
            mediaTypeResult.innerHTML = "Media Type: " + myJson.results[i].media_type;
            mediaTypeResult.style = "display: inline-block;"
            mediaTypeContainer.appendChild(mediaTypeResult);



            var imageContainer = document.createElement("div");
            imageContainer.classList += "image-container";
            imageContainer.id = "image" + i;
            imageContainer.innerHTML = "<img src='https://image.tmdb.org/t/p/w500/" + myJson.results[i].profile_path + "' alt='" + myJson.results[i].title + " Image' onError='imgError(this)'></img>";
            thisResultContainer.appendChild(imageContainer);



            var rateButton = document.createElement("button");
            rateButton.classList += "rate-button";
            rateButton.classList += "-person";
            rateButton.id = myJson.results[i].id;
            rateButton.innerText = "Rate this item";
            thisResultContainer.appendChild(rateButton);
        }
    }
}

function imgError(image) {
    image.onerror = "";
    image.src = "/images/imageNotFound.jpg";
    return true;
}

document.addEventListener('click', function (event) {

	if (event.target.matches('.rate-button-movie')) {
        var thisBaseURL = window.location;
        var rateURL = thisBaseURL + "/rate?id=" + event.target.id + "&media-type=movie";
        location.assign(rateURL);
	}

	if (event.target.matches('.rate-button-tv')) {
        var thisBaseURL = window.location;
        var rateURL = thisBaseURL + "/rate?id=" + event.target.id + "&media-type=tv";
        location.assign(rateURL);
    }
    
    if (event.target.matches('.rate-button-person')) {
        var thisBaseURL = window.location;
        var rateURL = thisBaseURL + "/rate?id=" + event.target.id + "&media-type=person";
        location.assign(rateURL);
	}

}, false);
