const FILES = {
  "about.txt": `<span class="heading">Sandor Norbert Pinter</span>
Senior Software Engineer

Senior Software Engineer with over 20 years of experience delivering
backend and full-stack solutions, including 12+ years at Sky. Currently
part of the PCMS/ATOM team, building and operating Java-based
microservices on AWS and Kubernetes that underpin Sky's Single Platform
multi-tenant streaming services (NOW, SkyShowtime, Peacock).

Strong background in CI/CD automation (GitHub Actions), event-driven
architecture (Kafka), test automation, and DevOps practices, with a
track record of technical leadership, mentoring and cross-team delivery.`,

  "contact.txt": `<span class="heading">Contact</span>
Email    : pinter.sandor.norbert@gmail.com
Phone    : +44 7766 195638
Location : Twickenham, London, United Kingdom
GitHub   : github.com/zeratulok`,

  "skills.txt": `<span class="heading">Technical Skills</span>
Cloud & Platform   : AWS, Kubernetes, Sky Core Platform, VMware, Docker, CloudFoundry
CI/CD & Automation : GitHub Actions, Jenkins/Hudson, Bamboo, TeamCity, Ansible
Languages          : Java (8-21), Python, JavaScript/TypeScript, SQL, Shell, C/C++
Messaging & Data   : Apache Kafka, JMS, PostgreSQL, MySQL, Oracle PL/SQL
Frameworks & Tools : Spring (Boot, MVC, AOP), Hibernate, JUnit, Spock, AngularJS, REST, Git, Maven/Gradle
Methodologies      : Agile/Scrum, DevOps, TDD, BDD
Earlier-career     : PHP, NodeJS, Android(+NDK), Flex, GWT, EJB3, ANTLR, Hessian, SOAP, Wicket`,

  "experience.log": `<span class="heading">Work Experience</span>

<span class="cyan">Senior Software Engineer</span> — Sky
Jul 2014 - Present (12+ years) | London, UK

  <span class="yellow">PCMS / ATOM Team</span> (c. 2016 - Present)
  PCMS underpins Sky's Single Platform multi-tenant streaming services
  (NOW, SkyShowtime, Peacock).
    - Design/build/operate backend microservices in Java (8 -> 21), Spring Boot
    - Deploy on AWS and Kubernetes, incl. Sky's internal Core Platform cluster
    - VMware-based infra for internal tooling apps
    - CI/CD pipelines with GitHub Actions
    - Apache Kafka for event-driven/streaming integration
    - Test automation strategy (unit/integration/e2e); Python for tooling
    - Aggregate JMS/HTTP/flat-file data into unified JSON APIs for NOW
      apps (mobile/web/box); contributed to AngularJS front end

  <span class="yellow">Infrastructure Team</span> (c. 2015 - 2016)
    - DevOps role improving build/test processes department-wide
    - Introduced Docker, Ansible, CloudFoundry, Sky's VMware VDC service
    - Cut integration test time from ~1hr to 20min
    - Built self-service env spin-up tooling for developers

  <span class="yellow">Better Checker Project</span> (c. 2014 - 2015)
    - sky.com/shop: integrated DSL-availability checker into CMS

  <span class="yellow">Online Shop Project</span> (2014)
    - sky.com/quickbuy: refactored backend to integrate with newest
      customer & portfolio services

<span class="cyan">Technical Lead</span> — Mobile Travel Technologies
Jul 2013 - Jul 2014 | Dublin, Ireland
    - Managed LATAM Airlines mobile app team (iOS/Android): check-in,
      Passbook, flight status, MyTrips, loyalty
    - Owned architecture & coding guidelines; hands-on Java/Node.js
    - Line-managed 6 devs, Scrum Master, customer technical POC
    - Tech: Java, Spring MVC, Node.js, JSON, JBehave, JUnit, Sonar, Android, iOS

<span class="cyan">Senior Developer / Framework Specialist</span> — KBC Global Services
Dec 2012 - Jul 2013 | Budapest, Hungary
    - Migration path from Spring Webflow framework to Wicket framework
    - Built bridging library for incremental migration
    - Tech: Spring Webflow, Spring MVC, Spring AOP, JSP, AGF, Wicket

<span class="cyan">Ramp-Up Dev Team Lead / Scrum Master</span> — EPAM Systems
Mar 2012 - Dec 2012 | Budapest, Hungary
    - Led team building market event-processing simulation
    - Mentored graduate developers (core Java, Agile/Scrum)
    - Tech: Java Core, JUnit, JBehave, ANTLR; mechanical sympathy topics

<span class="heading">Earlier Career</span>
  Chief Developer & Architect, IP Systems Ltd, Budapest (Sep 2009 - Mar 2012)
  Senior Java Developer, Molaris Ltd, Budapest (Apr 2009 - Sep 2009)
  Senior Java Developer, Avis Group BSC, Bracknell UK / Budapest (Jul 2008 - Apr 2009)
  Java Developer, Siemens PSE Hungary, Budapest (May 2007 - Jul 2008)
  Software Engineer / Java Developer, Siemens PSE Hungary, Budapest (Mar 2005 - May 2007)`,

  "education.txt": `<span class="heading">Education & Additional Training</span>
BSc (Hons), Informatics Engineering
University of Kecskemet CM Engineering and Automation, Hungary (1999 - 2003)

Management Skills for Technical Professionals — Beckinridge (2013)
Quality Assurance Manager — Siemens PSE Learning Center (2007)`,

  "strengths.txt": `<span class="heading">Strengths</span>
- Quickly and efficiently masters new methods, technologies and techniques
- Strong interpersonal and communication skills
- Creative, pragmatic problem-solving`,

  "interests.txt": `<span class="heading">Interests</span>
Technology enthusiast with hands-on personal projects spanning home
automation, VR and robotics (Raspberry Pi, speech recognition, VR
development in Unity). Enjoys reading and mentoring.`
};

const DATE_STAMP = "Sep 30 23:43";
const FILE_META = {};
Object.keys(FILES).forEach(f => {
  FILE_META[f] = { size: FILES[f].replace(/<[^>]+>/g, "").length, date: DATE_STAMP };
});
FILE_META["resume.pdf"] = { size: 25207, date: DATE_STAMP, binary: true };
const ALL_FILES = Object.keys(FILE_META);

const output = document.getElementById("output");
const typed = document.getElementById("typed");
const input = document.getElementById("cmdInput");
const screen = document.getElementById("screen");
const themeToggleBtn = document.getElementById("themeToggle");
const pdfLink = document.getElementById("pdfDownload");
const terminalEl = document.getElementById("terminal");
const titlebar = document.getElementById("titlebar");
const minBtn = document.getElementById("minBtn");
const maxBtn = document.getElementById("maxBtn");
const closeBtn = document.getElementById("closeBtn");
const reopenHint = document.getElementById("reopenHint");
const reopenBtn = document.getElementById("reopenBtn");
const cursorEl = document.getElementById("cursor");

function println(html = "") {
  output.innerHTML += html + "\n";
}

function scrollBottom() {
  screen.scrollTop = screen.scrollHeight;
}

function promptLine(cmd) {
  println(`<span class="user">guest</span>@<span class="host">zeratulok</span>:<span class="path">~</span>$ ${escapeHtml(cmd)}`);
}

function escapeHtml(s) {
  return s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

const COMMANDS = {
  help() {
    println(`Available commands:
  <span class="white">ls</span> [-la]            list CV sections (files)
  <span class="white">cat</span> &lt;file&gt;            print a section, e.g. cat about.txt
  <span class="white">download</span>              download resume.pdf
  <span class="white">theme</span> [dark|light]   toggle colour theme
  <span class="white">whoami</span>                who am I
  <span class="white">about</span>                 professional summary  (alias of cat about.txt)
  <span class="white">skills</span>                technical skills
  <span class="white">experience</span>            work history
  <span class="white">education</span>             education & training
  <span class="white">strengths</span>             strengths
  <span class="white">interests</span>             interests
  <span class="white">contact</span>               contact details
  <span class="white">clear</span>                 clear the screen
  <span class="white">help</span>                  show this message

Tip: press <span class="white">Tab</span> to autocomplete commands and file names.`);
  },
  ls(arg) {
    const long = /l/.test(arg || "");
    if (!long) {
      println(ALL_FILES.map(f => `<span class="cyan">${f}</span>`).join("  "));
      return;
    }
    println(`total ${ALL_FILES.length}`);
    ALL_FILES.forEach(f => {
      const meta = FILE_META[f];
      const sizeStr = String(meta.size).padStart(6, " ");
      println(`-rw-r--r--  1 spinter  spinter  ${sizeStr}  ${meta.date}  <span class="cyan">${f}</span>`);
    });
  },
  cat(arg) {
    if (!arg) { println(`cat: missing file operand`); return; }
    if (arg === "resume.pdf") {
      println(`<span class="error">cat: resume.pdf: binary file</span> (try: <span class="white">download resume.pdf</span>)`);
      return;
    }
    const key = FILES[arg] ? arg : Object.keys(FILES).find(f => f.startsWith(arg));
    if (key) println(FILES[key]);
    else println(`<span class="error">cat: ${escapeHtml(arg)}: No such file</span>`);
  },
  download(arg) {
    const file = arg || "resume.pdf";
    if (file !== "resume.pdf") {
      println(`<span class="error">download: ${escapeHtml(file)}: no such downloadable file</span>`);
      return;
    }
    pdfLink.click();
    println(`Downloading <span class="cyan">resume.pdf</span> ... done. Saved as <span class="white">Sandor_Norbert_Pinter_CV.pdf</span>`);
  },
  theme(arg) {
    const t = (arg || "").toLowerCase();
    if (t === "light" || t === "dark") { applyTheme(t); }
    else { toggleTheme(); }
    println(`Theme set to <span class="white">${document.body.classList.contains("light") ? "light" : "dark"}</span>.`);
  },
  whoami() {
    println(`<span class="heading">Sandor Norbert Pinter</span> — Senior Software Engineer
Type <span class="white">help</span> to explore this CV.`);
  },
  about() { COMMANDS.cat("about.txt"); },
  skills() { COMMANDS.cat("skills.txt"); },
  experience() { COMMANDS.cat("experience.log"); },
  education() { COMMANDS.cat("education.txt"); },
  strengths() { COMMANDS.cat("strengths.txt"); },
  interests() { COMMANDS.cat("interests.txt"); },
  contact() { COMMANDS.cat("contact.txt"); },
  clear() { output.innerHTML = ""; },
  sudo() { println(`<span class="error">guest is not in the sudoers file. This incident will be reported.</span>`); }
};

function run(raw) {
  const trimmed = raw.trim();
  promptLine(raw);
  if (!trimmed) { scrollBottom(); return; }
  const [cmd, ...rest] = trimmed.split(/\s+/);
  const handler = COMMANDS[cmd];
  if (handler) handler(rest.join(" "));
  else println(`<span class="error">command not found: ${escapeHtml(cmd)}</span>  (try 'help')`);
  scrollBottom();
}

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  themeToggleBtn.textContent = theme === "light" ? "switch to dark mode" : "switch to light mode";
  localStorage.setItem("cv-theme", theme);
}
function toggleTheme() {
  applyTheme(document.body.classList.contains("light") ? "dark" : "light");
}
themeToggleBtn.addEventListener("click", toggleTheme);

/* ---------- Window controls: minimize / maximize / close (animated) ---------- */
function playAnim(cls, duration, onDone) {
  terminalEl.classList.add(cls);
  setTimeout(() => {
    terminalEl.classList.remove(cls);
    if (onDone) onDone();
  }, duration);
}

minBtn.addEventListener("click", () => {
  if (terminalEl.classList.contains("minimized")) {
    // restore from minimized
    terminalEl.classList.remove("minimized");
    playAnim("anim-restore", 220, () => input.focus());
  } else {
    playAnim("anim-minimize", 220, () => terminalEl.classList.add("minimized"));
  }
});

maxBtn.addEventListener("click", () => {
  const nowMax = terminalEl.classList.toggle("maximized");
  maxBtn.innerHTML = nowMax ? "&#10064;" : "&#9633;";
  maxBtn.setAttribute("aria-label", nowMax ? "Restore" : "Maximize");
  playAnim("anim-pop", 200, scrollBottom);
});

closeBtn.addEventListener("click", () => {
  playAnim("anim-close", 200, () => {
    terminalEl.classList.add("hidden");
    reopenHint.classList.add("visible");
  });
});
reopenBtn.addEventListener("click", () => {
  terminalEl.classList.remove("hidden");
  reopenHint.classList.remove("visible");
  playAnim("anim-open", 220, () => input.focus());
});

/* ---------- Dragging (mouse + touch via Pointer Events) ---------- */
let dragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

titlebar.addEventListener("pointerdown", e => {
  if (e.target.closest("button")) return;
  if (terminalEl.classList.contains("maximized")) return;
  const rect = terminalEl.getBoundingClientRect();
  terminalEl.style.position = "fixed";
  terminalEl.style.margin = "0";
  terminalEl.style.left = rect.left + "px";
  terminalEl.style.top = rect.top + "px";
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  dragging = true;
  titlebar.classList.add("dragging");
  titlebar.setPointerCapture(e.pointerId);
});

titlebar.addEventListener("pointermove", e => {
  if (!dragging) return;
  const w = terminalEl.offsetWidth;
  const h = terminalEl.offsetHeight;
  let left = e.clientX - dragOffsetX;
  let top = e.clientY - dragOffsetY;
  left = Math.max(-w + 120, Math.min(left, window.innerWidth - 120));
  top = Math.max(0, Math.min(top, window.innerHeight - 32));
  terminalEl.style.left = left + "px";
  terminalEl.style.top = top + "px";
});

function stopDragging() {
  dragging = false;
  titlebar.classList.remove("dragging");
}
titlebar.addEventListener("pointerup", stopDragging);
titlebar.addEventListener("pointercancel", stopDragging);

/* ---------- Resizing via corner/edge handles ---------- */
const MIN_W = 360;
const MIN_H = 220;
const RESIZE_CURSORS = {
  n: "ns-resize", s: "ns-resize", e: "ew-resize", w: "ew-resize",
  ne: "nesw-resize", sw: "nesw-resize", nw: "nwse-resize", se: "nwse-resize"
};

let resizing = false;
let resizeDir = "";
let resizeStartX = 0;
let resizeStartY = 0;
let startRect = null;

function beginResize(e, dir) {
  if (terminalEl.classList.contains("maximized") || terminalEl.classList.contains("minimized")) return;
  e.preventDefault();
  e.stopPropagation();
  const rect = terminalEl.getBoundingClientRect();
  terminalEl.style.position = "fixed";
  terminalEl.style.margin = "0";
  terminalEl.style.left = rect.left + "px";
  terminalEl.style.top = rect.top + "px";
  terminalEl.style.width = rect.width + "px";
  terminalEl.style.height = rect.height + "px";
  startRect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  resizeStartX = e.clientX;
  resizeStartY = e.clientY;
  resizeDir = dir;
  resizing = true;
  document.body.style.cursor = RESIZE_CURSORS[dir];
  e.target.setPointerCapture(e.pointerId);
}

function onResizeMove(e) {
  if (!resizing) return;
  const dx = e.clientX - resizeStartX;
  const dy = e.clientY - resizeStartY;
  let { left, top, width, height } = startRect;
  if (resizeDir.includes("e")) width = Math.max(MIN_W, startRect.width + dx);
  if (resizeDir.includes("s")) height = Math.max(MIN_H, startRect.height + dy);
  if (resizeDir.includes("w")) {
    width = Math.max(MIN_W, startRect.width - dx);
    left = startRect.left + (startRect.width - width);
  }
  if (resizeDir.includes("n")) {
    height = Math.max(MIN_H, startRect.height - dy);
    top = startRect.top + (startRect.height - height);
  }
  terminalEl.style.left = left + "px";
  terminalEl.style.top = top + "px";
  terminalEl.style.width = width + "px";
  terminalEl.style.height = height + "px";
}

function endResize() {
  if (!resizing) return;
  resizing = false;
  resizeDir = "";
  document.body.style.cursor = "";
}

document.querySelectorAll(".resize-handle").forEach(handle => {
  const dir = handle.dataset.dir;
  handle.addEventListener("pointerdown", e => beginResize(e, dir));
  handle.addEventListener("pointermove", onResizeMove);
  handle.addEventListener("pointerup", endResize);
  handle.addEventListener("pointercancel", endResize);
});

function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

function completeInput() {
  const val = input.value;
  const isFirstToken = !/\s/.test(val.trim()) && !/\s$/.test(val);
  let partial, candidates, replaceStart;
  if (isFirstToken) {
    partial = val;
    candidates = Object.keys(COMMANDS);
    replaceStart = 0;
  } else {
    const lastSpace = val.lastIndexOf(" ");
    partial = val.slice(lastSpace + 1);
    candidates = ALL_FILES;
    replaceStart = lastSpace + 1;
  }
  const matches = candidates.filter(c => c.startsWith(partial)).sort();
  if (matches.length === 0) return;
  if (matches.length === 1) {
    input.value = val.slice(0, replaceStart) + matches[0] + (isFirstToken ? " " : "");
  } else {
    const lcp = longestCommonPrefix(matches);
    if (lcp.length > partial.length) {
      input.value = val.slice(0, replaceStart) + lcp;
    } else {
      println(matches.map(m => `<span class="cyan">${m}</span>`).join("  "));
      scrollBottom();
    }
  }
  typed.textContent = input.value;
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const val = input.value;
    input.value = "";
    typed.textContent = "";
    run(val);
  } else if (e.key === "Tab") {
    e.preventDefault();
    completeInput();
  }
});
input.addEventListener("input", () => { typed.textContent = input.value; });
screen.addEventListener("click", () => input.focus());

/* ---------- Cursor blinks only while the input is focused ---------- */
input.addEventListener("focus", () => {
  cursorEl.classList.add("blinking");
  cursorEl.classList.remove("unfocused");
});
input.addEventListener("blur", () => {
  cursorEl.classList.remove("blinking");
  cursorEl.classList.add("unfocused");
});

function boot() {
  applyTheme(localStorage.getItem("cv-theme") || "dark");
  println(`Welcome to <span class="heading">zeratulok's</span> interactive CV terminal.`);
  println(`Loading profile...\n`);
  input.focus();
  ["whoami", "help"].forEach(run);
}
boot();
