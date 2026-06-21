const contactFormToggle = document.querySelector("#contact-form-toggle");
const contactModal = document.querySelector("#contact-modal");
const contactFormClose = document.querySelector("#contact-form-close");
const contactForm = document.querySelector("#contact-form");
const contactModalOverlay = document.querySelector("#contact-modal-overlay");

function closeModal() {
  contactModal?.classList.add("hidden");
  contactModal?.classList.remove("flex");
  contactModal?.setAttribute("aria-hidden", "true");
  contactFormToggle?.focus();
}

function openModal() {
  contactModal?.classList.remove("hidden");
  contactModal?.classList.add("flex");
  contactModal?.removeAttribute("aria-hidden");
  contactForm?.querySelector("input, textarea, button")?.focus();
}

function handleBackgroundClick(event) {
  if (event.target === contactModalOverlay) {
    closeModal();
  }
}

function handleSubmit(event) {
  event.preventDefault();
  if (!contactForm) return;

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#message").value;

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=francoiniegosystem@gmail.com&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

  window.open(gmailLink, "_blank");
  contactForm.reset();
  closeModal();
  alert("Message ready to send! Gmail will open in a new tab.");
}

export function initContact() {
  if (contactFormToggle) {
    contactFormToggle.addEventListener("click", openModal);
  }

  if (contactFormClose) {
    contactFormClose.addEventListener("click", closeModal);
  }

  contactModalOverlay?.addEventListener("click", handleBackgroundClick);

  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}
