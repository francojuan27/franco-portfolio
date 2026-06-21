import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const menuBtn = document.querySelector("#menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const backToTopBtn = document.querySelector("#back-to-top");
const navLinks = document.querySelectorAll(".nav-link");
const contactFormToggle = document.querySelector("#contact-form-toggle");
const contactModal = document.querySelector("#contact-modal");
const contactFormClose = document.querySelector("#contact-form-close");
const contactForm = document.querySelector("#contact-form");

// Mobile Menu Toggle
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuBtn.textContent = mobileMenu.classList.contains("hidden") ? "☰" : "×";
});

// Close Mobile Menu on Link Click
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuBtn.textContent = "☰";
  });
});

// Scroll to Top Button
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }

  // Update active navigation
  updateActiveNav();
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Active Navigation Highlighting
function updateActiveNav() {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-blue-400", "border-b-2", "border-blue-400");
    if (link.getAttribute("data-section") === current) {
      link.classList.add("text-blue-400", "border-b-2", "border-blue-400");
    }
  });
}

// Contact Form Modal
contactFormToggle.addEventListener("click", () => {
  contactModal.classList.remove("hidden");
  contactModal.classList.add("flex");
});

contactFormClose.addEventListener("click", () => {
  contactModal.classList.add("hidden");
  contactModal.classList.remove("flex");
});

// Close Modal on Background Click
contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.add("hidden");
    contactModal.classList.remove("flex");
  }
});

// Contact Form Submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#message").value;

  // Send email via Gmail
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=francoiniegosystem@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

  window.open(gmailLink, "_blank");

  // Reset form
  contactForm.reset();
  contactModal.classList.add("hidden");
  contactModal.classList.remove("flex");

  // Show success message
  alert("Message ready to send! Gmail will open in a new tab.");
});
