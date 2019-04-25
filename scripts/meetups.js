let savedEvents = [];
let printedEvents = [];
// define a variable that query selects the button in this case its id is getData
let meetData = document.querySelector("#getData");
//set up eventListener function to query select the input in this case its id is meet
meetData.addEventListener("click", () => {
  let myInput = document.querySelector("#meet").value;
  //.value pulls the text out of an input
  //call meetupData function with a parameter of the targeted id of the input (from the line above)
  meetupData(myInput);
  console.log(myInput);
});

createSaveEventListeners = () => {
  let results = document.getElementsByClassName("saveMeetData");
  for (let i = 0; i < results.length; i++) {
    results[i].addEventListener("click", event => {
      console.log(event);
      let eventId = event.target.id;
      printedEvents.forEach(event => {
        //Number-->same as parsedInt-- returns a number in case of a string.
        if (Number(event.id) === Number(eventId)) {
          savedEvents.push(event);
          printSavedEvents();
        }
      });
      console.log(savedEvents);
    });
  }
};

printSavedEvents = () => {
  let iContainer = document.querySelector("#itinerary-container");
  iContainer.innerHTML = "";
  savedEvents.forEach(event => {
    let eventHTML = createEventHTML(event, false);
    iContainer.innerHTML += eventHTML;
  });
};

//define a container element variable that query selects the desired container, in this case its the div with the results-container class
let containerEl = document.querySelector("#results-container");
function meetupData(meet_type) {
  fetch(
    `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&q=${meet_type}&location.address=nashville&token=${eventApi}`,
    {
      headers: {
        Accept: "application/json"
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      containerEl.innerHTML = "";
      printedEvents = [];
      let eventsArray = data.events;
      eventsArray.splice(0, 4).forEach(event => {
        printedEvents.push(event);
        containerEl.innerHTML += createEventHTML(event, true);
        console.log(containerEl);
      });
      createSaveEventListeners();
      console.log(printedEvents);
    });
}
function createEventHTML(event, printButton) {
  return `<h3>${event.name.html}${
    printButton
      ? "<button id='" + event.id + "' class='saveMeetData'>Save</button>"
      : ""
  }  </h3><h4>${event.start.local.split("T")[0]}</h4>`;
}

//TERNARY (above)
// let thing = false;

// let thing2 = thing ? "woot woot" : 777;

// console.log(thing2);
