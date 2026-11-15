import { brandMark } from "./illustrations.js";

const PAGES = [
  { href: "/index.html", id: "home", label: "Home" },
  { href: "/studio.html", id: "studio", label: "Assignment studio" },
  { href: "/basics.html", id: "basics", label: "AI Basics" },
  { href: "/gym.html", id: "gym", label: "Prompt gym" },
  { href: "/integrity.html", id: "integrity", label: "Integrity" },
  { href: "/teachers.html", id: "teachers", label: "Teachers" },
  { href: "/faq.html", id: "faq", label: "FAQ" },
];

function normalizePath(path) {
  const p = path.replace(/\/+$/, "") || "/index.html";
  if (p === "/" || p.endsWith("/index.html") || p === "/index.html") return "/index.html";
  return p.endsWith(".html") ? p : `${p}.html`;
}

export function initLayout(current) {
  const header = document.querySelector("[data-header]");
  if (header) {
    const path = normalizePath(location.pathname);
    header.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="header-inner">
        <a class="brand" href="/index.html">
          ${brandMark()}
          <span>
            <span class="brand-name">Learn, Then Ask</span>
            <span class="brand-tag">Not a homework machine</span>
          </span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
          Menu
        </button>
        <nav class="site-nav" id="site-nav" data-nav>
          <ul>
            ${PAGES.map((p) => {
              const here = p.id === current || normalizePath(p.href) === path;
              const cls = p.id === "studio" ? "nav-cta" : "";
              return `<li><a class="${cls}" href="${p.href}" ${here ? 'aria-current="page"' : ""}>${p.label}</a></li>`;
            }).join("")}
          </ul>
        </nav>
      </div>
    `;
    const toggle = header.querySelector("[data-nav-toggle]");
    const nav = header.querySelector("[data-nav]");
    toggle?.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const footer = document.querySelector("[data-footer]");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <p class="footer-line">This site will not do your homework. That’s the point.</p>
        <p>Plans stay on this device (localStorage). No account. No ghostwriting button — under any name.</p>
        <p class="muted">Learn, Then Ask · for high school and first-year college</p>
      </div>
    `;
  }
}

export function copyText(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const old = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = old;
    }, 1400);
  });
}
