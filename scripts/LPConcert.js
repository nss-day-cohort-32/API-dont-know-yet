const LPContainer = document.getElementById("LPContainer");
const concertInput = document.createElement("input");
concertInput.setAttribute("type", "text");
concertInput.setAttribute("placeholder", "Musical Events");
const concertButton = document.createElement("button");
const buttonTextNode = document.createTextNode("Search");
concertButton.appendChild(buttonTextNode);

LPContainer.appendChild(concertInput);
LPContainer.appendChild(concertButton);

concertButton.addEventListener("click", () => {
  postData(concertInput.value);
  concertInput.value = "";
});

function postData(keyword) {
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events?apikey=s29Z5gG4Zocceb73nd3PjwxGC9OfGjus&keyword=${keyword}&size=3&sort=date,asc&city=Nashville&countryCode=US`
  )
    .then(concerts => concerts.json())
    .then(parsedConcerts => {
      let concert = parsedConcerts["_embedded"]["events"];
      concert.forEach(element => {
        let resultAppendContainer = document.getElementById(
          "results-container"
        );
        const collectedResults = document.createElement("div");
        const resultsPlacer1 = document.createElement("h3");
        const resultsPlacer2 = document.createElement("p");
        const resultsPlacer3 = document.createElement("h5");
        const resultsPlacer4 = document.createElement("p");
        const saveButton = document.createElement("button");
        const saveButtonText = document.createTextNode("Save");
        saveButton.appendChild(saveButtonText);

        const concertName = document.createTextNode(element.name);
        const concertDate = document.createTextNode(
          element.dates.start.localDate
        );
        const concertPlace = document.createTextNode(
          element._embedded.venues["0"].name
        );

        if (element._embedded.venues["0"].address == null) {
          const concertNoAdd = document.createTextNode("No address available.");
          resultsPlacer4.appendChild(concertNoAdd);
        } else {
          const concertAddress = document.createTextNode(
            `${element._embedded.venues["0"].address.line1}, ${
              element._embedded.venues["0"].postalCode
            }`
          );
          resultsPlacer4.appendChild(concertAddress);
        }

        resultAppendContainer.appendChild(collectedResults);
        collectedResults.appendChild(resultsPlacer1);
        collectedResults.appendChild(resultsPlacer2);
        collectedResults.appendChild(resultsPlacer3);
        collectedResults.appendChild(resultsPlacer4);
        resultsPlacer1.appendChild(concertName);
        resultsPlacer2.appendChild(concertDate);
        resultsPlacer3.appendChild(concertPlace);
        resultsPlacer4.appendChild(saveButton);

        saveButton.addEventListener("click", () => {
          const itineraryAppendContainer = document.getElementById(
            "itinerary-container"
          );
          const itineraryH3 = document.createElement("h3");
          const itinH3Text = document.createTextNode("Concert:");
          const itineraryDiv = document.createElement("div");
          itineraryAppendContainer.appendChild(itineraryH3);
          itineraryAppendContainer.appendChild(itineraryDiv);
          itineraryH3.appendChild(itinH3Text);
          itineraryDiv.appendChild(collectedResults);
          resultAppendContainer.innerHTML = "";
          resultsPlacer4.removeChild(saveButton);
        });
      });
    });
}
