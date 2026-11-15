import { looksLikeGhostwriter } from "./extract.js";

const RED = [
  /write (my|the|a) (speech|paper|essay|lab|report|code|function|script|study guide)/i,
  /full (solution|speech|paper|code)/i,
  /answer key/,
  /do (the|my) (homework|problems|assignment)/i,
  /make it sound like/,
  /humanize this/,
  /autograder/,
  /submit this/,
];

function isRed(text) {
  return looksLikeGhostwriter(text) || RED.some((re) => re.test(text));
}

const MOVES = [
  (plan) =>
    `Let’s stay with the learning goal. In one sentence, what is this ${plan.typeName.toLowerCase()} actually training you to do?`,
  (plan) =>
    `Before any more help: what have you already tried on “${plan.extract.topic}”? Two bullet points is enough.`,
  () =>
    `Good. Now say the claim or question in words you would use with a friend, not with a rubric.`,
  (plan) =>
    `I’m going to quiz you, not write it. ${plan.checks[0]} Take a minute. Answer in your own words.`,
  (plan) => plan.checks[1] || "What would a skeptical classmate ask you next?",
  (plan) =>
    `If you are stuck, name the smallest next step from your try-first list — for example: “${plan.tryFirst[0]}”`,
];

export function tutorReply(history, userText, plan) {
  const text = (userText || "").trim();
  if (!text) {
    return { role: "bot", kind: "ok", text: "Type a question about the concept. I will not produce the assignment." };
  }
  if (isRed(text)) {
    return {
      role: "bot",
      kind: "refuse",
      text: `That’s a red-light request. I won’t write the ${plan?.typeName || "assignment"} or an answer key. Open your Learning Plan: try-first checklist, then a GREEN tutor prompt. If you paste your own outline or draft, I can ask questions about it.`,
    };
  }
  if (!plan) {
    return {
      role: "bot",
      kind: "ok",
      text: "Generate a Learning Plan in Assignment studio first. I only tutor from that plan so we don’t skip the work.",
    };
  }

  const n = history.filter((m) => m.role === "user").length;
  const move = MOVES[Math.min(n, MOVES.length - 1)](plan);

  let extra = "";
  if (/why|how|what is|explain/i.test(text)) {
    extra = ` I’ll explain the idea, then you have to use it. For “${plan.extract.topic},” a useful distinction is process vs. product: I can talk about the process; you still make the product.`;
  } else if (/hint|stuck/i.test(text) || plan.stuck) {
    extra = " Hint, not spoiler: name the next verb (outline, measure, trace, cite) rather than the finished artifact.";
  } else if (/quiz|check/i.test(text)) {
    extra = ` Teach-back: ${plan.checks[Math.min(n, plan.checks.length - 1)]}`;
  }

  return {
    role: "bot",
    kind: "ok",
    text: `${move}${extra}`,
  };
}

export function openingTutorMessage(plan) {
  return {
    role: "bot",
    kind: "ok",
    text: plan
      ? `Tutor mode is a sandbox. I’ll help you think about ${plan.extract.topic} for your ${plan.typeName.toLowerCase()}. I will not write it. What’s the first thing you already understand?`
      : "Generate a Learning Plan first, then I can quiz you on that plan.",
  };
}
