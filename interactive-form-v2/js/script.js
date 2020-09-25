document.querySelector("#name").focus();

const form = document.querySelector("form");

// Name and Email inputs
const nameInput = document.querySelector("#name");
const email = document.querySelector("#mail");

// Job selectors: used for opening new 'Your Job Role' field
const otherTitleLabel = document.getElementsByTagName("label")[2];
const jobTitleInput = document.querySelector("#other-title");

// T Shirt selection
const designElement = document.querySelector("#design");
const colorSelection = document.querySelector("#color");

// Activities selector
const checkboxes = document.querySelectorAll(".activities input");

// Payment selector
const payment = document.querySelector("#payment");

// Credit card form selector
const creditCardForm = document.querySelector("#credit-card");

// Helpful function for creating elements as needed
const createElement = (elementName, property, value) => {
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
};

// Default settings when the document loads
document.addEventListener("DOMContentLoaded", () => {
  // Hide the "other" job title option
  otherTitleLabel.style.display = "none";
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
const jobTitles = document.querySelector("#title").children;

for (let i = 0; i < jobTitles.length; i++) {
  jobTitles[i].addEventListener("click", (e) => {
    if (e.target.value === "other") {
      otherTitleLabel.style.display = "block";
      jobTitleInput.style.display = "block";
    }
    if (
      otherTitleLabel.style.display === "block" &&
      jobTitleInput.style.display === "block" &&
      e.target.value !== "other"
    ) {
      otherTitleLabel.style.display = "none";
      jobTitleInput.style.display = "none";
    }
  });
}

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
  } else {
    currentCost -= addCost;
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
  /* Showing/hiding payment forms based on user selection
      NOTE: 'Select Payment Method' already removed from payment options inside DOMCONTENTLOADED Event
  */
  const creditCard = payment.children[0];
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
  // need to write regex for email validation
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
  activities.style.borderStyle = "solid";
  activities.style.borderColor = "red";
  return false;
};

// CREDIT CARD VALIDATION

// Credit card selector & error message
const cardNum = document.querySelector("#cc-num");
const ccErrorMessage = (elementName, property, value) => {
  const element = createElement(elementName, property, value);
  const cardLabel = cardNum.parentNode;
  cardLabel.insertBefore(element, cardNum);
  return element;
};

// Zip code selector & error message
const zip = document.querySelector("#zip");
const zipErrorMessage = (elementName, property, value) => {
  const element = createElement(elementName, property, value);
  const zipLabel = zip.parentNode;
  zipLabel.insertBefore(element, zip);
  return element;
};

// Cvv selector & error message
const cvv = document.querySelector("#cvv");
const cvvErrorMessage = (elementName, property, value) => {
  const element = createElement(elementName, property, value);
  const cvvLabel = cvv.parentNode;
  cvvLabel.insertBefore(element, cvv);
  return element;
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

  // CC Inputs
  // improve the error messages. check out what other websites do
  const creditCardValidator = () => {
    const regex = /^\D*\d{13}\D*(\d{1,3})?\D*$/;
    let showError = ccErrorMessage(
      "span",
      "textContent",
      "ERROR: 13-16 digits required"
    );
    if (!regex.test(cardNum.value)) {
      cardNum.style.borderColor = "red";
      showError.style.display = "block";
      return false;
    } else {
      cardNum.style.borderColor = "white";
      showError.remove();
      return true;
    }
  };

  const zipCodeValidator = () => {
    const regex = /^\d{5}$/;
    const showError = zipErrorMessage(
      "span",
      "textContent",
      "ERROR: 5 digits required"
    );
    if (!regex.test(zip.value)) {
      zip.style.borderColor = "red";
      showError.style.display = "block";
      return false;
    } else {
      zip.style.borderColor = "white";
      showError.style.display = "none";
      return true;
    }
  };

  const cvvValidator = () => {
    const regex = /^\d{3}$/;
    const showError = cvvErrorMessage(
      "span",
      "textContent",
      "ERROR: 3 digits required"
    );
    if (!regex.test(cvv.value)) {
      cvv.style.borderColor = "red";
      showError.style.display = "block";
      return false;
    } else {
      cvv.style.borderColor = "white";
      showError.style.display = "none";
      return true;
    }
  };

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
