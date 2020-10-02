# Interactive Form: FSJS Unit 3 Project

Third project for Team Treehouse FSJS Techdegree

## About

Project number three is an example of using JavaScript to validate user input on a web form for whereby the user receives feedback and helpful indicators as they enter information into various fields or select various options within the form.

## Code

I executed project three as follows:

The primary elements accessed and manipulated throughout are declared at the top of the document as global variables.

I also declared a global function "createElement" that creates and returns a new element to the DOM. This function was used in isolated instances but also at times was nested inside of another function which creates and appends error messages to the DOM as needed.

Once the majority of global variables was declared, an eventListener was set on the document itself for the purpose of displaying or resetting default options and fields within the document. This prevents certain options or inputs from remaining when the page is reloaded.

### Job Title

When the page loads several job titles are available for the user to choose from. Should the user chose not to select a pre-defined title, they may choose "Other" at which time a new input field is displayed to accept the user's job title input.

### T-Shirt

An eventListener on the "Design" dropdown listens for the user's choice of one of two designs. EXCEEDS: When the page loads, the "color" label and menu are hidden until the user selects an option from the design dropdown.

Depending on the user's design choice the code will then display the corresponding T-shirt colors whose styles match the design chosen. Should the user click "Select Theme" inside of the "Design" dropdown, each T-shirt option will again be displayed.

### Workshop

This group of code encompasses both the functionality to tally the cost of the activity/activities chosen and prevents the user from selecting two activities which occur at conflicting times. The code for the activity chosen will (a) be tallied at the bottom of the element and is responsive to additions to or subtractions from the tally and (b) will check against the other activity options. If any selection conflicts with another, the latter activity is disabled. This feature is also fully interactive and responds to the user selecting or de-selecting the activities.

### Payment

The user has three payment preferences from which to choose. Clicking one will hide/disable the others. If "credit card" is chosen the credit card form is displayed and will accept user input.

### Form Validation

This section contains the crux of the project requirements. The name and email fields along with the activities checkboxes are declared as validator functions. The first two (name and email) receive input and are stored in a variable. Then an error message function is declared local to the respective validator. As input is received, conditionals determine what (if any) message is displayed to the user. The third validator (activities) ensures that the user checks at least one box from the activities form. If not, the error message will be called.

EXCEEDS: These validators contain functions which return specific information regarding the user error as opposed to a generic error message.

### Credit Card Validation

Similar to the form validation above there are three validator functions declared in this section: credit card number, zip code, and cvv code. These validators are preceded by variables that retrieve their elements from the DOM and by functions which create and append corresponding error functions if needed.

EXCEEDS: These validators contain functions which return specific information regarding the user error as opposed to a generic error message.

EXCEEDS: After these validators the code provides real-time validation error messages.

### SUBMIT FORM

Finally, a "submit" listener is put on the form element. The callback function checks that each validator described above received valid input and therefore returns "true". If any of these validators returns "false" submission will be declined.
