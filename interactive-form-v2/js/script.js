document.querySelector("#name").focus();

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const email = document.querySelector("#mail");
const jobTitleLabel = document.getElementsByTagName("label")[2];
const jobTitleInput = document.querySelector("#other-title");
const designElement = document.querySelector("#design");
const colorSelection = document.querySelector("#color");
const checkboxes = document.querySelectorAll(".activities input");
const payment = document.querySelector("#payment");

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

  // Set 'Select Theme' as default shirt design choice
  designElement.firstElementChild.selected = true;

  // If there are any boxes checked when page reloads, remove checks
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].checked = false;
    }
  }

  // Set 'Credit Card' as default payment option & REMOVE 'Select Payment' message
  payment.children[1].selected = true;
  let paymentMessage = payment.children[0];
  payment.removeChild(paymentMessage);
});

//SELECTING JOB TITLE //

// When user selects 'other' job title - show the input & label
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
  // If user chooses 'Select Theme' after selecting theme previously, refresh the choices
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

// PAYMENT SECTION //
payment.addEventListener("change", (e) => {
  const clicked = e.target.value;
  // Showing/hiding payment forms based on user selection
  const creditCard = payment.children[0];
  const creditCardForm = document.querySelector("#credit-card");
  if (clicked === creditCard.value) {
    creditCardForm.style.display = "block";
  } else {
    creditCardForm.style.display = "none";
  }

  const payPal = payment.children[1];
  const payPalForm = document.querySelector("#paypal");
  if (clicked === payPal.value) {
    payPalForm.style.display = "block";
  } else {
    payPalForm.style.display = "none";
  }

  const bitcoin = payment.children[2];
  const bitcoinForm = document.querySelector("#bitcoin");
  if (clicked === bitcoin.value) {
    bitcoinForm.style.display = "block";
  } else {
    bitcoinForm.style.display = "none";
  }
});

// FORM VALIDATION
const nameValidator = () => {
  const usersName = nameInput.value;
  console.log(usersName);
  if (usersName.length > 0) {
    nameInput.style.borderColor = "white";
    return true;
  } else {
    nameInput.style.borderColor = "red";
    return false;
  }
};

const emailValidator = () => {
  const usersEmail = email.value;
  console.log(usersEmail);
  const commercialAt = usersEmail.indexOf("@");
  const dot = usersEmail.indexOf(".");

  if (commercialAt > 1 && dot - 1 > commercialAt + 1) {
    email.style.borderColor = "white";
    return true;
  } else {
    email.style.borderColor = "red";
    return false;
  }
};

const activitiesValidator = () => {
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return true;
    }
  }
  activities.style.backgroundColor = "red";
  return false;
};

form.addEventListener("submit", (e) => {
  // Input & activities validators
  if (!nameValidator()) {
    e.preventDefault();
  }
  if (!emailValidator()) {
    e.preventDefault();
  }

  if (!activitiesValidator()) {
    e.preventDefault();
  }

  // Credit card validation
  const cardNum = document.querySelector("#cc-num");
  const zip = document.querySelector("#zip");
  const cvv = document.querySelector("#cvv");

  if (cardNum.value.length >= 13 && cardNum.value.length <= 16) {
    cardNum.style.borderColor = "white";
    return true;
  } else {
    cardNum.style.borderColor = "red";
    e.preventDefault();
  }

  if (zip.value.length === 5) {
    zip.style.borderColor = "white";
    return true;
  } else {
    zip.style.borderColor = "red";
    e.preventDefault();
  }

  if (cvv.value.length === 3) {
    cvv.style.borderColor = "white";
    return true;
  } else {
    cvv.style.borderColor = "red";
    e.preventDefault();
  }

  console.log("submit handler works");
});
