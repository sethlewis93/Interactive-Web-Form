document.querySelector("#name").focus();

const jobTitleLabel = document.getElementsByTagName("label")[2];
const jobTitleInput = document.querySelector("#other-title");
const designElement = document.querySelector("#design");
const colorSelection = document.querySelector("#color");
const checkboxes = document.querySelectorAll(".activities input");

// Helpful function for creating elements
const createElement = (elementName, property, value) => {
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
};

document.addEventListener("DOMContentLoaded", () => {
  // Hide the "other" job title option
  jobTitleLabel.style.display = "none";
  jobTitleInput.style.display = "none";

  // Create the 'select a T-shirt' node & message
  const selectShirt = createElement(
    "option",
    "innerHTML",
    "Please select a T-shirt theme"
  );

  // Set value, "selected" option & insert the new node as the first child of the <select> element
  selectShirt.value = "selectshirt";
  selectShirt.selected = true;
  const firstColor = colorSelection.firstElementChild;
  colorSelection.insertBefore(selectShirt, firstColor);

  // Set "selected" option to automatically load the 'Select Theme' message
  designElement.firstElementChild.selected = true;

  // If there are any boxes checked when page reloads, remove checks
  for (let i = 0; i < checkboxes.length; i++)
    if (checkboxes[i].checked) {
      checkboxes[i].checked = false;
    }
});

//SELECTING JOB TITLE //

// When user selects 'other' job title - show the input & label
// See if you can consolodate the globals better
const titleElement = document.querySelector("#title");
const otherJobTitle = titleElement.lastElementChild;

titleElement.addEventListener("click", (e) => {
  if (e.target === otherJobTitle) {
    jobTitleLabel.style.display = "block";
    jobTitleInput.style.display = "block";
  }
  if (
    jobTitleLabel.style.display === "block" &&
    jobTitleInput.style.display === "block" &&
    e.target !== otherJobTitle
  ) {
    jobTitleLabel.style.display = "none";
    jobTitleInput.style.display = "none";
  }
});

// SELECTING T-SHIRT //
designElement.addEventListener("change", (e) => {
  const shirtColors = colorSelection.children;
  const themeChoices = e.target;
  if (themeChoices.value == "heart js") {
    for (let i = 0; i < shirtColors.length; i++) {
      if (shirtColors[i].text.includes("(JS Puns")) {
        shirtColors[i].hidden = true;
      } else {
        shirtColors[i].hidden = false;
      }
    }
  }
  if (themeChoices.value == "js puns") {
    for (let j = 0; j < shirtColors.length; j++) {
      if (shirtColors[j].text.includes("♥")) {
        shirtColors[j].hidden = true;
      } else {
        shirtColors[j].hidden = false;
      }
    }
  }
  if (themeChoices.value == "Select Theme") {
    for (let k = 0; k < shirtColors.length; k++) {
      shirtColors[k].hidden = false;
    }
  }
});

// SELECTING A WORKSHOP //

// Create & apend new total cost element
const activities = document.querySelector(".activities");
let currentCost = 0;
let totalCost = createElement("h4", "textContent", "");
activities.appendChild(totalCost);

activities.addEventListener("change", (e) => {
  // Store cost data from clicked element
  const clicked = e.target;
  let addCost = parseInt(clicked.getAttribute("data-cost"));

  // If input element is chcked, add the cost of currently clicked activity or else subtract the cost from total
  if (clicked.checked) {
    currentCost += addCost;
    console.log(currentCost);
  } else {
    currentCost -= addCost;
    console.log(currentCost);
  }
  totalCost.textContent = `Total Cost: $${currentCost}`;

  // Diable conflicting activities
  const eventDayTime = clicked.getAttribute("data-day-and-time");
  // Checkboxes accessed at top of document
  // Search all checkbox inputs
  for (let i = 0; i < checkboxes.length; i++) {
    // Store day/time info from checked box
    const boxType = checkboxes[i].getAttribute("data-day-and-time");
    /* If activity IN THE LOOP occurs same day as activity CLICKED && 
    if PREVIOUSLY CLICKED activity is different than those IN LOOP*/
    if (boxType === eventDayTime && clicked !== checkboxes[i]) {
      // Check if CLICKED activity was checked. If so - disable MATCHING activity
      if (clicked.checked) {
        checkboxes[i].disabled = true;
      } else {
        checkboxes[i].disabled = false;
      }
    }
  }
});
