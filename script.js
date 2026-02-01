const form = document.getElementById("contactForm");
const submitBtn = form.querySelector(".submit-btn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values
  const fullName = form.fullName.value.trim();
  const company = form.company.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Validation
  if (!fullName || !email || !message) {
    showStatus("Please fill in all required fields.", "error");
    return;
  }

  if (!validateEmail(email)) {
    showStatus("Please enter a valid email address.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = "Sending...";

  const templateParams = {
    fullName,
    company,
    email,
    message
  };

  emailjs
    .send(
      "service_3ir6p6g",
      "template_x3dv4hb",
      templateParams
    )
    .then(() => {
      showStatus("Message sent successfully. I’ll get back to you soon.", "success");
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = "➤ Submit Inquiry";
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      showStatus("Failed to send message. Please try again.", "error");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "➤ Submit Inquiry";
    });
});

/* ================= HELPERS ================= */

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(message, type) {
  let status = document.querySelector(".form-status");

  if (!status) {
    status = document.createElement("div");
    status.className = "form-status";
    form.appendChild(status);
  }

  status.textContent = message;
  status.className = `form-status ${type}`;
}

/* ================= HAMBURGER MENU FIX ================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".navbar nav");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("open");
  });
}

