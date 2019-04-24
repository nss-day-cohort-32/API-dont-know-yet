    
let restaurantOptions = document.querySelector("#restaurantOptions");
let cuisineIdNumber = "";
let resultsDiv = document.querySelector("#displayFoodResults")

// function for making fetch call after event listener happens
let cuisineChoices = function () {
    let displayFoodResults = document.querySelector("#displayFoodResults");
    displayFoodResults.innerHTML = "";
    console.log("Cuisine id selected is ", cuisineIdNumber);
// fetch call for getting cuisine specific restaurants for Nashville
fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&count=4&cuisines=${cuisineIdNumber}`, {
        headers: {
            "Accept": "application/json",
            "user-key": apiKeyZomato
        }
    })
    .then(response => response.json())
    .then(cuisineChoices => {
        // console.table("cuisine choices", cuisineChoices);
        // const restaurantName = results.restaurants[3].restaurant.name;
        // const restaurantAddress = results.restaurants[3].restaurant.location.address;
        // const foodCuisine = results.restaurants[3].restaurant.cuisines;
        // console.log(restaurantData.restaurants[i].restaurant.name);
        for (let i = 0; i < cuisineChoices.restaurants.length; i++) {
            console.log("Name -", cuisineChoices.restaurants[i].restaurant.name, 
                "Address -", cuisineChoices.restaurants[i].restaurant.location.address);
            let restaurantName = cuisineChoices.restaurants[i].restaurant.name;
            let restaurantAddress = cuisineChoices.restaurants[i].restaurant.location.address;
            let displayFoodResults = document.querySelector("#displayFoodResults");
            displayFoodResults.innerHTML += `<div class = "foodDiv" id=${cuisineChoices.restaurants[i].restaurant.id}>
            <h2>${restaurantName}<h2>
            <p>${restaurantAddress}</p>
            <button class = "addToItinerary">SAVE</button>
            </div>`
        }
        // event listener for save button in Itinerary section 
        // document.querySelector(".addToItinerary").addEventListener("click", saveItinerary);
        restaurantListener()
    })
}
function restaurantListener() {

    for (let i = 0; i < 4; i++) {
        let saveButton = document.querySelectorAll(".addToItinerary")
        saveButton[i].addEventListener("click", () => {
            console.log("clicked", i);
            console.log("targettttt", event.target.parentElement.parentElement.id)

        saveItinerary(event.target.parentElement.parentElement);
        })
    }
}

// function for saving restaurant results to itinerary
function saveItinerary(resultsDiv) {
    // let foodDiv = document.querySelector("#foodItinerary")
    // foodDiv.innerHTML = null;
    let itineraryDiv = document.querySelector("#foodItinerary");
    itineraryDiv.appendChild(resultsDiv) 
}
// event listener & function for choosing cuisine from drop down
restaurantOptions.onchange = function() {
    cuisineIdNumber = restaurantOptions.options[restaurantOptions.selectedIndex].value;
    cuisineChoices()
    // console.log("cuisine id number", cuisineIdNumber)
}



// Notes to Self:
// Itinerary div class is itinerary-container
// Event listener function needs to have fetch call at the end of it