// Validate each input on blur
// Don't allow it to submit an invalid form
// Give helpful messages
// Add invalid style class
// Keep it from submitting?, but make the submit button give the high five on a good submit

// Object of validation tests and messages
// Each event listener will call using the tests and messages appropriate for it

const submitBtn = document.getElementById("submit");
const submitMessage = document.getElementById("submitMessage");
const form = document.getElementsByTagName("form");

const inputs = {
  email: {
    el: document.getElementById("email"),
    errorSpan: document.getElementById("emailError"),
    messages: {
      valueMissing: "Email address required",
      typeMismatch: "Invalid email address",
    },
    custom: [],
  },
  country: {
    el: document.getElementById("country"),
    errorSpan: document.getElementById("countryError"),
    messages: { valueMissing: "Country required" },
    custom: [],
  },
  zipCode: {
    el: document.getElementById("zipCode"),
    errorSpan: document.getElementById("zipCodeError"),
    messages: {
      valueMissing: "Zip code required",
      patternMismatch:
        "Invalid zip code. Must be 5-6 numbers, optionally followed by a hyphen and four more numbers (xxxxx(x)(-xxxx))",
    },
    custom: [],
  },
  password: {
    el: document.getElementById("password"),
    errorSpan: document.getElementById("passwordError"),
    messages: {
      valueMissing: "Password required",
      tooShort: "Password must be at least eight characters",
    },
    custom: [],
  },
  pwConfirmation: {
    el: document.getElementById("pwConfirmation"),
    errorSpan: document.getElementById("pwConfirmationError"),
    messages: { valueMissing: "Password confirmation required" },
    custom: [
      {
        validator: function matchesPassword() {
          return inputs.pwConfirmation.el.value === inputs.password.el.value;
        },
        message: "Confirmation doesn't match password",
      },
    ],
  },
};

const validateField = (input) => {
  const { el, errorSpan, messages, custom } = input;
  el.classList.remove("invalid");
  errorSpan.innerText = "";
  el.setCustomValidity("");
  Object.keys(messages).forEach((key) => {
    if (el.validity[key]) {
      el.classList.add("invalid");
      el.setCustomValidity(messages[key]);
      errorSpan.innerText = el.validationMessage;
    }
  });
  custom.forEach((customValidator) => {
    const { validator, message } = customValidator;
    if (!validator()) {
      el.classList.add("invalid");
      el.setCustomValidity(message);
      errorSpan.innerText = message;
    }
  });
};

Object.values(inputs).forEach((input) => {
  const { el } = input;
  el.addEventListener("blur", () => validateField(input));

  el.addEventListener("focus", (e) => {
    el.classList.remove("invalid");
    el.setCustomValidity("");
  });
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  Object.values(inputs).forEach((input) => {
    validateField(input);
  });
  const allValid = Object.values(inputs).reduce(
    (acc, cur) => acc && cur.el.validity.valid,
    true
  );
  if (allValid) {
    submitMessage.innerText = "Everything looks good -- high five! ✋";
  }
});
