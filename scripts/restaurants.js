// fetch Syntax 

//     fetch(url)
//         .then(function (res) {
//             return res, json()
//         })
//         .then(function (data){
//             console.log(data);
//         }).catch(function (err) {
//             console.log(err)
//         })
    
    
// function restaurantData(foodType) {
fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&cuisines=308&start=first&sort=rating`, {
        headers: {
            "Accept": "application/json",
            "user-key": "01f4ed4db4b7be953e0d8582af28907d"
        }
    })
    .then(r => r.json())
    .then(results => {
        const restaurantData = results;
        // const restaurantName = results.restaurants[3].restaurant.name;
        // const restaurantAddress = results.restaurants[3].restaurant.location.address;
        // const foodCuisine = results.restaurants[3].restaurant.cuisines;
        // for (let i = 0; i < restaurantData.restaurants.length; i++) {
        console.log(restaurantData);
        // }
    })
// }

// restaurantData("thai");

// const selectElement = document.querySelector('.cuisineList');

// selectElement.addEventListener('change', (event) => {
//     const result = document.querySelector('.results-container');
//     result.textContent = `You chose ${event.target.value}`;
// });





