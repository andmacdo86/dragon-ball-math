import { useState, useCallback, useRef } from "react";

// ── Dragon Ball SVG ──────────────────────────────────────────────────────────
const DragonBallSVG = ({ stars = 1, size = 48, glow = false }) => {
  const starPositions = {
    1: [[50,50]],
    2: [[36,42],[64,58]],
    3: [[35,38],[65,38],[50,62]],
    4: [[35,38],[65,38],[35,62],[65,62]],
    5: [[50,34],[32,46],[68,46],[38,62],[62,62]],
    6: [[34,36],[66,36],[28,52],[72,52],[34,68],[66,68]],
    7: [[50,30],[32,42],[68,42],[26,58],[74,58],[38,70],[62,70]],
  };
  const pts = starPositions[stars] || starPositions[1];
  const id = `db${stars}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      style={{ filter: glow ? "drop-shadow(0 0 10px #ff8800)" : "none", flexShrink: 0 }}>
      <defs>
        <radialGradient id={`bg${id}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#ffe066"/>
          <stop offset="60%" stopColor="#ff9900"/>
          <stop offset="100%" stopColor="#cc4400"/>
        </radialGradient>
        <radialGradient id={`sh${id}`} cx="35%" cy="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#bg${id})`} stroke="#cc5500" strokeWidth="2"/>
      <circle cx="50" cy="50" r="46" fill={`url(#sh${id})`}/>
      {pts.map(([cx,cy],i)=>(
        <g key={i} transform={`translate(${cx},${cy})`}>
          {[0,72,144,216,288].map(a=>(
            <polygon key={a} transform={`rotate(${a})`}
              points="0,-5.5 1.6,-2 5.5,-2 2.8,1 3.8,5 0,2.8 -3.8,5 -2.8,1 -5.5,-2 -1.6,-2"
              fill="#cc0000"/>
          ))}
        </g>
      ))}
    </svg>
  );
};

// ── Characters ───────────────────────────────────────────────────────────────
const CHARACTERS = [
  {
    id:"goku", name:"Goku", title:"Guerreiro Saiyajin",
    color:"#FF6B00", accent:"#FFD700", power:"Kamehameha",
    svg:(size=80)=>(
      <svg width={size} height={size} viewBox="0 0 80 80">
        <rect x="28" y="45" width="24" height="22" rx="4" fill="#FF6B00"/>
        <rect x="28" y="45" width="24" height="6" fill="#CC4400"/>
        <rect x="36" y="51" width="8" height="16" fill="#1a1a2e"/>
        <rect x="26" y="58" width="28" height="5" rx="2" fill="#1a1a2e"/>
        <ellipse cx="40" cy="32" rx="13" ry="14" fill="#FDBCB4"/>
        {[-10,-5,0,5,10].map((x,i)=>(
          <polygon key={i} points={`${40+x},${20-i%2*4} ${40+x-4},32 ${40+x+4},32`} fill="#1a1a2e"/>
        ))}
        <polygon points="30,22 24,30 34,28" fill="#1a1a2e"/>
        <polygon points="50,22 56,30 46,28" fill="#1a1a2e"/>
        <ellipse cx="35" cy="34" rx="2.5" ry="2.5" fill="#1a1a2e"/>
        <ellipse cx="45" cy="34" rx="2.5" ry="2.5" fill="#1a1a2e"/>
        <ellipse cx="35.8" cy="33.2" rx="0.8" ry="0.8" fill="white"/>
        <ellipse cx="45.8" cy="33.2" rx="0.8" ry="0.8" fill="white"/>
        <path d="M36,38 Q40,42 44,38" stroke="#CC6666" strokeWidth="1.5" fill="none"/>
        <rect x="14" y="45" width="14" height="8" rx="4" fill="#FF6B00"/>
        <rect x="52" y="45" width="14" height="8" rx="4" fill="#FF6B00"/>
        <rect x="28" y="65" width="10" height="12" rx="3" fill="#1a1a2e"/>
        <rect x="42" y="65" width="10" height="12" rx="3" fill="#1a1a2e"/>
        <rect x="26" y="73" width="13" height="6" rx="3" fill="#CC0000"/>
        <rect x="41" y="73" width="13" height="6" rx="3" fill="#CC0000"/>
        <path d="M52,60 Q62,55 65,48 Q68,42 63,40" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id:"vegeta", name:"Vegeta", title:"Príncipe Saiyajin",
    color:"#4B0082", accent:"#FF4444", power:"Final Flash",
    svg:(size=80)=>(
      <svg width={size} height={size} viewBox="0 0 80 80">
        <rect x="28" y="45" width="24" height="22" rx="4" fill="#4B0082"/>
        <rect x="28" y="45" width="24" height="6" fill="#2d0052"/>
        <rect x="36" y="51" width="8" height="16" fill="#FF4444"/>
        <rect x="26" y="58" width="28" height="5" rx="2" fill="#FF4444"/>
        <ellipse cx="40" cy="31" rx="12" ry="13" fill="#FDBCB4"/>
        <polygon points="40,10 30,22 35,24 40,14 45,24 50,22" fill="#1a1a2e"/>
        <rect x="30" y="20" width="20" height="8" rx="3" fill="#1a1a2e"/>
        <ellipse cx="35" cy="33" rx="2.5" ry="2" fill="#1a1a2e"/>
        <ellipse cx="45" cy="33" rx="2.5" ry="2" fill="#1a1a2e"/>
        <ellipse cx="35.8" cy="32.3" rx="0.8" ry="0.8" fill="white"/>
        <ellipse cx="45.8" cy="32.3" rx="0.8" ry="0.8" fill="white"/>
        <line x1="33" y1="31" x2="38" y2="32" stroke="#1a1a2e" strokeWidth="1.5"/>
        <line x1="47" y1="31" x2="42" y2="32" stroke="#1a1a2e" strokeWidth="1.5"/>
        <path d="M37,38 Q40,36 43,38" stroke="#CC6666" strokeWidth="1.5" fill="none"/>
        <rect x="14" y="45" width="14" height="8" rx="4" fill="#4B0082"/>
        <rect x="52" y="45" width="14" height="8" rx="4" fill="#4B0082"/>
        <rect x="28" y="65" width="10" height="12" rx="3" fill="#FF4444"/>
        <rect x="42" y="65" width="10" height="12" rx="3" fill="#FF4444"/>
        <rect x="26" y="73" width="13" height="6" rx="3" fill="#2d0052"/>
        <rect x="41" y="73" width="13" height="6" rx="3" fill="#2d0052"/>
        <ellipse cx="20" cy="47" rx="8" ry="5" fill="#888"/>
        <ellipse cx="60" cy="47" rx="8" ry="5" fill="#888"/>
      </svg>
    )
  },
  {
    id:"gohan", name:"Gohan", title:"Filho do Goku",
    color:"#228B22", accent:"#90EE90", power:"Masenko",
    svg:(size=80)=>(
      <svg width={size} height={size} viewBox="0 0 80 80">
        <rect x="28" y="45" width="24" height="22" rx="4" fill="#228B22"/>
        <rect x="28" y="45" width="24" height="6" fill="#145214"/>
        <rect x="36" y="51" width="8" height="16" fill="#1a1a2e"/>
        <rect x="26" y="58" width="28" height="5" rx="2" fill="#1a1a2e"/>
        <ellipse cx="40" cy="33" rx="12" ry="13" fill="#FDBCB4"/>
        {[-8,-2,4,10].map((x,i)=>(
          <polygon key={i} points={`${40+x},18 ${40+x-4},30 ${40+x+4},30`} fill="#1a1a2e"/>
        ))}
        <ellipse cx="35" cy="35" rx="2.5" ry="2.5" fill="#1a1a2e"/>
        <ellipse cx="45" cy="35" rx="2.5" ry="2.5" fill="#1a1a2e"/>
        <ellipse cx="35.8" cy="34.2" rx="0.8" ry="0.8" fill="white"/>
        <ellipse cx="45.8" cy="34.2" rx="0.8" ry="0.8" fill="white"/>
        <path d="M36,40 Q40,44 44,40" stroke="#CC6666" strokeWidth="1.5" fill="none"/>
        <rect x="14" y="45" width="14" height="8" rx="4" fill="#228B22"/>
        <rect x="52" y="45" width="14" height="8" rx="4" fill="#228B22"/>
        <rect x="28" y="65" width="10" height="12" rx="3" fill="#1a1a2e"/>
        <rect x="42" y="65" width="10" height="12" rx="3" fill="#1a1a2e"/>
        <rect x="26" y="73" width="13" height="6" rx="3" fill="#228B22"/>
        <rect x="41" y="73" width="13" height="6" rx="3" fill="#228B22"/>
      </svg>
    )
  },
];

// ── Modes ────────────────────────────────────────────────────────────────────
const MODES = [
  { id:"soma",          label:"Soma",          icon:"➕", ball:1, desc:"Vamos somar!" },
  { id:"subtracao",     label:"Subtração",     icon:"➖", ball:2, desc:"Vamos subtrair!" },
  { id:"multiplicacao", label:"Tabuada",       icon:"✖️", ball:4, desc:"Domine a tabuada!" },
  { id:"misto",         label:"Desafio Final", icon:"🐉", ball:7, desc:"Tudo junto!" },
];

// ── Difficulty levels ────────────────────────────────────────────────────────
// level 1: small numbers  |  level 2: medium  |  level 3: large / harder tabuada
function getLevelConfig(level) {
  // level is 1-based
  if (level <= 2)  return { somaMax:20,  subMax:20,  multMax:5,  label:"Nível 1 - Treinamento",    icon:"🥋" };
  if (level <= 4)  return { somaMax:50,  subMax:40,  multMax:7,  label:"Nível 2 - Guerreiro",      icon:"⚔️" };
  if (level <= 6)  return { somaMax:100, subMax:80,  multMax:9,  label:"Nível 3 - Super Saiyajin", icon:"⚡" };
  return             { somaMax:200, subMax:150, multMax:10, label:"Nível 4 - Lendário!",       icon:"🐉" };
}

// ── Question generator ───────────────────────────────────────────────────────
function generateQuestion(mode, level) {
  const cfg = getLevelConfig(level);
  let op = mode === "misto"
    ? ["soma","subtracao","multiplicacao"][Math.floor(Math.random()*3)]
    : mode;

  let a, b, answer, symbol;
  if (op === "soma") {
    a = Math.floor(Math.random() * cfg.somaMax) + 1;
    b = Math.floor(Math.random() * cfg.somaMax) + 1;
    answer = a + b; symbol = "+";
  } else if (op === "subtracao") {
    a = Math.floor(Math.random() * cfg.subMax) + cfg.subMax / 2;
    b = Math.floor(Math.random() * (a - 1)) + 1;
    answer = a - b; symbol = "−";
  } else {
    a = Math.floor(Math.random() * cfg.multMax) + 1;
    b = Math.floor(Math.random() * cfg.multMax) + 1;
    answer = a * b; symbol = "×";
  }

  // Generate 3 wrong options that are plausible but distinct
  const opts = new Set([answer]);
  let attempts = 0;
  while (opts.size < 4 && attempts < 50) {
    attempts++;
    const delta = Math.floor(Math.random() * Math.max(3, Math.round(answer * 0.3))) + 1;
    const w = answer + (Math.random() > 0.5 ? delta : -delta);
    if (w > 0 && w !== answer) opts.add(w);
  }

  return {
    a, b, symbol, answer,
    options: [...opts].sort(() => Math.random() - 0.5),
    key: Date.now() + Math.random(), // unique key forces React to remount option buttons
  };
}

// ── Feedback copy ────────────────────────────────────────────────────────────
const CORRECT = [
  "KAMEHAMEHA! Resposta perfeita! 💥",
  "NÍVEL SUPER SAIYAJIN ATIVADO! 🌟",
  "Que poder incrível! Você acertou! ⚡",
  "ISSO! Vegeta ficaria com inveja! 😄",
  "Brilhante! Nem Piccolo sabia isso! 🎯",
  "FORÇA MÁXIMA! Acertou em cheio! 🔥",
];
const WRONG = [
  "Não desista! Mesmo Goku treinou muito! 💪",
  "Tente de novo, guerreiro! Você consegue! 🐉",
  "Cada erro te deixa mais forte! Continue! ⚡",
  "Krillin nunca desistiu — e você também não vai! 😄",
];

// ── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,  setScreen]  = useState("select"); // select|home|game|result
  const [character, setCharacter] = useState(null);
  const [mode,    setMode]    = useState(null);

  // game state
  const [question,  setQuestion]  = useState(null);
  const [score,     setScore]     = useState(0);
  const [total,     setTotal]     = useState(0);
  const [streak,    setStreak]    = useState(0);
  const [bestStreak,setBestStreak]= useState(0);
  const [ki,        setKi]        = useState(0);
  const [balls,     setBalls]     = useState(0);
  const [qLeft,     setQLeft]     = useState(10);

  // level system: increases every 2 correct rounds (persistent across games)
  const [level,     setLevel]     = useState(1);
  const [roundsWon, setRoundsWon] = useState(0); // tracks wins for leveling

  // UI state
  const [selected,  setSelected]  = useState(null); // the option value the user clicked
  const [locked,    setLocked]    = useState(false); // prevent double-click
  const [feedback,  setFeedback]  = useState(null);  // null | "correct" | "wrong"
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [shaking,   setShaking]   = useState(false);
  const [kiFlash,   setKiFlash]   = useState(false);
  const [particles, setParticles] = useState([]);
  const [levelUpMsg,setLevelUpMsg]= useState(null);

  const cfg = getLevelConfig(level);
  const char = character || CHARACTERS[0];

  const spawnParticles = () => {
    setParticles(Array.from({length:12},(_,i)=>({
      id: Date.now()+i,
      angle: (i/12)*360,
      emoji: ["⚡","💥","🌟","✨"][i%4],
    })));
    setTimeout(()=>setParticles([]),900);
  };

  const startGame = (m) => {
    setMode(m);
    setScore(0); setTotal(0); setStreak(0);
    setKi(0); setBalls(0); setQLeft(10);
    setSelected(null); setLocked(false); setFeedback(null);
    setKiFlash(false); setParticles([]); setLevelUpMsg(null);
    setQuestion(generateQuestion(m, level));
    setScreen("game");
  };

  const handleAnswer = (opt) => {
    if (locked) return;          // ← BUG FIX: block any input while transitioning
    setLocked(true);
    setSelected(opt);

    const correct = opt === question.answer;
    const newTotal = total + 1;
    setTotal(newTotal);

    if (correct) {
      const ns = score + 1;
      const nst = streak + 1;
      setScore(ns);
      setStreak(nst);
      if (nst > bestStreak) setBestStreak(nst);
      const newKi = Math.min(100, ki + (nst >= 3 ? 20 : 10));
      setKi(newKi);
      if (newKi >= 100) setKiFlash(true);
      setBalls(b => Math.min(7, b + (nst >= 3 ? 2 : 1)));
      setFeedback("correct");
      setFeedbackMsg(CORRECT[Math.floor(Math.random() * CORRECT.length)]);
      spawnParticles();
    } else {
      setStreak(0);
      setKi(k => Math.max(0, k - 10));
      setFeedback("wrong");
      setFeedbackMsg(WRONG[Math.floor(Math.random() * WRONG.length)]);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }

    const remaining = qLeft - 1;
    if (remaining === 0) {
      // End of round — handle level up
      if (correct) {
        const newWins = roundsWon + 1;
        setRoundsWon(newWins);
        if (newWins % 2 === 0) {
          const newLevel = Math.min(level + 1, 8);
          setLevel(newLevel);
          setLevelUpMsg(getLevelConfig(newLevel).label);
        }
      }
      setTimeout(() => setScreen("result"), 1400);
    } else {
      setQLeft(remaining);
      // ← BUG FIX: generate the NEW question first, THEN clear selection state
      setTimeout(() => {
        setQuestion(generateQuestion(mode, level));
        setSelected(null);
        setFeedback(null);
        setKiFlash(false);
        setLocked(false);   // re-enable input only after state is fresh
      }, 1300);
    }
  };

  // ── CSS ──────────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;800;900&family=Nunito:wght@700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --orange: #FF6B00;
      --gold:   #FFD700;
      --dark:   #0a0010;
      --card:   rgba(255,255,255,0.06);
      --border: rgba(255,200,50,0.22);
    }

    body {
      background: var(--dark);
      font-family: 'Nunito', sans-serif;
      -webkit-tap-highlight-color: transparent;
      overscroll-behavior: none;
    }

    .app {
      min-height: 100vh; min-height: 100dvh;
      background: radial-gradient(ellipse at 20% 20%, #1a0800 0%, #0a0010 50%, #000820 100%);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 12px; position: relative; overflow: hidden;
    }

    /* ── background ── */
    .bg { position: fixed; inset: 0; pointer-events: none; overflow: hidden; }
    .bg-star { position: absolute; border-radius: 50%; background: white; animation: twinkle 3s infinite; }
    .aura-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(255,165,0,0.07); animation: expand 4s ease-out infinite; }

    @keyframes twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.8} }
    @keyframes expand  { 0%{transform:scale(0.5);opacity:0.6} 100%{transform:scale(2.5);opacity:0} }
    @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes shake   { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-12px)} 40%{transform:translateX(12px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }
    @keyframes popIn   { 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
    @keyframes kiFlash { 0%,100%{filter:brightness(1)} 50%{filter:brightness(2) saturate(2)} }
    @keyframes particle{ 0%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0.3)} }
    @keyframes slideUp { 0%{transform:translateY(30px);opacity:0} 100%{transform:translateY(0);opacity:1} }
    @keyframes glowPulse{ 0%,100%{box-shadow:0 0 20px rgba(255,165,0,0.3)} 50%{box-shadow:0 0 40px rgba(255,165,0,0.7),0 0 80px rgba(255,100,0,0.3)} }
    @keyframes levelUp { 0%{transform:scale(0.5) translateY(20px);opacity:0} 50%{transform:scale(1.1);opacity:1} 80%{transform:scale(1);opacity:1} 100%{transform:scale(1) translateY(-10px);opacity:0} }

    /* ── card ── */
    .card {
      background: var(--card);
      backdrop-filter: blur(20px);
      border: 1.5px solid var(--border);
      border-radius: 28px;
      padding: 24px 20px;
      width: 100%; max-width: 430px;
      position: relative;
      animation: slideUp 0.4s ease;
    }

    /* ── typography — Exo 2 for titles ── */
    .t-title {
      font-family: 'Exo 2', sans-serif;
      font-weight: 900;
      letter-spacing: 1px;
    }
    .t-body { font-family: 'Nunito', sans-serif; }

    /* ── SELECT ── */
    .sel-title { font-size: 1.9rem; color: var(--gold); text-align: center; text-shadow: 0 0 20px rgba(255,200,0,0.5); margin-bottom: 4px; }
    .sel-sub   { color: rgba(255,255,255,0.55); text-align:center; font-size:0.88rem; margin-bottom:18px; }
    .char-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:16px; }
    .char-btn  {
      border-radius:18px; border:2px solid transparent; padding:14px 8px;
      cursor:pointer; background:rgba(255,255,255,0.05);
      transition:transform 0.2s, border-color 0.2s, background 0.2s;
      display:flex; flex-direction:column; align-items:center; gap:5px;
    }
    .char-btn:hover  { transform:translateY(-5px) scale(1.03); }
    .char-btn.active { border-color:var(--gold); background:rgba(255,200,0,0.1); animation:glowPulse 1.5s infinite; }
    .char-name  { font-family:'Exo 2',sans-serif; font-weight:900; font-size:1rem; letter-spacing:1px; color:white; }
    .char-title { font-size:0.62rem; color:rgba(255,255,255,0.5); font-weight:700; text-align:center; }
    .char-power { font-size:0.6rem; font-weight:900; padding:2px 7px; border-radius:999px; color:white; }

    /* ── HOME ── */
    .home-head  { display:flex; flex-direction:column; align-items:center; margin-bottom:18px; }
    .home-char  { animation:float 3s ease-in-out infinite; }
    .home-title { font-size:2.2rem; color:var(--gold); text-shadow:0 0 20px rgba(255,200,0,0.5); text-align:center; }
    .home-sub   { color:rgba(255,255,255,0.55); font-size:0.88rem; margin-top:4px; text-align:center; }
    .level-badge{
      display:inline-flex; align-items:center; gap:6px;
      background:linear-gradient(135deg,rgba(255,107,0,0.3),rgba(255,215,0,0.2));
      border:1px solid rgba(255,200,50,0.3); border-radius:999px;
      padding:6px 14px; font-weight:900; font-size:0.82rem; color:var(--gold);
      margin:0 auto 12px; text-align:center;
    }
    .mode-grid  { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px; }
    .mode-btn   {
      border-radius:18px; border:1.5px solid rgba(255,200,50,0.2); padding:16px 10px;
      background:rgba(255,255,255,0.05); cursor:pointer; color:white;
      display:flex; flex-direction:column; align-items:center; gap:5px;
      transition:transform 0.18s, background 0.18s, box-shadow 0.18s;
    }
    .mode-btn:hover { transform:translateY(-4px) scale(1.04); background:rgba(255,200,0,0.1); box-shadow:0 8px 24px rgba(255,150,0,0.25); }
    .mode-icon  { font-size:1.6rem; }
    .mode-label { font-family:'Exo 2',sans-serif; font-weight:800; font-size:1.05rem; }
    .mode-desc  { font-size:0.65rem; font-weight:700; opacity:0.55; }
    .divider    { border:none; border-top:1px solid rgba(255,200,50,0.1); margin:12px 0; }
    .best-row   { display:flex; justify-content:center; margin:6px 0; }

    /* ── GAME ── */
    .back-btn {
      position:absolute; top:14px; left:14px;
      background:rgba(255,255,255,0.07); border:1px solid rgba(255,200,50,0.2);
      border-radius:10px; padding:5px 11px; color:rgba(255,255,255,0.6);
      font-weight:900; font-size:0.78rem; cursor:pointer; transition:background 0.15s;
    }
    .back-btn:hover { background:rgba(255,200,0,0.1); color:white; }
    .game-top   { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    .score-pill {
      background:rgba(255,200,0,0.1); border:1px solid rgba(255,200,0,0.3);
      border-radius:999px; padding:5px 12px; font-weight:900; font-size:0.82rem; color:var(--gold);
      display:flex; align-items:center; gap:5px;
    }
    .streak-pill{
      background:linear-gradient(135deg,#FF6B00,#FFD700);
      border-radius:999px; padding:4px 10px;
      font-weight:900; font-size:0.78rem; color:#1a1a2e;
    }
    .balls-row  { display:flex; gap:5px; margin-bottom:12px; justify-content:center; flex-wrap:wrap; }
    .ki-wrap    { margin-bottom:12px; }
    .ki-label   { display:flex; justify-content:space-between; color:var(--gold); font-size:0.82rem; font-weight:900; margin-bottom:4px; }
    .ki-track   { background:rgba(255,255,255,0.08); border-radius:999px; height:11px; }
    .ki-fill    {
      height:100%; border-radius:999px;
      background:linear-gradient(90deg,#FF4400,#FF8800,#FFD700);
      transition:width 0.5s cubic-bezier(0.34,1.56,0.64,1);
      box-shadow:0 0 10px rgba(255,150,0,0.5);
    }
    .ki-fill.maxed { animation:kiFlash 0.5s 3; }
    .level-tag  {
      text-align:center; font-size:0.72rem; font-weight:900; color:rgba(255,200,0,0.6);
      letter-spacing:1px; margin-bottom:10px;
    }

    /* question */
    .q-card  {
      background:rgba(0,0,0,0.3); border-radius:20px;
      border:1.5px solid rgba(255,200,50,0.18);
      padding:22px 16px; text-align:center; margin-bottom:16px; position:relative;
    }
    .q-card.shake { animation:shake 0.5s; }
    .q-hint  { color:rgba(255,255,255,0.38); font-size:0.75rem; font-weight:800; letter-spacing:2px; margin-bottom:6px; }
    .q-text  {
      font-family:'Exo 2',sans-serif; font-weight:900;
      font-size:2.8rem; color:white; letter-spacing:3px;
      text-shadow:0 0 20px rgba(255,200,0,0.3);
    }
    .particles { position:absolute; inset:0; pointer-events:none; }
    .particle  { position:absolute; left:50%; top:50%; font-size:1.2rem; animation:particle 0.9s forwards; }

    /* options — key insight: we use data-state so the class is driven by React state,
       not by any residual DOM class from the previous question */
    .opts-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .opt {
      border:2px solid rgba(255,200,50,0.2); border-radius:16px;
      padding:15px; font-family:'Exo 2',sans-serif; font-weight:800;
      font-size:1.6rem; color:white; background:rgba(255,255,255,0.06);
      cursor:pointer; transition:transform 0.15s, background 0.15s, border-color 0.15s;
      letter-spacing:1px;
    }
    .opt:hover:not(:disabled) { transform:scale(1.07); background:rgba(255,200,0,0.12); border-color:rgba(255,200,0,0.5); }
    .opt[data-state="correct"] { background:rgba(0,220,100,0.2); border-color:#00dc64; color:#90ffc8; box-shadow:0 0 14px rgba(0,220,100,0.3); }
    .opt[data-state="wrong"]   { background:rgba(255,50,50,0.2);  border-color:#ff3232; color:#ffaaaa; }
    .opt:disabled { cursor:default; }

    .feedback {
      margin-top:12px; padding:11px 16px; border-radius:13px;
      font-weight:900; font-size:0.88rem; text-align:center; animation:popIn 0.3s;
    }
    .feedback.correct { background:rgba(0,220,100,0.15); color:#90ffc8; border:1.5px solid #00dc64; }
    .feedback.wrong   { background:rgba(255,50,50,0.15);  color:#ffaaaa; border:1.5px solid #ff3232; }

    /* level up toast */
    .levelup-toast {
      position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
      background:linear-gradient(135deg,#FF6B00,#FFD700);
      color:#0a0010; font-family:'Exo 2',sans-serif; font-weight:900;
      font-size:1.1rem; padding:16px 28px; border-radius:20px; z-index:100;
      animation:levelUp 2s forwards; text-align:center; pointer-events:none;
      box-shadow:0 0 40px rgba(255,200,0,0.6);
    }

    /* ── RESULT ── */
    .res-char   { display:flex; justify-content:center; margin-bottom:8px; animation:float 2s ease-in-out infinite; }
    .res-title  { font-size:1.8rem; color:var(--gold); text-align:center; text-shadow:0 0 20px rgba(255,200,0,0.5); margin-bottom:4px; }
    .res-score  { font-family:'Exo 2',sans-serif; font-weight:900; font-size:3.8rem; color:white; text-align:center; text-shadow:0 0 30px rgba(255,200,0,0.4); margin:8px 0; letter-spacing:3px; }
    .res-balls  { display:flex; justify-content:center; gap:7px; margin-bottom:12px; }
    .res-msg    { color:rgba(255,255,255,0.7); text-align:center; font-size:0.92rem; margin-bottom:18px; line-height:1.5; }

    /* ── buttons ── */
    .btn-main {
      width:100%; padding:14px; border:none; border-radius:16px;
      font-family:'Exo 2',sans-serif; font-weight:900; font-size:1.2rem; letter-spacing:1px;
      cursor:pointer; background:linear-gradient(135deg,#FF6B00,#FFD700);
      color:#0a0010; box-shadow:0 6px 24px rgba(255,150,0,0.4);
      transition:transform 0.15s, box-shadow 0.15s; margin-bottom:10px;
    }
    .btn-main:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(255,150,0,0.5); }
    .btn-sec {
      width:100%; padding:12px; border:1.5px solid rgba(255,200,50,0.3); border-radius:16px;
      font-family:'Exo 2',sans-serif; font-weight:800; font-size:1rem; letter-spacing:1px;
      cursor:pointer; background:transparent; color:rgba(255,255,255,0.65);
      transition:background 0.15s;
    }
    .btn-sec:hover { background:rgba(255,200,0,0.08); color:white; }
    .streak-badge  {
      display:inline-flex; align-items:center; gap:4px;
      background:linear-gradient(135deg,#FF6B00,#FFD700);
      border-radius:999px; padding:4px 12px;
      font-weight:900; font-size:0.82rem; color:#1a1a2e;
    }
  `;

  // static bg elements (avoid re-render jitter by keeping them outside state)
  const bgStars = Array.from({length:25},(_,i)=>({
    id:i, x:((i*37+13)%100), y:((i*53+7)%100), d:(i%3)+2
  }));
  const auraRings = [0,1,2,3].map(i=>({ id:i, size:100+i*80, delay:i }));

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* Background */}
        <div className="bg">
          {bgStars.map(s=>(
            <div key={s.id} className="bg-star"
              style={{ left:`${s.x}%`, top:`${s.y}%`, width:`${s.d}px`, height:`${s.d}px`, animationDelay:`${s.id*0.15}s` }}/>
          ))}
          {auraRings.map(r=>(
            <div key={r.id} className="aura-ring"
              style={{ width:`${r.size}px`, height:`${r.size}px`, left:`calc(50% - ${r.size/2}px)`, top:`calc(50% - ${r.size/2}px)`, animationDelay:`${r.delay}s` }}/>
          ))}
        </div>

        {/* Level-up toast */}
        {levelUpMsg && <div className="levelup-toast">⬆️ {levelUpMsg}!</div>}

        {/* ─────────── SELECT CHARACTER ─────────── */}
        {screen === "select" && (
          <div className="card">
            <div className="t-title sel-title">🐉 ESCOLHA SEU GUERREIRO!</div>
            <div className="sel-sub">Quem vai te ajudar a aprender hoje?</div>
            <div className="char-grid">
              {CHARACTERS.map(c=>(
                <button key={c.id}
                  className={`char-btn ${character?.id===c.id?"active":""}`}
                  style={{ borderColor: character?.id===c.id ? c.accent : "transparent" }}
                  onClick={()=>setCharacter(c)}>
                  <div style={{ animation: character?.id===c.id ? "float 2s ease-in-out infinite":"none" }}>
                    {c.svg(62)}
                  </div>
                  <div className="char-name" style={{color:c.accent}}>{c.name}</div>
                  <div className="char-title">{c.title}</div>
                  <div className="char-power" style={{background:c.color}}>{c.power}</div>
                </button>
              ))}
            </div>
            <button className="btn-main" onClick={()=>{ if(!character) setCharacter(CHARACTERS[0]); setScreen("home"); }}>
              ⚡ VAMOS LUTAR!
            </button>
          </div>
        )}

        {/* ─────────── HOME ─────────── */}
        {screen === "home" && (
          <div className="card">
            <div className="home-head">
              <div className="home-char">{char.svg(88)}</div>
              <div className="t-title home-title">{char.name.toUpperCase()}</div>
              <div className="home-sub">Escolha sua batalha matemática!</div>
            </div>
            <div className="level-badge">{cfg.icon} {cfg.label}</div>
            {bestStreak > 0 && (
              <div className="best-row">
                <span className="streak-badge">🔥 Recorde: {bestStreak} seguidos!</span>
              </div>
            )}
            <hr className="divider"/>
            <div className="mode-grid">
              {MODES.map(m=>(
                <button key={m.id} className="mode-btn" onClick={()=>startGame(m.id)}>
                  <DragonBallSVG stars={m.ball} size={30}/>
                  <div className="mode-label">{m.label}</div>
                  <div className="mode-icon">{m.icon}</div>
                  <div className="mode-desc">{m.desc}</div>
                </button>
              ))}
            </div>
            <button className="btn-sec" onClick={()=>setScreen("select")}>🔄 Trocar personagem</button>
          </div>
        )}

        {/* ─────────── GAME ─────────── */}
        {screen === "game" && question && (
          <div className="card">
            <button className="back-btn" onClick={()=>setScreen("home")}>← Sair</button>
            <div style={{height:32}}/>

            <div className="game-top">
              <div className="score-pill">⭐ {score}/{total}</div>
              {streak >= 2 && <div className="streak-pill">🔥 {streak}x!</div>}
              <div className="score-pill">📝 {qLeft}</div>
            </div>

            {/* Dragon Balls */}
            <div className="balls-row">
              {Array.from({length:7}).map((_,i)=>(
                <div key={i} style={{
                  opacity: i<balls ? 1 : 0.18,
                  transform: i<balls ? "scale(1.1)":"scale(0.85)",
                  transition:"opacity 0.4s, transform 0.4s"
                }}>
                  <DragonBallSVG stars={i+1} size={26} glow={i<balls}/>
                </div>
              ))}
            </div>

            {/* Ki bar */}
            <div className="ki-wrap">
              <div className="ki-label"><span>⚡ NÍVEL DE KI</span><span>{ki}%</span></div>
              <div className="ki-track">
                <div className={`ki-fill${kiFlash?" maxed":""}`} style={{width:`${ki}%`}}/>
              </div>
            </div>

            <div className="level-tag">{cfg.icon} {cfg.label}</div>

            {/* Question — key on question.key so React fully remounts */}
            <div key={question.key} className={`q-card${shaking?" shake":""}`}>
              <div className="q-hint">QUAL É A RESPOSTA?</div>
              <div className="q-text">{question.a} {question.symbol} {question.b} = ?</div>
              {particles.length > 0 && (
                <div className="particles">
                  {particles.map(p=>(
                    <div key={p.id} className="particle"
                      style={{"--dx":`${Math.cos(p.angle*Math.PI/180)*70}px`,"--dy":`${Math.sin(p.angle*Math.PI/180)*70}px`}}>
                      {p.emoji}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Options — data-state drives visual; no class mutation needed */}
            <div className="opts-grid">
              {question.options.map((opt,i)=>{
                let state = "idle";
                if (selected !== null) {
                  if (opt === question.answer) state = "correct";
                  else if (opt === selected)   state = "wrong";
                }
                return (
                  <button key={i} className="opt"
                    data-state={state}
                    onClick={()=>handleAnswer(opt)}
                    disabled={locked}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {feedback && <div className={`feedback ${feedback}`}>{feedbackMsg}</div>}
          </div>
        )}

        {/* ─────────── RESULT ─────────── */}
        {screen === "result" && (
          <div className="card">
            <div className="res-char">{char.svg(96)}</div>
            <div className="t-title res-title">
              {score>=9?"🏆 SUPER SAIYAJIN!":score>=6?"⚡ GUERREIRO FORTE!":"💪 CONTINUE TREINANDO!"}
            </div>
            <div className="res-score">{score} / 10</div>
            <div className="res-balls">
              {Array.from({length:7}).map((_,i)=>(
                <div key={i} style={{opacity:i<balls?1:0.18}}>
                  <DragonBallSVG stars={i+1} size={28} glow={i<balls}/>
                </div>
              ))}
            </div>
            <div className="res-msg">
              {score>=9
                ? `Incrível, ${char.name}! Você coletou ${balls} esferas! O Shenlong vai aparecer! 🐉`
                : score>=6
                ? `Muito bem, ${char.name}! Você está ficando mais forte! Continue treinando! ⚡`
                : `Não desanime, ${char.name}! Goku também treinou muito. Tente de novo! 💪`}
            </div>
            <div className="level-badge" style={{marginBottom:14}}>{cfg.icon} {cfg.label}</div>
            {bestStreak>0 && (
              <div style={{textAlign:"center",marginBottom:14}}>
                <span className="streak-badge">🔥 Melhor sequência: {bestStreak} seguidos!</span>
              </div>
            )}
            <button className="btn-main" onClick={()=>startGame(mode)}>🔄 BATALHAR DE NOVO!</button>
            <button className="btn-sec"  onClick={()=>setScreen("home")}>🏠 MENU PRINCIPAL</button>
          </div>
        )}
      </div>
    </>
  );
}
