const menu = document.querySelector(".menu");
const mobileNav = document.querySelector(".mobile-nav");
const pointerLight = document.querySelector(".pointer-light");
const siteThemeToggle = document.querySelector(".site-theme-toggle");
const siteThemeIcon = document.querySelector(".site-theme-icon");
const siteThemeColor = document.querySelector('meta[name="theme-color"]');

document.querySelector("#year").textContent = new Date().getFullYear();

function applySiteTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  siteThemeToggle?.setAttribute("aria-pressed", String(dark));
  siteThemeToggle?.setAttribute(
    "aria-label",
    dark ? "Switch to light theme" : "Switch to dark theme",
  );
  if (siteThemeIcon) siteThemeIcon.textContent = dark ? "☀" : "☾";
  if (siteThemeColor) siteThemeColor.content = dark ? "#0c0e0d" : "#f7f5ed";
}

applySiteTheme(document.documentElement.dataset.theme || "dark");

siteThemeToggle?.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch {
    // The theme still changes when storage is unavailable.
  }
  applySiteTheme(nextTheme);
});

menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  menu.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  mobileNav.classList.toggle("open", !open);
  mobileNav.setAttribute("aria-hidden", String(open));
  document.body.style.overflow = open ? "" : "hidden";
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Open menu");
    mobileNav?.classList.remove("open");
    mobileNav?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    pointerLight.style.left = `${event.clientX}px`;
    pointerLight.style.top = `${event.clientY}px`;
    pointerLight.style.opacity = "1";
  });
}
