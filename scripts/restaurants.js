    
let restaurantOptions = document.querySelector("#restaurantOptions");
let cuisineIdNumber = "";

console.log(cuisineIdNumber);

let cuisineChoices = function () {
// fetch call for getting cuisine specific restaurants for Nashville
fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&count=4&cuisines=${cuisineIdNumber}`, {
        headers: {
            "Accept": "application/json",
            "user-key": "01f4ed4db4b7be953e0d8582af28907d"
        }
    })
    .then(response => response.json())
    .then(cuisineChoices => {
        console.table("cuisine choices", cuisineChoices);
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
            displayFoodResults.innerHTML += `<div id = "foodDiv[i]">
            <h2>${restaurantName}<h2>
            <p>${restaurantAddress}</p>
            <button id = "foodSave[i]">SAVE</button>
            </div>`
        }
    })
}

// function for choosing cuisine from drop down
restaurantOptions.onchange = function() {
    cuisineIdNumber = restaurantOptions.options[restaurantOptions.selectedIndex].value;
    cuisineChoices()
    console.log("cuisine id number", cuisineIdNumber)
}

// Event listener function needs to have fetch call at the end of it