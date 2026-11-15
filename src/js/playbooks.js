export const PLAYBOOKS = [
  {
    id: "speech",
    name: "Speech / oral presentation",
    short: "Argument, structure, evidence, delivery — not a script from a chatbot.",
    example: "5-minute persuasive speech on later school start times",
    featured: true,
    goals: [
      "Build a clear claim a listener can repeat after one hearing",
      "Order reasons so they land, not just pile up",
      "Use evidence as support, not as wallpaper",
      "Practice delivery: pace, emphasis, and eye contact",
      "Handle a question without collapsing the argument",
    ],
    success: [
      "A thesis that takes a side, not a topic title",
      "2–4 points, each with a reason and a piece of support",
      "A beginning that names the problem and an ending that asks for a next step",
      "You can give the talk from notes, not from a memorized wall of text",
    ],
    tryFirst: [
      "Timer on: talk for 60 seconds about what you already believe, no notes",
      "Write a one-sentence thesis by hand",
      "List three points and one fact or story for each",
      "Mark where you will pause",
    ],
    green: [
      "Quiz me on holes in my thesis and three points. Do not write the speech.",
      "Explain what a call to action is, then ask me to write mine.",
      "Give me a rehearsal checklist for a 5-minute talk.",
    ],
    yellow: [
      "Suggest categories of evidence I could look up myself (not the evidence).",
      "Ask Socratic questions about counterarguments I should prepare.",
    ],
    red: [
      "Write my speech / make it sound like a teenager.",
      "Turn my bullet points into a full script I can read word for word.",
    ],
    prompts: [
      "Here is my thesis and 3 points I wrote about {{topic}}. Quiz me on holes in my argument. Do not write the speech.",
      "I have {{limit}}. Help me cut: which of these points is weakest, and why? Points: {{points}}",
      "Explain how a persuasive speech differs from an informative one. Then ask me which one my assignment is, using this brief: {{snippet}}",
      "Ask me six audience questions a skeptical classmate would raise about {{topic}}. Wait for my answers.",
      "Here is my outline (not a draft of the speech). Check structure only: opening, points, evidence slots, close. {{snippet}}",
      "Give me a 4-step rehearsal plan. Do not generate spoken lines.",
    ],
    checks: [
      "In one sentence, what is your claim?",
      "Who is the audience, and what do they already think?",
      "Name your strongest piece of support and why it is not just a slogan.",
      "What is the best argument against you, and how will you answer it?",
      "How will you start and how will you end without saying “in conclusion” three times?",
    ],
    worked: {
      who: "Maya, grade 10",
      copy: "Maya’s brief: “5-minute persuasive speech. Convince the school board to start classes at 8:45 a.m.” She did not ask a bot for a script. She wrote: “Starting later is not laziness; it is matching school to how teen brains sleep.” Points: sleep science in one study she actually read, bus-schedule tradeoff, a story from her own Monday mornings. GREEN prompt she used: “Quiz me on holes.” The tutor asked whether sports practices would shift. She found the district calendar herself. She cited: “I used a chatbot to quiz my outline, not to write the speech.”",
    },
    disclosure:
      "I used an AI tutor to decode the assignment, quiz my outline, and check that I could explain my points. I wrote the speech myself and rehearsed it from my own notes.",
  },
  {
    id: "research",
    name: "Research paper",
    short: "A question, sources, and your synthesis — not a fluent summary of the internet.",
    example: "Research paper on urban heat islands and who they affect",
    featured: true,
    goals: [
      "Turn a topic into a research question you can actually answer",
      "Tell a literature review from a book report",
      "Choose sources you can evaluate, not just quote",
      "Synthesize: put sources in conversation, don’t stack summaries",
      "Cite so a reader can follow your trail",
    ],
    success: [
      "A question that is narrow enough to research in the time you have",
      "A thesis that answers the question, not restates the title",
      "Body sections that follow a logic (cause, effect, debate) not a source-by-source tour",
      "Citations in the style your teacher named",
    ],
    tryFirst: [
      "Write the question in one sentence before opening a chatbot",
      "List what you already know vs. what you must look up",
      "Find two sources by hand (library, class texts, or a database you are allowed to use)",
      "Sketch a reverse outline: claim of each paragraph in 8 words",
    ],
    green: [
      "Explain how a literature review differs from a summary. Then ask me to state my research question in one sentence.",
      "Ask me to justify why each of my sources belongs.",
      "Quiz me on the difference between correlation and a causal claim in {{topic}}.",
    ],
    yellow: [
      "Suggest search terms I can try in a library database.",
      "Help me decode this rubric line in plain language.",
    ],
    red: [
      "Write my 8-page paper on climate policy.",
      "Turn these sources into a finished paper with citations.",
    ],
    prompts: [
      "Explain how a literature review differs from a summary. Then ask me to state my research question on {{topic}} in one sentence.",
      "Here is my research question: {{question}}. Ask me three ways it might be too broad, and wait.",
      "I will paste two source citations I found. Do not summarize the papers. Ask me what each source is for in my argument.",
      "Give me a process outline for a research paper (steps, not paragraphs of content) for {{topic}}.",
      "Quiz me: thesis vs. topic vs. title, using my assignment: {{snippet}}",
      "Here is a paragraph I wrote. Comment on evidence and structure only. Do not rewrite it: {{draft}}",
    ],
    checks: [
      "What is your research question, in one sentence?",
      "What would count as evidence that you are wrong?",
      "Name two sources and the job each one does in your paper.",
      "Where are you synthesizing, not just reporting?",
      "Which claim still needs a citation, and why?",
    ],
    worked: {
      who: "Jordan, first-year college",
      copy: "Jordan’s brief asked for 6–8 pages on urban heat islands, with at least four scholarly sources. He started with: “How do tree canopy and housing type change heat risk in the same U.S. city?” He used AI to explain what a heat island is and to quiz whether his question was too wide. He found articles in the library database himself. RED he refused to send: “Write my paper on climate policy.” Disclosure: “AI helped me tighten my question and quiz my outline. All wording and source choices are mine.”",
    },
    disclosure:
      "I used AI to clarify the research process, test whether my question was too broad, and get feedback on an outline I wrote. I found the sources, wrote the paper, and created the citations myself.",
  },
  {
    id: "essay",
    name: "Essay / short answer",
    short: "A claim in your voice, answering the actual prompt.",
    example: "800-word essay: Is loyalty a virtue in Julius Caesar?",
    featured: false,
    goals: [
      "Read the prompt’s verb: analyze, argue, compare, explain",
      "Take a position a classmate could disagree with",
      "Use the text (or evidence) instead of vibes",
      "Build paragraphs that earn the next one",
    ],
    success: [
      "The opening answers the question; it does not sneak up on it",
      "Each body paragraph has a job, a quote or fact, and a so-what",
      "The ending is not a copy-paste of the intro",
    ],
    tryFirst: [
      "Underline the prompt verb and the object (“analyze X,” not “write about X”)",
      "Freewrite 8 minutes with the book or notes closed, then open them",
      "Choose two pieces of evidence before you outline",
    ],
    green: [
      "Ask me what the prompt is really asking, then wait for my answer.",
      "Here is my thesis. Stress-test it. Do not write the essay.",
    ],
    yellow: [
      "Give me a paragraph skeleton (claim / evidence / warrant) with blanks.",
    ],
    red: [
      "Write the essay in a student voice.",
      "Expand my thesis into five paragraphs of finished prose.",
    ],
    prompts: [
      "The assignment is: {{snippet}} Topic: {{topic}}. Ask me to name the prompt verb and restate the task in 12 words.",
      "Here is my thesis. Attack it with three counter-reads. Do not write body paragraphs: {{draft}}",
      "Explain warrant vs. evidence with a tiny non-essay example, then ask me to supply a warrant for my point.",
      "I want a comparison essay process (steps only) for {{topic}}.",
      "Quiz me on topic sentences using my outline. Do not generate the essay.",
    ],
    checks: [
      "What exact question are you answering?",
      "What is your thesis, and who would disagree?",
      "Which line of evidence is doing the most work?",
      "Where might a reader get lost?",
      "What did you change after rereading the prompt?",
    ],
    worked: {
      who: "Asha, grade 11",
      copy: "Prompt: “Is loyalty a virtue in Julius Caesar? 800 words, use the play.” Asha wrote a messy thesis by hand: “Loyalty looks noble until it becomes Brutus’s excuse.” She asked AI only to quiz whether that answered the question. She picked two speeches herself. She did not ask it to “sound like a student.”",
    },
    disclosure:
      "I used AI to decode the prompt and to question my thesis. I chose evidence from the assigned texts and wrote the essay myself.",
  },
  {
    id: "lab",
    name: "Lab report",
    short: "Methods you ran, results you got, thinking you can defend.",
    example: "Lab report: enzyme activity vs. temperature",
    featured: false,
    goals: [
      "Separate hypothesis, method, data, and interpretation",
      "Report what happened, not what you wish happened",
      "Connect results to the concept the lab was teaching",
      "Name error sources without fake precision",
    ],
    success: [
      "A reader could repeat the procedure from your methods",
      "Figures or tables match the numbers you recorded",
      "Discussion answers “so what?” using your data",
    ],
    tryFirst: [
      "Copy your raw data into a table before asking anyone (or any model)",
      "Write the hypothesis you had before you saw the results",
      "List three things that could have gone wrong in the room",
    ],
    green: [
      "Explain what belongs in Results vs. Discussion. Then ask me to sort my sentences.",
      "Quiz me on the variable I actually changed.",
    ],
    yellow: [
      "Help me name possible error types (human, instrument, design) without inventing numbers.",
    ],
    red: [
      "Write the lab report from my procedure sheet.",
      "Invent a data table that looks realistic.",
    ],
    prompts: [
      "My lab is about {{topic}}. Explain independent vs. dependent variable, then ask me to name mine from this brief: {{snippet}}",
      "Do not write the report. Ask me to sort these sentences into Methods, Results, or Discussion.",
      "I will paste my results (numbers I recorded). Ask questions about trends. Do not interpret for me: {{draft}}",
      "Give a checklist for a discussion section. No sample paragraphs about my experiment.",
      "Quiz me on why a control matters in {{topic}}.",
    ],
    checks: [
      "What question was the lab designed to test?",
      "What did you change, and what did you measure?",
      "What did the data actually do?",
      "What might explain a weird point besides “human error” as a shrug?",
      "How does this connect to the concept from class?",
    ],
    worked: {
      who: "Luis, grade 11 chemistry",
      copy: "Luis measured enzyme activity at three temperatures. His first instinct was to ask a bot for a “perfect discussion.” Instead he plotted his own points, noticed the drop at 60°C, and asked AI: “Quiz me on denaturing. Do not write the discussion.” He wrote that section from his graph.",
    },
    disclosure:
      "I used AI to sort lab-report sections and to quiz the concept. The data, procedure, and writing are from the lab I completed.",
  },
  {
    id: "problems",
    name: "Problem set (math / science)",
    short: "Your steps, your check. Similar practice — not the answer key.",
    example: "Quadratic functions: projectile height vs. time",
    featured: false,
    goals: [
      "Name the concept (not just the chapter number)",
      "Show a method you could reuse on a new number",
      "Check reasonableness: units, signs, “does this even fit?”",
      "Explain a step in words, not only symbols",
    ],
    success: [
      "Work that a teacher can follow without mind-reading",
      "You can do a cousin problem without the original in front of you",
      "You know where you got stuck, not only that you got stuck",
    ],
    tryFirst: [
      "Copy the problem by hand and underline what is asked",
      "Attempt for a timed 8–12 minutes before any hint",
      "Write the formula or definition you think you need",
    ],
    green: [
      "Give me a similar practice problem with different numbers. Do not solve my assigned item.",
      "Ask me what the vertex form is for, then wait.",
    ],
    yellow: [
      "Hint at the first step only if I show my attempt.",
    ],
    red: [
      "Solve #3–#12 and show boxed answers.",
      "Give an answer key I can copy into the portal.",
    ],
    prompts: [
      "The topic is {{topic}}. Explain the idea in a kitchen analogy, then ask me to try a new problem you invent (not my homework numbers).",
      "Here is my attempt. Find the first wrong step. Do not finish the solution: {{draft}}",
      "Quiz me on when to use {{topic}} vs. a nearby method.",
      "I will describe the homework in words, not paste the numbered items. Help me name the skill: {{snippet}}",
      "Give a checking ritual (units, plug-back, estimate). No answers to my set.",
    ],
    checks: [
      "What is this problem asking for, in words?",
      "What rule or model are you using?",
      "Where did you last feel sure?",
      "How will you check the result without looking up the key?",
      "Can you invent a smaller version of the same problem?",
    ],
    worked: {
      who: "Priya, grade 10 algebra",
      copy: "Homework: a quadratic for a ball thrown upward, find when it hits the ground. Priya wrote h(t) = -16t² + 40t + 5 and got stuck on the quadratic formula. She asked AI for a different height function to practice, then returned to hers. She did not paste “solve my worksheet.”",
    },
    disclosure:
      "I used AI for a similar practice problem and to check where my steps went wrong. I completed the assigned problems myself.",
  },
  {
    id: "coding",
    name: "Coding assignment",
    short: "You design, trace, and debug. The tutor does not ship your repo.",
    example: "Python function: is_palindrome(text) with tests",
    featured: false,
    goals: [
      "Restate the spec: inputs, outputs, edge cases",
      "Trace a small example on paper before coding",
      "Write a function you can explain line by line",
      "Test the ugly cases (empty string, spaces, punctuation)",
    ],
    success: [
      "Code that matches the spec, not a vibe of the spec",
      "Names and structure a human can follow",
      "You can describe a bug you already fixed",
    ],
    tryFirst: [
      "Write three examples: input → expected output",
      "Pseudocode in comments or on paper",
      "Implement the happy path without AI",
    ],
    green: [
      "Ask me to trace this function I wrote on ['radar', 'Ra dar', '']. Do not replace my code.",
      "Explain what a failing test is trying to tell me, in words.",
    ],
    yellow: [
      "Name debugging questions I should ask (no patched solution).",
    ],
    red: [
      "Write the whole assignment / pass the autograder for me.",
      "Paste a complete solution I can submit.",
    ],
    prompts: [
      "The spec is about {{topic}}: {{snippet}} Ask me to list inputs, outputs, and two edge cases. Do not write the program.",
      "Here is my function. Ask me what each line does. Do not rewrite it: {{draft}}",
      "Give a paper-trace table for a palindrome check. Leave the cells for me to fill.",
      "Quiz me on why tests belong with the function, not after “it works on my machine.”",
      "I am stuck on a bug I will describe. Ask three diagnostic questions. Do not supply the fixed code.",
    ],
    checks: [
      "What should the program do on a normal input?",
      "What should it do on an empty or messy input?",
      "Which line do you least understand?",
      "How would you test this without looking at a solution?",
      "What would you tell a classmate who asked you to explain your approach?",
    ],
    worked: {
      who: "Chris, CS1",
      copy: "Assignment: write is_palindrome(text) in Python, ignore case and spaces. Chris listed cases: 'radar' → True, 'Ra dar' → True, '' → True (he decided). He coded a loop, failed on spaces, and asked AI: “Ask me questions about stripping characters. Do not write the function.” He fixed it and wrote two tests himself.",
    },
    disclosure:
      "I used AI to quiz edge cases and to ask debugging questions. I wrote and tested the code I submitted.",
  },
  {
    id: "analysis",
    name: "Book / article analysis",
    short: "Close reading: what the text does, not a plot dump or a review star-rating.",
    example: "Analyze how a news feature frames urban heat",
    featured: false,
    goals: [
      "Notice craft: structure, word choice, evidence, who is quoted",
      "Separate summary from analysis",
      "Ground every claim in a line you can point to",
      "Say what the text is doing to a reader",
    ],
    success: [
      "Quotes that are short and working, not decorative",
      "An argument about the text, not about the topic in general",
      "A reading someone could challenge with another passage",
    ],
    tryFirst: [
      "Reread one key page on paper and mark three lines",
      "Write a 4-sentence summary, then delete it from the draft later",
      "Ask: what is this text trying to make me feel or believe?",
    ],
    green: [
      "Explain analysis vs. summary, then ask me to label my sentences.",
      "Here is a quote I chose. Ask me what work it does. Do not write my paragraph.",
    ],
    yellow: [
      "Give me a list of craft features to look for in this genre.",
    ],
    red: [
      "Analyze the whole book for me.",
      "Write a polished literary essay from the title.",
    ],
    prompts: [
      "I am analyzing {{topic}}. {{snippet}} Ask me to distinguish what happens from how it is told.",
      "Here is a quote from the text (I typed it). Interrogate my reading; do not expand it into an essay: {{draft}}",
      "Quiz me on narrator, audience, and purpose using my notes only.",
      "Give a close-reading checklist. No sample thesis about my title.",
    ],
    checks: [
      "What is the text’s project, in one sentence?",
      "Which line is doing unusual work, and how?",
      "Where might a different reader disagree?",
      "What did you almost summarize instead of analyze?",
      "What question are you answering that is not “did I like it?”",
    ],
    worked: {
      who: "Nia, grade 12",
      copy: "Nia compared how two articles framed a heat wave: one led with a family on a porch, the other with a temperature chart. She asked AI to define “framing,” then did the marking herself. She refused “write my analysis of both articles.”",
    },
    disclosure:
      "I used AI to clarify analysis vs. summary and to question my reading of quotes I chose. The interpretation is mine.",
  },
  {
    id: "study",
    name: "Study guide / exam prep",
    short: "Active recall and weak spots — not a generated answer sheet.",
    example: "Study guide for a unit test on photosynthesis and respiration",
    featured: false,
    goals: [
      "Retrieve from memory before rereading",
      "Sort: know / kinda / blank",
      "Practice the exam’s moves (define, compare, calculate, diagram)",
      "Sleep and spaced practice beat a panic rewrite",
    ],
    success: [
      "A list of questions you can answer cold",
      "A short “trap list” of mix-ups you actually make",
      "One practice pass that looks like the test format",
    ],
    tryFirst: [
      "Close the notes. Write everything you remember for 10 minutes",
      "Compare to the unit list and star the blanks",
      "Turn headings into questions before any AI",
    ],
    green: [
      "Quiz me from this topic list I wrote. Wait after each item. Do not give a full study packet of answers.",
      "Ask me to compare two ideas I named.",
    ],
    yellow: [
      "Help me turn my notes headings into questions.",
    ],
    red: [
      "Make a complete study guide with all the answers filled in.",
      "Predict the exact test and write model responses.",
    ],
    prompts: [
      "Quiz me on {{topic}} one question at a time. After I answer, tell me if I’m close, then ask a follow-up. No dump of notes.",
      "Here is what I already know: {{draft}} Ask me to teach the shakiest part back.",
      "Create 5 practice questions in the style of {{snippet}} without answering them.",
      "Help me design a 25-minute study sprint. Do not teach the whole unit in one message.",
    ],
    checks: [
      "What three ideas would hurt most if they were blank on the test?",
      "Can you explain one of them to a younger sibling?",
      "What two ideas do people confuse, including you?",
      "How will you practice retrieval tomorrow, not just reread?",
      "What format is the exam (MC, FRQ, oral) and have you practiced that?",
    ],
    worked: {
      who: "Sam, college bio",
      copy: "Sam closed the slides and listed photosynthesis steps from memory. Then he asked AI to quiz him one question at a time on what he missed. He did not request “the whole unit explained with answers I can screenshot.”",
    },
    disclosure:
      "I used AI as a quiz partner on topics I named. I built the study guide from class materials and my own retrieval practice.",
  },
  {
    id: "other",
    name: "Other (custom)",
    short: "Name the genre. We’ll still decode, attempt, hint, and check — never skip.",
    example: "Podcast episode, poster, debate, annotated bibliography…",
    featured: false,
    goals: [
      "Name what “good” looks like in this format",
      "Separate learning goals from the shiny deliverable",
      "Attempt a ugly first version in the real medium",
      "Use AI for process and critique, not a finished artifact",
    ],
    success: [
      "You can say the skill this is training",
      "You have a try-first version that exists in the world (notes, sketch, clip)",
      "Feedback is on your attempt, not a replacement for it",
    ],
    tryFirst: [
      "Write the teacher’s hidden goal in one line (“they want me to practice X”)",
      "Make the smallest complete attempt (90 seconds, 1 paragraph, 1 sketch)",
      "List constraints: time, length, tools allowed",
    ],
    green: [
      "Help me infer the learning goal from this brief. Do not produce the artifact.",
      "Quiz me on whether my attempt meets the constraints I listed.",
    ],
    yellow: [
      "Suggest a process checklist for this format.",
    ],
    red: [
      "Just make the whole thing.",
      "Submit-ready version in the required format.",
    ],
    prompts: [
      "This custom assignment is: {{snippet}} Infer 4 skills it is training. Then ask me which skill I am weakest in. Do not create the product.",
      "Give a try-first checklist for a {{topic}} assignment. No sample finished work.",
      "Here is my attempt. Feedback on criteria only: {{draft}}",
      "Write 5 teach-back questions I should be able to answer before I use more AI.",
    ],
    checks: [
      "What format is this, in your words?",
      "What skill is it actually training?",
      "What constraint will get you in trouble if you ignore it?",
      "What does a first attempt look like today?",
      "How will you prove the thinking is yours?",
    ],
    worked: {
      who: "Eli, grade 9",
      copy: "Eli’s “other” was a 3-minute podcast on a local park. He recorded a clumsy 90-second version on his phone first. AI helped him list interview questions, not a script in a fake voice. He kept the ums that were his.",
    },
    disclosure:
      "I used AI to decode the assignment and to critique an attempt I made. I created the submitted work myself.",
  },
];

export function getPlaybook(id) {
  return PLAYBOOKS.find((p) => p.id === id) || PLAYBOOKS[PLAYBOOKS.length - 1];
}
