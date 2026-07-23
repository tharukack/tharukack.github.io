const menu = document.querySelector(".menu");
const mobileNav = document.querySelector(".mobile-nav");
const pointerLight = document.querySelector(".pointer-light");

document.querySelector("#year").textContent = new Date().getFullYear();

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
