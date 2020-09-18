document.querySelector("#name").focus();

const jobTitleLabel = document.getElementsByTagName("label")[2];
const jobTitleInput = document.querySelector("#other-title");
const colorSelection = document.querySelector("#color");
document.addEventListener("DOMContentLoaded", () => {
  jobTitleLabel.style.display = "none";
  jobTitleInput.style.display = "none";
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
  selectShirt.value = "selectshirt";
  const firstColor = colorSelection.firstElementChild;
  colorSelection.insertBefore(selectShirt, firstColor);
});

colorSelection.addEventListener("change", (e) => {});

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
