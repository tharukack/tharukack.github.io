const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const resumeThemeIcon = document.querySelector(".resume-theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');
const layoutToggle = document.querySelector(".layout-toggle");
const pdfDocument = document.querySelector("#pdf-document");
let pdfPagesLoaded = false;

async function loadPdfPages() {
  if (!pdfDocument || pdfPagesLoaded) return;
  pdfPagesLoaded = true;

  try {
    const response = await fetch(pdfDocument.dataset.manifest, {
      cache: "no-cache",
    });
    if (!response.ok) throw new Error("Resume page manifest is unavailable.");

    const pages = await response.json();
    if (!Array.isArray(pages) || pages.length === 0) {
      throw new Error("No rendered resume pages were found.");
    }

    const fragment = document.createDocumentFragment();
    pages.forEach((source, index) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const caption = document.createElement("figcaption");

      figure.className = "pdf-page";
      image.src = source;
      image.alt = `Résumé page ${index + 1} of ${pages.length}`;
      image.loading = index === 0 ? "eager" : "lazy";
      image.decoding = "async";
      caption.textContent = `Page ${index + 1} of ${pages.length}`;

      figure.append(image, caption);
      fragment.append(figure);
    });

    pdfDocument.replaceChildren(fragment);
  } catch {
    const message = document.createElement("p");
    const link = document.createElement("a");
    message.className = "pdf-error";
    message.append("The rendered pages are not available yet. ");
    link.href = "assets/Tharuka-Chathura-Resume.pdf";
    link.download = "Tharuka-Chathura-Resume.pdf";
    link.textContent = "Download the PDF instead.";
    message.append(link);
    pdfDocument.replaceChildren(message);
  }
}

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

function applyLayout(layout) {
  const pdf = layout === "pdf" || layout === "classic";
  root.dataset.layout = pdf ? "pdf" : "modern";
  if (pdf) loadPdfPages();
  layoutToggle?.setAttribute("aria-pressed", String(pdf));
  layoutToggle?.setAttribute(
    "aria-label",
    pdf ? "View modern résumé" : "View PDF résumé",
  );
  layoutToggle?.setAttribute(
    "title",
    pdf ? "View modern résumé" : "View PDF résumé",
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
  const nextLayout = root.dataset.layout === "pdf" ? "modern" : "pdf";
  try {
    localStorage.setItem("resume-layout", nextLayout);
  } catch {
    // The layout still changes when storage is unavailable.
  }
  applyLayout(nextLayout);
});
