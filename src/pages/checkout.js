const checkoutForm = document.getElementById("checkout-form");
const phoneNum = document.getElementById("phone-number");
const email = document.getElementById("email");

const incorrectFieldMessage = (message) => {
  if (document.querySelector(".warning-message") !== null) {
    phoneNum
      .closest("div")
      .removeChild(document.querySelector(".warning-message"));
  }
  const para = document.createElement("p");
  para.className = "warning-message";
  para.textContent = message;
  para.style.color = "red";
  para.style.fontSize = "0.8rem";
  return para;
};

function validatePhoneNumber() {
  const value = phoneNum.value;
  return value && value.length === 10 && !/[e]/.test(value);
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validatePhoneNumber()) {
    phoneNum
      .closest("div")
      .appendChild(
        incorrectFieldMessage(
          "Invalid phone number or phone number not exactly 10 digits.",
        ),
      );
  }
  alert("Your checkout form is submitted successfully");
});
