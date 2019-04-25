
const parksContainer = document.querySelector("#results-container");
htmlFactory = (parkHTML) => {
    return `<h2>${parkHTML}</h2>`
}
// get reference to element containing checkboxes
const el = document.getElementById("park-input");

// get reference to input elements in container element
const items = el.getElementsByTagName("input");
checkItem = () => {
    event.preventDefault();
    for (i=0; i < items.length; i++) {
    if (items[i].checked === true) {
        let featureValue = items[i].value;
        parkData(featureValue);
    }
}
}

const parkSearchBtn = document.querySelector("#parkBtn");
parkSearchBtn.addEventListener("click", checkItem);

parkData = (parkFeature) => {
    fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?${parkFeature}=Yes`)
        .then(parksResult => parksResult.json())
        .then(parsedParks => {
            parsedParks.forEach( park => {
                    let parkHTML = park.park_name;
                    parksContainer.innerHTML += htmlFactory(parkHTML);
                }
            )
        })
    }


 