const LESSONS = [
  {
    id: "predict",
    title: "It predicts likely text",
    mins: "5 min",
    html: `
      <p>Generative AI is a pattern machine. It guesses the next bit of text that often follows the bits before it, using a huge pile of examples.</p>
      <p>That is not the same as a person who sat in your class, read your book, or ran your lab. A person can be wrong and still have a reason. A model can be fluent with no reason at all.</p>
      <p>Useful picture: autocomplete with a giant memory, not a librarian who checked the shelf.</p>
      <p>If you remember one sentence from this whole site, make it this: <strong>the model predicts likely wording; it does not understand your assignment the way you need to.</strong></p>
    `,
  },
  {
    id: "hallucinate",
    title: "Hallucinations and confident wrongness",
    mins: "6 min",
    html: `
      <p>A hallucination here means a made-up fact, quote, citation, or code detail said in a calm voice.</p>
      <p>The model is not “lying” like a person covering tracks. It is completing a pattern. Academic writing is full of phrases like “according to a 2019 study,” so it may invent a tidy study that never happened.</p>
      <p>Bias shows up too: whose stories appeared more often in the training data, whose names get used as “default,” what counts as a “normal” family or city.</p>
      <p>Rule: if a claim would cost you a grade if it were false — a citation, a number, a quote — check it in a source you can name.</p>
    `,
  },
  {
    id: "empty",
    title: "Fluent can still be empty",
    mins: "5 min",
    html: `
      <p>A five-minute speech on later start times can sound smooth and still contain zero of your evidence, your audience, or your nerve.</p>
      <p>Teachers are not only grading polish. They are grading whether you can hold a claim, choose support, and recover when someone asks a question.</p>
      <p>If you couldn’t teach the idea back without the tab open, the assignment did not do its job — even if the sentences sparkle.</p>
    `,
  },
  {
    id: "privacy",
    title: "Privacy and unpublished work",
    mins: "4 min",
    html: `
      <p>Don’t paste home addresses, student IDs, health details, or a classmate’s full name into a tool you don’t control.</p>
      <p>Also think about unpublished work: a full draft your teacher hasn’t seen, a dataset from a lab, someone else’s paper. If policy forbids it, or you wouldn’t pin it on a hallway wall, don’t dump it into a chat.</p>
      <p>This site keeps your last plan in localStorage on your device. That is still a shared computer risk — log out of the browser profile if it’s a lab PC.</p>
    `,
  },
  {
    id: "integrity",
    title: "Tutor vs. ghostwriter",
    mins: "6 min",
    html: `
      <p>Academic integrity is not a trap. It’s a promise: the name on the work matches the thinking.</p>
      <p>GREEN: explain a concept, quiz you, decode a rubric, critique an outline you wrote.</p>
      <p>RED: full speech, full paper, full code, answer key, “make it sound like a student.”</p>
      <p>If you are unsure, ask the teacher before you paste. Then use the disclosure sentence from your Learning Plan.</p>
    `,
  },
];

const HALLUCINATIONS = [
  {
    text: "A 2018 NASA report titled “Urban Canopy Index for Midwestern High Schools” found that starting class at 8:45 a.m. reduced local heat-island intensity by 2.3°C.",
    fake: true,
    why: "Too neat: an oddly specific title, a school-schedule study from NASA, and a precise temperature drop. Treat named reports as guilty until you find them.",
  },
  {
    text: "Urban heat islands happen when cities replace plants and soil with dark surfaces that store heat, so some neighborhoods stay hotter at night.",
    fake: false,
    why: "This is a standard, checkable idea. You should still confirm it in class materials — but it is not a fake citation.",
  },
  {
    text: "Shakespeare’s teacher, Dr. Helena Whitcombe of the London School of Rhetoric (1599), wrote that loyalty is “a virtue until it isn’t.”",
    fake: true,
    why: "Invented scholar, invented school, a punchy quote that sounds like an essay closer. If you can’t find the source, you can’t use the line.",
  },
  {
    text: "In many quadratic motion problems in U.S. high school algebra, height is modeled with a function like h(t) = -16t² + v₀t + h₀ when units are feet and seconds.",
    fake: false,
    why: "This is a common modeling convention (the 16 comes from gravity in those units). Still show your work; don’t outsource the algebra.",
  },
];

const QUIZ = [
  {
    q: "What does a generative text model mainly do?",
    options: [
      "Look up the true answer in a live library",
      "Predict likely next text from patterns",
      "Understand your class the way a classmate does",
      "Check every citation automatically",
    ],
    a: 1,
  },
  {
    q: "A hallucination in this context is…",
    options: [
      "The model being shy",
      "A made-up fact or source said confidently",
      "Any use of AI",
      "A slow internet connection",
    ],
    a: 1,
  },
  {
    q: "Why can a fluent speech still fail the assignment?",
    options: [
      "Because teachers dislike technology",
      "Because polish is illegal",
      "Because it may not contain the student’s thinking, evidence, or delivery skill",
      "Because speeches cannot use facts",
    ],
    a: 2,
  },
  {
    q: "Which prompt is GREEN for a research paper?",
    options: [
      "Write my 8-page paper on climate policy",
      "Explain literature review vs. summary, then ask me to state my question",
      "Invent four scholarly sources with APA entries",
      "Make it sound like a first-year student",
    ],
    a: 1,
  },
  {
    q: "You should be extra careful pasting…",
    options: [
      "A public Wikipedia URL",
      "A question about what “thesis” means",
      "Personal data or a full unpublished paper if policy forbids it",
      "The word “photosynthesis”",
    ],
    a: 2,
  },
  {
    q: "YELLOW AI use is usually…",
    options: [
      "Submitting the model’s full draft",
      "Process help you still have to carry out yourself",
      "Always forbidden",
      "The same as GREEN",
    ],
    a: 1,
  },
  {
    q: "The point of a try-first step is to…",
    options: [
      "Waste time",
      "See what you already know before you ask for hints",
      "Generate the assignment faster",
      "Avoid reading the brief",
    ],
    a: 1,
  },
  {
    q: "If the tutor sandbox gets a RED request, it should…",
    options: [
      "Write a shorter version of the paper",
      "Refuse and send you back to the Learning Plan",
      "Translate it into “student voice”",
      "Hide the request from the teacher",
    ],
    a: 1,
  },
  {
    q: "A disclosure sentence is for…",
    options: [
      "Showing how you used a tutor without pretending the work is homemade magic",
      "Getting extra credit automatically",
      "Replacing the bibliography",
      "Proving AI is banned",
    ],
    a: 0,
  },
  {
    q: "Best one-sentence definition to keep:",
    options: [
      "AI is a search engine with feelings",
      "AI always knows the rubric",
      "Generative AI predicts likely text; it does not understand like a person",
      "AI is only cheating if you get caught",
    ],
    a: 2,
  },
];

export function initBasics() {
  const lessonRoot = document.querySelector("#lesson-root");
  const lessonNav = document.querySelector("#lesson-nav");
  if (lessonNav) {
    lessonNav.innerHTML = LESSONS.map(
      (l, i) =>
        `<a href="#lesson" data-lesson="${l.id}">${i + 1}. ${l.title} <span class="muted">${l.mins}</span></a>`
    ).join("");
  }

  let current = LESSONS[0].id;
  function showLesson(id) {
    current = id;
    const l = LESSONS.find((x) => x.id === id) || LESSONS[0];
    if (lessonRoot) {
      lessonRoot.innerHTML = `<h2>${l.title}</h2><p class="muted">${l.mins}</p>${l.html}`;
    }
    lessonNav?.querySelectorAll("a").forEach((a) => {
      a.setAttribute("aria-current", a.dataset.lesson === id ? "true" : "false");
    });
  }
  lessonNav?.addEventListener("click", (e) => {
    const a = e.target.closest("[data-lesson]");
    if (!a) return;
    e.preventDefault();
    showLesson(a.dataset.lesson);
    document.querySelector("#lesson")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  showLesson(current);

  const hRoot = document.querySelector("#hallucination-root");
  if (hRoot) {
    const chosen = {};
    function renderH() {
      hRoot.innerHTML = HALLUCINATIONS.map((h, i) => {
        const c = chosen[i];
        return `<article class="card" style="margin-bottom:.8rem">
          <p>${h.text}</p>
          <div class="choice-row">
            <button class="btn btn-ghost btn-small" type="button" data-h="${i}" data-v="fake">Likely fake</button>
            <button class="btn btn-ghost btn-small" type="button" data-h="${i}" data-v="real">Likely checkable</button>
          </div>
          ${c ? `<p class="banner ${c === (h.fake ? "fake" : "real") ? "banner-green" : "banner-error"}">${c === (h.fake ? "fake" : "real") ? "Good eye." : "Not quite."} ${h.why}</p>` : ""}
        </article>`;
      }).join("");
      hRoot.querySelectorAll("[data-h]").forEach((b) => {
        b.addEventListener("click", () => {
          chosen[b.getAttribute("data-h")] = b.getAttribute("data-v");
          renderH();
        });
      });
    }
    renderH();
  }

  const qRoot = document.querySelector("#quiz-root");
  if (qRoot) {
    qRoot.innerHTML = `
      <form id="basics-quiz">
        ${QUIZ.map(
          (item, i) => `<div class="quiz-item">
            <h3>${i + 1}. ${item.q}</h3>
            ${item.options
              .map(
                (opt, j) =>
                  `<label class="choice" style="display:flex;margin:.3rem 0"><input type="radio" name="q${i}" value="${j}" /> ${opt}</label>`
              )
              .join("")}
          </div>`
        ).join("")}
        <button class="btn btn-primary" type="submit">Score quiz</button>
      </form>
      <div id="quiz-out"></div>
    `;
    qRoot.querySelector("#basics-quiz").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      let right = 0;
      QUIZ.forEach((item, i) => {
        if (String(fd.get(`q${i}`)) === String(item.a)) right += 1;
      });
      const line =
        right >= 8
          ? "You can explain the tool without worshipping it. That’s the bar."
          : "Skim the lessons again, especially prediction vs. understanding.";
      qRoot.querySelector("#quiz-out").innerHTML = `<p class="banner banner-note"><strong>${right} / ${QUIZ.length}.</strong> ${line}</p>`;
    });
  }
}
