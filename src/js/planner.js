import { getPlaybook } from "./playbooks.js";
import { extractBrief, fillTemplate, looksLikeGhostwriter } from "./extract.js";

const HELP_LABELS = {
  understanding: "understanding the topic",
  structure: "structure",
  research: "research process",
  citing: "citing sources",
  practice: "practice Q&A",
  draft: "checking my draft",
};

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

function inferGoals(pb, ex, help) {
  const extra = [];
  if (ex.verbs.includes("compare") || ex.verbs.includes("contrast")) {
    extra.push("Hold two things next to each other without turning the piece into two separate summaries.");
  }
  if (ex.verbs.includes("argue") || ex.verbs.includes("persuade")) {
    extra.push("Take a side a listener could disagree with, then support it.");
  }
  if (ex.verbs.includes("analyze") || ex.verbs.includes("analyse")) {
    extra.push("Say how something works, not only what happened.");
  }
  if (ex.limit) extra.push(`Work inside the constraint: ${ex.limit}.`);
  if (help?.includes("citing")) extra.push("Leave a citation trail a teacher can follow.");
  if (help?.includes("practice")) extra.push("Rehearse answering questions in your own words.");
  return unique([...pb.goals.slice(0, 4), ...extra]).slice(0, 6);
}

function tryFirst(pb, ex, level) {
  const time = level === "middle" ? "6 minutes" : level === "college" ? "15 minutes" : "10 minutes";
  return [
    `Timed attempt (${time}): work from memory or the brief only — no AI window.`,
    `By hand, list 5 things you already know about ${ex.topic}.`,
    ...pb.tryFirst,
  ].slice(0, 6);
}

function lights(pb, ex) {
  const t = ex.topic;
  return {
    green: [
      ...pb.green.map((g) => g.replaceAll("{{topic}}", t)),
      `Ask for a quiz on ${t} after you write an outline yourself.`,
    ],
    yellow: [
      ...pb.yellow,
      "Ask for search terms, rubric decoding, or a process checklist — then go do the work.",
    ],
    red: [
      ...pb.red,
      `Write a finished ${pb.name.split("/")[0].trim().toLowerCase()} on ${t} I can turn in.`,
    ],
  };
}

function sanitizePrompt(text) {
  return text
    .replace(/write (the|my|a) (whole |full |entire )?(speech|paper|essay|code|report)/gi, "do not write the deliverable")
    .replace(/answer key/gi, "no answer key");
}

export function buildPlan(input) {
  const pb = getPlaybook(input.type);
  const combined = [input.assignment, input.remember, input.rubric].filter(Boolean).join("\n");
  const ex = extractBrief(combined || input.assignment);
  const ghosty = ex.ghosty || looksLikeGhostwriter(input.stuck || "");
  const draft = (input.draft || "").trim();
  const ctx = {
    ...ex,
    draft: draft.slice(0, 900) || "[paste your own draft here]",
    points: "the three points I already wrote",
  };

  const prompts = pb.prompts.map((p) => sanitizePrompt(fillTemplate(p, ctx)));

  const success = [
    ...pb.success,
    input.rubric ? `Teacher emphasis to honor: ${input.rubric.slice(0, 180)}` : null,
    input.limit ? `Stated limit: ${input.limit}` : ex.limit ? `Limit spotted in the brief: ${ex.limit}` : null,
  ].filter(Boolean);

  const helpBits = (input.help || []).map((h) => HELP_LABELS[h] || h);

  const draftFeedback = draft
    ? {
        present: true,
        notes: [
          "Clarity: can a tired classmate repeat your main claim after one read?",
          "Evidence: where is the support, and is it doing a job or filling space?",
          "Structure: does each section earn the next, or could you swap two parts and nobody would notice?",
          pb.id === "speech" ? "Delivery cue: mark one sentence you will slow down." : "Voice: keep your wording; this is a checklist, not a rewrite.",
          "Do not paste this draft into a tool that offers to “humanize” or “make it sound like a student.” That is still ghostwriting.",
        ],
        excerpt: draft.slice(0, 240) + (draft.length > 240 ? "…" : ""),
      }
    : { present: false };

  const disclosure = pb.disclosure;

  return {
    type: pb.id,
    typeName: pb.name,
    customType: input.customType || "",
    generatedAt: Date.now(),
    mode: "rule-based",
    note: "This plan is rule-based from your assignment type and the words you pasted. A live model can be wired later — it would still be forbidden to write the speech, paper, code, or answers.",
    extract: ex,
    ghosty,
    tooShort: ex.tooShort,
    helpBits,
    subject: input.subject || "",
    level: input.level || "",
    policy: input.policy || "unsure",
    due: input.due || "",
    stuck: input.stuck || "",
    goals: inferGoals(pb, ex, input.help),
    success,
    tryFirst: tryFirst(pb, ex, input.level),
    lights: lights(pb, ex),
    prompts,
    checks: pb.checks,
    worked: pb.worked,
    draftFeedback,
    disclosure,
    assignmentPreview: (input.assignment || input.remember || "").slice(0, 500),
  };
}
