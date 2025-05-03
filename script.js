document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("patientForm");
  const fnameInput = document.getElementById("fname");
  const greetingDiv = document.getElementById("greeting");
  const rememberCheckbox = document.getElementById("rememberMe");
  const notYouContainer = document.getElementById("not-you-container");
  const submitBtn = document.getElementById("submit-btn");
  const validateBtn = document.getElementById("validate-btn");

  // Display today's date
  const dateSpan = document.getElementById("dateDisplay");
  const today = new Date();
  dateSpan.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Helper functions for cookies
  function setCookie(name, value, hours) {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Handle cookie on load
  const savedName = getCookie("userFirstName");
  if (savedName) {
    greetingDiv.textContent = `Welcome back, ${savedName}`;
    fnameInput.value = savedName;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "reset-user";
    const label = document.createElement("label");
    label.htmlFor = "reset-user";
    label.textContent = ` Not ${savedName}? Click here to reset.`;
    notYouContainer.appendChild(checkbox);
    notYouContainer.appendChild(label);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        deleteCookie("userFirstName");
        form.reset();
        greetingDiv.textContent = "Welcome New User";
        notYouContainer.innerHTML = "";
        fnameInput.value = "";
      }
    });
  }

  // Utility functions for validation
  function showError(id, msg) {
    document.getElementById(`${id}-error`).textContent = msg;
  }

  function clearError(id) {
    document.getElementById(`${id}-error`).textContent = "";
  }

  function validateField(id, condition, message) {
    const input = document.getElementById(id);
    if (!condition(input.value)) {
      showError(id, message);
      return false;
    } else {
      clearError(id);
      return true;
    }
  }

  // Validation logic
  function validateForm() {
    let valid = true;

    valid &= validateField("fname", (v) => /^[a-zA-Z'-]{1,30}$/.test(v), "Invalid first name.");
    valid &= validateField("mname", (v) => v === "" || /^[a-zA-Z]$/.test(v), "Middle initial must be 1 letter or blank.");
    valid &= validateField("lname", (v) => /^[a-zA-Z'-]{1,30}$/.test(v
::contentReference[oaicite:36]{index=36}
 
