import "../styles.css";
import { initLayout } from "../js/shared.js";
import { deskScene } from "../js/illustrations.js";
import { PLAYBOOKS } from "../js/playbooks.js";

initLayout("home");
const art = document.querySelector("[data-hero-art]");
if (art) art.innerHTML = deskScene();

const featured = document.querySelector("[data-featured]");
if (featured) {
  featured.innerHTML = PLAYBOOKS.map((p) => {
    const href = `/studio.html?type=${p.id}`;
    return `<a class="preset-card ${p.featured ? "featured" : ""}" href="${href}">
      ${p.featured ? `<span class="badge">Start here</span>` : ""}
      <h3>${p.name}</h3>
      <p>${p.short}</p>
      <p class="muted" style="margin-top:.55rem">e.g. ${p.example}</p>
    </a>`;
  }).join("");
}
