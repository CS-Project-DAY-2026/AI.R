const VERBS = [
  "analyze",
  "analyse",
  "compare",
  "contrast",
  "argue",
  "persuade",
  "explain",
  "evaluate",
  "describe",
  "design",
  "calculate",
  "prove",
  "discuss",
  "summarize",
  "summarise",
  "interpret",
  "synthesize",
  "research",
  "present",
  "cite",
  "debate",
  "trace",
  "model",
];

const GHOST = [
  /write (this|my|me|the entire|a full)/i,
  /do (my|this|the) (homework|assignment|paper|speech|lab|code)/i,
  /finish (this|it|my)/i,
  /complete (this|the) assignment/i,
  /full (speech|paper|essay|script|solution)/i,
  /make it sound like (a )?student/i,
  /answer key/i,
  /ghostwrite/i,
  /just (write|do|make) it/i,
  /submit[- ]ready/i,
];

export function looksLikeGhostwriter(text) {
  return GHOST.some((re) => re.test(text || ""));
}

const TOPIC_STOP = new Set(
  "write prepare complete do make create a an the for your this assignment please entire full homework speech paper essay report".split(" ")
);

function guessTopic(raw) {
  const patterns = [
    /arguing that\s+([^.]{8,110})/i,
    /(?:speech|paper|essay|report|presentation|lab)\s+(?:on|about)\s+([^.]{8,90})/i,
    /\b(?:on|about|regarding)\s+([^.]{8,90})/i,
    /convince\s+[^.]{0,40}?\s+to\s+([^.]{8,90})/i,
  ];
  for (const re of patterns) {
    const m = raw.match(re);
    if (m) return m[1].replace(/\s+/g, " ").replace(/[,:;].*$/, "").trim();
  }
  const words = raw
    .split(" ")
    .map((w) => w.replace(/[^\w'-]/g, ""))
    .filter((w) => w.length > 3 && !TOPIC_STOP.has(w.toLowerCase()))
    .slice(0, 8);
  return words.join(" ").trim();
}

export function extractBrief(text) {
  const raw = (text || "").replace(/\s+/g, " ").trim();
  const lower = raw.toLowerCase();
  const verbs = VERBS.filter((v) => lower.includes(v));

  let topic = guessTopic(raw);
  if (!topic) topic = "your topic";

  const limitMatch = raw.match(
    /(\d+(?:\s*[-–]\s*\d+)?)\s*(minutes?|minute|words?|pages?|page)/i
  );
  const limit = limitMatch ? `${limitMatch[1]} ${limitMatch[2]}` : "";

  const pages = raw.match(/\b(\d+)\s*pages?\b/i);
  const question = raw.match(/((?:how|why|what|should|does|do)\s[^?]{10,120}\?)/i);

  return {
    raw,
    snippet: raw.slice(0, 280) + (raw.length > 280 ? "…" : ""),
    topic,
    verbs,
    limit,
    pages: pages ? pages[1] : "",
    question: question ? question[1] : "",
    wordCount: raw.split(" ").filter(Boolean).length,
    ghosty: looksLikeGhostwriter(raw),
    tooShort: raw.length > 0 && raw.length < 40,
  };
}

export function fillTemplate(tpl, ctx) {
  return tpl
    .replaceAll("{{topic}}", ctx.topic || "this topic")
    .replaceAll("{{snippet}}", ctx.snippet || "the assignment I pasted")
    .replaceAll("{{limit}}", ctx.limit || "the time or word limit")
    .replaceAll("{{question}}", ctx.question || ctx.topic || "my research question")
    .replaceAll("{{draft}}", ctx.draft || "[I will paste my own writing here]")
    .replaceAll("{{points}}", ctx.points || "[point 1 / point 2 / point 3]");
}
