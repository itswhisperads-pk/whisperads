/* -----------------------------
  Theme toggle (persist)
----------------------------- */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  // swap icon: moon for dark, sun for light
  if (theme === "dark") {
    themeIcon.innerHTML = `<path d="M216 152a72 72 0 1 1-72-72a56 56 0 1 0 72 72Z"/>`;
  } else {
    themeIcon.innerHTML = `<path d="M128 72a56 56 0 1 0 56 56a56.06 56.06 0 0 0-56-56Zm0-48a8 8 0 0 1 8 8v16a8 8 0 0 1-16 0V32a8 8 0 0 1 8-8Zm0 184a8 8 0 0 1 8 8v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 8-8ZM40 120H24a8 8 0 0 0 0 16h16a8 8 0 0 0 0-16Zm192 0h-16a8 8 0 0 0 0 16h16a8 8 0 0 0 0-16ZM55.72 55.72a8 8 0 0 0-11.31 0L33.09 67a8 8 0 0 0 11.31 11.31l11.32-11.31a8 8 0 0 0 0-11.28Zm167.19 167.19a8 8 0 0 0-11.31 0l-11.32 11.32A8 8 0 0 0 211.59 245l11.32-11.32a8 8 0 0 0 0-11.28ZM222.91 67l-11.32-11.32a8 8 0 0 0-11.31 11.32L211.6 78.31A8 8 0 1 0 222.91 67ZM44.41 177.69A8 8 0 0 0 33.1 189l11.31 11.32a8 8 0 0 0 11.31-11.32Z"/>`;
  }
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
    return;
  }
  // default dark
  setTheme("dark");
})();

themeToggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

/* -----------------------------
  Name reveal animation
----------------------------- */
function renderReveal(el) {
  const text = el.getAttribute("data-reveal") || "";
  el.innerHTML = "";
  [...text].forEach((ch, i) => {
    const span = document.createElement("span");
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.style.animationDelay = `${i * 35}ms`;
    el.appendChild(span);
  });
}
document.querySelectorAll(".reveal").forEach(renderReveal);

/* -----------------------------
  Projects (data-driven)
----------------------------- */
const projects = [
  { kicker: "A Premium Experience.", title: "Dluxe Cocktails", url: "https://www.dluxecocktails.com/", tint: "linear-gradient(135deg, rgba(183, 22, 16, 0.35), rgba(90,180,255,.80))" },
  { kicker: "Singer / Songwriter", title: "Patty Lou", url: "https://www.iampattylou.com/", tint: "linear-gradient(135deg, rgba(255,120,200,.30), rgba(170, 0, 71, 0.80))" },
  { kicker: "Hip Hop R&B & Culture", title: "The Pitch", url: "https://www.wethepitch.com/", tint: "linear-gradient(135deg, rgba(22, 10, 10, 0.1), rgba(26, 22, 22, 0.8))" },
  { kicker: "OTT Platform", title: "Dragon Stream", url: "https://dragonstream.us/", tint: "linear-gradient(135deg, rgba(202, 0, 0, 0.80), rgba(255, 0, 0, 0.80))" },
  { kicker: "Fullstack Web3 Boilerplate", title: "ink!athon", url: "https://inkathon.xyz/", tint: "linear-gradient(135deg, rgba(166, 0, 181, 0.8), rgba(140, 0, 247, 0.8))" },
  { kicker: "Data & Education Platform", title: "Stablecoins.wtf", url: "https://stablecoins.wtf/", tint: "linear-gradient(135deg, rgba(255, 183, 0, 0.60), rgba(210, 133, 1, 0.80))" },
];

const projectsGrid = document.getElementById("projectsGrid");
const toggleBtn = document.getElementById("toggleProjects");
const toggleText = document.getElementById("toggleProjectsText");
const fade = document.getElementById("projectsFade");

function externalIcon() {
  return `
    <span class="card__ext" aria-hidden="true">
      <svg viewBox="0 0 256 256" width="14" height="14" fill="currentColor" aria-hidden="true">
        <path d="M200 64v104a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 0 1-11.32-11.32L172.69 72H88a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8Z"></path>
      </svg>
    </span>
  `;
}

function renderProjects() {
  projectsGrid.innerHTML = "";
  projects.forEach((p) => {
    const a = document.createElement("a");
    a.className = "card";
    a.href = p.url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.style.setProperty("--tint", p.tint);
    a.innerHTML = `
      <div class="card__top">
        <span class="card__kicker">${p.kicker}</span>
        ${externalIcon()}
      </div>
      <h3 class="card__title">${p.title}</h3>
    `;
    projectsGrid.appendChild(a);
  });
}

renderProjects();

/* -----------------------------
  Show more / less
----------------------------- */
let expanded = false;

function setProjectsState(isExpanded) {
  expanded = isExpanded;

  projectsGrid.classList.toggle("is-expanded", expanded);
  projectsGrid.classList.toggle("is-collapsed", !expanded);

  fade.classList.toggle("is-visible", !expanded);

  toggleText.textContent = expanded ? "Show less" : "Show more";
  // rotate arrow
  toggleBtn.querySelector("svg").style.transform = expanded ? "rotate(180deg)" : "rotate(0deg)";
  toggleBtn.querySelector("svg").style.transition = "transform .2s ease";
}

setProjectsState(false);

toggleBtn?.addEventListener("click", () => {
  setProjectsState(!expanded);
});

/* -----------------------------
  Smooth scrolling for in-page anchors
----------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const el = document.querySelector(id);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
