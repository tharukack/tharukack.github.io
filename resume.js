const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const resumeThemeIcon = document.querySelector(".resume-theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  const dark = theme === "dark";
  root.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(dark));
  themeToggle?.setAttribute(
    "aria-label",
    dark ? "Switch to light theme" : "Switch to dark theme",
  );
  if (resumeThemeIcon) resumeThemeIcon.textContent = dark ? "☀" : "☾";
  if (themeColor) themeColor.content = dark ? "#0c0e0d" : "#e7e5dc";
}

applyTheme(root.dataset.theme || "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("resume-theme", nextTheme);
  } catch {
    // The theme still changes when storage is unavailable.
  }
  applyTheme(nextTheme);
});
