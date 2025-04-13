document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("patientForm");
  const fnameInput = document.getElementById("fname");
  const painSlider = document.getElementById("pain");
  const painDisplay = document.getElementById("pain-display");
  const submitBtn = document.getElementById("submit-btn");
  const validateBtn = document.getElementById("validate-btn");
  const rememberCheckbox = document.getElementById("rememberMe");
  const notYouContainer = document.getElementById("not-you-container");
  const welcomeMsg = document.getElementById("welcome-msg");

  // Update pain level in real-time
  painSlider.addEventListener("input", () => {
    painDisplay.textContent = painSlider.value;
  });

  // Helper functions for cookies
  function setCookie(name, value, hours) {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Handle cookie on load
  const savedName = getCookie("userFirstName");
  if (savedName) {
    welcomeMsg.textContent = `Welcome back, ${savedName}`;
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
        welcomeMsg.textContent = "Welcome New User";
        notYouContainer.innerHTML = "";
        fnameInput.value = "";
      }
    });
  }

  // Utility
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

    valid &= validateField("fname", v => /^[a-zA-Z'\\-]{1,30}$/.test(v), "Invalid first name.");
    valid &= validateField("mname", v => v === "" || /^[a-zA-Z]$/.test(v), "Middle initial must be 1 letter or blank.");
    valid &= validateField("lname", v => /^[a-zA-Z'\\-]{1,30}$/.test(v), "Invalid last name.");
    valid &= validateField("dob", v => {
      const dob = new Date(v);
      const today = new Date();
      const oldest = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
      return v && dob <= today && dob >= oldest;
    }, "DOB must be between 1905 and today.");
    valid &= validateField("pid", v => /^\\d{9}$/.test(v.replace(/-/g, "")), "Must be 9 digits.");
    valid &= validateField("email", v => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v), "Invalid email.");
    valid &= validateField("phone", v => /^\\d{3}-\\d{3}-\\d{4}$/.test(v), "Phone must match 000-000-0000.");
    valid &= validateField("addr1", v => v.length >= 2 && v.length <= 30, "2–30 characters required.");
    valid &= validateField("addr2", v => v === "" || (v.length >= 2 && v.length <= 30), "2–30 characters or leave blank.");
    valid &= validateField("city", v => v.length >= 2 && v.length <= 30, "2–30 characters required.");
    valid &= validateField("state", v => v !== "", "Select a state.");
    valid &= validateField("zip", v => /^\\d{5}(-\\d{4})?$/.test(v), "Invalid ZIP format.");

    // User ID
    const uid = document.getElementById("uid").value;
    valid &= validateField("uid", v => /^[a-zA-Z_\\-][a-zA-Z0-9_\\-]{4,19}$/.test(v), "5–20 chars, no special chars, can't start with number.");

    // Password
    const p1 = document.getElementById("pword").value;
    const p2 = document.getElementById("pword2").value;

    if (p1.length < 8 || !/[A-Z]/.test(p1) || !/[a-z]/.test(p1) || !/\\d/.test(p1)) {
      showError("pword", "Password must be 8+ chars and include uppercase, lowercase, number.");
      valid = false;
    } else if (p1 === uid) {
      showError("pword", "Password cannot match user ID.");
      valid = false;
    } else {
      clearError("pword");
    }

    if (p1 !== p2) {
      showError("pword2", "Passwords do not match.");
      valid = false;
    } else {
      clearError("pword2");
    }

    return !!valid;
  }

  // Validate button
  validateBtn.addEventListener("click", () => {
    const valid = validateForm();
    submitBtn.disabled = !valid;

    if (valid && rememberCheckbox.checked) {
      setCookie("userFirstName", fnameInput.value, 48);
    } else if (!rememberCheckbox.checked) {
      deleteCookie("userFirstName");
    }
  });
});
