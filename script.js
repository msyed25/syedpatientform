// DOM Ready
window.addEventListener("DOMContentLoaded", () => {
  const greeting = document.getElementById("greeting");
  const newUserOption = document.getElementById("newUserOption");
  const fnameInput = document.getElementById("fname");
  const rememberMe = document.getElementById("rememberMe");
  const resetUser = document.getElementById("resetUser");
  const validateBtn = document.getElementById("validate-btn");
  const submitBtn = document.getElementById("submit-btn");
  const painSlider = document.getElementById("pain");
  const painDisplay = document.getElementById("pain-display");

  // Cookie helpers
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [key, val] = cookie.trim().split("=");
      if (key === name) return val;
    }
    return null;
  }

  function eraseCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Greeting setup
  const storedName = getCookie("firstName");
  if (storedName) {
    greeting.textContent = `Welcome back, ${storedName}`;
    fnameInput.value = storedName;
    newUserOption.style.display = "block";
  } else {
    greeting.textContent = "Welcome New User";
  }

  // Reset user
  if (resetUser) {
    resetUser.addEventListener("change", () => {
      if (resetUser.checked) {
        eraseCookie("firstName");
        greeting.textContent = "Welcome New User";
        fnameInput.value = "";
        newUserOption.style.display = "none";
      }
    });
  }

  rememberMe.addEventListener("change", () => {
    if (!rememberMe.checked) {
      eraseCookie("firstName");
    }
  });

  // Live pain display
  painSlider.addEventListener("input", () => {
    painDisplay.textContent = painSlider.value;
  });

  // Validation
  function validateField(id, regex, errorMsg) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    if (!input.value.match(regex)) {
      error.textContent = errorMsg;
      return false;
    } else {
      error.textContent = "";
      return true;
    }
  }

  function validateForm() {
    let valid = true;
    valid &= validateField("fname", /^[a-zA-Z\-' ]{1,30}$/, "First name invalid");
    valid &= validateField("mname", /^([a-zA-Z]{1})?$/, "Middle initial must be 1 letter or blank");
    valid &= validateField("lname", /^[a-zA-Z\-' ]{1,30}$/, "Last name invalid");

    const dob = document.getElementById("dob").value;
    const dobError = document.getElementById("dob-error");
    const dobDate = new Date(dob);
    const now = new Date();
    const earliest = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());
    if (!dob || dobDate > now || dobDate < earliest) {
      dobError.textContent = "Enter a valid date of birth (not in future, not over 120 years ago)";
      valid = false;
    } else {
      dobError.textContent = "";
    }

    valid &= validateField("pid", /^\d{9}$/, "Must be 9 digit number");
    valid &= validateField("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter valid email");
    valid &= validateField("phone", /^\d{3}-\d{3}-\d{4}$/, "Format must be 000-000-0000");
    valid &= validateField("addr1", /^.{2,30}$/, "Address 1 required (2-30 chars)");
    const addr2 = document.getElementById("addr2").value;
    if (addr2 && !/^.{2,30}$/.test(addr2)) {
      document.getElementById("addr2-error").textContent = "If entered, must be 2-30 chars";
      valid = false;
    } else {
      document.getElementById("addr2-error").textContent = "";
    }
    valid &= validateField("city", /^.{2,30}$/, "City required (2-30 chars)");

    const state = document.getElementById("state");
    const stateError = document.getElementById("state-error");
    if (!state.value) {
      stateError.textContent = "Please select a state";
      valid = false;
    } else {
      stateError.textContent = "";
    }

    valid &= validateField("zip", /^\d{5}(-\d{4})?$/, "Zip must be 5 digits or ZIP+4");

    const uid = document.getElementById("uid").value;
    const uidError = document.getElementById("uid-error");
    if (!/^[a-zA-Z_\-][a-zA-Z0-9_\-]{4,19}$/.test(uid)) {
      uidError.textContent = "5-20 chars, no special chars, cannot start with number";
      valid = false;
    } else {
      uidError.textContent = "";
    }

    const pw = document.getElementById("pword").value;
    const pw2 = document.getElementById("pword2").value;
    const pwErr = document.getElementById("pword-error");
    const pw2Err = document.getElementById("pword2-error");
    pwErr.textContent = "";
    pw2Err.textContent = "";

    if (pw.length < 8 || !/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/\d/.test(pw)) {
      pwErr.textContent = "Must be 8+ chars, include upper, lower, digit";
      valid = false;
    } else if (pw === uid) {
      pwErr.textContent = "Password cannot match user ID";
      valid = false;
    }

    if (pw !== pw2) {
      pw2Err.textContent = "Passwords do not match";
      valid = false;
    }

    return valid;
  }

  validateBtn.addEventListener("click", () => {
    const fnameVal = fnameInput.value.trim();
    const valid = validateForm();
    if (valid) {
      submitBtn.disabled = false;
      if (rememberMe.checked) setCookie("firstName", fnameVal, 2);
    } else {
      submitBtn.disabled = true;
    }
  });
});
