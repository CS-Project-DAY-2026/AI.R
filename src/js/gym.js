const ITEMS = [
  {
    id: "g1",
    prompt: "Here is my thesis and 3 points I wrote. Quiz me on holes in my argument. Do not write the speech.",
    answer: "green",
    why: "You brought your own thinking. The model is a coach, not an author.",
    rewrite: "Already GREEN. You could add: “Wait after each question.”",
  },
  {
    id: "g2",
    prompt: "Write my 8-page paper on urban heat islands with APA citations.",
    answer: "red",
    why: "That’s the product. Fluency would hide whether you understand heat islands or citation.",
    rewrite: "Explain how a literature review differs from a summary. Then ask me to state my research question on urban heat islands in one sentence.",
  },
  {
    id: "g3",
    prompt: "Give me search terms I can try in the library database for tree canopy and heat risk.",
    answer: "yellow",
    why: "Process help is useful, but you still have to search, read, and choose. Don’t let it pick your sources.",
    rewrite: "Suggest 5 search terms. Do not summarize articles or invent citations.",
  },
  {
    id: "g4",
    prompt: "Solve problems 3–12 from my worksheet and box the answers.",
    answer: "red",
    why: "Answer keys skip the skill the set is teaching.",
    rewrite: "The topic is quadratic motion. Invent a similar problem with different numbers. Do not solve my worksheet.",
  },
  {
    id: "g5",
    prompt: "Here is a Python function I wrote. Ask me what each line does. Do not rewrite it.",
    answer: "green",
    why: "You keep authorship. Tracing your own code is the learning.",
    rewrite: "Already GREEN. Add your failing test case in your own words.",
  },
  {
    id: "g6",
    prompt: "Make this essay sound like a high-school student so it won’t get flagged.",
    answer: "red",
    why: "Style-laundering is still ghostwriting, plus it’s dishonest about voice.",
    rewrite: "Here is a paragraph I wrote. Comment on clarity and evidence only. Do not rewrite it.",
  },
  {
    id: "g7",
    prompt: "Help me decode this rubric line in plain language: ‘synthesis of scholarly sources.’",
    answer: "yellow",
    why: "Rubric decoding is allowed. Asking it to perform the synthesis for you would be RED.",
    rewrite: "Explain ‘synthesis’ vs. ‘summary’ with a tiny non-homework example, then ask me to try it on my two sources.",
  },
  {
    id: "g8",
    prompt: "Quiz me one question at a time on photosynthesis. Wait for my answer. Don’t dump notes.",
    answer: "green",
    why: "Retrieval practice is the point of a study guide you build yourself.",
    rewrite: "Already GREEN.",
  },
];

export function initGym() {
  const root = document.querySelector("#gym-root");
  if (!root) return;
  const picks = {};
  let rewriteId = "g2";

  function score() {
    return ITEMS.filter((i) => picks[i.id] === i.answer).length;
  }

  function render() {
    root.innerHTML = `
      <p class="score-chip">${Object.keys(picks).length ? `${score()} / ${ITEMS.length} classified` : "Classify each prompt"}</p>
      ${ITEMS.map((item) => {
        const chosen = picks[item.id];
        return `<article class="card gym-card">
          <h3>Prompt</h3>
          <p>${item.prompt}</p>
          <div class="gym-options" role="group" aria-label="Traffic light">
            ${["green", "yellow", "red"]
              .map((c) => {
                let cls = "";
                if (chosen) {
                  if (c === item.answer) cls = "correct";
                  else if (c === chosen) cls = "wrong";
                }
                return `<button type="button" class="${cls}" data-pick="${item.id}" data-color="${c}" ${chosen ? "disabled" : ""}>
                  <span class="dot dot-${c}"></span> ${c.toUpperCase()}
                </button>`;
              })
              .join("")}
          </div>
          ${chosen ? `<p>${chosen === item.answer ? "Yes." : "Not that light."} ${item.why}</p>
            <p><strong>Stronger GREEN version:</strong> ${item.rewrite}</p>` : ""}
        </article>`;
      }).join("")}
      <section class="card">
        <h2>Rewrite a RED prompt</h2>
        <p>Take a ghostwriter ask and turn it into a tutor ask. Then check it against the rules.</p>
        <label for="red-select">Start from</label>
        <select id="red-select">
          ${ITEMS.filter((i) => i.answer === "red")
            .map((i) => `<option value="${i.id}" ${i.id === rewriteId ? "selected" : ""}>${i.prompt.slice(0, 70)}…</option>`)
            .join("")}
        </select>
        <label for="rewrite" style="margin-top:0.8rem">Your rewrite</label>
        <textarea id="rewrite" placeholder="Keep the topic. Ban the deliverable. Ask for a quiz, process, or feedback on work you already did."></textarea>
        <p class="hero-actions"><button class="btn btn-primary" type="button" id="check-rewrite">Check my rewrite</button></p>
        <div id="rewrite-out"></div>
      </section>
    `;

    root.querySelectorAll("[data-pick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        picks[btn.getAttribute("data-pick")] = btn.getAttribute("data-color");
        render();
      });
    });
    root.querySelector("#red-select")?.addEventListener("change", (e) => {
      rewriteId = e.target.value;
    });
    root.querySelector("#check-rewrite")?.addEventListener("click", () => {
      const text = root.querySelector("#rewrite").value.trim();
      const out = root.querySelector("#rewrite-out");
      if (text.length < 20) {
        out.innerHTML = `<p class="banner banner-error">Write a real prompt — at least a sentence.</p>`;
        return;
      }
      const redFlags = /write (my|the|a) |answer key|sound like|full (paper|speech|code)|solve problems/i.test(text);
      const greenFlags = /quiz|do not write|don’t write|do not rewrite|outline|explain then ask|wait for/i.test(text);
      if (redFlags) {
        out.innerHTML = `<p class="banner banner-error">Still RED: it asks for the product or a disguise. Remove “write my…” and add “do not write the assignment.”</p>`;
      } else if (greenFlags) {
        out.innerHTML = `<p class="banner banner-green">This looks GREEN: you kept the thinking on your side. Copy it into Tutor mode after you attempt the work.</p>`;
      } else {
        out.innerHTML = `<p class="banner banner-warn">Maybe YELLOW. Add an explicit ban (“do not write the paper”) and a student action (quiz me / ask me / wait).</p>`;
      }
    });
  }

  render();
}
