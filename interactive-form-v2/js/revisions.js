// SELECTING T-SHIRT //
designDropdown.addEventListener("change", (e) => {
  const shirtColors = colorSelection.children;
  const themeChoices = e.target.value;
  if (themeChoices == "heart js") {
    colorSelection.style.display = "block";
    for (let i = 0; i < shirtColors.length; i++) {
      if (shirtColors[i].text.includes("(JS Puns")) {
        shirtColors[i].hidden = true;
      } else {
        shirtColors[i].hidden = false;
        // Refresh color options each time design selection is changed
        shirtColors[0].selected = true;
      }
    }
  }
  if (themeChoices == "js puns") {
    colorSelection.style.display = "block";
    for (let j = 0; j < shirtColors.length; j++) {
      if (shirtColors[j].text.includes("♥")) {
        shirtColors[j].hidden = true;
      } else {
        shirtColors[j].hidden = false;
        shirtColors[0].selected = true;
      }
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

// If input element is chcked, add the cost of currently clicked activity or else subtract the cost from total
if (clicked.checked) {
  currentCost += addCost;
} else {
  currentCost -= addCost;
}
totalCost.textContent = `Total Cost: $${currentCost}`;

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
  if (clicked === payPal.value) {
    payPalDiv.style.display = "block";
  } else {
    payPalDiv.style.display = "none";
  }

  const bitcoin = payment.children[2];
  if (clicked === bitcoin.value) {
    bitcoinDiv.style.display = "block";
  } else {
    bitcoinDiv.style.display = "none";
  }
});
