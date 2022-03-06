document.querySelector("#name").focus();

const form = document.querySelector("form");

// Helpful function for creating elements as needed
const createElement = (elementName, property, value) => {
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
};

// Name and Email inputs
const nameInput = document.querySelector("#name");
const email = document.querySelector("#mail");

// Job selectors: used for opening optional 'Your Job Role' field
const jobTitles = document.querySelector("#title");
const jobTitleInput = document.querySelector("#other-title");
const otherTitleLabel = jobTitleInput.previousElementSibling;

// T Shirt selection
const designDropdown = document.querySelector("#design");
const colorSelection = document.querySelector("#color");
// Create the 'select a T-shirt' node & message
const selectShirt = createElement(
  "option",
  "innerHTML",
  "Please select a T-shirt theme"
);

// Activities selector
const checkboxes = document.querySelectorAll(".activities input");

// Payment selector
const payment = document.querySelector("#payment");

// Payment methods form selector
const creditCardForm = document.querySelector("#credit-card");
const payPalDiv = document.querySelector("#paypal");
const bitcoinDiv = document.querySelector("#bitcoin");

// Default settings when the document loads
document.addEventListener("DOMContentLoaded", () => {
  // When page loads, always begin with first job title
  jobTitles.firstElementChild.selected = true;

  // Hide the "other" job title option
  otherTitleLabel.style.display = "none";
  jobTitleInput.style.display = "none";

  // Hide T shirt color choices when page loads
  colorSelection.style.display = "none";

  // Set value, "selected" option & insert the new node as the first child of the <select> element
  selectShirt.value = "selectshirt";
  selectShirt.selected = true;
  const firstColor = colorSelection.firstElementChild;
  colorSelection.insertBefore(selectShirt, firstColor);

  // Set 'Select Theme' as default shirt design choice
  designDropdown.firstElementChild.selected = true;

  // If there are any boxes checked when page reloads, remove checks
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].checked = false;
    }
  }

  // Set 'Credit Card' as default payment option, REMOVE 'Select Payment' message, and hide other payment divs
  payment.children[1].selected = true;
  let paymentMessage = payment.children[0];
  payment.removeChild(paymentMessage);
  payPalDiv.style.display = "none";
  bitcoinDiv.style.display = "none";
});

//SELECTING JOB TITLE //

// When user selects 'other' job title - show the input & label

jobTitles.addEventListener("change", (e) => {
  const clicked = e.target.value;
  if (clicked === "other") {
    otherTitleLabel.style.display = "block";
    jobTitleInput.style.display = "block";
  }
  if (
    otherTitleLabel.style.display === "block" &&
    jobTitleInput.style.display === "block" &&
    clicked !== "other"
  ) {
    otherTitleLabel.style.display = "none";
    jobTitleInput.style.display = "none";
  }
});

// SELECTING T-SHIRT //
designDropdown.addEventListener("change", (e) => {
  const shirtColors = colorSelection.children;
  const themeChoices = e.target.value;
  if (themeChoices == "heart js") {
    colorSelection.style.display = "block";
    for (let i = 0; i < shirtColors.length; i++) {
      shirtColors[i].text.includes("(JS Puns")
        ? (shirtColors[i].hidden = true)
        : (shirtColors[i].hidden = false);
      // Refresh color options each time design selection is changed
      shirtColors[0].selected = true;
    }
  }
  if (themeChoices == "js puns") {
    colorSelection.style.display = "block";
    for (let j = 0; j < shirtColors.length; j++) {
      shirtColors[j].text.includes("♥")
        ? (shirtColors[j].hidden = true)
        : (shirtColors[j].hidden = false);
      shirtColors[0].selected = true;
    }
  }
  // If user chooses 'Select Theme' after selecting theme previously, refresh the choices
  if (themeChoices == "Select Theme") {
    colorSelection.style.display = "none";
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
  clicked.checked ? (currentCost += addCost) : (currentCost -= addCost);
  totalCost.textContent = `Total Cost: $${currentCost}`;
  currentCost == 0
    ? (totalCost.style.display = "none")
    : (totalCost.style.display = "block");

  // Diable conflicting activities
  const eventDayTime = clicked.getAttribute("data-day-and-time");
  // Search all checkbox inputs (checkboxes accessed at top of document)
  for (let i = 0; i < checkboxes.length; i++) {
    // Store day/time info from checked box
    const boxType = checkboxes[i].getAttribute("data-day-and-time");
    /* If activity IN THE LOOP occurs same day as activity CLICKED && 
    if PREVIOUSLY CLICKED activity is different than those IN LOOP*/
    if (boxType === eventDayTime && clicked !== checkboxes[i]) {
      // Check if CLICKED activity was checked. If so - disable MATCHING activity
      clicked.checked
        ? (checkboxes[i].disabled = true)
        : (checkboxes[i].disabled = false);
    }
  }
});

// PAYMENT SECTION //
payment.addEventListener("change", (e) => {
  const clicked = e.target.value;
  /* Showing/hiding payment forms based on user selection
        NOTE: 'Select Payment Method' already removed from payment options inside DOMCONTENTLOADED Event
    */
  const creditCard = payment.children[0];
  clicked === creditCard.value
    ? (creditCardForm.style.display = "block")
    : (creditCardForm.style.display = "none");

  const payPal = payment.children[1];
  clicked === payPal.value
    ? (payPalDiv.style.display = "block")
    : (payPalDiv.style.display = "none");

  const bitcoin = payment.children[2];
  clicked === bitcoin.value
    ? (bitcoinDiv.style.display = "block")
    : (bitcoinDiv.style.display = "none");
});

// FORM VALIDATION
const nameValidator = () => {
  const usersName = nameInput.value;
  const regex = /^\D+$/i;
  const errorMessage = nameInput.previousElementSibling;
  const nameErrorMessage = (elementName, property, value) => {
    const element = createElement(elementName, property, value);
    const nameLabel = nameInput.parentNode;
    nameLabel.insertBefore(element, nameInput);
    return element;
  };
  if (
    errorMessage.textContent.includes("numbers") ||
    errorMessage.textContent.includes("Please")
  ) {
    errorMessage.remove();
  }
  if (usersName.length === 0) {
    const showError = nameErrorMessage(
      "span",
      "textContent",
      "Please type your name"
    );
    showError.style.display = "block";
    nameInput.style.borderColor = "red";
    return false;
  } else {
    if (!regex.test(usersName)) {
      const showError = nameErrorMessage(
        "span",
        "textContent",
        "May not contain numbers"
      );
      showError.style.display = "block";
      nameInput.style.borderColor = "red";
    } else {
      nameInput.style.borderColor = "white";
      return true;
    }
  }
};

const emailValidator = () => {
  const usersEmail = email.value;
  const regex = /^[^@]+@[^@\.]+\.[a-z]{3}$/i;
  const errorMessage = email.previousElementSibling;
  const emailErrorMessage = (elementName, property, value) => {
    const element = createElement(elementName, property, value);
    const mailLabel = email.parentNode;
    mailLabel.insertBefore(element, email);
    return element;
  };
  if (
    errorMessage.textContent.includes("format") ||
    errorMessage.textContent.includes("Please")
  ) {
    errorMessage.remove();
  }
  if (usersEmail.length === 0) {
    const showError = emailErrorMessage(
      "span",
      "textContent",
      "Please enter email address"
    );
    showError.style.display = "block";
    email.style.borderColor = "red";
    return false;
  } else {
    if (!regex.test(usersEmail)) {
      const showError = emailErrorMessage(
        "span",
        "textContent",
        "Must be valid email format"
      );
      showError.style.display = "block";
      email.style.borderColor = "red";
      return false;
    } else {
      email.style.borderColor = "white";
      return true;
    }
  }
};

// ACTIVITIES ERROR MESSAGE
const activitiesValidator = () => {
  const errorMessage = activities.firstElementChild;
  const activitiesErrorMessage = (elementName, property, value) => {
    const element = createElement(elementName, property, value);
    const register = activities.firstElementChild;
    activities.insertBefore(element, register);
    element.style.backgroundColor = "red";
    return element;
  };
  if (errorMessage.textContent.includes("SELECT")) {
    errorMessage.remove();
  }
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return true;
    }
  }
  activitiesErrorMessage(
    "span",
    "textContent",
    "PLEASE SELECT AT LEAST ONE ACTIVITY"
  );
  return false;
};

// CREDIT CARD VALIDATION

// Credit card selector & error message
const cardNum = document.querySelector("#cc-num");
const createCCErrorText = (elementName, property, value) => {
  const element = createElement(elementName, property, value);
  const cardDiv = cardNum.parentNode;
  cardDiv.insertBefore(element, cardNum);
  return element;
};

// Zip code selector & error message
const zip = document.querySelector("#zip");
const createZipErrorText = (elementName, property, value) => {
  const element = createElement(elementName, property, value);
  const zipLabel = zip.parentNode;
  zipLabel.insertBefore(element, zip);
  return element;
};

// Cvv selector & error message
const cvv = document.querySelector("#cvv");
const createCVVErrorText = (elementName, property, value) => {
  const element = createElement(elementName, property, value);
  const cvvLabel = cvv.parentNode;
  cvvLabel.insertBefore(element, cvv);
  return element;
};

// CC Inputs
const creditCardValidator = () => {
  const regex = /^(\d{13,16}|\d{3,4}[-]\d{3,4}[-]\d{3,4}[-]\d{3,4})$/;
  const errorMessage = cardNum.previousElementSibling;
  if (
    errorMessage.textContent.includes("digits") ||
    errorMessage.textContent.includes("Please")
  ) {
    errorMessage.remove();
  }
  if (cardNum.value.length === 0) {
    const showError = createCCErrorText(
      "span",
      "textContent",
      "Please enter a credit card number"
    );
    cardNum.style.borderColor = "red";
    showError.style.display = "block";
    return false;
  } else if (!regex.test(cardNum.value)) {
    const showError = createCCErrorText(
      "span",
      "textContent",
      "Card number must be 13-16 digits"
    );
    cardNum.style.borderColor = "red";
    showError.style.display = "block";
    if (errorMessage.textContent.includes("Please")) {
      errorMessage.style.display = "none";
    }
    return false;
  } else {
    cardNum.style.borderColor = "white";
    return true;
  }
};

const zipCodeValidator = () => {
  const regex = /^\d{5}$/;
  const errorMessage = zip.previousElementSibling;
  if (
    errorMessage.textContent.includes("digits") ||
    errorMessage.textContent.includes("Please")
  ) {
    errorMessage.remove();
  }
  if (zip.value.length === 0) {
    const showError = createZipErrorText(
      "span",
      "textContent",
      "Please enter zip code"
    );
    zip.style.borderColor = "red";
    showError.style.display = "block";
  } else {
    if (!regex.test(zip.value)) {
      const showError = createZipErrorText(
        "span",
        "textContent",
        "Zip code must be 5 digits"
      );
      if (errorMessage.textContent.includes("Please")) {
        errorMessage.style.display = "none";
      }
      zip.style.borderColor = "red";
      showError.style.display = "block";
      return false;
    } else {
      zip.style.borderColor = "white";
      return true;
    }
  }
};

const cvvValidator = () => {
  const regex = /^\d{3}$/;
  const errorMessage = cvv.previousElementSibling;
  if (
    errorMessage.textContent.includes("digits") ||
    errorMessage.textContent.includes("Please")
  ) {
    errorMessage.remove();
  }
  if (cvv.value.length === 0) {
    const showError = createCVVErrorText(
      "span",
      "textContent",
      "Please enter cvv code"
    );
    cvv.style.borderColor = "red";
    showError.style.display = "block";
    return false;
  } else {
    if (!regex.test(cvv.value)) {
      const showError = createCVVErrorText(
        "span",
        "textContent",
        "CVV must be 3 digits"
      );
      if (errorMessage.textContent.includes("Please")) {
        errorMessage.style.display = "none";
      }
      cvv.style.borderColor = "red";
      showError.style.display = "block";
      return false;
    } else {
      cvv.style.borderColor = "white";
      return true;
    }
  }
};

// REAL TIME VALIDATION
nameInput.addEventListener("input", nameValidator);
email.addEventListener("input", emailValidator);
activities.addEventListener("change", activitiesValidator);
cardNum.addEventListener("input", creditCardValidator);
zip.addEventListener("input", zipCodeValidator);
cvv.addEventListener("input", cvvValidator);

// SUBMIT OR PREVENT SUBMISSION
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

  const paymentType = document.querySelector("#payment").value;
  if (paymentType === "credit card") {
    if (!creditCardValidator()) {
      e.preventDefault();
    }

    if (!zipCodeValidator()) {
      e.preventDefault();
    }

    if (!cvvValidator()) {
      e.preventDefault();
    }
  }
});
