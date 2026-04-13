const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("form-message");
const inputs = document.querySelectorAll(
  "#contact-form input, #contact-form textarea",
);

inputs.forEach((input) => {
  const hint = input.nextElementSibling;

  input.addEventListener("focus", () => {
    if (hint && hint.classList.contains("form-hint")) {
      hint.classList.remove("hidden");
    }
  });

  input.addEventListener("blur", () => {
    if (hint && hint.classList.contains("form-hint")) {
      hint.classList.add("hidden");
    }
  });
});

function countWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

form.addEventListener("submit", function (event) {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  const nameValid = /^[A-Za-z]{2,}.*$/.test(nameValue);
  const emailValid = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.com$/i.test(
    emailValue,
  );
  const messageValid = countWords(messageValue) >= 6;

  if (!nameValid) {
    event.preventDefault();
    formMessage.textContent = "Please enter a name with at least 2 letters.";
    formMessage.style.color = "crimson";
    return;
  }

  if (!emailValid) {
    event.preventDefault();
    formMessage.textContent =
      "Please enter a valid email with at least one letter, an @, and a .com ending.";
    formMessage.style.color = "crimson";
    return;
  }

  if (!messageValid) {
    event.preventDefault();
    formMessage.textContent = "Please enter a message with at least 6 words.";
    formMessage.style.color = "crimson";
    return;
  }

  formMessage.textContent =
    "Thank you for messaging me! Your email draft is opening.";
  formMessage.style.color = "green";
});
