const typedPhrases = [
  "PHP Developer",
  "AI Systems Developer",
  "Tailwind CSS Developer",
  "Full Stack Web Developer",
];

const typedElement = document.querySelector("#hero-typed");
const animatedElements = document.querySelectorAll("[data-animate]");
const progressBars = document.querySelectorAll("[data-progress]");
const countItems = document.querySelectorAll("[data-count-target]");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTyping() {
  if (!typedElement) return;

  let currentIndex = 0;
  while (true) {
    const phrase = typedPhrases[currentIndex];
    typedElement.textContent = "";

    for (let index = 0; index < phrase.length; index += 1) {
      typedElement.textContent += phrase[index];
      await wait(100);
    }

    await wait(1400);

    for (let index = phrase.length; index >= 0; index -= 1) {
      typedElement.textContent = phrase.slice(0, index);
      await wait(40);
    }

    await wait(400);
    currentIndex = (currentIndex + 1) % typedPhrases.length;
  }
}

function animateProgressBar(bar) {
  const targetValue = Number(bar.dataset.progress ?? 0);
  bar.style.width = `${targetValue}%`;
}

function animateCounter(item) {
  if (item.dataset.animated === "true") return;
  const targetValue = Number(item.dataset.countTarget ?? 0);
  const suffix = item.dataset.countSuffix ?? "";
  const duration = 1200;
  const stepTime = 30;
  const increments = Math.ceil(targetValue / (duration / stepTime));
  let currentValue = 0;

  item.dataset.animated = "true";

  const interval = setInterval(() => {
    currentValue += increments;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(interval);
    }
    item.textContent = `${currentValue}${suffix}`;
  }, stepTime);
}

function setupObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        target.classList.add("animate");

        if (target.dataset.progress) {
          animateProgressBar(target);
        }

        if (target.dataset.countTarget) {
          animateCounter(target);
        }
      });
    },
    { threshold: 0.25 },
  );

  animatedElements.forEach((element) => observer.observe(element));
  progressBars.forEach((element) => observer.observe(element));
  countItems.forEach((element) => observer.observe(element));
}

export function initAnimations() {
  runTyping();
  setupObserver();
}
