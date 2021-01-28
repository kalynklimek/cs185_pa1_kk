// OUTSIDE SOURCES:
// event listener for forms: https://flaviocopes.com/form-events/
// textContent: https://www.w3schools.com/jsref/prop_node_textcontent.asp
// indexOf: https://www.w3schools.com/jsref/jsref_indexof.asp

// first initialize variables
var emailForm;
var emailInput;
var emailFormSection;
var clear;

initialize();

function initialize() {
  emailForm = document.getElementById('email-form');
  emailInput = document.getElementById('email');
  emailValidationMsg = document.getElementById('email-val-msg');
  clear = document.getElementById('clear');

  // call other functions
  validateEmail();
  clearForm();
}

function validateEmail() {
  emailForm.addEventListener('submit', event => {
    event.preventDefault();

    var email = emailInput.value;
    var emailLength = email.length;

    var msg = "";

    // -1 if @ never occurs
    if (email.indexOf("@") == -1 || (email.substring(emailLength-4) != ".edu" && email.substring(emailLength-4) != ".com")) {
      msg = "Invalid email address.";
    }

    else {
      msg = "Email successfully recorded.";
    }

    emailValidationMsg.textContent = msg;
  })
}

// clear email input and response message on clicking clear
function clearForm() {
  clear.addEventListener('click', function() {
      emailInput.value = "";
      emailValidationMsg.textContent = "";
  });
}
