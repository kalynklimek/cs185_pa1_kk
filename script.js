// OUTSIDE SOURCES:
// event listener for forms: https://flaviocopes.com/form-events/
// textContent: https://www.w3schools.com/jsref/prop_node_textcontent.asp
// indexOf: https://www.w3schools.com/jsref/jsref_indexof.asp

// first initialize variables
var emailForm;
var emailInput;
var emailFormSection;

initialize();

function initialize() {
  emailForm = document.getElementById('email-form');
  emailInput = document.getElementById('email');
  emailValidationMsg = document.getElementById('email-val-msg');

  console.log("in init");
  // console.log("email_form: ", emailForm);
  // console.log("email: ", emailInput);

  // call other functions
  validateEmail();
}

function validateEmail() {
  emailForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log("submitted email");
    console.log("email value: ", emailInput.value);

    var email = emailInput.value;
    var emailLength = email.length;

    var msg = "";

    // -1 if @ never occurs
    if (email.indexOf("@") == -1 || (email.substring(emailLength-4) != ".edu" && email.substring(emailLength-4) != ".com")) {
      console.log("Invalid email address.");
      msg = "Invalid email address.";
    }

    else {
      console.log("Email successfully recorded.");
      msg = "Email successfully recorded.";
    }

    emailValidationMsg.textContent = msg;
  })
}
