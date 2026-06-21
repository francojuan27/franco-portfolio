const menuBtn = document.querySelector("#menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.querySelector("#back-to-top");
const sections = document.querySelectorAll("section[id]");

function closeMobileMenu() {
  mobileMenu.classList.add("hidden");
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenu.setAttribute("tabindex", "-1");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

function openMobileMenu() {
  mobileMenu.classList.remove("hidden");
  mobileMenu.setAttribute("aria-hidden", "false");
  mobileMenu.removeAttribute("tabindex");
  menuBtn.setAttribute("aria-expanded", "true");
  menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  mobileMenu.querySelector("a")?.focus();
}

function toggleMobileMenu() {
  const isOpen = !mobileMenu.classList.contains("hidden");
  if (isOpen) {
    closeMobileMenu();
    return;
  }

  openMobileMenu();
}

function updateActiveNav() {
  let currentSection = "home";
  const offset = window.innerHeight / 3;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop - offset &&
      window.scrollY < sectionTop + sectionHeight - offset
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("data-section") === currentSection;
    link.classList.toggle("text-blue-400", isCurrent);
    link.classList.toggle("border-b-2", isCurrent);
    link.classList.toggle("border-blue-400", isCurrent);
  });
}

function handleScroll() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }

  updateActiveNav();
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      event.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      closeMobileMenu();
    });
  });
}

export function initNavigation() {
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", toggleMobileMenu);
  mobileLinks.forEach((link) =>
    link.addEventListener("click", closeMobileMenu),
  );
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }

    if (event.key === "Tab" && !mobileMenu.classList.contains("hidden")) {
      const focusable = Array.from(
        mobileMenu.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  setupSmoothScroll();
  updateActiveNav();
}
