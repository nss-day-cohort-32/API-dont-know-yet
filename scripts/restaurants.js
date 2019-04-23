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
    
    
function restaurantData(foodType) {
fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=1138`, {
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
        console.log(restaurantData);
    })
}

restaurantData("thai");





