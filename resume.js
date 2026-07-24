const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const layoutToggle = document.querySelector(".layout-toggle");

function applyTheme(theme) {
  const dark = theme === "dark";
  root.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(dark));
  themeToggle?.setAttribute(
    "aria-label",
    dark ? "Switch to light theme" : "Switch to dark theme",
  );
  if (themeLabel) themeLabel.textContent = dark ? "Light" : "Dark";
  if (themeColor) themeColor.content = dark ? "#0c0e0d" : "#e7e5dc";
}

applyTheme(root.dataset.theme || "light");

function applyLayout(layout) {
  const classic = layout === "classic";
  root.dataset.layout = layout;
  layoutToggle?.setAttribute("aria-pressed", String(classic));
  layoutToggle?.setAttribute(
    "aria-label",
    classic
      ? "Switch to modern résumé layout"
      : "Switch to classic résumé layout",
  );
  layoutToggle?.setAttribute(
    "title",
    classic ? "Use modern layout" : "Use classic résumé layout",
  );
}

applyLayout(root.dataset.layout || "modern");

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("resume-theme", nextTheme);
  } catch {
    // The theme still changes when storage is unavailable.
  }
  applyTheme(nextTheme);
});

layoutToggle?.addEventListener("click", () => {
  const nextLayout = root.dataset.layout === "classic" ? "modern" : "classic";
  try {
    localStorage.setItem("resume-layout", nextLayout);
  } catch {
    // The layout still changes when storage is unavailable.
  }
  applyLayout(nextLayout);
});
