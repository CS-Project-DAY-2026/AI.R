import { PLAYBOOKS, getPlaybook } from "./playbooks.js";
import { buildPlan } from "./planner.js";
import { looksLikeGhostwriter } from "./extract.js";
import { saveSession, loadSession } from "./storage.js";
import { copyText } from "./shared.js";
import { tutorReply, openingTutorMessage } from "./tutor.js";

const HELP_OPTIONS = [
  { id: "understanding", label: "Understanding the topic" },
  { id: "structure", label: "Structure" },
  { id: "research", label: "Research process" },
  { id: "citing", label: "Citing sources" },
  { id: "practice", label: "Practice Q&A" },
  { id: "draft", label: "Checking my draft" },
];

function qs(sel) {
  return document.querySelector(sel);
}

function paramType() {
  const t = new URLSearchParams(location.search).get("type");
  return PLAYBOOKS.some((p) => p.id === t) ? t : "";
}

export function initStudio() {
  const root = qs("#studio-root");
  if (!root) return;

  const state = {
    step: "pick",
    type: paramType() || "",
    plan: null,
    tutorOpen: false,
    tutorLog: [],
  };

  const saved = loadSession();
  if (paramType()) state.step = "intake";
  else if (saved?.plan) {
    state.plan = saved.plan;
    state.type = saved.plan.type;
    state.step = "plan";
  }

  function render() {
    if (state.step === "pick") root.innerHTML = renderPicker();
    else if (state.step === "intake") root.innerHTML = renderIntake();
    else root.innerHTML = renderPlan();
    bind();
  }

  function renderPicker() {
    const last = loadSession();
    return `
      <div class="progress"><span class="now">1 · Type</span><span>2 · Intake</span><span>3 · Plan</span></div>
      <h1>What kind of assignment is this?</h1>
      <p class="lede">Pick a card. Speech and research paper are featured because they are where people most often skip the learning.</p>
      <div class="preset-grid">
        ${PLAYBOOKS.map(
          (p) => `
          <button class="preset-card ${p.featured ? "featured" : ""}" type="button" data-type="${p.id}">
            ${p.featured ? `<span class="badge">Featured</span>` : ""}
            <h3>${p.name}</h3>
            <p>${p.short}</p>
            <p class="muted" style="margin-top:.6rem">Example: ${p.example}</p>
          </button>`
        ).join("")}
      </div>
      ${
        last?.plan
          ? `<p style="margin-top:1.2rem"><button class="btn btn-ghost" type="button" data-resume>Resume last plan on this device</button></p>`
          : ""
      }
    `;
  }

  function renderIntake() {
    const pb = getPlaybook(state.type);
    return `
      <div class="progress"><span>1 · Type</span><span class="now">2 · Intake</span><span>3 · Plan</span></div>
      <p><button class="btn btn-ghost btn-small" type="button" data-back-pick>← All types</button></p>
      <h1>${pb.name}</h1>
      <p>Paste the real brief. We will extract a learning plan — not a finished ${pb.name.split("/")[0].trim().toLowerCase()}.</p>
      <div class="worked"><strong>Mini example (${pb.worked.who}).</strong> ${pb.worked.copy}</div>
      <form id="intake-form" class="form-grid" style="margin-top:1.2rem">
        ${
          pb.id === "other"
            ? `<div><label for="customType">What do you call this assignment?</label>
               <input id="customType" name="customType" type="text" placeholder="e.g. 3-minute podcast" /></div>`
            : ""
        }
        <fieldset>
          <legend>Assignment text</legend>
          <label class="choice"><input type="radio" name="source" value="paste" checked /> I have the brief / prompt / rubric</label>
          <label class="choice"><input type="radio" name="source" value="remember" /> I don’t have the brief; here’s what I remember</label>
          <label for="assignment" style="margin-top:.8rem">Paste or describe <span class="hint">(required)</span></label>
          <textarea id="assignment" name="assignment" required placeholder="Paste the prompt. Example: ${pb.example}"></textarea>
          <p id="ghost-banner" class="banner banner-warn hidden">This reads like “do the whole assignment.” We will still extract the learning goal, not the answer.</p>
          <p id="short-banner" class="banner banner-warn hidden">That’s very short. Add the task, length, and what “good” might mean so the plan can get specific.</p>
          <p id="empty-error" class="banner banner-error hidden" role="alert">Add assignment text (or what you remember) before generating a plan.</p>
        </fieldset>
        <div class="two-col">
          <div>
            <label for="subject">Course / subject <span class="hint">(optional)</span></label>
            <input id="subject" name="subject" type="text" placeholder="English 10, Bio 101…" />
          </div>
          <div>
            <span class="legend-like">Level <span class="hint">(optional)</span></span>
            <div class="choice-row">
              <label class="choice"><input type="radio" name="level" value="middle" /> Middle school</label>
              <label class="choice"><input type="radio" name="level" value="high" /> High school</label>
              <label class="choice"><input type="radio" name="level" value="college" /> College</label>
            </div>
          </div>
        </div>
        <div class="two-col">
          <div>
            <label for="due">Due date <span class="hint">(optional)</span></label>
            <input id="due" name="due" type="date" />
          </div>
          <div>
            <label for="limit">Word or time limit <span class="hint">(optional)</span></label>
            <input id="limit" name="limit" type="text" placeholder="5 minutes, 1500 words…" />
          </div>
        </div>
        <div>
          <label for="rubric">Rubric or what the teacher emphasized <span class="hint">(optional)</span></label>
          <textarea id="rubric" name="rubric" style="min-height:90px" placeholder="“Citation style APA. Counterargument required.”"></textarea>
        </div>
        <fieldset>
          <legend>Teacher AI policy <span class="hint">(optional)</span></legend>
          <label class="choice"><input type="radio" name="policy" value="allowed" /> Allowed</label>
          <label class="choice"><input type="radio" name="policy" value="restricted" /> Restricted</label>
          <label class="choice"><input type="radio" name="policy" value="unsure" /> Unsure</label>
        </fieldset>
        <fieldset>
          <legend>I want help with <span class="hint">(optional)</span></legend>
          <div class="check-grid">
            ${HELP_OPTIONS.map(
              (h) =>
                `<label><input type="checkbox" name="help" value="${h.id}" /> ${h.label}</label>`
            ).join("")}
          </div>
        </fieldset>
        <div>
          <label for="stuck">Where I’m stuck <span class="hint">(optional)</span></label>
          <textarea id="stuck" name="stuck" style="min-height:80px" placeholder="I have a topic but no thesis…"></textarea>
        </div>
        <div>
          <label for="draft">Draft paste — your writing only <span class="hint">(optional; we will not rewrite it into a submission)</span></label>
          <textarea id="draft" name="draft" placeholder="Outline, messy paragraphs, code you wrote…"></textarea>
        </div>
        <p class="banner banner-note">Saved only in this browser (localStorage). Nothing is sent to a server.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" type="submit">Generate Learning Plan</button>
        </div>
      </form>
    `;
  }

  function lightList(items) {
    return `<ul class="plain-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
  }

  function renderPlan() {
    const p = state.plan;
    const policyNote =
      p.policy === "restricted"
        ? "Your teacher marked AI as restricted. Stay in GREEN, keep a disclosure, and when in doubt, don’t paste the unpublished draft."
        : p.policy === "allowed"
          ? "AI may be allowed — still not as a ghostwriter. GREEN uses only."
          : "If the policy is unclear, ask the teacher before pasting a full draft into any tool.";

    return `
      <div class="progress"><span>1 · Type</span><span>2 · Intake</span><span class="now">3 · Plan</span></div>
      <div class="toolbar">
        <button class="btn btn-ghost btn-small" type="button" data-back-intake>Edit intake</button>
        <button class="btn btn-ghost btn-small" type="button" data-new>Start over</button>
        <button class="btn btn-navy btn-small" type="button" data-open-tutor>Tutor mode</button>
      </div>
      <p class="kicker">${p.typeName}${p.customType ? ` · ${p.customType}` : ""} ${p.subject ? `· ${p.subject}` : ""} ${p.due ? `· due ${p.due}` : ""}</p>
      <h1>Your Learning Plan</h1>
      <p>Decode → attempt → hint → check. The finished assignment still has to come from you.</p>
      ${p.ghosty ? `<p class="banner banner-warn">We treated your paste as a request to skip. This page is the learning goal, not the product.</p>` : ""}
      ${p.tooShort ? `<p class="banner banner-warn">Brief was short, so some lines stay general. Add more of the prompt if you can.</p>` : ""}
      <p class="banner banner-note">${p.note}</p>
      <p class="banner banner-green">${policyNote}</p>
      <div class="plan">
        <section class="card plan-block" id="learn">
          <h2>A. What you’re supposed to learn</h2>
          <ul class="plain-list">${p.goals.map((g) => `<li>${g}</li>`).join("")}</ul>
          ${p.helpBits.length ? `<p class="muted">You asked for help with: ${p.helpBits.join(", ")}.</p>` : ""}
        </section>
        <section class="card plan-block">
          <h2>B. What “done well” looks like</h2>
          <ul class="plain-list">${p.success.map((g) => `<li>${g}</li>`).join("")}</ul>
        </section>
        <section class="card plan-block">
          <h2>C. Do this before any AI</h2>
          <ul class="check-list">${p.tryFirst.map((g) => `<li>${g}</li>`).join("")}</ul>
          ${p.stuck ? `<p><strong>You said you were stuck:</strong> ${p.stuck} — attempt anyway for the timed block, then use a GREEN prompt.</p>` : ""}
        </section>
        <section class="card plan-block">
          <h2>D. AI traffic lights for this assignment</h2>
          <div class="lights">
            <div class="light green"><h3><span class="dot dot-green"></span> GREEN</h3>${lightList(p.lights.green)}</div>
            <div class="light yellow"><h3><span class="dot dot-yellow"></span> YELLOW</h3>${lightList(p.lights.yellow)}</div>
            <div class="light red"><h3><span class="dot dot-red"></span> RED</h3>${lightList(p.lights.red)}</div>
          </div>
        </section>
        <section class="card plan-block">
          <h2>E. Your tutor prompts</h2>
          <p>Ready to copy. They ask for explanations, process, quizzes, and feedback on <em>your</em> work — not the full product.</p>
          <div class="prompt-list">
            ${p.prompts
              .map(
                (pr, i) => `
              <div class="prompt-item">
                <pre>${pr}</pre>
                <button class="btn btn-ghost btn-small" type="button" data-copy="${i}">Copy</button>
              </div>`
              )
              .join("")}
          </div>
        </section>
        <section class="card plan-block">
          <h2>F. Concept check</h2>
          <p>Answer in your own words, out loud or on paper.</p>
          <ol class="plain-list">${p.checks.map((c) => `<li>${c}</li>`).join("")}</ol>
        </section>
        <section class="card plan-block">
          <h2>G. If you pasted a draft</h2>
          ${
            p.draftFeedback.present
              ? `<p class="muted">From your paste: “${p.draftFeedback.excerpt}”</p>
                 <ul class="check-list">${p.draftFeedback.notes.map((n) => `<li>${n}</li>`).join("")}</ul>`
              : `<p class="empty">No draft pasted. After you write something yourself, come back and use the checklist — we still will not rewrite it into a submission.</p>`
          }
        </section>
        <section class="card plan-block">
          <h2>H. Cite it</h2>
          <div class="prompt-item">
            <pre id="disclosure">${p.disclosure}</pre>
            <button class="btn btn-primary btn-small" type="button" data-copy-disc>Copy disclosure</button>
          </div>
        </section>
        <section class="card">
          <h2>Worked example (fictional)</h2>
          <p><strong>${p.worked.who}.</strong> ${p.worked.copy}</p>
        </section>
      </div>
      <div class="tutor-dock">
        <button class="btn btn-navy" type="button" data-open-tutor>Open tutor mode</button>
      </div>
      ${state.tutorOpen ? renderTutor() : ""}
    `;
  }

  function renderTutor() {
    const log = state.tutorLog
      .map(
        (m) =>
          `<div class="bubble ${m.role} ${m.kind === "refuse" ? "refuse" : ""}">${m.text}</div>`
      )
      .join("");
    return `
      <div class="tutor-panel" role="dialog" aria-labelledby="tutor-title">
        <div class="tutor-head">
          <h2 id="tutor-title" style="margin:0;font-size:1.1rem">Tutor sandbox</h2>
          <button class="btn btn-ghost btn-small" type="button" data-close-tutor>Close</button>
        </div>
        <div class="tutor-log">${log}</div>
        <form class="tutor-form" id="tutor-form">
          <label class="sr-only" for="tutor-in">Message</label>
          <textarea id="tutor-in" placeholder="Ask about the concept. Don’t ask for the finished work."></textarea>
          <button class="btn btn-primary" type="submit">Send</button>
        </form>
      </div>
    `;
  }

  function readForm(form) {
    const fd = new FormData(form);
    const help = [...form.querySelectorAll('input[name="help"]:checked')].map((el) => el.value);
    return {
      type: state.type,
      customType: fd.get("customType") || "",
      assignment: (fd.get("assignment") || "").trim(),
      remember: fd.get("source") === "remember",
      subject: fd.get("subject") || "",
      level: fd.get("level") || "",
      due: fd.get("due") || "",
      limit: fd.get("limit") || "",
      rubric: fd.get("rubric") || "",
      policy: fd.get("policy") || "unsure",
      stuck: fd.get("stuck") || "",
      draft: fd.get("draft") || "",
      help,
    };
  }

  function bind() {
    root.querySelectorAll("[data-type]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.type = btn.getAttribute("data-type");
        state.step = "intake";
        render();
      });
    });
    qs("[data-resume]")?.addEventListener("click", () => {
      const last = loadSession();
      if (!last?.plan) return;
      state.plan = last.plan;
      state.type = last.plan.type;
      state.step = "plan";
      render();
    });
    qs("[data-back-pick]")?.addEventListener("click", () => {
      state.step = "pick";
      render();
    });
    qs("[data-back-intake]")?.addEventListener("click", () => {
      state.step = "intake";
      render();
    });
    qs("[data-new]")?.addEventListener("click", () => {
      state.step = "pick";
      state.plan = null;
      state.tutorOpen = false;
      render();
    });

    const form = qs("#intake-form");
    const assignment = qs("#assignment");
    assignment?.addEventListener("input", () => {
      const v = assignment.value;
      qs("#ghost-banner")?.classList.toggle("hidden", !looksLikeGhostwriter(v));
      qs("#short-banner")?.classList.toggle("hidden", !(v.trim().length > 0 && v.trim().length < 40));
      qs("#empty-error")?.classList.add("hidden");
    });
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = readForm(form);
      if (!data.assignment) {
        qs("#empty-error")?.classList.remove("hidden");
        assignment?.focus();
        return;
      }
      const plan = buildPlan(data);
      state.plan = plan;
      state.step = "plan";
      state.tutorLog = [openingTutorMessage(plan)];
      saveSession({ plan, intake: data });
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    root.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-copy"));
        copyText(state.plan.prompts[i], btn);
      });
    });
    qs("[data-copy-disc]")?.addEventListener("click", () => {
      copyText(state.plan.disclosure, qs("[data-copy-disc]"));
    });

    const openTutor = () => {
      if (!state.tutorLog.length) state.tutorLog = [openingTutorMessage(state.plan)];
      state.tutorOpen = true;
      render();
      qs("#tutor-in")?.focus();
    };
    root.querySelectorAll("[data-open-tutor]").forEach((b) => b.addEventListener("click", openTutor));
    qs("[data-close-tutor]")?.addEventListener("click", () => {
      state.tutorOpen = false;
      render();
    });
    qs("#tutor-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = qs("#tutor-in");
      const text = input.value.trim();
      if (!text) return;
      state.tutorLog.push({ role: "user", text });
      state.tutorLog.push(tutorReply(state.tutorLog, text, state.plan));
      input.value = "";
      render();
      const log = root.querySelector(".tutor-log");
      if (log) log.scrollTop = log.scrollHeight;
    });
  }

  render();
}
