document.querySelector("#name").focus();

const jobTitleLabel = document.getElementsByTagName("label")[2];
const jobTitleInput = document.querySelector("#other-title");
const designElement = document.querySelector('#design');
const colorSelection = document.querySelector("#color");

document.addEventListener("DOMContentLoaded", () => {
  // Hide the "other" job title option
  jobTitleLabel.style.display = "none";
  jobTitleInput.style.display = "none";

  // Create the 'select a T-shirt' node & message
  const createElement = (elementName, property, value) => {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  };
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
designElement.addEventListener('change', (e) => {
  const shirtColors = colorSelection.children;
  const themeChoices = e.target;
  if (themeChoices.value == 'heart js') {
    for (let i = 0; i < shirtColors.length; i++) {
      if (shirtColors[i].text.includes('(JS Puns')) {
        shirtColors[i].hidden = true;
      } else {
        shirtColors[i].hidden = false;
      }
    }  
  }
  if (themeChoices.value == 'js puns') {
    for (let j = 0; j < shirtColors.length; j++) {
      if (shirtColors[j].text.includes('♥')) {
        shirtColors[j].hidden = true;
      } else {
        shirtColors[j].hidden = false;
      }
    }  
  }
  if (themeChoices.value == 'Select Theme') {
    for (let k = 0; k < shirtColors.length; k++) {
      shirtColors[k].hidden = false;
    }  
  }
});

// SELECTING A WORKSHOP

/* vairable storing data-day-and-time 
loop over checkboxes
variable storing each checkbox
disable/enable if in same list selection AND
don't disable if just clicked
if clicked checkbox is checked 
disable checkboxes iterated over
*/