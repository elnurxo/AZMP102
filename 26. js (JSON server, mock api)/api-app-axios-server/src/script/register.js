import Swal from "sweetalert2";
import { User } from "./classes/user.js";
import { postData } from "./services/API/request.js";
import { endpoints } from "./services/API/constants.js";
import { LOGIN_PAGE_URL } from "./constants/index.js";
// Select DOM elements
const registerForm = document.querySelector("#register-form");
const inputs = {
  username: document.querySelector("#username"),
  email: document.querySelector("#email"),
  password: document.querySelector("#pass"),
  confirmPassword: document.querySelector("#confirm-pass"),
  profilePicture: document.querySelector("#profile-picture"),
  agreeTermsCheckbox: document.querySelector("#accept-terms-of-use"),
};
const registerBtn = document.querySelector("#register-btn");

// Validation Functions
function validateUsername(value) {
  const regex = /^[a-z_.]{5,}$/;
  return regex.test(value.trim());
}

function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
  return regex.test(value.trim());
}

function validatePassword(value) {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; // At least 8 characters, include letters and numbers
  return regex.test(value);
}

function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword && confirmPassword.length > 0;
}

function validateProfilePicture(files) {
  if (files.length > 0) {
    const fileType = files[0].type;
    const fileValid = files.length > 0 && fileType.startsWith("image/");
    return fileValid; // Ensure a file is selected
  }
}

function validateTerms(checked) {
  return checked; // Returns true if checkbox is checked
}

// Add validation feedback
function setValidationState(input, isValid) {
  if (isValid) {
    input.classList.remove("is-danger");
  } else {
    input.classList.add("is-danger");
  }
}

// Check if the entire form is valid
function isFormValid() {
  const usernameValid = validateUsername(inputs.username.value);
  const emailValid = validateEmail(inputs.email.value);
  const passwordValid = validatePassword(inputs.password.value);
  const confirmPasswordValid = validateConfirmPassword(
    inputs.password.value,
    inputs.confirmPassword.value
  );
  const profilePictureValid = validateProfilePicture(
    inputs.profilePicture.files
  );
  const termsValid = validateTerms(inputs.agreeTermsCheckbox.checked);

  return (
    usernameValid &&
    emailValid &&
    passwordValid &&
    confirmPasswordValid &&
    profilePictureValid &&
    termsValid
  );
}

// Update the register button state based on form validity
function updateRegisterButtonState() {
  const formValid = isFormValid();
  registerBtn.disabled = !formValid;
}

// Mark all fields as invalid if not valid on the first interaction
function markAllInvalid() {
  handleUsernameValidation({ target: inputs.username });
  handleEmailValidation({ target: inputs.email });
  handlePasswordValidation({ target: inputs.password });
  handleConfirmPasswordValidation({ target: inputs.confirmPassword });
  handleProfilePictureChange({ target: inputs.profilePicture });
  handleTermsChange({ target: inputs.agreeTermsCheckbox });
}

// Event Handlers
function handleUsernameValidation(e) {
  const isValid = validateUsername(e.target.value);
  setValidationState(e.target, isValid);
  updateRegisterButtonState();
}

function handleEmailValidation(e) {
  const isValid = validateEmail(e.target.value);
  setValidationState(e.target, isValid);
  updateRegisterButtonState();
}

function handlePasswordValidation(e) {
  const isValid = validatePassword(e.target.value);
  setValidationState(e.target, isValid);
  updateRegisterButtonState();
}

function handleConfirmPasswordValidation(e) {
  const isValid = validateConfirmPassword(
    inputs.password.value,
    e.target.value
  );
  setValidationState(e.target, isValid);
  updateRegisterButtonState();
}

function handleProfilePictureChange(e) {
  const isValid = validateProfilePicture(e.target.files);
  //change file name span content
  if (e.target.files.length > 0) {
    const fileNameSpan = document.querySelector("#file-name");
    const fileName = e.target.files[0].name;
    fileNameSpan.textContent = fileName;
    if (!e.target.files[0].type.startsWith("image")) {
      fileNameSpan.textContent = "invalid file format";
      fileNameSpan.style.color = "red";
    } else {
      fileNameSpan.style.color = "black";
    }
  }

  setValidationState(e.target, isValid);
  updateRegisterButtonState();
}

function handleTermsChange(e) {
  const isValid = validateTerms(e.target.checked);
  setValidationState(e.target, isValid);
  updateRegisterButtonState();
}

// First keyup event handling
let firstKeyup = true;
inputs.username.addEventListener("keyup", function (e) {
  if (firstKeyup) {
    firstKeyup = false;
    markAllInvalid();
  }
  handleUsernameValidation(e);
});

// Attach Event Listeners
inputs.email.addEventListener("keyup", handleEmailValidation);
inputs.password.addEventListener("keyup", handlePasswordValidation);
inputs.confirmPassword.addEventListener(
  "keyup",
  handleConfirmPasswordValidation
);
inputs.profilePicture.addEventListener("change", handleProfilePictureChange);
inputs.agreeTermsCheckbox.addEventListener("change", handleTermsChange);

// Initially disable the register button
registerBtn.disabled = true;

// Handle form submission
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (isFormValid()) {
    const profileFile = inputs.profilePicture.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(profileFile);

    reader.onload = async function () {
      //base 64 Code
      const profilePicture = reader.result;
      const newUser = new User(
        inputs.username.value,
        inputs.email.value,
        inputs.password.value,
        profilePicture
      );
      const resp = await postData(endpoints.users, newUser);
    };
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Signed Up successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.replace(LOGIN_PAGE_URL);
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Register Validation Failed!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
