document.addEventListener("DOMContentLoaded", () => {
  const painSlider = document.getElementById("painRange");
  const painDisplay = document.getElementById("painValue");
  const submitBtn = document.getElementById("submit-btn");
  const validateBtn = document.getElementById("validate-btn");
  const rememberMe = document.getElementById("rememberMe");
  const greetingDiv = document.getElementById("greeting");

  // Update pain level in real time
  painSlider.addEventListener("input", () => {
    painDisplay.textContent = painSlider.value;
  });

  // Cookie utilities
  function setCookie(name, value, hours) {
    const expires = new Date(Date.now() + hours * 3600000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }

  // Greet returning user
  const savedName = getCookie("firstName");
  if (savedName) {
    greetingDiv.textContent = `Welcome back, ${savedName}!`;
  }

  // Reset greeting button
  document.getElementById("reset-greeting").addEventListener("click", () => {
    deleteCookie("firstName");
    greetingDiv.textContent = "";
    alert("Greeting has been reset.");
  });

  // Validation helpers
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

  function validateForm() {
    let valid = true;

    valid &= validateField("fname", v => /^[A-Za-z\s'-]{1,30}$/.test(v), "Invalid first name.");
    valid &= validateField("mname", v => v === "" || /^[A-Za-z]$/.test(v), "Middle initial must be 1 letter or blank.");
    valid &= validateField("lname", v => /^[A-Za-z\s'-]{1,30}$/.test(v), "Invalid last name.");
    valid &= validateField("email", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Invalid email address.");
    valid &= validateField("phone", v => /^\d{3}-\d{3}-\d{4}$/.test(v), "Phone must be in format 000-000-0000.");
    valid &= validateField("dob", v => {
      const dob = new Date(v);
      const now = new Date();
      const minDate = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());
      return dob >= minDate && dob <= now;
    }, "Enter a valid DOB (within 120 years).");
    valid &= validateField("pid", v => /^\d{3}-\d{2}-\d{4}$/.test(v), "SSN must be in format 123-45-6789.");
    valid &= validateField("addr1", v => v.length >= 2, "Enter a valid address.");
    valid &= validateField("addr2", v => v === "" || v.length >= 2, "Min 2 characters or leave blank.");
    valid &= validateField("city", v => v.length >= 2, "Enter a valid city.");
    valid &= validateField("state", v => v !== "", "Select a state.");
    valid &= validateField("zip", v => /^\d{5}(-\d{4})?$/.test(v), "Enter a valid ZIP code.");
    valid &= validateField("uid", v => /^[a-zA-Z_\-][a-zA-Z0-9_\-]{4,19}$/.test(v), "5–20 chars, no special chars.");

    const p1 = document.getElementById("pword").value;
    const p2 = document.getElementById("pword2").value;

    if (p1.length < 8 || !/[A-Z]/.test(p1) || !/[a-z]/.test(p1) || !/\d/.test(p1)) {
      showError("pword", "Password must be 8+ characters with upper, lower, and number.");
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

  // Validate button logic
  validateBtn.addEventListener("click", () => {
    const isValid = validateForm();
    submitBtn.disabled = !isValid;

    if (isValid && rememberMe.checked) {
      const fname = document.getElementById("fname").value.trim();
      if (fname) setCookie("firstName", fname, 48); // Save for 48 hours
    }
  });

  // Display today's date
  const dateSpan = document.getElementById("dateDisplay");
  const today = new Date();
  dateSpan.textContent = today.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
});
