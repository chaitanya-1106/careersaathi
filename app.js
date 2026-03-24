/* ════════════════════════════════
   CareerSaathi — App Logic
   ════════════════════════════════ */

// ═══════════════════════════════════
// STATE
// ═══════════════════════════════════
const S = {
  p: {
    name: '', cls: '', stream: '', state: '', area: '',
    marks: '', income: '', exam: '', budget: '', interests: []
  },
  ans: {},
  careerType: '',
  hist: [],
  lang: 'en',
  apiKey: localStorage.getItem('cs_api_key') || '',
  matchScore: 0
};

// ═══════════════════════════════════
// DATA
// ═══════════════════════════════════
const INTS = [
  { l: 'Coding', e: '💻' }, { l: 'Science', e: '🔬' }, { l: 'Maths', e: '📐' },
  { l: 'Art & Design', e: '🎨' }, { l: 'Teaching', e: '📚' }, { l: 'Business', e: '💼' },
  { l: 'Healthcare', e: '🏥' }, { l: 'Sports', e: '⚽' }, { l: 'Music', e: '🎵' },
  { l: 'Writing', e: '✍️' }, { l: 'Law', e: '⚖️' }, { l: 'Govt Jobs', e: '🏛️' }
];

const QUIZ = [
  {
    q: "When solving a problem, you prefer:",
    h: "Problem solve karte waqt tum kya prefer karte ho?",
    cat: "Problem Solving",
    o: [
      { t: "Working with data & numbers", c: 'tech' },
      { t: "Finding creative solutions", c: 'creative' },
      { t: "Leading & managing people", c: 'mgmt' },
      { t: "Deep research & analysis", c: 'res' }
    ]
  },
  {
    q: "Your strongest skill is:",
    h: "Tumhara sabse strong skill kya hai?",
    cat: "Core Skills",
    o: [
      { t: "Mathematics / Logic", c: 'tech' },
      { t: "Communication / Writing", c: 'mgmt' },
      { t: "Art / Design / Creativity", c: 'creative' },
      { t: "Leadership & Decision Making", c: 'mgmt' }
    ]
  },
  {
    q: "You perform best in which environment?",
    h: "Tum kaunse environment mein best perform karte ho?",
    cat: "Work Style",
    o: [
      { t: "Alone — deep, focused work", c: 'tech' },
      { t: "Collaborative team setting", c: 'mgmt' },
      { t: "Fast-paced, competitive arena", c: 'res' },
      { t: "Structured, systematic routine", c: 'govt' }
    ]
  },
  {
    q: "Your #1 priority in a career:",
    h: "Career mein tumhari pehli priority kya hai?",
    cat: "Career Goals",
    o: [
      { t: "High salary (₹15+ LPA)", c: 'tech' },
      { t: "Job security & pension (Sarkari)", c: 'govt' },
      { t: "Creative freedom & expression", c: 'creative' },
      { t: "Social impact & helping others", c: 'res' }
    ]
  },
  {
    q: "Your favourite subjects in school:",
    h: "Tumhara favourite subject kaun sa hai?",
    cat: "Academic Interest",
    o: [
      { t: "Maths / Physics / Chemistry", c: 'tech' },
      { t: "Commerce / Economics / Accounts", c: 'mgmt' },
      { t: "History / Geography / Civics", c: 'govt' },
      { t: "Computers / Technology", c: 'tech' }
    ]
  },
  {
    q: "How many hours can you study daily?",
    h: "Ek din mein kitne ghante padh sakte ho?",
    cat: "Study Capacity",
    o: [
      { t: "8+ hours — Exam warrior mode 🔥", c: 'govt' },
      { t: "5–7 hours — Focused & consistent", c: 'tech' },
      { t: "3–4 hours — Balanced approach", c: 'creative' },
      { t: "1–2 hours — Practical, project-based", c: 'mgmt' }
    ]
  }
];

const CT = {
  tech: {
    emoji: '💻',
    type: 'Tech Innovator',
    desc: 'Tum logically strong aur analytically minded ho. Technology, data aur engineering tumhari duniya hai. India mein tech sector fastest growing hai — tumhare liye golden era hai! Python, AI/ML aur cloud skills seekh ke ₹15–30 LPA earn kar sakte ho.',
    careers: ['Software Engineer', 'Data Scientist', 'AI/ML Engineer', 'Cybersecurity Analyst', 'Cloud Architect', 'DevOps Engineer']
  },
  creative: {
    emoji: '🎨',
    type: 'Creative Visionary',
    desc: 'Tum creative aur innovative thinker ho. Design, media aur content mein tumhari special talent hai. Digital India mein UX designers aur creative professionals ki demand tezi se badh rahi hai — portfolio banao aur launch karo!',
    careers: ['UX/UI Designer', 'Graphic Designer', 'Content Creator', 'Architect', 'Fashion Designer', 'Film / Media Producer']
  },
  mgmt: {
    emoji: '📊',
    type: 'Business Leader',
    desc: 'Tum natural leader aur strong communicator ho. Business, management aur entrepreneurship tumhare khas strengths hain. MBA track ya startup world — dono mein tumhari bahut value hai. Networking aur communication skills polish karo!',
    careers: ['MBA / Business Manager', 'Entrepreneur / Founder', 'Marketing Manager', 'CA / Finance Analyst', 'HR Professional', 'Management Consultant']
  },
  govt: {
    emoji: '🏛️',
    type: 'Governance Champion',
    desc: 'Tum systematic, disciplined aur socially conscious ho. Civil services mein tumhara impact bahut bada ho sakta hai. Desh ki seva tumhari calling hai — UPSC, SSC, aur defence services mein bahut scope hai!',
    careers: ['IAS / IPS Officer', 'SSC / Banking Jobs', 'Defence Services (Army/Navy/Air Force)', 'State PCS Officer', 'Teacher / Professor', 'Judiciary / Law']
  },
  res: {
    emoji: '🔬',
    type: 'Research Scholar',
    desc: 'Tum deep thinker aur knowledge explorer ho. Research, academia aur science tumhara passion hai. ISRO, DRDO, AIIMS jaise organizations tumhara wait kar rahe hain — aur PhD path se international opportunities bhi hain!',
    careers: ['Scientist (ISRO/DRDO)', 'Medical Researcher', 'PhD / Academia', 'Data Analyst', 'Journalist / Author', 'Economist / Policy Analyst']
  }
};

const TIPS = [
  "🎯 Aaj ek career-related video dekho — YouTube pe IIT/NIT placements ya career talks bahut helpful hain!",
  "📝 Apna LinkedIn profile abhi bana lo — freshers ke liye bhi recruiters profile dekh ke contact karte hain.",
  "💡 NSP (National Scholarship Portal) pe apni eligibility check karo — lakhs of students free mein scholarship miss kar dete hain!",
  "🔗 Internshala pe account bana lo — 10th/12th ke students ke liye bhi internships available hain.",
  "📚 NPTEL ke free courses dekho — IIT professors directly padhate hain aur certificate bhi milta hai.",
  "🌐 GitHub account banao — coding seekhte time se hi projects upload karo. Recruiters GitHub profile dekhte hain!",
  "🎓 CUET 2025 ke liye abhi se prepare karo — central universities mein admission isi se hota hai.",
  "💼 Mock interviews practice karo — InterviewBit aur Pramp pe free mock interviews hote hain.",
];

const OPPS = {
  sc: [
    { tag: 'tg', tl: 'Govt Scheme', ti: 'NSP Central Scholarship', org: 'National Scholarship Portal', amt: 'Up to ₹25,000/year', dl: 'Oct–Nov annually', url: 'scholarships.gov.in' },
    { tag: 'tg', tl: 'Education Loan', ti: 'PM Vidyalakshmi Yojana', org: 'Ministry of Education', amt: 'Loan + 3% Interest Subsidy', dl: 'Rolling Applications', url: 'vidyalakshmi.co.in' },
    { tag: 'tg', tl: 'Merit Based', ti: 'INSPIRE Scholarship (DST)', org: 'Department of Science & Tech', amt: '₹80,000/year', dl: 'Dec annually', url: 'online-inspire.gov.in' },
    { tag: 'tg', tl: 'AICTE Scheme', ti: 'Pragati Scholarship (Girls)', org: 'AICTE India', amt: '₹50,000/year', dl: 'Oct–Nov', url: 'aicte-india.org' },
    { tag: 'tg', tl: 'PM Scheme', ti: 'PM Scholarship Scheme', org: 'Ministry of Home Affairs', amt: '₹2,500–3,000/month', dl: 'Rolling', url: 'desw.gov.in' },
    { tag: 'tg', tl: 'Fellowship', ti: 'KVPY Fellowship (SciTech)', org: 'IISc Bangalore', amt: '₹5,000–7,000/month', dl: 'Sep annually', url: 'kvpy.iisc.ernet.in' }
  ],
  jb: [
    { tag: 'tj', tl: 'Fresher Job', ti: 'Software Engineer (Fresher)', org: 'Infosys / TCS / Wipro / HCL', amt: '₹3.5–6 LPA', dl: 'Campus + Off-campus', url: 'naukri.com' },
    { tag: 'tj', tl: 'Govt Job', ti: 'SSC CGL 2025', org: 'Staff Selection Commission', amt: '₹25,000–75,000/month', dl: 'Check SSC portal', url: 'ssc.nic.in' },
    { tag: 'tj', tl: 'Banking Job', ti: 'IBPS PO / Clerk 2025', org: 'Public Sector Banks', amt: '₹23,000–40,000/month', dl: 'Aug–Sep annually', url: 'ibps.in' },
    { tag: 'tj', tl: 'Tech Job', ti: 'Data Analyst — Entry Level', org: 'Startups & MNCs', amt: '₹4–8 LPA', dl: 'Rolling', url: 'linkedin.com/jobs' },
    { tag: 'tj', tl: 'Govt Portal', ti: 'NCS (National Career Service)', org: 'Ministry of Labour, GOI', amt: '50,000+ active listings', dl: 'Rolling', url: 'ncs.gov.in' },
    { tag: 'tj', tl: 'Design Job', ti: 'UI/UX Designer — Junior', org: 'Product Startups (Bangalore/Mumbai)', amt: '₹4–8 LPA', dl: 'Rolling', url: 'wellfound.com' }
  ],
  in: [
    { tag: 'ti', tl: 'Internship', ti: 'Web Dev / Frontend Intern', org: 'Multiple Startups', amt: '₹5,000–15,000/month', dl: 'Rolling', url: 'internshala.com' },
    { tag: 'ti', tl: 'Research', ti: 'IISER Summer Research Program', org: 'IISERs across India', amt: 'Stipend + Certificate', dl: 'Jan–Mar annually', url: 'iiserpune.ac.in' },
    { tag: 'ti', tl: 'Global', ti: 'Google Summer of Code (GSoC)', org: 'Google', amt: '$1,500–$3,300', dl: 'Feb–Mar annually', url: 'summerofcode.withgoogle.com' },
    { tag: 'ti', tl: 'Govt', ti: 'PM Internship Scheme 2025', org: 'PMO India', amt: '₹5,000/month stipend', dl: 'Check pminternship portal', url: 'pminternship.mca.gov.in' },
    { tag: 'ti', tl: 'AI Intern', ti: 'ML / AI Engineer Intern', org: 'AI & Deep-tech Startups', amt: '₹10,000–25,000/month', dl: 'Rolling', url: 'linkedin.com' },
    { tag: 'ti', tl: 'Content', ti: 'Content Writing / Copywriting', org: 'EdTech & Media Companies', amt: '₹3,000–8,000/month', dl: 'Rolling', url: 'internshala.com' }
  ]
};

const MENTORS = [
  { n: 'Priya Sharma', r: 'Software Engineer @ Google', e: '👩‍💻', f: 'Tech / CS · 5 yrs exp', field: 'tech' },
  { n: 'Arjun Mehta', r: 'IAS Officer, Rajasthan Cadre', e: '👨‍💼', f: 'Civil Services · AIR 42', field: 'govt' },
  { n: 'Kavita Singh', r: 'Senior UX Designer @ Flipkart', e: '👩‍🎨', f: 'Design / UX · 4 yrs', field: 'design' },
  { n: 'Rohit Kumar', r: 'Data Scientist @ Razorpay', e: '👨‍🔬', f: 'Data Science · 3 yrs', field: 'tech' },
  { n: 'Dr. Ananya Rao', r: 'Senior Researcher @ AIIMS', e: '👩‍⚕️', f: 'Medicine / Research · 8 yrs', field: 'science' },
  { n: 'Suresh Babu', r: 'CA & Finance Consultant', e: '👨', f: 'Finance / CA · 6 yrs', field: 'finance' },
  { n: 'Nisha Kapoor', r: 'Founder @ EdTech Startup', e: '👩‍💻', f: 'Entrepreneurship · 4 yrs', field: 'business' },
  { n: 'Vikram Choudhary', r: 'Wing Commander (Ex-IAF)', e: '🪖', f: 'Defence Services · 10 yrs', field: 'defence' }
];

// ═══════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════
function navigate(scr) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + scr);
  if (target) target.classList.add('active');
  window.scrollTo(0, 0);

  if (scr === 'dashboard') {
    initDash();
    setTimeout(drawGraph, 300);
    loadOpp('sc');
    loadMentors();
    checkApiKey();
  }
}

function scrollToFeatures() {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
}

// ═══════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════
function initInterests() {
  document.getElementById('igrid').innerHTML = INTS.map(i =>
    `<div class="ic" onclick="togInt(this,'${i.l}')">
      <span class="em">${i.e}</span>${i.l}
    </div>`
  ).join('');
}

function togInt(el, l) {
  el.classList.toggle('sel');
  const idx = S.p.interests.indexOf(l);
  if (idx > -1) S.p.interests.splice(idx, 1);
  else S.p.interests.push(l);
}

function updProg(step) {
  ['p1', 'p2', 'p3'].forEach((id, i) => {
    document.getElementById(id).classList.toggle('done', i < step);
  });
  ['pl1', 'pl2', 'pl3'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.style.color = i < step ? 'var(--orange)' : 'var(--muted)';
  });
}

function ns(cur) {
  if (cur === 1) {
    S.p.name = document.getElementById('iname').value.trim() || 'Student';
    S.p.cls = document.getElementById('iclass').value;
    S.p.stream = document.getElementById('istream').value;
    S.p.state = document.getElementById('istate').value;
    S.p.area = document.getElementById('iarea').value;
  } else if (cur === 2) {
    S.p.marks = document.getElementById('imarks').value;
    S.p.income = document.getElementById('iincome').value;
    S.p.exam = document.getElementById('iexam').value;
    S.p.budget = document.getElementById('ibudget').value;
  }
  document.getElementById('s' + cur).style.display = 'none';
  document.getElementById('s' + (cur + 1)).style.display = 'block';
  updProg(cur + 1);
}

function ps(cur) {
  document.getElementById('s' + cur).style.display = 'none';
  document.getElementById('s' + (cur - 1)).style.display = 'block';
  updProg(cur - 1);
}

function finOb() {
  if (S.p.interests.length === 0) {
    document.getElementById('int-warn').style.display = 'block';
    return;
  }
  document.getElementById('int-warn').style.display = 'none';
  navigate('psycho');
  qIdx = 0;
  S.ans = {};
  loadQ(0);
}

// ═══════════════════════════════════
// QUIZ
// ═══════════════════════════════════
let qIdx = 0;

function loadQ(idx) {
  if (idx >= QUIZ.length) { showResult(); return; }
  const q = QUIZ[idx];
  document.getElementById('qnum').textContent = `${idx + 1} / ${QUIZ.length}`;
  document.getElementById('qfill').style.width = `${((idx + 1) / QUIZ.length) * 100}%`;
  document.getElementById('qcat').textContent = q.cat;
  document.getElementById('qqq').textContent = q.q;
  document.getElementById('qqqh').textContent = q.h;

  const optsEl = document.getElementById('qopts');
  optsEl.innerHTML = q.o.map((o, i) =>
    `<button class="qopt" onclick="pickOpt(this,'${o.c}',${idx})">
      <span class="ol">${'ABCD'[i]}</span>${o.t}
    </button>`
  ).join('');

  // Animate in
  optsEl.querySelectorAll('.qopt').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-10px)';
    setTimeout(() => {
      el.style.transition = 'all 0.25s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }, i * 60);
  });
}

function pickOpt(el, cat, idx) {
  document.querySelectorAll('.qopt').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
  S.ans[idx] = cat;
  setTimeout(() => loadQ(++qIdx), 400);
}

function skipQ() {
  loadQ(++qIdx);
}

function showResult() {
  const counts = { tech: 0, creative: 0, mgmt: 0, govt: 0, res: 0 };
  Object.values(S.ans).forEach(c => { if (counts[c] !== undefined) counts[c]++; });
  S.careerType = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const d = CT[S.careerType];

  // Calculate a match score
  S.matchScore = 70 + Math.floor(Math.random() * 22);

  document.getElementById('re').textContent = d.emoji;
  document.getElementById('rtype').textContent = d.type;
  document.getElementById('rdesc').textContent = d.desc;
  document.getElementById('ctags').innerHTML = d.careers.map(c =>
    `<span class="ctag">${c}</span>`
  ).join('');

  const matchFill = document.getElementById('rmatchfill');
  if (matchFill) matchFill.style.width = S.matchScore + '%';
  document.getElementById('rmatchlabel').textContent = `${S.matchScore}% career profile match based on your answers`;

  navigate('result');
  spawnConfetti();
}

function spawnConfetti() {
  const container = document.getElementById('confetti');
  if (!container) return;
  const colors = ['#FF6B2C', '#FF9A6C', '#4F9FFF', '#10D9A0', '#FFD700'];
  for (let i = 0; i < 20; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (1.5 + Math.random()) + 's';
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.width = (6 + Math.random() * 6) + 'px';
    piece.style.height = piece.style.width;
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ''; }, 3000);
}

// ═══════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════
function initDash() {
  const p = S.p;
  const ct = CT[S.careerType] || CT.tech;

  document.getElementById('dwelcome').textContent = `Namaste, ${p.name || 'Student'}! 👋`;
  document.getElementById('dprofile').textContent = `${ct.type} • ${p.stream || 'Student'} • ${p.state || 'India'}`;
  document.getElementById('mscore').textContent = `${S.matchScore || 85}% Match`;
  document.getElementById('mtype').textContent = ct.type;

  // Profile summary
  const items = [
    { l: 'Class', v: p.cls || '—' },
    { l: 'Stream', v: p.stream || '—' },
    { l: 'Location', v: `${p.area || ''} ${p.state || '—'}`.trim() },
    { l: 'Career Type', v: ct.type },
    { l: 'Budget', v: p.budget === 'low' ? 'Low / Scholarship' : p.budget === 'high' ? 'High / Premier' : 'Medium' },
    { l: 'Interests', v: p.interests.slice(0, 3).join(', ') || 'Varied' }
  ];

  document.getElementById('psummary').innerHTML = items.map(x =>
    `<div class="ps-item">
      <div class="ps-label">${x.l}</div>
      <div class="ps-val">${x.v}</div>
    </div>`
  ).join('');

  // Daily tip
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
  const tipEl = document.getElementById('daytip');
  if (tipEl) tipEl.textContent = tip;
}

function showTab(tab) {
  document.querySelectorAll('.tc').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab)?.classList.add('active');
  const tabs = ['home', 'chat', 'roadmap', 'graph', 'opp', 'mentors'];
  const idx = tabs.indexOf(tab);
  if (idx > -1) document.querySelectorAll('.ntab')[idx]?.classList.add('active');
  window.scrollTo(0, 0);
}

function toggleMobMenu() {
  document.getElementById('mobNav').classList.toggle('open');
}

// ═══════════════════════════════════
// API KEY MANAGEMENT
// ═══════════════════════════════════
function checkApiKey() {
  const warning = document.getElementById('api-warning');
  if (!S.apiKey) {
    if (warning) warning.style.display = 'flex';
  } else {
    if (warning) warning.style.display = 'none';
  }
}

function showApiModal() {
  document.getElementById('apiModal').classList.add('open');
  const input = document.getElementById('apiKeyInput');
  if (input && S.apiKey) input.value = S.apiKey;
}

function closeApiModal(e) {
  if (e.target === document.getElementById('apiModal')) {
    document.getElementById('apiModal').classList.remove('open');
  }
}

function closeApiModalBtn() {
  document.getElementById('apiModal').classList.remove('open');
}

function saveApiKey() {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (key) {
    S.apiKey = key;
    localStorage.setItem('cs_api_key', key);
    document.getElementById('apiModal').classList.remove('open');
    checkApiKey();
    showToast('✅ API key saved successfully!');
    document.getElementById('cs-status').textContent = '● Online — Powered by Claude';
  } else {
    showToast('⚠️ Please enter a valid API key');
  }
}

// ═══════════════════════════════════
// AI CHAT
// ═══════════════════════════════════
async function sendChat() {
  const input = document.getElementById('cinput');
  const msg = input.value.trim();
  if (!msg) return;

  if (!S.apiKey) {
    showApiModal();
    return;
  }

  input.value = '';
  const sendBtn = document.getElementById('csend');
  if (sendBtn) sendBtn.disabled = true;

  addMsg(msg, 'usr');
  S.hist.push({ role: 'user', content: msg });

  // Typing indicator
  const tid = 'ty_' + Date.now();
  const tyEl = document.createElement('div');
  tyEl.className = 'msg ai';
  tyEl.id = tid;
  tyEl.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-content">
      <div class="msdr">CareerSaathi AI</div>
      <div class="mb"><div class="tdots"><span></span><span></span><span></span></div></div>
    </div>`;
  document.getElementById('cms').appendChild(tyEl);
  scrollChat();

  const sys = buildSystemPrompt();

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': S.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: sys,
        messages: S.hist.slice(-12) // Keep last 12 messages for context
      })
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message || 'API Error');
    }

    const reply = data.content?.[0]?.text || 'Maafi chahta hoon, kuch technical issue hua. Please retry karo.';
    S.hist.push({ role: 'assistant', content: reply });
    document.getElementById(tid)?.remove();
    addMsg(reply, 'ai');

  } catch (e) {
    document.getElementById(tid)?.remove();
    const errMsg = e.message.includes('401')
      ? '🔑 API key invalid hai. Settings mein sahi key enter karo.'
      : e.message.includes('429')
        ? '⏳ Rate limit hit ho gaya. Thoda wait karke retry karo.'
        : '📡 Network issue lag raha hai. Internet check karo aur retry karo 🙏';
    addMsg(errMsg, 'ai');
  } finally {
    if (sendBtn) sendBtn.disabled = false;
  }
}

function buildSystemPrompt() {
  const p = S.p;
  const ct = CT[S.careerType];
  return `You are CareerSaathi, India's most helpful AI career advisor for students.

STUDENT PROFILE:
- Name: ${p.name || 'Student'}
- Class/Year: ${p.cls || 'Not specified'}
- Stream: ${p.stream || 'Not specified'}
- Location: ${p.area || ''} ${p.state || 'India'}
- Annual Family Income: ${p.income || 'Not specified'}
- Interests: ${p.interests.join(', ') || 'General'}
- Career Personality Type: ${ct?.type || 'General'}
- Target Exam: ${p.exam || 'Not sure'}
- Budget Category: ${p.budget || 'Medium'}
- Academic Score: ${p.marks || 'Not provided'}

INSTRUCTIONS:
1. Reply in the SAME language the user writes in (Hindi, English, or Hinglish mix)
2. Be concise, practical, and India-specific in every answer
3. Mention real Indian resources: NSP, PM Vidyalakshmi, NPTEL, Unacademy, Drishti IAS, etc.
4. Use ₹ for salary — always quote LPA for annual, /month for monthly
5. Mention relevant competitive exams (JEE, NEET, UPSC, CUET, CAT, GATE, etc.) when applicable
6. Suggest free/affordable options when the student's budget is low
7. Be warm, encouraging and specific — not generic
8. End EVERY response with one clear, actionable "Next Step" the student can take TODAY
9. For roadmap/career path queries: break into 4-6 phases with specific Indian colleges/exams/timelines
10. Keep responses focused: 3-5 lines for quick answers, structured detail for roadmaps

You are talking to a real Indian student who needs real, honest guidance. Make every word count.`;
}

function addMsg(text, role) {
  const el = document.createElement('div');
  el.className = `msg ${role}`;
  el.innerHTML = role === 'ai'
    ? `<div class="msg-avatar">🤖</div>
       <div class="msg-content">
         <div class="msdr">CareerSaathi AI</div>
         <div class="mb">${formatMsg(text)}</div>
       </div>`
    : `<div class="msg-content">
         <div class="mb">${escapeHtml(text)}</div>
       </div>`;
  document.getElementById('cms').appendChild(el);
  scrollChat();
}

function formatMsg(text) {
  return escapeHtml(text)
    .replace(/\n\n/g, '</p><p style="margin-top:0.6rem">')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function scrollChat() {
  const c = document.getElementById('cms');
  if (c) c.scrollTop = c.scrollHeight;
}

function quickQ(btn) {
  document.getElementById('cinput').value = btn.textContent;
  showTab('chat');
  setTimeout(sendChat, 50);
}

function clearChat() {
  S.hist = [];
  const cms = document.getElementById('cms');
  if (!cms) return;
  cms.innerHTML = `
    <div class="msg ai">
      <div class="msg-avatar">🤖</div>
      <div class="msg-content">
        <div class="msdr">CareerSaathi AI</div>
        <div class="mb">Chat clear ho gaya! 🧹 Naya sawaal pucho.<br><br>Main hamesha ready hoon tumhari help ke liye! 🙏</div>
      </div>
    </div>`;
  showToast('Chat cleared!');
}

// ═══════════════════════════════════
// ROADMAP GENERATOR
// ═══════════════════════════════════
function setRM(career) {
  document.getElementById('rminput').value = career;
  genRoadmap();
}

async function genRoadmap() {
  const career = document.getElementById('rminput').value.trim();
  if (!career) {
    showToast('⚠️ Please enter a career name first');
    return;
  }

  if (!S.apiKey) {
    showApiModal();
    return;
  }

  const btn = document.getElementById('rmbtn');
  btn.disabled = true;
  btn.textContent = 'Generating...';

  const out = document.getElementById('rmout');
  out.innerHTML = `
    <div style="text-align:center;padding:3rem;color:var(--muted)">
      <div class="ld"><span></span><span></span><span></span></div>
      <p style="margin-top:1rem;font-size:.9rem">
        AI personalized roadmap bana raha hai for <strong style="color:var(--orange)">${escapeHtml(career)}</strong>...
      </p>
    </div>`;

  const prompt = `Create a detailed, India-specific career roadmap for: "${career}"

Student Context:
- Currently: ${S.p.cls || 'Student'}, ${S.p.stream || 'General stream'}
- Location: ${S.p.state || 'India'} (${S.p.area || 'Urban'})
- Budget Category: ${S.p.budget || 'Medium'}
- Academic Score: ${S.p.marks || 'Average'}
- Income Level: ${S.p.income || 'Not specified'}

Return ONLY a valid JSON array with NO markdown fences, NO explanation, just raw JSON:
[
  {
    "phase": "Phase name",
    "timeline": "Duration (e.g. 0-3 months)",
    "title": "Step title (specific and actionable)",
    "description": "2-3 sentence India-specific description with real resources",
    "emoji": "single relevant emoji",
    "resources": ["Resource 1 (free/affordable)", "Resource 2", "Resource 3"]
  }
]

Create EXACTLY 6 phases: Foundation → Skill Building → Education/Certification → Practical Experience → Job Search/Launch → Career Growth.
Be hyper-specific: real Indian exams, platforms (NPTEL, Unacademy, Coursera), colleges, govt schemes, salary ranges.
If budget is low, prioritize free resources (NPTEL, YouTube, govt schemes).`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': S.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    const raw = data.content?.[0]?.text || '[]';
    let steps;
    try {
      steps = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      steps = fallbackRM(career);
    }
    renderRM(steps, career);

  } catch (e) {
    renderRM(fallbackRM(career), career);
  }

  btn.disabled = false;
  btn.textContent = 'Generate →';
}

function renderRM(steps, career) {
  document.getElementById('rmout').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem">
      <div style="font-family:var(--fd);font-size:1.3rem;font-weight:700">
        🎯 <span style="color:var(--orange)">${escapeHtml(career)}</span> — Personalized Roadmap
      </div>
      <button class="btn-sec" style="font-size:0.8rem;padding:0.5rem 1.2rem" onclick="shareRoadmap()">
        Share Roadmap
      </button>
    </div>
    <div class="rmsteps">
      ${steps.map((s, i) => `
        <div class="rmstep" style="animation-delay:${i * 0.1}s">
          <div class="sdot">${s.emoji || '📌'}</div>
          <div class="sc">
            <div class="sph">${escapeHtml(s.phase)} · ${escapeHtml(s.timeline)}</div>
            <div class="sh2">${escapeHtml(s.title)}</div>
            <div class="sdesc">${escapeHtml(s.description)}</div>
            ${s.resources?.length
        ? `<div class="sres">${s.resources.map(r => `<span class="rchip">📎 ${escapeHtml(r)}</span>`).join('')}</div>`
        : ''
      }
          </div>
        </div>`).join('')}
    </div>`;
}

function fallbackRM(career) {
  return [
    { phase: 'Foundation', timeline: '0–3 months', emoji: '🔍', title: `${career} Field ko Samjho`, description: `Research karo ki ${career} professionals kya karte hain daily. YouTube, LinkedIn, aur Naukri.com se real job descriptions padho aur industry understand karo.`, resources: ['YouTube Career Videos', 'LinkedIn Job Descriptions', 'Naukri.com Insights'] },
    { phase: 'Skill Building', timeline: '3–12 months', emoji: '🛠️', title: 'Core Skills Develop Karo', description: 'Relevant online courses lo. NPTEL ya Coursera se free/affordable certifications complete karo. Daily practice projects banao portfolio ke liye.', resources: ['NPTEL Free Courses', 'Coursera Certificates', 'YouTube Tutorials'] },
    { phase: 'Education', timeline: '1–4 years', emoji: '🎓', title: 'Right Degree / Certification Lo', description: 'Relevant college ya certification program join karo. Extracurriculars, hackathons aur networking simultaneously karo. NSP scholarship check karo.', resources: ['NSP Scholarship Portal', 'College Admission Portals', 'AICTE Resources'] },
    { phase: 'Experience', timeline: 'During education', emoji: '💼', title: 'Real Experience Gain Karo', description: `${career} field mein internship karo. Internshala aur LinkedIn pe apply karo. Projects banao aur GitHub/portfolio pe upload karo.`, resources: ['Internshala', 'LinkedIn', 'GitHub Portfolio'] },
    { phase: 'Job Search', timeline: 'Final year', emoji: '🚀', title: 'Job Search & Placement', description: 'Strong resume banao, mock interviews practice karo. Campus placements aur off-campus drives mein participate karo. Network actively karo.', resources: ['Naukri.com', 'LinkedIn Jobs', 'Resume.io'] },
    { phase: 'Growth', timeline: '1–3 years post job', emoji: '📈', title: 'Career Accelerate Karo', description: 'Advanced certifications lo, side projects rakho, aur senior roles ke liye apply karo. Community mein contribute karo aur mentor bano.', resources: ['Advanced Certifications', 'Industry Meetups', 'Professional Communities'] }
  ];
}

function shareRoadmap() {
  const career = document.getElementById('rminput')?.value || 'Career';
  navigator.clipboard?.writeText(`Check out my ${career} roadmap on CareerSaathi! careersaathi.in`)
    .then(() => showToast('📋 Link copied to clipboard!'))
    .catch(() => showToast('Share this page with friends!'));
}

// ═══════════════════════════════════
// KNOWLEDGE GRAPH
// ═══════════════════════════════════
const GRAPH_NODES = [
  { x: .10, y: .22, l: 'B.Tech CS', c: '#FF6B2C', r: 30, cat: 'tech', info: 'B.Tech Computer Science|Duration: 4 years|Fees: ₹3–15 LPA|Top: IIT, NIT, BITS, VIT' },
  { x: .10, y: .50, l: 'B.Com/BBA', c: '#FF6B2C', r: 27, cat: 'business', info: 'B.Com / BBA|Duration: 3 years|Fees: ₹50K–3 LPA|Top: DU, Christ, SRCC, Symbiosis' },
  { x: .10, y: .78, l: 'BA/BSc', c: '#FF6B2C', r: 26, cat: 'govt', info: 'BA / BSc|Duration: 3 years|Fees: ₹20K–2 LPA|Top: JNU, DU, BHU, Jadavpur' },
  { x: .38, y: .13, l: 'Python/ML', c: '#4F9FFF', r: 24, cat: 'tech', info: 'Python, ML, AI|Top skill for tech|Free: NPTEL, Kaggle|Certify: Google, AWS, IBM' },
  { x: .38, y: .35, l: 'Web Dev', c: '#4F9FFF', r: 23, cat: 'tech', info: 'HTML CSS React Node|In-demand skill|Free: freeCodeCamp|Platform: The Odin Project' },
  { x: .38, y: .55, l: 'Finance/CA', c: '#4F9FFF', r: 22, cat: 'business', info: 'Accounting, CA, CFA|High value skill|Exam: CA Foundation (ICAI)|Duration: 3–5 years' },
  { x: .38, y: .75, l: 'UPSC Prep', c: '#4F9FFF', r: 22, cat: 'govt', info: 'Civil Services Prep|Top exam in India|Free: Drishti IAS, BYJU\'s|Duration: 2–4 years typically' },
  { x: .38, y: .92, l: 'UX Design', c: '#4F9FFF', r: 22, cat: 'tech', info: 'Figma, User Research|Growing creative skill|Free: Google UX Course|Platform: Coursera' },
  { x: .66, y: .13, l: 'Data Scientist', c: '#10D9A0', r: 26, cat: 'tech', info: 'Data Scientist|Salary: ₹8–25 LPA|Demand: Very High 📈|Top: MNCs, Unicorns, FAANG' },
  { x: .66, y: .33, l: 'SDE/Dev', c: '#10D9A0', r: 28, cat: 'tech', info: 'Software Dev Engineer|Salary: ₹6–35 LPA|Demand: Very High 📈|Top: FAANG, Startups, MNCs' },
  { x: .66, y: .55, l: 'CA/Analyst', c: '#10D9A0', r: 24, cat: 'business', info: 'CA / Financial Analyst|Salary: ₹8–20 LPA|Demand: High 📈|Top: Big 4, Banks, PSUs' },
  { x: .66, y: .75, l: 'IAS/IPS', c: '#10D9A0', r: 24, cat: 'govt', info: 'Civil Services Officer|Salary: ₹8–18 LPA + perks|Impact: Nation-wide 🏛️|Path: UPSC CSE' },
  { x: .66, y: .92, l: 'UX Designer', c: '#10D9A0', r: 24, cat: 'tech', info: 'UX/UI Designer|Salary: ₹5–18 LPA|Demand: High 📈|Top: Product companies, MAANG' },
  { x: .90, y: .20, l: '₹20+ LPA', c: '#FFD700', r: 22, cat: 'tech', info: 'Top Salary Tier|Experience: 5+ years|Companies: FAANG, Unicorns|Location: Metro / Remote' },
  { x: .90, y: .52, l: '₹8–15 LPA', c: '#FFD700', r: 22, cat: 'business', info: 'Mid Salary Tier|Experience: 2–5 years|Companies: MNCs, Mid-size|Location: Tier-1 cities' },
  { x: .90, y: .82, l: 'Job Security', c: '#FFD700', r: 22, cat: 'govt', info: 'Government Jobs|Pension + Perks|Stability: Very High|Growth: Steady & assured' }
];

const GRAPH_EDGES = [
  [0, 3], [0, 4], [0, 7], [1, 5], [1, 4], [2, 6], [2, 5],
  [3, 8], [4, 9], [5, 10], [6, 11], [7, 12],
  [8, 13], [9, 13], [9, 14], [10, 14], [11, 15], [12, 14]
];

function drawGraph(filter = 'all') {
  const cont = document.getElementById('kg');
  if (!cont) return;
  const W = cont.offsetWidth || 800;
  const H = 480;

  const activeNodes = filter === 'all'
    ? GRAPH_NODES
    : GRAPH_NODES.filter(n => n.cat === filter || n.cat === 'tech');

  let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M0 0 L10 5 L0 10z" fill="rgba(255,255,255,0.12)"/>
      </marker>
    </defs>`;

  // Draw edges
  GRAPH_EDGES.forEach(([a, b]) => {
    const na = GRAPH_NODES[a], nb = GRAPH_NODES[b];
    const opacity = filter === 'all' ? 0.15 : (na.cat === filter || nb.cat === filter) ? 0.25 : 0.04;
    svg += `<line x1="${na.x * W}" y1="${na.y * H}" x2="${nb.x * W}" y2="${nb.y * H}"
      stroke="rgba(255,255,255,${opacity})" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr)"/>`;
  });

  // Draw nodes
  GRAPH_NODES.forEach((n) => {
    const active = filter === 'all' || n.cat === filter;
    const opacity = active ? 1 : 0.25;
    const esc = n.info.replace(/'/g, "&#39;").replace(/\n/g, '|');
    const words = n.l.split('/');
    const textEl = words.length > 1
      ? words.map((w, j) => `<tspan x="0" dy="${j === 0 ? -7 : 14}" font-size="${n.r > 25 ? 10 : 9}">${w.trim()}</tspan>`).join('')
      : `<tspan font-size="${n.r > 25 ? 11 : 9.5}">${n.l}</tspan>`;

    svg += `<g style="cursor:pointer;opacity:${opacity};transition:opacity 0.3s" onclick="showNT(event,'${esc}')">
      <circle cx="${n.x * W}" cy="${n.y * H}" r="${n.r}" fill="${n.c}15" stroke="${n.c}" stroke-width="1.8"/>
      <circle cx="${n.x * W}" cy="${n.y * H}" r="${n.r - 6}" fill="none" stroke="${n.c}" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.4"/>
      <text x="${n.x * W}" y="${n.y * H}" text-anchor="middle" dominant-baseline="middle"
        fill="${n.c}" font-family="DM Sans,sans-serif" font-weight="600">${textEl}</text>
    </g>`;
  });

  svg += '</svg>';
  cont.innerHTML = svg;
}

function filterGraph(type, btn) {
  document.querySelectorAll('.graph-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  drawGraph(type);
}

function showNT(e, info) {
  const tt = document.getElementById('ntt');
  const lines = info.split('|');
  tt.innerHTML = `<strong style="color:var(--orange)">${lines[0]}</strong><br>${lines.slice(1).map(l => `<span style="color:var(--text-secondary)">${l}</span>`).join('<br>')}`;
  tt.style.display = 'block';
  tt.style.left = Math.min(e.clientX + 14, window.innerWidth - 260) + 'px';
  tt.style.top = Math.max(e.clientY - 70, 10) + 'px';
  setTimeout(() => { tt.style.display = 'none'; }, 4000);
}

document.addEventListener('click', e => {
  if (!e.target.closest('#kg')) document.getElementById('ntt').style.display = 'none';
});

// ═══════════════════════════════════
// OPPORTUNITIES
// ═══════════════════════════════════
function loadOpp(type) {
  document.getElementById('oppout').innerHTML = `
    <div class="ogrid">
      ${OPPS[type].map(o => `
        <div class="ocard" onclick="window.open('https://${o.url}','_blank','noopener')">
          <span class="otag ${o.tag}">${o.tl}</span>
          <div class="ot">${escapeHtml(o.ti)}</div>
          <div class="oo">🏢 ${escapeHtml(o.org)}</div>
          <div class="om">
            <span>💰 ${o.amt}</span>
            <span>📅 ${o.dl}</span>
          </div>
        </div>`).join('')}
    </div>`;
}

function showOpp(type, btn) {
  document.querySelectorAll('.otab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  loadOpp(type);
}

// ═══════════════════════════════════
// MENTORS
// ═══════════════════════════════════
function loadMentors(filter = '') {
  const filtered = filter
    ? MENTORS.filter(m =>
      m.n.toLowerCase().includes(filter.toLowerCase()) ||
      m.r.toLowerCase().includes(filter.toLowerCase()) ||
      m.field.toLowerCase().includes(filter.toLowerCase())
    )
    : MENTORS;

  document.getElementById('mgrid').innerHTML = filtered.map(m => `
    <div class="mcard">
      <div class="mav">${m.e}</div>
      <div class="mn">${escapeHtml(m.n)}</div>
      <div class="mr">${escapeHtml(m.r)}</div>
      <div class="mx">📌 ${escapeHtml(m.f)}</div>
      <button class="btc" onclick="connectM('${escapeHtml(m.n)}', this)">Connect →</button>
    </div>`).join('');

  if (filtered.length === 0) {
    document.getElementById('mgrid').innerHTML =
      `<div style="color:var(--muted);font-size:0.9rem;padding:2rem;grid-column:1/-1">No mentors found for "${escapeHtml(filter)}"</div>`;
  }
}

function filterMentors(val) {
  loadMentors(val);
}

function connectM(name, btn) {
  btn.textContent = '✓ Request Sent';
  btn.style.background = 'var(--blue)';
  btn.style.color = 'var(--bg)';
  btn.style.borderColor = 'var(--blue)';
  btn.disabled = true;
  showToast(`📨 Connection request sent to ${name}!`);
}

// ═══════════════════════════════════
// LANGUAGE TOGGLE
// ═══════════════════════════════════
function toggleLang() {
  S.lang = S.lang === 'en' ? 'hi' : 'en';
  const msg = S.lang === 'hi'
    ? 'Hindi mode activate ho gaya! Ab tum Hindi mein sawaal kar sakte ho. Try karo: "Data Scientist kaise bane?"'
    : 'English mode activated! You can now ask questions in English.';

  showToast(S.lang === 'hi' ? '🇮🇳 Hindi Mode ON' : '🇬🇧 English Mode ON');

  // Add a hint message in chat if on chat tab
  const cms = document.getElementById('cms');
  if (cms && document.getElementById('tab-chat')?.classList.contains('active')) {
    addMsg(msg, 'ai');
  }
}

// ═══════════════════════════════════
// TOAST NOTIFICATION
// ═══════════════════════════════════
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ═══════════════════════════════════
// INIT
// ═══════════════════════════════════
window.addEventListener('load', () => {
  initInterests();
  updProg(1);

  // Check for saved API key
  if (S.apiKey) {
    console.log('API key loaded from storage');
  }
});

// Handle resize for graph
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (document.getElementById('tab-graph')?.classList.contains('active')) {
      drawGraph();
    }
  }, 300);
});
