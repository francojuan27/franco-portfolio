export function initLoading() {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = loadingScreen?.querySelector(".progress-bar");
  const minDuration = 2500;
  const startTime = performance.now();
  let loaded = document.readyState === "complete";
  let hidden = false;

  if (!loadingScreen || !progressBar) return;

  const hideLoading = () => {
    if (hidden) return;
    hidden = true;
    clearInterval(interval);
    loadingScreen.classList.add("opacity-0");
    setTimeout(() => loadingScreen.remove(), 700);
  };

  const updateProgress = () => {
    const elapsed = performance.now() - startTime;
    const percent = Math.min((elapsed / minDuration) * 100, 100);
    progressBar.style.width = `${percent}%`;

    if (percent >= 100 && loaded) {
      hideLoading();
    }
  };

  const interval = setInterval(updateProgress, 50);
  updateProgress();

  const onLoaded = () => {
    loaded = true;
    if (performance.now() - startTime >= minDuration) {
      hideLoading();
    }
  };

  window.addEventListener("load", onLoaded);

  setTimeout(() => {
    if (!hidden) {
      hideLoading();
    }
  }, minDuration + 3000);
}
