// DOM Ready
window.addEventListener("DOMContentLoaded", () => {
  const fnameInput = document.getElementById("fname");
  const rememberMe = document.getElementById("rememberMe");
  const resetUser = document.getElementById("resetUser");
  const greeting = document.getElementById("greeting");
  const newUserOption = document.getElementById("newUserOption");
  const validateBtn = document.getElementById("validate-btn");
  const submitBtn = document.getElementById("submit-btn");

  // Cookie Helpers
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

  // Load greeting and name
  const storedName = getCookie("firstName");
  if (storedName) {
    greeting.textContent = `Welcome back, ${storedName}`;
    fnameInput.value = storedName;
    newUserOption.style.display = "block";
  } else {
    greeting.textContent = "Welcome New User";
  }

  // Reset user checkbox
  if (resetUser) {
    resetUser.addEventListener("change", () => {
      if (resetUser.checked) {
        eraseCookie("firstName");
        fnameInput.value = "";
        greeting.textContent = "Welcome New User";
        newUserOption.style.display = "none";
      }
    });
  }

  // Remember Me checkbox
  rememberMe.addEventListener("change", () => {
    if (!rememberMe.checked) {
      eraseCookie("firstName");
    }
  });

  // Validate button functionality
  validateBtn.addEventListener("click", () => {
    const fnameVal = fnameInput.value.trim();
    const fnameError = document.getElementById("fname-error");

    let valid = true;
    fnameError.textContent = "";

    if (!/^[a-zA-Z'-]{1,30}$/.test(fnameVal)) {
      fnameError.textContent = "Enter a valid first name (1–30 letters, dashes/apostrophes only).";
      valid = false;
    }

    if (valid) {
      submitBtn.disabled = false;
      if (rememberMe.checked) {
        setCookie("firstName", fnameVal, 2);
      }
    } else {
      submitBtn.disabled = true;
    }
  });
});
