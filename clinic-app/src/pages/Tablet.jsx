import { useEffect, useRef } from 'react'

export default function Tablet() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Inject CSS
    const style = document.createElement('style')
    style.id = 'welcome-styles'
    style.textContent = `/* ── Reset & base ─────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:    #faf7f2;
  --warm:     #f2ece0;
  --sand:     #e8dece;
  --bark:     #c4a882;
  --earth:    #8b6f47;
  --forest:   #2d4a3e;
  --forest-lt:#3d6354;
  --ink:      #1e1a14;
  --ink-med:  #5a4f3f;
  --ink-lt:   #9a8e7a;
  --gold:     #c4973a;
  --gold-lt:  #e8c97a;
  --white:    #ffffff;

  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans:  'Jost', system-ui, sans-serif;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}

html { font-size: 16px; scroll-behavior: smooth; }

body {
  font-family: var(--sans);
  background: var(--cream);
  color: var(--ink);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── Screen management ────────────────────────────────────────────────────── */
.screen {
  min-height: 100vh;
  position: relative;
  display: none;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.5s var(--ease-out);
}
.screen.active {
  display: flex;
}
.screen.visible {
  opacity: 1;
}

/* ══════════════════════════════════════════════════════════════════
   SCREEN 1 — WELCOME
══════════════════════════════════════════════════════════════════ */
#screen-welcome {
  background: var(--forest);
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 3.5rem 2rem 3rem;
  overflow: hidden;
}

/* Botanical background illustration */
#screen-welcome::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 15% 90%, rgba(61,99,84,0.6) 0%, transparent 70%),
    radial-gradient(ellipse 50% 60% at 85% 10%, rgba(45,74,62,0.8) 0%, transparent 60%),
    radial-gradient(ellipse 80% 40% at 50% 50%, rgba(30,50,40,0.3) 0%, transparent 100%);
  pointer-events: none;
}

/* Decorative leaf shapes */
.leaf {
  position: absolute;
  border-radius: 50% 0 50% 0;
  opacity: 0.12;
  pointer-events: none;
}
.leaf-1 { width: 180px; height: 280px; background: var(--gold-lt); top: -40px; left: -60px; transform: rotate(25deg); }
.leaf-2 { width: 120px; height: 200px; background: var(--bark); top: 30px; left: 20px; transform: rotate(50deg); opacity: 0.08; }
.leaf-3 { width: 200px; height: 320px; background: var(--gold-lt); bottom: -60px; right: -70px; transform: rotate(-30deg); }
.leaf-4 { width: 140px; height: 220px; background: var(--bark); bottom: 40px; right: 20px; transform: rotate(-55deg); opacity: 0.08; }
.leaf-5 { width: 100px; height: 160px; background: var(--gold-lt); top: 50%; left: -30px; transform: translateY(-50%) rotate(70deg); opacity: 0.06; }
.leaf-6 { width: 90px; height: 140px; background: var(--gold-lt); top: 20%; right: -20px; transform: rotate(-20deg); opacity: 0.07; }

/* Subtle grain overlay */
#screen-welcome::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px;
  opacity: 0.5;
  pointer-events: none;
}

.welcome-content {
  position: relative;
  z-index: 2;
  max-width: 520px;
  width: 100%;
}

.welcome-monogram {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(196,168,130,0.2);
  border: 1px solid rgba(196,168,130,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 300;
  color: var(--bark);
  letter-spacing: 2px;
  animation: pulse-ring 3s ease-in-out infinite;
}

@keyframes pulse-ring {
  0%, 100% { box-shadow: 0 0 0 0 rgba(196,168,130,0.2); }
  50%       { box-shadow: 0 0 0 12px rgba(196,168,130,0); }
}

.welcome-eyebrow {
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bark);
  margin-bottom: 1rem;
  opacity: 0;
  animation: fade-up 0.8s var(--ease-out) 0.3s forwards;
}

.welcome-headline {
  font-family: var(--serif);
  font-size: clamp(2.6rem, 7vw, 3.8rem);
  font-weight: 300;
  line-height: 1.15;
  color: var(--cream);
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: fade-up 0.9s var(--ease-out) 0.5s forwards;
}

.welcome-headline em {
  font-style: italic;
  color: var(--gold-lt);
}

.welcome-subline {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(250,247,242,0.7);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  opacity: 0;
  animation: fade-up 0.9s var(--ease-out) 0.7s forwards;
}

.welcome-quote {
  display: inline-block;
  border-top: 1px solid rgba(196,168,130,0.3);
  border-bottom: 1px solid rgba(196,168,130,0.3);
  padding: 1.25rem 0;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: fade-up 0.9s var(--ease-out) 0.9s forwards;
}

.welcome-quote p {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 300;
  color: rgba(250,247,242,0.85);
  line-height: 1.7;
}

.welcome-quote span {
  display: block;
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--bark);
  margin-top: 0.75rem;
}

.btn-begin {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
  background: var(--cream);
  border: none;
  padding: 14px 36px;
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
}

.btn-begin:hover {
  background: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.25);
}

.btn-begin:active { transform: scale(0.98); }

.btn-begin svg {
  width: 16px; height: 16px;
  transition: transform 0.2s;
}
.btn-begin:hover svg { transform: translateX(3px); }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ══════════════════════════════════════════════════════════════════
   SCREEN 2 — ABOUT FUNCTIONAL DENTISTRY
══════════════════════════════════════════════════════════════════ */
#screen-about {
  background: var(--cream);
  padding: 0;
}

.about-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.about-visual {
  background: var(--warm);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

/* ── Orbit scene ─────────────────────────────────────────────────────────── */
.about-visual {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: var(--warm);
}

.orbit-scene {
  position: relative;
  width: 360px;
  height: 360px;
  flex-shrink: 0;
}

/* Spinning rings */
.orbit-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(139,111,71,0.28);
  top: 50%; left: 50%;
}
.orbit-ring-1 { width: 190px; height: 190px; margin: -95px 0 0 -95px; animation: spin 24s linear infinite; }
.orbit-ring-2 { width: 290px; height: 290px; margin: -145px 0 0 -145px; animation: spin 36s linear infinite reverse; }
.orbit-ring-3 { width: 355px; height: 355px; margin: -177px 0 0 -177px; animation: spin 50s linear infinite; opacity: 0.35; }

@keyframes spin { to { transform: rotate(360deg); } }

/* Fixed orbit nodes — positioned absolutely inside .orbit-scene */
.orbit-node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transform: translate(-50%, -50%);
}

.orbit-node-dot {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: var(--cream);
  border: 1px solid rgba(196,168,130,0.5);
  box-shadow: 0 4px 16px rgba(139,111,71,0.18);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}

.orbit-node-label {
  font-family: var(--sans);
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--earth);
  white-space: nowrap;
  background: rgba(242,236,224,0.9);
  padding: 2px 8px;
  border-radius: 20px;
  border: 0.5px solid rgba(139,111,71,0.2);
}

/* Central tooth SVG */
.tooth-svg-wrap {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 110px;
  z-index: 2;
  border-radius: 50%;
  overflow: hidden;
  filter: drop-shadow(0 6px 20px rgba(139,111,71,0.22));
}

/* Central glow */
.central-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 120px; height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(196,151,58,0.18) 0%, transparent 70%);
  animation: breathe 4s ease-in-out infinite;
  z-index: 1;
}
@keyframes breathe {
  0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
  50%       { transform: translate(-50%,-50%) scale(1.22); opacity: 1; }
}

.about-text {
  padding: 4rem 3.5rem 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-eyebrow {
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--earth);
  margin-bottom: 1.25rem;
}

.about-headline {
  font-family: var(--serif);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 400;
  line-height: 1.2;
  color: var(--ink);
  margin-bottom: 1.5rem;
}

.about-headline em { font-style: italic; color: var(--forest); }

.about-lead {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.8;
  color: var(--ink-med);
  margin-bottom: 2rem;
  font-style: italic;
}

.about-points {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.about-point {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.point-icon {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--warm);
  border: 1px solid var(--sand);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

.point-text strong {
  display: block;
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--ink);
  margin-bottom: 2px;
}

.point-text p {
  font-family: var(--sans);
  font-size: 12.5px;
  font-weight: 300;
  color: var(--ink-med);
  line-height: 1.55;
}

.vs-strip {
  display: flex;
  gap: 0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  font-size: 11.5px;
}

.vs-col {
  flex: 1;
  padding: 12px 14px;
}

.vs-col.conventional {
  background: var(--sand);
}

.vs-col.functional {
  background: var(--forest);
  color: var(--cream);
}

.vs-col-label {
  font-family: var(--sans);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 8px;
  opacity: 0.7;
}

.vs-col.functional .vs-col-label { color: var(--bark); }
.vs-col.conventional .vs-col-label { color: var(--earth); }

.vs-item {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin-bottom: 5px;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 300;
  line-height: 1.4;
}

.vs-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}

.vs-col.conventional .vs-dot { background: var(--earth); }
.vs-col.functional .vs-dot   { background: var(--gold); }

.btn-continue {
  align-self: flex-start;
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cream);
  background: var(--forest);
  border: none;
  padding: 13px 32px;
  border-radius: 100px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.btn-continue:hover {
  background: var(--forest-lt);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(45,74,62,0.3);
}

.btn-continue svg { width: 14px; height: 14px; transition: transform 0.2s; }
.btn-continue:hover svg { transform: translateX(3px); }

/* ══════════════════════════════════════════════════════════════════
   SCREEN 3 — CONSULTATION CHOICE
══════════════════════════════════════════════════════════════════ */
#screen-choice {
  background: var(--cream);
  padding: 4rem 2rem 5rem;
  align-items: center;
  position: relative;
  overflow: hidden;
}

#screen-choice::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40%;
  background: linear-gradient(to top, var(--warm), transparent);
  pointer-events: none;
}

.choice-inner {
  max-width: 820px;
  width: 100%;
  position: relative;
  z-index: 2;
}

.choice-header {
  text-align: center;
  margin-bottom: 3rem;
}

.choice-eyebrow {
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--earth);
  margin-bottom: 1rem;
}

.choice-headline {
  font-family: var(--serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  line-height: 1.2;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.choice-headline em { font-style: italic; color: var(--forest); }

.choice-sub {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 300;
  color: var(--ink-lt);
  line-height: 1.6;
}

/* Cards */
.choice-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.choice-card {
  background: var(--white);
  border: 1.5px solid var(--sand);
  border-radius: 16px;
  padding: 2rem 1.75rem 1.75rem;
  cursor: pointer;
  transition: border-color 0.25s, transform 0.25s var(--ease-out), box-shadow 0.25s;
  position: relative;
  overflow: hidden;
  text-align: left;
}

.choice-card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.choice-card.symptom::before  { background: linear-gradient(135deg, rgba(196,168,130,0.07) 0%, transparent 70%); }
.choice-card.rootcause::before { background: linear-gradient(135deg, rgba(45,74,62,0.07) 0%, transparent 70%); }
.choice-card.both::before      { background: linear-gradient(135deg, rgba(196,151,58,0.07) 0%, transparent 70%); }

.choice-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
.choice-card:hover::before { opacity: 1; }

.choice-card.selected {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.13);
}

.choice-card.symptom.selected  { border-color: var(--bark); }
.choice-card.rootcause.selected { border-color: var(--forest); }
.choice-card.both.selected      { border-color: var(--gold); }

.card-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
  margin-bottom: 1.25rem;
}

.symptom  .card-icon-wrap { background: rgba(196,168,130,0.15); }
.rootcause .card-icon-wrap { background: rgba(45,74,62,0.1); }
.both     .card-icon-wrap { background: rgba(196,151,58,0.12); }

.card-tag {
  font-family: var(--sans);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.symptom  .card-tag { color: var(--earth); }
.rootcause .card-tag { color: var(--forest); }
.both     .card-tag { color: var(--gold); }

.card-title {
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.25;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.card-desc {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 300;
  line-height: 1.65;
  color: var(--ink-med);
  margin-bottom: 1.25rem;
}

.card-includes {
  border-top: 1px solid var(--sand);
  padding-top: 1rem;
}

.card-includes-label {
  font-family: var(--sans);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-lt);
  margin-bottom: 0.6rem;
}

.card-include-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 300;
  color: var(--ink-med);
  margin-bottom: 4px;
  line-height: 1.4;
}

.include-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
}

.symptom  .include-dot { background: var(--bark); }
.rootcause .include-dot { background: var(--forest); }
.both     .include-dot { background: var(--gold); }

/* Selection indicator */
.card-check {
  position: absolute;
  top: 14px; right: 14px;
  width: 22px; height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--sand);
  background: transparent;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s;
}

.choice-card.symptom.selected  .card-check { background: var(--bark);   border-color: var(--bark);   }
.choice-card.rootcause.selected .card-check { background: var(--forest); border-color: var(--forest); }
.choice-card.both.selected      .card-check { background: var(--gold);   border-color: var(--gold);   }

.card-check svg {
  width: 11px; height: 11px;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s;
}

.choice-card.selected .card-check svg {
  opacity: 1;
  transform: scale(1);
}

/* CTA area */
.choice-cta {
  text-align: center;
}

.selection-hint {
  font-family: var(--serif);
  font-size: 0.95rem;
  font-style: italic;
  color: var(--ink-lt);
  margin-bottom: 1.5rem;
  min-height: 1.4em;
  transition: opacity 0.3s;
}

.btn-proceed {
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cream);
  background: var(--forest);
  border: none;
  padding: 15px 48px;
  border-radius: 100px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.25s var(--ease-out);
  opacity: 0.35;
  pointer-events: none;
}

.btn-proceed.ready {
  opacity: 1;
  pointer-events: all;
}

.btn-proceed.ready:hover {
  background: var(--forest-lt);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(45,74,62,0.3);
}

.btn-proceed svg { width: 16px; height: 16px; transition: transform 0.2s; }
.btn-proceed.ready:hover svg { transform: translateX(4px); }

/* ══════════════════════════════════════════════════════════════════
   SCREEN 4 — CONFIRMED
══════════════════════════════════════════════════════════════════ */
#screen-confirmed {
  background: var(--forest);
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  overflow: hidden;
}

#screen-confirmed::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(61,99,84,0.5) 0%, transparent 100%);
}

.confirmed-content {
  position: relative;
  z-index: 2;
  max-width: 480px;
}

.confirmed-icon {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: rgba(196,168,130,0.2);
  border: 1px solid rgba(196,168,130,0.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 32px;
  margin: 0 auto 2rem;
  animation: pop-in 0.5s var(--ease-out) forwards;
}

@keyframes pop-in {
  from { transform: scale(0.6); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}

.confirmed-headline {
  font-family: var(--serif);
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 300;
  color: var(--cream);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.confirmed-headline em { font-style: italic; color: var(--gold-lt); }

.confirmed-selection {
  display: inline-block;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--bark);
  background: rgba(196,168,130,0.15);
  border: 1px solid rgba(196,168,130,0.3);
  padding: 6px 18px;
  border-radius: 100px;
  margin-bottom: 1.5rem;
}

.confirmed-message {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 300;
  color: rgba(250,247,242,0.75);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.confirmed-next {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: var(--bark);
  opacity: 0.7;
}


/* ── Back button ─────────────────────────────────────────────────────────── */
.btn-back {
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-lt);
  background: transparent;
  border: 0.5px solid rgba(0,0,0,0.12);
  padding: 7px 14px;
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  z-index: 10;
}
.btn-back:hover { background: var(--sand); color: var(--ink); }
.btn-back svg { width: 12px; height: 12px; }
.btn-back-light {
  color: rgba(250,247,242,0.6);
  border-color: rgba(250,247,242,0.2);
}
.btn-back-light:hover { background: rgba(250,247,242,0.1); color: var(--cream); }


/* ── File lookup screen ─────────────────────────────────────────────────── */
#screen-lookup {
  background: var(--forest);
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  overflow: hidden;
}
#screen-lookup::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(61,99,84,0.5) 0%, transparent 100%);
}
.lookup-card {
  position: relative;
  z-index: 2;
  background: rgba(250,247,242,0.08);
  border: 1px solid rgba(196,168,130,0.25);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  max-width: 420px;
  width: 100%;
  text-align: left;
}
.lookup-title {
  font-family: var(--serif);
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--cream);
  margin-bottom: 0.5rem;
  text-align: center;
}
.lookup-sub {
  font-family: var(--sans);
  font-size: 12.5px;
  color: rgba(250,247,242,0.6);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
}
.lookup-label {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bark);
  margin-bottom: 6px;
  display: block;
}
.lookup-input {
  width: 100%;
  font-family: var(--sans);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 12px 16px;
  border: 1px solid rgba(196,168,130,0.3);
  border-radius: 12px;
  background: rgba(250,247,242,0.1);
  color: var(--cream);
  outline: none;
  text-align: center;
  margin-bottom: 1rem;
  transition: border-color 0.15s, background 0.15s;
}
.lookup-input::placeholder { color: rgba(250,247,242,0.3); font-size: 14px; letter-spacing: 0.04em; text-transform: none; }
.lookup-input:focus { border-color: var(--bark); background: rgba(250,247,242,0.15); }
.lookup-error {
  font-family: var(--sans);
  font-size: 12px;
  color: #f5a89a;
  text-align: center;
  margin-bottom: 0.75rem;
  min-height: 1.2em;
}
.lookup-patient-found {
  background: rgba(196,168,130,0.15);
  border: 1px solid rgba(196,168,130,0.3);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 1rem;
  display: none;
}
.lookup-patient-found.visible { display: block; }
.lookup-patient-name {
  font-family: var(--serif);
  font-size: 1.1rem;
  color: var(--cream);
  margin-bottom: 2px;
}
.lookup-patient-meta {
  font-family: var(--sans);
  font-size: 11px;
  color: var(--bark);
}
.btn-lookup {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink);
  background: var(--cream);
  border: none;
  padding: 13px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.75rem;
}
.btn-lookup:hover { background: white; transform: translateY(-1px); }
.btn-lookup:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.btn-skip-lookup {
  width: 100%;
  font-family: var(--sans);
  font-size: 12px;
  color: rgba(250,247,242,0.45);
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  text-align: center;
  transition: color 0.15s;
}
.btn-skip-lookup:hover { color: rgba(250,247,242,0.7); }

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 780px) {
  .about-layout { grid-template-columns: 1fr; }
  .about-visual { min-height: 300px; padding: 2.5rem; }
  .about-text   { padding: 2.5rem 1.75rem; }
  .orbit-scene { width: 260px; height: 260px; }
  .orbit-ring-3 { display: none; }

  .choice-grid { grid-template-columns: 1fr; gap: 1rem; }
  .btn-continue { align-self: center; }
}

@media (max-width: 480px) {
  .welcome-headline { font-size: 2.4rem; }
  #screen-choice { padding: 2.5rem 1.25rem 4rem; }
  .choice-headline { font-size: 2rem; }
}

/* ══════════════════════════════════════════════════════════════════
   SHARED FORM STYLES — matches welcome palette
══════════════════════════════════════════════════════════════════ */
#screen-form-simple,
#screen-form-full {
  background: var(--cream);
  min-height: 100vh;
  align-items: center;
  padding: 2rem 1.25rem 5rem;
  position: relative;
}

#screen-form-simple::before,
#screen-form-full::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 40% at 10% 100%, rgba(196,168,130,0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 30% at 90% 0%, rgba(45,74,62,0.07) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.form-page-wrap {
  max-width: 660px;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* Form card */
.form-card {
  background: rgba(255,255,255,0.92);
  border: 0.5px solid var(--sand);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(139,111,71,0.10);
}

/* Form header */
.form-hdr {
  background: var(--forest);
  padding: 1.75rem 2.25rem 1.5rem;
  position: relative;
}
.form-hdr-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}
.form-hdr-clinic {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 400;
  color: var(--cream);
  letter-spacing: -0.2px;
}
.form-hdr-sub {
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 400;
  color: rgba(250,247,242,0.55);
  letter-spacing: 0.06em;
  margin-top: 2px;
}
.form-hdr-badge {
  font-family: var(--sans);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--bark);
  background: rgba(196,168,130,0.18);
  border: 0.5px solid rgba(196,168,130,0.35);
  padding: 5px 12px;
  border-radius: 100px;
  white-space: nowrap;
}
.form-hdr-title {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  color: var(--cream);
  line-height: 1.2;
  margin-bottom: 4px;
}
.form-hdr-desc {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 300;
  color: rgba(250,247,242,0.65);
  line-height: 1.6;
}

/* Progress bar in form */
.form-progress-wrap {
  padding: 0 2.25rem;
  padding-top: 1.5rem;
  padding-bottom: 0;
  background: white;
  border-bottom: 0.5px solid rgba(196,168,130,0.2);
}
.form-progress-bar {
  height: 2px;
  background: var(--sand);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}
.form-progress-fill {
  height: 100%;
  background: var(--forest);
  border-radius: 2px;
  transition: width 0.35s ease;
}
.form-progress-label {
  font-family: var(--sans);
  font-size: 10px;
  color: var(--ink-lt);
  letter-spacing: 0.06em;
  padding-bottom: 10px;
}

/* Form body */
.form-body-inner {
  padding: 1.75rem 2.25rem 2rem;
  background: white;
}

/* Step management */
.fstep { display: none; }
.fstep.active { display: block; }

/* Section inside form */
.fsection {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.5px solid rgba(196,168,130,0.2);
}
.fsection:last-of-type { border-bottom: none; margin-bottom: 0; }

.fsection-label {
  font-family: var(--sans);
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--earth);
  margin-bottom: 4px;
}
.fsection-title {
  font-family: var(--serif);
  font-size: 16px;
  font-style: italic;
  color: var(--ink);
  margin-bottom: 3px;
}
.fsection-hint {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 300;
  color: var(--ink-med);
  line-height: 1.55;
  margin-bottom: 1.1rem;
}

/* Form dividers */
.fdivider {
  font-family: var(--sans);
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bark);
  margin: 1.1rem 0 0.65rem;
  display: flex;
  align-items: center;
  gap: 8px;
}
.fdivider::after { content: ''; flex: 1; height: 0.5px; background: var(--sand); }

/* Fields */
.fgrid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
.ffull { grid-column: 1 / -1; }
.ffield { display: flex; flex-direction: column; gap: 5px; }
.ffield + .ffield { margin-top: 9px; }
.ffield label {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  color: var(--ink-med);
  letter-spacing: 0.02em;
}
.ffield input,
.ffield select,
.ffield textarea {
  font-family: var(--sans);
  font-size: 13px;
  padding: 9px 11px;
  border: 0.5px solid var(--sand);
  border-radius: 10px;
  background: var(--cream);
  color: var(--ink);
  width: 100%;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  line-height: 1.4;
}
.ffield select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b6f47' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 28px;
}
.ffield input:focus,
.ffield select:focus,
.ffield textarea:focus {
  border-color: var(--bark);
  box-shadow: 0 0 0 3px rgba(196,168,130,0.15);
  background: white;
}
.ffield textarea { resize: vertical; min-height: 72px; line-height: 1.55; }

/* Checks */
.fchecks { display: grid; grid-template-columns: 1fr 1fr; gap: 7px 18px; margin-top: 4px; }
.finline-checks { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 6px; }
.fcheck-row { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.fcheck-row input {
  width: 15px; height: 15px;
  cursor: pointer;
  accent-color: var(--forest);
  flex-shrink: 0; margin: 0;
  border-radius: 4px;
}
.fcheck-row span {
  font-family: var(--sans);
  font-size: 12.5px;
  color: var(--ink);
  line-height: 1.4;
  cursor: pointer;
}

/* Scale slider */
.fscale-row { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
.fscale-row span { font-family: var(--sans); font-size: 10.5px; color: var(--ink-lt); white-space: nowrap; }
.fscale-row input[type=range] { flex: 1; height: 3px; accent-color: var(--forest); cursor: pointer; }
.fscale-val { font-family: var(--sans); font-size: 13px; font-weight: 500; min-width: 20px; text-align: center; color: var(--ink); }

/* Infobox */
.finfobox {
  background: rgba(196,168,130,0.1);
  border: 0.5px solid rgba(196,168,130,0.3);
  border-radius: 10px;
  padding: 10px 13px;
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 300;
  color: var(--ink-med);
  line-height: 1.6;
  margin-bottom: 0.9rem;
}

/* Consent box */
.fconsent-box {
  background: rgba(45,74,62,0.05);
  border: 0.5px solid rgba(45,74,62,0.2);
  border-radius: 10px;
  padding: 14px 16px;
  font-family: var(--sans);
  font-size: 12px;
  color: var(--ink-med);
  line-height: 1.75;
  margin-bottom: 1.25rem;
}

/* Sig field */
.fsig {
  border: none !important;
  border-bottom: 0.5px solid var(--bark) !important;
  border-radius: 0 !important;
  padding: 5px 0 !important;
  font-size: 18px !important;
  font-family: var(--serif) !important;
  font-style: italic !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* Nav row */
.fnav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 0.5px solid rgba(196,168,130,0.2);
  flex-wrap: wrap;
  gap: 10px;
}
.fpage-ind {
  font-family: var(--sans);
  font-size: 11px;
  color: var(--ink-lt);
}
.fbtn {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 9px 20px;
  border-radius: 100px;
  cursor: pointer;
  border: 0.5px solid var(--sand);
  background: white;
  color: var(--ink-med);
  transition: background 0.15s, transform 0.1s;
}
.fbtn:hover { background: var(--warm); }
.fbtn:active { transform: scale(0.97); }
.fbtn-primary {
  background: var(--forest);
  color: var(--cream);
  border-color: var(--forest);
}
.fbtn-primary:hover { opacity: 0.88; background: var(--forest); }
.fbtn-submit {
  background: var(--earth);
  color: white;
  border-color: var(--earth);
  font-size: 13px;
  padding: 11px 26px;
}
.fbtn-submit:hover { opacity: 0.88; background: var(--earth); }

/* Summary screen inside form */
.fsum-screen { display: none; }
.fsum-screen.factive { display: block; }

.fsum-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(45,74,62,0.08);
  border: 0.5px solid rgba(45,74,62,0.25);
  border-radius: 12px;
  padding: 15px 18px;
  margin-bottom: 1.5rem;
}
.fsum-icon { font-size: 22px; flex-shrink: 0; }
.fsum-title { font-family: var(--serif); font-size: 15px; font-weight: 500; color: var(--ink); }
.fsum-sub { font-family: var(--sans); font-size: 11.5px; color: var(--ink-med); margin-top: 2px; }

.finst-box {
  background: rgba(196,168,130,0.1);
  border: 0.5px solid rgba(196,168,130,0.25);
  border-radius: 12px;
  padding: 13px 16px;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.finst-row { display: flex; gap: 10px; align-items: flex-start; font-family: var(--sans); font-size: 12.5px; line-height: 1.5; color: var(--ink); }
.finst-num {
  font-size: 9.5px; font-weight: 700;
  background: var(--forest); color: var(--cream);
  border-radius: 50%;
  width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}

.fsum-block { margin-bottom: 1.1rem; }
.fsum-block-hdr { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.fsum-block-label {
  font-family: var(--sans);
  font-size: 9.5px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ink-lt);
}
.fcopy-btn {
  font-family: var(--sans);
  font-size: 11.5px; font-weight: 500;
  padding: 5px 14px;
  border-radius: 100px;
  cursor: pointer;
  border: 0.5px solid var(--sand);
  background: white;
  color: var(--ink-med);
  transition: background 0.15s;
}
.fcopy-btn:hover { background: var(--warm); }
.fcopy-btn.fdone { background: var(--forest); color: var(--cream); border-color: var(--forest); }

.fsum-pre {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  line-height: 1.7;
  background: var(--warm);
  border: 0.5px solid var(--sand);
  border-radius: 10px;
  padding: 12px 14px;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 280px;
  overflow-y: auto;
  color: var(--ink);
}

.fsum-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 0.5px solid rgba(196,168,130,0.2);
  flex-wrap: wrap;
  gap: 10px;
}
.fghost-btn {
  font-family: var(--sans);
  font-size: 11.5px; font-weight: 500;
  padding: 7px 16px;
  border-radius: 100px;
  cursor: pointer;
  border: 0.5px solid var(--sand);
  background: transparent;
  color: var(--ink-lt);
}
.fghost-btn:hover { background: var(--warm); }
.fclaude-btn {
  font-family: var(--sans);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.06em;
  padding: 10px 24px;
  border-radius: 100px;
  background: var(--forest);
  color: var(--cream);
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
}
.fclaude-btn:hover { opacity: 0.88; }

.fproceed-btn {
  font-family: var(--sans);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.06em;
  padding: 10px 24px;
  border-radius: 100px;
  background: var(--earth);
  color: var(--cream);
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s, transform 0.15s;
}
.fproceed-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.fproceed-btn svg { width: 13px; height: 13px; }

.fsum-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1.25rem 0;
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-lt);
}
.fsum-divider::before, .fsum-divider::after {
  content: '';
  flex: 1;
  height: 0.5px;
  background: rgba(196,168,130,0.3);
}

.fstep2-banner {
  background: linear-gradient(135deg, rgba(45,74,62,0.07) 0%, rgba(196,168,130,0.07) 100%);
  border: 0.5px solid rgba(45,74,62,0.18);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 1rem;
}
.fstep2-banner-title {
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 500;
  color: var(--forest);
  margin-bottom: 3px;
}
.fstep2-banner-desc {
  font-family: var(--sans);
  font-size: 11.5px;
  font-weight: 300;
  color: var(--ink-med);
  line-height: 1.5;
}


@media (max-width: 580px) {
  #screen-form-simple, #screen-form-full { padding: 0 0 4rem; }
  .form-card { border-radius: 0; border-left: none; border-right: none; }
  .form-body-inner { padding: 1.25rem 1.25rem 1.5rem; }
  .form-hdr { padding: 1.5rem 1.25rem 1.25rem; }
  .fgrid2, .fchecks { grid-template-columns: 1fr; }
}


/* ── Scoped exam form styles (inside #screen-exam-full) ──────────────────── */
#screen-exam-full .step           { display: none; }
#screen-exam-full .step.active    { display: block; }

#screen-exam-full .section {
  margin-bottom: 1.5rem; padding-bottom: 1.5rem;
  border-bottom: 0.5px solid rgba(196,168,130,0.2);
}
#screen-exam-full .section:last-of-type { border-bottom: none; margin-bottom: 0; }

#screen-exam-full .section-label {
  font-family: var(--sans); font-size: 9.5px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--earth);
  margin-bottom: 4px;
}
#screen-exam-full .section-title {
  font-family: var(--serif); font-size: 16px; font-style: italic;
  color: var(--ink); margin-bottom: 3px;
}
#screen-exam-full .section-hint {
  font-family: var(--sans); font-size: 12px; font-weight: 300;
  color: var(--ink-med); line-height: 1.55; margin-bottom: 1.1rem;
}

#screen-exam-full .divider {
  font-family: var(--sans); font-size: 9.5px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--bark);
  margin: 1.1rem 0 0.65rem; display: flex; align-items: center; gap: 8px;
}
#screen-exam-full .divider::after {
  content: ''; flex: 1; height: 0.5px; background: var(--sand);
}

#screen-exam-full .grid2 {
  display: grid; grid-template-columns: 1fr 1fr; gap: 11px;
}
#screen-exam-full .full { grid-column: 1 / -1; }

#screen-exam-full .field { display: flex; flex-direction: column; gap: 5px; }
#screen-exam-full .field + .field { margin-top: 9px; }

#screen-exam-full .field label {
  font-family: var(--sans); font-size: 11px; font-weight: 500;
  color: var(--ink-med); letter-spacing: 0.02em;
}
#screen-exam-full .field input,
#screen-exam-full .field select,
#screen-exam-full .field textarea {
  font-family: var(--sans); font-size: 13px; padding: 9px 11px;
  border: 0.5px solid var(--sand); border-radius: 10px;
  background: var(--cream); color: var(--ink); width: 100%;
  outline: none; -webkit-appearance: none; appearance: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
#screen-exam-full .field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b6f47' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px;
}
#screen-exam-full .field input:focus,
#screen-exam-full .field select:focus,
#screen-exam-full .field textarea:focus {
  border-color: var(--bark);
  box-shadow: 0 0 0 3px rgba(196,168,130,0.15);
  background: white;
}
#screen-exam-full .field textarea { resize: vertical; min-height: 72px; line-height: 1.55; }
#screen-exam-full .field input[readonly] { opacity: 0.55; cursor: not-allowed; }

#screen-exam-full .checks {
  display: grid; grid-template-columns: 1fr 1fr; gap: 7px 18px; margin-top: 4px;
}
#screen-exam-full .check-row { display: flex; align-items: center; gap: 8px; cursor: pointer; }
#screen-exam-full .check-row input {
  width: 15px; height: 15px; cursor: pointer; accent-color: var(--forest);
  flex-shrink: 0; margin: 0;
}
#screen-exam-full .check-row span {
  font-family: var(--sans); font-size: 12.5px; color: var(--ink); line-height: 1.4;
}

#screen-exam-full .infobox {
  background: rgba(196,168,130,0.1); border: 0.5px solid rgba(196,168,130,0.3);
  border-radius: 10px; padding: 10px 13px; font-family: var(--sans);
  font-size: 12px; font-weight: 300; color: var(--ink-med); line-height: 1.6;
  margin-bottom: 0.9rem;
}

#screen-exam-full .muscle-head {
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px;
  padding: 4px 0; border-bottom: 0.5px solid var(--sand); margin-bottom: 6px;
}
#screen-exam-full .muscle-head span {
  font-family: var(--sans); font-size: 10.5px; font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-med);
}
#screen-exam-full .muscle-row {
  display: grid; grid-template-columns: 2fr 1fr 1fr;
  gap: 8px; align-items: center; margin-bottom: 6px;
}
#screen-exam-full .muscle-row span {
  font-family: var(--sans); font-size: 13px; color: var(--ink);
}
#screen-exam-full .muscle-row select {
  font-family: var(--sans); font-size: 12px; padding: 5px 24px 5px 7px;
  border: 0.5px solid var(--sand); border-radius: 10px;
  background: var(--cream); color: var(--ink); outline: none;
  -webkit-appearance: none; appearance: none; width: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b6f47' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 7px center;
}

#screen-exam-full .sig-input {
  border: none !important; border-bottom: 0.5px solid var(--bark) !important;
  border-radius: 0 !important; padding: 5px 0 !important;
  font-size: 18px !important; font-family: var(--serif) !important;
  font-style: italic !important; background: transparent !important;
  box-shadow: none !important;
}

#screen-exam-full .nav-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 1.75rem; padding-top: 1.5rem;
  border-top: 0.5px solid rgba(196,168,130,0.2);
  flex-wrap: wrap; gap: 10px;
}
#screen-exam-full .page-ind {
  font-family: var(--sans); font-size: 11px; color: var(--ink-lt);
}
#screen-exam-full .btn {
  font-family: var(--sans); font-size: 12px; font-weight: 500;
  letter-spacing: 0.06em; padding: 9px 20px; border-radius: 100px;
  cursor: pointer; border: 0.5px solid var(--sand);
  background: white; color: var(--ink-med);
  transition: background 0.15s, transform 0.1s;
}
#screen-exam-full .btn:hover { background: var(--warm); }
#screen-exam-full .btn:active { transform: scale(0.97); }
#screen-exam-full .btn-primary {
  background: var(--forest); color: var(--cream); border-color: var(--forest);
}
#screen-exam-full .btn-primary:hover { opacity: 0.88; background: var(--forest); }
#screen-exam-full .btn-save {
  background: var(--earth); color: white; border-color: var(--earth);
  font-size: 13px; padding: 11px 26px;
}
#screen-exam-full .btn-save:hover { opacity: 0.88; background: var(--earth); }

#screen-exam-full .summary-screen { display: none; }
#screen-exam-full .summary-screen.active { display: block; }

#screen-exam-full .success-banner {
  display: flex; align-items: center; gap: 14px;
  background: rgba(45,74,62,0.08); border: 0.5px solid rgba(45,74,62,0.25);
  border-radius: 12px; padding: 15px 18px; margin-bottom: 1.5rem;
}
#screen-exam-full .success-icon { font-size: 22px; flex-shrink: 0; }
#screen-exam-full .success-title {
  font-family: var(--serif); font-size: 15px; font-weight: 500; color: var(--ink);
}
#screen-exam-full .success-sub {
  font-family: var(--sans); font-size: 11.5px; color: var(--ink-med); margin-top: 2px;
}

#screen-exam-full .instructions {
  background: rgba(196,168,130,0.1); border: 0.5px solid rgba(196,168,130,0.25);
  border-radius: 12px; padding: 13px 16px; margin-bottom: 1.25rem;
  display: flex; flex-direction: column; gap: 9px;
}
#screen-exam-full .inst-row {
  display: flex; gap: 10px; align-items: flex-start;
  font-family: var(--sans); font-size: 12.5px; line-height: 1.5; color: var(--ink);
}
#screen-exam-full .inst-num {
  font-size: 9.5px; font-weight: 700; background: var(--forest); color: var(--cream);
  border-radius: 50%; width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}

#screen-exam-full .summary-block { margin-bottom: 1.1rem; }
#screen-exam-full .block-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;
}
#screen-exam-full .block-label {
  font-family: var(--sans); font-size: 9.5px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-lt);
}
#screen-exam-full .copy-btn {
  font-family: var(--sans); font-size: 11.5px; font-weight: 500;
  padding: 5px 14px; border-radius: 100px; cursor: pointer;
  border: 0.5px solid var(--sand); background: white; color: var(--ink-med);
}
#screen-exam-full .copy-btn:hover { background: var(--warm); }
#screen-exam-full .copy-btn.done { background: var(--forest); color: var(--cream); border-color: var(--forest); }

#screen-exam-full .summary-pre {
  font-family: 'Courier New', monospace; font-size: 11px; line-height: 1.7;
  background: var(--warm); border: 0.5px solid var(--sand); border-radius: 10px;
  padding: 12px 14px; white-space: pre-wrap; word-break: break-word;
  max-height: 280px; overflow-y: auto; color: var(--ink);
}

#screen-exam-full .footer-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 1.5rem; padding-top: 1.25rem;
  border-top: 0.5px solid rgba(196,168,130,0.2); flex-wrap: wrap; gap: 10px;
}
#screen-exam-full .btn-ghost {
  font-family: var(--sans); font-size: 11.5px; font-weight: 500;
  padding: 7px 16px; border-radius: 100px; cursor: pointer;
  border: 0.5px solid var(--sand); background: transparent; color: var(--ink-lt);
}
#screen-exam-full .btn-ghost:hover { background: var(--warm); }

#screen-exam-full .saved-banner {
  display: none; background: var(--teal-bg, #f0faf6);
  border: 0.5px solid var(--teal-border, #a0cfc0); border-radius: 10px;
  padding: 12px 16px; font-family: var(--sans); font-size: 13px;
  color: var(--forest); text-align: center; margin-top: 1.5rem;
}

@media (max-width: 580px) {
  #screen-exam-full .grid2,
  #screen-exam-full .checks { grid-template-columns: 1fr; }
  #screen-exam-full .muscle-row { grid-template-columns: 1.5fr 1fr 1fr; }
}`
    document.head.appendChild(style)

    // Inject Google Fonts
    const fonts = document.createElement('link')
    fonts.rel = 'stylesheet'
    fonts.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap'
    document.head.appendChild(fonts)

    // Inject Supabase SDK
    const supaScript = document.createElement('script')
    supaScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js'
    supaScript.onload = () => {
      // Inject our app JS after Supabase loads
      const appScript = document.createElement('script')
      appScript.id = 'welcome-script'
      appScript.textContent = `// ── Supabase connection ──────────────────────────────────────────────────
  const SUPA_URL = 'https://teqqwhvbkuudjmhxwgxo.supabase.co'
  const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcXF3aHZia3V1ZGptaHh3Z3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5Njg5NTAsImV4cCI6MjA5MzU0NDk1MH0.iE6LPe6SpMKciZyL8bZGzs-k6uQtTuoxGts-SVEXQmQ'
  const supa = window.supabase ? window.supabase.createClient(SUPA_URL, SUPA_KEY) : null

  // Current patient context (set by lookup)
  var currentPatient = null
  var lookupTimer = null

  // ── File number lookup ───────────────────────────────────────────────────
  function lookupFileNumber(val) {
    clearTimeout(lookupTimer)
    var v = val.trim().toUpperCase()
    document.getElementById('lookup-error').textContent = ''
    document.getElementById('lookup-patient-box').classList.remove('visible')
    document.getElementById('lookup-btn').disabled = true
    currentPatient = null

    if (v.length < 4) return

    lookupTimer = setTimeout(async function() {
      if (!supa) return
      var { data, error } = await supa
        .from('patients')
        .select('*')
        .ilike('file_number', v)
        .single()

      if (error || !data) {
        document.getElementById('lookup-error').textContent = 'File number not found. Check with reception.'
        return
      }

      currentPatient = data
      document.getElementById('lookup-patient-name').textContent = data.name
      document.getElementById('lookup-patient-meta').textContent =
        [data.age && 'Age ' + data.age, data.gender, data.occupation].filter(Boolean).join(' · ')
      document.getElementById('lookup-patient-box').classList.add('visible')
      document.getElementById('lookup-btn').disabled = false
      document.getElementById('lookup-error').textContent = ''

      // Auto-set consultation type from patient record
      if (data.consultation_type) {
        selectedType = data.consultation_type === 'quick_relief' ? 'symptom' : 'both'
      }
    }, 500)
  }

  function confirmLookup() {
    if (!currentPatient) return
    goToScreen('screen-welcome')
  }

  function skipLookup() {
    currentPatient = null
    goToScreen('screen-welcome')
  }

  // ── Save to Supabase ─────────────────────────────────────────────────────
  async function saveSimpleIntakeToSupabase(formData) {
    if (!supa || !currentPatient) return
    try {
      await supa.from('intake_simple').insert({
        patient_id: currentPatient.id,
        complaint: formData.complaint,
        duration: formData.duration,
        area_affected: formData.area,
        pain_score: parseInt(formData.pain) || null,
        health_conditions: formData.conditions,
        medications: formData.meds,
        allergies: formData.allergies,
        previous_treatment: formData.prev,
        previous_treatment_detail: formData.prevDetail,
        consent_signed: true,
        signature: formData.sig,
        raw_data: formData
      })
      console.log('Simple intake saved to Supabase')
    } catch(e) {
      console.error('Supabase save error:', e)
    }
  }

  async function saveFullIntakeToSupabase(formData) {
    if (!supa || !currentPatient) return
    try {
      await supa.from('intake_full').insert({
        patient_id: currentPatient.id,
        complaint: formData.complaint,
        duration: formData.duration,
        goal_short: formData.goalShort,
        goal_long: formData.goalLong,
        medications: formData.meds,
        allergy_drug: formData.allergyDrug,
        allergy_food: formData.allergyFood,
        sleep_hours: formData.sleepHrs,
        sleep_quality: formData.sleepQual,
        stress_level: parseInt(formData.stress) || null,
        brushing: formData.brush,
        flossing: formData.floss,
        anxiety_level: parseInt(formData.anxiety) || null,
        amalgam: formData.amalgam,
        consent_signed: true,
        signature: formData.sig,
        raw_data: formData
      })
      console.log('Full intake saved to Supabase')
    } catch(e) {
      console.error('Supabase save error:', e)
    }
  }

  async function saveSimpleExamToSupabase(formData) {
    if (!supa || !currentPatient) return
    try {
      await supa.from('examinations').insert({
        patient_id: currentPatient.id,
        exam_type: 'simple',
        chief_complaint: formData.complaint,
        pain_score: parseInt(formData.pain) || null,
        diagnosis: formData.diagnosis,
        prescription: formData.rx,
        further_treatment: formData.nextTx,
        next_appointment: formData.nextAppt,
        raw_data: formData
      })
      console.log('Exam saved to Supabase')
    } catch(e) {
      console.error('Supabase save error:', e)
    }
  }

  async function saveFullExamToSupabase(formData) {
    if (!supa || !currentPatient) return
    try {
      await supa.from('examinations').insert({
        patient_id: currentPatient.id,
        exam_type: 'full',
        primary_diagnosis: formData.primaryDx,
        secondary_diagnosis: formData.secondaryDx,
        phase1: formData.phase1,
        phase2: formData.phase2,
        phase3: formData.phase3,
        phase4: formData.phase4,
        next_appointment: formData.nextAppt,
        raw_data: formData
      })
      console.log('Full exam saved to Supabase')
    } catch(e) {
      console.error('Supabase save error:', e)
    }
  }


  var selectedType = null;

  var hints = {
    symptom:   'Perfect. We\\'ll focus completely on what\\'s bothering you today.',
    rootcause: 'Great choice. We\\'ll fix it and find out why it happened.',
    both:      'Great choice. You\\'ll leave knowing the full picture — today and long-term.'
  };

  var badges = {
    symptom:   'Quick Relief',
    rootcause: 'The Full Picture',
    both:      'The Full Picture'
  };

  var messages = {
    symptom:
      'Your intake form is ready. Please take your time — there are no right or wrong answers. ' +
      'Everything you share helps Dr. Priyanka understand and support you better today.',
    rootcause:
      'Your full intake form is ready. Please take your time — the more you share, the better Dr. Priyanka can understand and help you.',
    both:
      'Your complete intake form is ready. Take your time — you\\'re about to get the full picture of your health, inside and out.'
  };

  function goToScreen(id) {
    // Update badge if navigating to full form screens
    if ((id === 'screen-form-full' || id === 'screen-exam-full')) {
      var badge = document.getElementById('ff-badge');
      if (badge) badge.textContent = selectedType === 'both' ? 'The Complete Visit' : 'Deep Dive';
    }
    // Hide all screens immediately — no delay, no race condition
    document.querySelectorAll('.screen').forEach(function(s) {
      s.classList.remove('active', 'visible');
      s.style.display = 'none';
    });

    var target = document.getElementById(id);
    // Show the target screen
    target.style.display = 'flex';
    target.classList.add('active');

    // Trigger fade-in on the very next paint
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        target.classList.add('visible');
      });
    });

    window.scrollTo(0, 0);
  }

  function selectCard(card, type) {
    document.querySelectorAll('.choice-card').forEach(function(c) {
      c.classList.remove('selected');
    });
    card.classList.add('selected');
    selectedType = type;
    document.getElementById('selection-hint').textContent = hints[type];
    document.getElementById('btn-proceed').classList.add('ready');
  }

  function confirmSelection() {
    if (!selectedType) return;
    if (selectedType === 'symptom') {
      goToScreen('screen-form-simple');
    } else {
      goToScreen('screen-form-full');
    }
  }

  // Show first screen on load
  window.addEventListener('load', function() {
    var lookup = document.getElementById('screen-lookup');
    lookup.style.display = 'flex';
    lookup.classList.add('active');
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        lookup.classList.add('visible');
      });
    });
  });


  // ── Simple form stepper ─────────────────────────────────────────────────
  var spCurrent = 1;
  function spStep(n) {
    document.getElementById('sp-s' + spCurrent).classList.remove('active');
    spCurrent = n;
    document.getElementById('sp-s' + n).classList.add('active');
    document.getElementById('sp-fill').style.width = Math.round((n/4)*100) + '%';
    document.getElementById('sp-label').textContent = 'Step ' + n + ' of 4';
    window.scrollTo(0,0);
  }

  function spGetRadio(name) {
    var s = document.querySelector('input[name="' + name + '"]:checked');
    return s && s.nextElementSibling ? s.nextElementSibling.textContent.trim() : 'Not answered';
  }

  function spVal(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : '—';
  }

  function spBuildData() {
    var L = [];
    L.push('=== QUICK RELIEF PRE-CONSULTATION ===');
    L.push('Clinician: Dr. Priyanka Dhondaley | Bengaluru');
    L.push('Generated: ' + new Date().toLocaleString('en-IN'));
    L.push('Consultation type: Quick Relief Visit');
    L.push('');
    L.push('── PATIENT ──');
    L.push('Name: ' + spVal('sp-name'));
    L.push('Age: ' + spVal('sp-age'));
    L.push('Gender: ' + spVal('sp-gender'));
    L.push('Phone: ' + spVal('sp-phone'));
    L.push('Referred by: ' + spVal('sp-ref'));
    L.push('');
    L.push('── CHIEF CONCERN ──');
    L.push('Main complaint: ' + spVal('sp-complaint'));
    L.push('Duration: ' + spGetRadio('sp-dur'));
    L.push('Area affected: ' + spGetRadio('sp-area'));
    L.push('Pain / discomfort level: ' + spVal('sp-pain') + ' / 10');
    L.push('');
    L.push('── HEALTH BACKGROUND ──');
    L.push('Health conditions: ' + spVal('sp-conditions'));
    L.push('Medications / supplements: ' + spVal('sp-meds'));
    L.push('Allergies: ' + spVal('sp-allergies'));
    L.push('Previous dental treatment for this: ' + spGetRadio('sp-prev'));
    L.push('Previous treatment details: ' + spVal('sp-prev-detail'));
    L.push('');
    return L.join('\\n');
  }

  function spBuildPrompt(data, name) {
    return 'You are a clinical decision-support assistant specialising in functional dentistry. ' +
      'I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. ' +
      'I am about to see ' + name + ' for a focused Quick Relief consultation. ' +
      'Based on their brief intake below, generate a concise pre-consultation briefing with:\\n\\n' +
      '1. CHIEF CONCERN — Clinical read of their complaint in 2–3 sentences\\n' +
      '2. RED FLAGS — Any urgent or watch-level findings (max 4, colour coded: URGENT / WATCH / NOTE)\\n' +
      '3. FOCUS FOR TODAY — What to examine, what to look for, what to rule out (3–4 sentences)\\n' +
      '4. SAFETY CHECKS — Any allergy, medication, or health condition interactions to be aware of before treatment\\n' +
      '5. CHAIR-SIDE PROMPTS — 2–3 questions to ask this patient when they sit down\\n\\n' +
      'Keep it brief and action-focused — this is a targeted relief visit, not a full functional workup. ' +
      'After the briefing, produce a clean PDF using Python and reportlab in the same style as the functional dentistry briefings ' +
      '(forest green header, patient name band, colour-coded flags, readable in 30 seconds).\\n\\n' +
      'Patient intake:\\n\\n---\\n\\n' + data;
  }

  function spSubmit() {
    if (!document.getElementById('sp-consent-check').checked) {
      alert('Please tick the consent checkbox before submitting.');
      return;
    }
    var data = spBuildData();
    var name = spVal('sp-name') !== '—' ? spVal('sp-name') : 'this patient';
    var prompt = spBuildPrompt(data, name);

    document.getElementById('sp-prompt-text').textContent = prompt;
    document.getElementById('sp-data-text').textContent = data;
    document.getElementById('sp-sum-name').textContent = (name !== 'this patient' ? name : 'Patient') + ' — form submitted';
    document.getElementById('sp-sum-time').textContent = new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'});

    // Save to Supabase
    saveSimpleIntakeToSupabase({
      complaint: spVal('sp-complaint'),
      duration: spGetRadio('sp-dur'),
      area: spGetRadio('sp-area'),
      pain: spVal('sp-pain'),
      conditions: spVal('sp-conditions'),
      meds: spVal('sp-meds'),
      allergies: spVal('sp-allergies'),
      prev: spGetRadio('sp-prev'),
      prevDetail: spVal('sp-prev-detail'),
      sig: spVal('sp-sig'),
      date: spVal('sp-date')
    })

    document.getElementById('sp-steps').style.display = 'none';
    document.getElementById('sp-summary').classList.add('factive');
    window.scrollTo(0,0);
  }

  function spCopy(textId, btnId, label) {
    var text = document.getElementById(textId).textContent;
    function flash() {
      var btn = document.getElementById(btnId);
      btn.textContent = 'Copied ✓'; btn.classList.add('fdone');
      setTimeout(function() { btn.textContent = label; btn.classList.remove('fdone'); }, 2500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(flash).catch(function() { fbFallback(text, flash); });
    } else { fbFallback(text, flash); }
  }

  function fbFallback(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
    ta.setAttribute('readonly','');
    document.body.appendChild(ta);
    ta.select(); ta.setSelectionRange(0, ta.value.length);
    try { document.execCommand('copy'); cb(); } catch(e) { alert('Please copy manually: Ctrl+A then Ctrl+C'); }
    document.body.removeChild(ta);
  }

  function spReset() {
    if (!confirm('Clear and start over for a new patient?')) return;
    location.reload();
  }

  // ── Full form stepper ────────────────────────────────────────────────────
  var ffCurrent = 1;
  function ffStep(n) {
    document.getElementById('ff-s' + ffCurrent).classList.remove('active');
    ffCurrent = n;
    document.getElementById('ff-s' + n).classList.add('active');
    document.getElementById('ff-fill').style.width = Math.round((n/7)*100) + '%';
    document.getElementById('ff-label').textContent = 'Section ' + n + ' of 7';
    window.scrollTo(0,0);
  }

  function ffGetChecked(groupId) {
    var g = document.getElementById(groupId);
    if (!g) return 'None';
    var items = [];
    g.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) items.push(cb.nextElementSibling.textContent.trim());
    });
    return items.length ? items.join(', ') : 'None';
  }

  function ffGetRadio(name) {
    var s = document.querySelector('input[name="' + name + '"]:checked');
    return s && s.nextElementSibling ? s.nextElementSibling.textContent.trim() : 'Not answered';
  }

  function ffVal(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : '—';
  }

  function ffBuildData() {
    var L = [];
    L.push('=== FUNCTIONAL DENTISTRY PRE-CONSULTATION INTAKE ===');
    L.push('Clinician: Dr. Priyanka Dhondaley | Bengaluru');
    L.push('Generated: ' + new Date().toLocaleString('en-IN'));
    L.push('Consultation type: ' + (selectedType === 'both' ? 'Complete Visit' : 'Deep Dive'));
    L.push('');
    L.push('── PERSONAL INFORMATION ──');
    L.push('Name: ' + ffVal('ff-name'));
    L.push('Date of birth: ' + ffVal('ff-dob'));
    L.push('Age: ' + ffVal('ff-age'));
    L.push('Gender: ' + ffVal('ff-gender'));
    L.push('Phone: ' + ffVal('ff-phone'));
    L.push('Email: ' + ffVal('ff-email'));
    L.push('Address: ' + ffVal('ff-address'));
    L.push('Occupation: ' + ffVal('ff-occ'));
    L.push('Referred by: ' + ffVal('ff-ref'));
    L.push('');
    L.push('── CHIEF CONCERN & HEALTH GOALS ──');
    L.push('Main reason for consultation: ' + ffVal('ff-complaint'));
    L.push('Duration of concern: ' + ffGetRadio('ff-duration'));
    L.push('Previous treatment sought: ' + ffGetRadio('ff-prev-tx'));
    L.push('Previous treatment details: ' + ffVal('ff-prevtx-detail'));
    L.push('Short-term goal: ' + ffVal('ff-goal-short'));
    L.push('Long-term goal: ' + ffVal('ff-goal-long'));
    L.push('');
    L.push('── MEDICAL HISTORY ──');
    L.push('Current conditions: ' + ffGetChecked('ff-g-conditions'));
    L.push('Other conditions: ' + ffVal('ff-conditions-other'));
    L.push('Medications & supplements: ' + ffVal('ff-meds'));
    L.push('Drug allergies: ' + ffVal('ff-allergy-drug'));
    L.push('Material/metal allergies: ' + ffVal('ff-allergy-material'));
    L.push('Food allergies/intolerances: ' + ffVal('ff-allergy-food'));
    L.push('Surgical history: ' + ffVal('ff-surgeries'));
    L.push('Family history: ' + ffGetChecked('ff-g-family'));
    L.push('');
    L.push('── LIFESTYLE & NUTRITION ──');
    L.push('Diet type: ' + ffVal('ff-diet'));
    L.push('Meals per day: ' + ffVal('ff-meals'));
    L.push('Daily water intake: ' + ffVal('ff-water'));
    L.push('Diet habits: ' + ffGetChecked('ff-g-diet-habits'));
    L.push('Average sleep: ' + ffVal('ff-sleep-hrs'));
    L.push('Sleep quality: ' + ffVal('ff-sleep-qual'));
    L.push('Sleep symptoms: ' + ffGetChecked('ff-g-sleep'));
    L.push('Exercise frequency: ' + ffVal('ff-exercise'));
    L.push('Stress level: ' + ffVal('ff-stress') + '/10');
    L.push('Stress factors: ' + ffGetChecked('ff-g-stress'));
    L.push('Habits: ' + ffGetChecked('ff-g-habits'));
    L.push('');
    L.push('── DENTAL & ORAL HISTORY ──');
    L.push('Last dental visit: ' + ffVal('ff-last-visit'));
    L.push('Reason for last visit: ' + ffVal('ff-last-reason'));
    L.push('Current oral symptoms: ' + ffGetChecked('ff-g-oral-symptoms'));
    L.push('Brushing frequency: ' + ffVal('ff-brush'));
    L.push('Flossing frequency: ' + ffVal('ff-floss'));
    L.push('Toothpaste: ' + ffVal('ff-toothpaste'));
    L.push('Mouthwash: ' + ffVal('ff-mouthwash'));
    L.push('Extra hygiene tools: ' + ffGetChecked('ff-g-hygiene-extras'));
    L.push('Previous dental treatment: ' + ffGetChecked('ff-g-prev-dental'));
    L.push('Dental anxiety (0-10): ' + ffVal('ff-anxiety'));
    L.push('Past traumatic dental experience: ' + ffVal('ff-dental-trauma'));
    L.push('');
    L.push('── HORMONAL HEALTH & ENVIRONMENTAL EXPOSURE ──');
    L.push('Hormonal/reproductive: ' + ffGetChecked('ff-g-hormonal'));
    L.push('Hormonal oral changes: ' + ffVal('ff-hormonal-oral'));
    L.push('Environmental/toxic exposure: ' + ffGetChecked('ff-g-toxins'));
    L.push('Amalgam fillings: ' + ffVal('ff-amalgam'));
    L.push('Metal/material sensitivities: ' + ffVal('ff-metal-sensitivity'));
    L.push('Recent investigations: ' + ffVal('ff-recent-labs'));
    L.push('');
    return L.join('\\n');
  }

  function ffBuildPrompt(data, name) {
    return 'You are a clinical decision-support assistant specialising in functional dentistry. ' +
      'I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. ' +
      'I am about to see ' + name + ' and need a pre-consultation briefing based on their intake form.\\n\\n' +
      'Generate a structured clinical briefing and then produce it as a downloadable PDF. Use the following sections:\\n\\n' +
      '1. COMPLEXITY TIER — Rate as Low / Moderate / High / Complex with a one-line rationale\\n' +
      '2. CHIEF CONCERN — Clinical reframe of their presenting complaint in functional dentistry language (2-3 sentences)\\n' +
      '3. RED FLAGS — URGENT / WATCH / NOTE colour-coded list. Maximum 6 flags.\\n' +
      '4. SYSTEMIC DRIVERS — Which body systems are contributing to their oral health picture\\n' +
      '5. FOCUS AREAS FOR THIS CONSULT — What to examine carefully (3-5 sentences)\\n' +
      '6. SUGGESTED INVESTIGATIONS — Specific tests to consider ordering. Max 8.\\n' +
      '7. CHAIR-SIDE CONVERSATION PROMPTS — 3-4 open questions tailored to this patient\\n\\n' +
      'After the briefing, produce a clean PDF using Python and reportlab (forest green header, patient band, colour-coded flags).\\n\\n' +
      'Patient intake:\\n\\n---\\n\\n' + data;
  }

  function ffSubmit() {
    if (!document.getElementById('ff-consent-check').checked) {
      alert('Please tick the consent checkbox before submitting.');
      return;
    }
    var data = ffBuildData();
    var name = ffVal('ff-name') !== '—' ? ffVal('ff-name') : 'this patient';
    var prompt = ffBuildPrompt(data, name);

    document.getElementById('ff-prompt-text').textContent = prompt;
    document.getElementById('ff-data-text').textContent = data;
    document.getElementById('ff-sum-name').textContent = (name !== 'this patient' ? name : 'Patient') + ' — intake submitted';
    document.getElementById('ff-sum-time').textContent = new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'});

    // Save to Supabase
    saveFullIntakeToSupabase({
      complaint: ffVal('ff-complaint'),
      duration: ffGetRadio('ff-duration'),
      goalShort: ffVal('ff-goal-short'),
      goalLong: ffVal('ff-goal-long'),
      meds: ffVal('ff-meds'),
      allergyDrug: ffVal('ff-allergy-drug'),
      allergyFood: ffVal('ff-allergy-food'),
      sleepHrs: ffVal('ff-sleep-hrs'),
      sleepQual: ffVal('ff-sleep-qual'),
      stress: ffVal('ff-stress'),
      brush: ffVal('ff-brush'),
      floss: ffVal('ff-floss'),
      anxiety: ffVal('ff-anxiety'),
      amalgam: ffVal('ff-amalgam'),
      sig: ffVal('ff-sig'),
      date: ffVal('ff-sig-date')
    })

    document.getElementById('ff-steps').style.display = 'none';
    document.getElementById('ff-summary').classList.add('factive');
    window.scrollTo(0,0);
  }

  function ffCopy(textId, btnId, label) { spCopy(textId, btnId, label); }

  function ffReset() {
    if (!confirm('Clear and start over for a new patient?')) return;
    location.reload();
  }


  // ── Simple symptom consultation form ──────────────────────────────────────
  var seCurrent = 1;

  function seStep(n) {
    document.getElementById('se-s' + seCurrent).classList.remove('active');
    seCurrent = n;
    document.getElementById('se-s' + n).classList.add('active');
    document.getElementById('se-fill').style.width = Math.round((n/4)*100) + '%';
    document.getElementById('se-label').textContent = 'Section ' + n + ' of 4';
    window.scrollTo(0,0);
  }

  function seVal(id) {
    var el = document.getElementById(id); return el && el.value.trim() ? el.value.trim() : '—';
  }

  function seGetChecked(groupId) {
    var g = document.getElementById(groupId);
    if (!g) return 'None';
    var items = [];
    g.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) items.push(cb.nextElementSibling.textContent.trim());
    });
    return items.length ? items.join(', ') : 'None';
  }

  function seGetAllChecked(stepId) {
    var step = document.getElementById(stepId);
    if (!step) return [];
    var results = [];
    step.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb) {
      var divider = cb.closest('.fsection').querySelector('.fdivider');
      // Find nearest preceding divider
      var allDividers = Array.from(cb.closest('.fsection').querySelectorAll('.fdivider'));
      var preceding = null;
      allDividers.forEach(function(d) {
        if (d.compareDocumentPosition(cb) & Node.DOCUMENT_POSITION_FOLLOWING) preceding = d;
      });
      var label = preceding ? preceding.textContent.trim() : 'Selected';
      var text = cb.nextElementSibling ? cb.nextElementSibling.textContent.trim() : '';
      results.push(label + ': ' + text);
    });
    return results;
  }

  function seBuildSummary() {
    var L = [];
    L.push('=== SYMPTOM-BASED CONSULTATION RECORD ===');
    L.push('Clinician: Dr. Priyanka Dhondaley | Bengaluru');
    L.push('Date: ' + new Date().toLocaleString('en-IN'));
    L.push('');
    L.push('── PATIENT ──');
    L.push('Name: ' + seVal('se-name'));
    L.push('Age: ' + seVal('se-age'));
    L.push('Date: ' + seVal('se-date'));
    L.push('File no.: ' + seVal('se-file'));
    L.push('Consultation type: ' + seVal('se-type'));
    L.push('');
    L.push('── CHIEF COMPLAINT ──');
    L.push('Complaint: ' + seVal('se-complaint'));
    L.push('Duration: ' + seVal('se-duration'));
    L.push('Pain score: ' + seVal('se-pain') + ' / 10');

    // Pain character checkboxes
    var painChars = [];
    document.querySelectorAll('#se-s1 input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) painChars.push(cb.nextElementSibling.textContent.trim());
    });
    if (painChars.length) L.push('Pain character: ' + painChars.join(', '));
    L.push('');

    L.push('── CLINICAL FINDINGS ──');
    L.push('Tooth/teeth: ' + seVal('se-tooth'));
    L.push('Vitality test: ' + seVal('se-vitality'));
    L.push('Percussion: ' + seVal('se-percussion'));
    L.push('Palpation: ' + seVal('se-palpation'));
    L.push('Probing depths: ' + seVal('se-probing'));
    L.push('Bleeding on probing: ' + seVal('se-bop'));
    L.push('Gingival status: ' + seVal('se-gingiva'));
    L.push('Mobility: ' + seVal('se-mobility'));
    L.push('Radiograph taken: ' + seVal('se-xray-type'));
    L.push('Radiographic findings: ' + seVal('se-xray-findings'));
    L.push('Radiographic notes: ' + seVal('se-xray-notes'));
    L.push('Caries: ' + seVal('se-caries'));
    L.push('Existing restoration: ' + seVal('se-restoration'));
    L.push('Clinical notes: ' + seVal('se-clinical-notes'));
    L.push('');

    L.push('── DIAGNOSIS & TREATMENT ──');
    L.push('Diagnosis: ' + seVal('se-diagnosis'));
    L.push('Diagnosis notes: ' + seVal('se-diagnosis-notes'));
    L.push('Treatment provided: ' + seGetChecked('se-g-tx'));
    L.push('Treatment notes: ' + seVal('se-tx-notes'));
    L.push('Prescription: ' + seVal('se-rx'));
    L.push('Further treatment needed: ' + seVal('se-next-tx'));
    L.push('');

    L.push('── PATIENT COMMUNICATION ──');
    L.push('Diagnosis explained: ' + seVal('se-explained'));
    L.push('Home care advice: ' + seVal('se-homecare'));

    var postop = [];
    document.querySelectorAll('#se-s4 input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) postop.push(cb.nextElementSibling.textContent.trim());
    });
    if (postop.length) L.push('Post-op instructions given: ' + postop.join(', '));

    L.push('Next appointment: ' + seVal('se-next-appt'));
    L.push('Recall interval: ' + seVal('se-recall'));
    L.push('');
    L.push('Clinician: Dr. Priyanka Dhondaley');
    L.push('Date signed: ' + seVal('se-sign-date'));

    return L.join('\\n');
  }

  function seSubmit() {
    var summary = seBuildSummary();
    var patientName = seVal('se-name');

    var prompt = 'You are a clinical decision-support assistant specialising in functional dentistry. ' +
      'I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. ' +
      'I have just completed a symptom-based consultation for ' + patientName + '. ' +
      'Based on the consultation record below, generate a concise Treatment Summary Report with:\\n\\n' +
      '1. DIAGNOSIS SUMMARY — Confirm and briefly explain the working diagnosis in plain language\\n' +
      '2. TREATMENT PROVIDED — What was done today and why\\n' +
      '3. NEXT STEPS — What needs to happen next, in priority order\\n' +
      '4. PATIENT INSTRUCTIONS — Key home care points for this patient\\n' +
      '5. WATCH FOR — Signs that would indicate the patient needs to return urgently\\n\\n' +
      'Keep it concise — this is a symptom-based visit, not a full functional workup. ' +
      'After the report, produce a clean PDF using Python and reportlab ' +
      '(forest green header, patient name band, clean sections, clinician copy). ' +
      'Consultation record:\\n\\n---\\n\\n' + summary;

    document.getElementById('se-summary-text').textContent = prompt;
    document.getElementById('se-saved-name').textContent =
      (patientName !== '—' ? patientName : 'Patient') + ' — record complete';
    document.getElementById('se-saved-time').textContent =
      new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'});

    // Save to Supabase
    saveSimpleExamToSupabase({
      complaint: seVal('se-complaint'),
      pain: seVal('se-pain'),
      diagnosis: seVal('se-diagnosis'),
      rx: seVal('se-rx'),
      nextTx: seVal('se-next-tx'),
      nextAppt: seVal('se-next-appt')
    })

    document.getElementById('se-steps').style.display = 'none';
    document.getElementById('se-saved').classList.add('factive');
    window.scrollTo(0,0);
  }

  function seCopy() {
    var text = document.getElementById('se-summary-text').textContent;
    function flash() {
      var btn = document.getElementById('se-copy-btn');
      btn.textContent = 'Copied ✓'; btn.classList.add('fdone');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('fdone'); }, 2500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(flash).catch(function() { fbFallback(text, flash); });
    } else { fbFallback(text, flash); }
  }

  function seReset() {
    if (!confirm('Clear and start a new consultation record?')) return;
    location.reload();
  }


  // ── Full functional exam form (xe prefix) ──────────────────────────────────
  var xeCurrent = 1;

  function xeStep(n) {
    document.getElementById('xe-s' + xeCurrent).classList.remove('active');
    xeCurrent = n;
    document.getElementById('xe-s' + n).classList.add('active');
    document.getElementById('xe-fill').style.width = Math.round((n/6)*100) + '%';
    document.getElementById('xe-label').textContent = 'Section ' + n + ' of 6';
    window.scrollTo(0,0);
  }

  // Build muscle palpation table for xe form
  (function() {
    var muscles = ['Masseter','Temporalis (anterior)','Temporalis (posterior)',
      'Medial pterygoid','Lateral pterygoid','Sternocleidomastoid','Trapezius','Digastric'];
    var opts = '<option value="">—</option><option>NT</option><option>0 — no pain</option>' +
               '<option>1 — mild</option><option>2 — moderate</option><option>3 — severe</option>';
    var container = document.getElementById('xe-muscle-rows');
    if (!container) return;
    muscles.forEach(function(m, i) {
      var row = document.createElement('div');
      row.style.cssText = 'display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;align-items:center;margin-bottom:6px;';
      row.innerHTML = '<span style="font-family:var(--sans);font-size:13px;color:var(--ink);">' + m + '</span>' +
        '<select id="xe-muscle-r-' + i + '" style="font-family:var(--sans);font-size:12px;padding:5px 7px;border:0.5px solid var(--sand);border-radius:8px;background:var(--cream);color:var(--ink);width:100%;outline:none;-webkit-appearance:none;">' + opts + '</select>' +
        '<select id="xe-muscle-l-' + i + '" style="font-family:var(--sans);font-size:12px;padding:5px 7px;border:0.5px solid var(--sand);border-radius:8px;background:var(--cream);color:var(--ink);width:100%;outline:none;-webkit-appearance:none;">' + opts + '</select>';
      container.appendChild(row);
    });
  })();

  function xeVal(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : '—';
  }

  function xeGetChecked(groupId) {
    var g = document.getElementById(groupId);
    if (!g) return 'None';
    var items = [];
    g.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) items.push(cb.nextElementSibling.textContent.trim());
    });
    return items.length ? items.join(', ') : 'None';
  }

  function xeGetMuscles() {
    var muscles = ['Masseter','Temporalis (anterior)','Temporalis (posterior)',
      'Medial pterygoid','Lateral pterygoid','Sternocleidomastoid','Trapezius','Digastric'];
    var lines = [];
    muscles.forEach(function(m, i) {
      var r = document.getElementById('xe-muscle-r-' + i);
      var l = document.getElementById('xe-muscle-l-' + i);
      if (r && l && (r.value || l.value)) {
        lines.push(m + ': R=' + (r.value||'—') + ' / L=' + (l.value||'—'));
      }
    });
    return lines.length ? lines.join('; ') : '—';
  }

  function xeBuildData() {
    var L = [];
    L.push('=== FUNCTIONAL DENTISTRY CLINICAL EXAMINATION RECORD ===');
    L.push('Clinician: Dr. Priyanka Dhondaley | Bengaluru');
    L.push('Generated: ' + new Date().toLocaleString('en-IN'));
    L.push('');
    L.push('── PATIENT IDENTIFICATION ──');
    L.push('Patient name: ' + xeVal('xe-name'));
    L.push('File number: ' + xeVal('xe-id'));
    L.push('Examination date: ' + xeVal('xe-date'));
    L.push('Consultation type: ' + xeVal('xe-type'));
    L.push('Referral source: ' + xeVal('xe-ref'));
    L.push('');
    L.push('── EXTRAORAL EXAMINATION ──');
    L.push('Facial symmetry: ' + xeVal('xe-symmetry'));
    L.push('Facial profile: ' + xeVal('xe-profile'));
    L.push('Vertical face height: ' + xeVal('xe-vfh'));
    L.push('Facial muscle tone: ' + xeVal('xe-muscle-tone'));
    L.push('Airway / breathing signs: ' + xeGetChecked('xe-g-airway'));
    L.push('Airway questionnaire score: ' + xeVal('xe-airway-score'));
    L.push('Lymph nodes: ' + xeGetChecked('xe-g-lymph'));
    L.push('Max mouth opening: ' + xeVal('xe-mmo') + ' mm');
    L.push('Opening pattern: ' + xeVal('xe-opening'));
    L.push('TMJ sounds — right: ' + xeVal('xe-tmj-r'));
    L.push('TMJ sounds — left: ' + xeVal('xe-tmj-l'));
    L.push('Muscle palpation: ' + xeGetMuscles());
    L.push('Skin / nutritional clues: ' + xeGetChecked('xe-g-skin'));
    L.push('Extraoral notes: ' + xeVal('xe-extraoral-notes'));
    L.push('');
    L.push('── INTRAORAL EXAMINATION ──');
    L.push('Lips: ' + xeVal('xe-lips'));
    L.push('Buccal mucosa: ' + xeVal('xe-buccal'));
    L.push('Tongue size: ' + xeVal('xe-tongue-size'));
    L.push('Tongue posture: ' + xeVal('xe-tongue-posture'));
    L.push('Tongue dorsum: ' + xeVal('xe-tongue-dorsum'));
    L.push('Frenulum: ' + xeVal('xe-frenulum'));
    L.push('Hard palate: ' + xeVal('xe-palate'));
    L.push('Soft palate / oropharynx: ' + xeVal('xe-oropharynx'));
    L.push('Floor of mouth: ' + xeVal('xe-floor'));
    L.push('Salivary flow: ' + xeVal('xe-saliva'));
    L.push('Halitosis: ' + xeVal('xe-halitosis') + ' — origin: ' + xeVal('xe-halitosis-origin'));
    L.push('Oral microbiome test: ' + xeVal('xe-microbiome'));
    L.push('Salivary pH: ' + xeVal('xe-ph'));
    L.push('BPE / Periodontal score: ' + xeVal('xe-bpe'));
    L.push('Bleeding on probing: ' + xeVal('xe-bop'));
    L.push('Furcation involvement: ' + xeVal('xe-furcation'));
    L.push('Recession: ' + xeVal('xe-recession'));
    L.push('Bone loss (radiographic): ' + xeVal('xe-bone-loss'));
    L.push('Periodontal staging: ' + xeVal('xe-perio-stage'));
    L.push('Nutritional oral clues: ' + xeGetChecked('xe-g-nutrition'));
    L.push('Intraoral notes: ' + xeVal('xe-intraoral-notes'));
    L.push('');
    L.push('── DENTAL STATUS & OCCLUSION ──');
    L.push('Teeth present: ' + xeVal('xe-teeth-count'));
    L.push('Missing teeth: ' + xeVal('xe-missing'));
    L.push('Caries activity: ' + xeVal('xe-caries'));
    L.push('Caries risk: ' + xeVal('xe-caries-risk'));
    L.push('Existing restorations: ' + xeVal('xe-restorations'));
    L.push('Existing implants: ' + xeVal('xe-implants'));
    L.push('Wear type: ' + xeVal('xe-wear-type') + ' | Severity: ' + xeVal('xe-wear-sev'));
    L.push('BEWE score: ' + xeVal('xe-bewe'));
    L.push('Wear aetiology: ' + xeVal('xe-wear-cause'));
    L.push("Angle's classification: " + xeVal('xe-angles'));
    L.push('Overjet: ' + xeVal('xe-overjet') + ' mm | Overbite: ' + xeVal('xe-overbite') + ' mm');
    L.push('Crossbite: ' + xeVal('xe-crossbite'));
    L.push('Upper arch: ' + xeVal('xe-arch-upper') + ' | Lower arch: ' + xeVal('xe-arch-lower'));
    L.push('Tongue space: ' + xeVal('xe-tongue-space'));
    L.push('Bruxism / parafunction: ' + xeVal('xe-bruxism'));
    L.push('Dental notes: ' + xeVal('xe-dental-notes'));
    L.push('');
    L.push('── INVESTIGATIONS & FUNCTIONAL MATRIX ──');
    L.push('Radiographs taken: ' + xeVal('xe-xrays'));
    L.push('Previous radiographs: ' + xeVal('xe-prev-xray'));
    L.push('Radiographic findings: ' + xeVal('xe-xray-findings'));
    L.push('Labs ordered: ' + xeGetChecked('xe-g-labs'));
    L.push('Other investigations: ' + xeVal('xe-other-labs'));
    L.push('Functional drivers identified: ' + xeGetChecked('xe-g-drivers'));
    L.push('Referrals indicated: ' + xeGetChecked('xe-g-referrals'));
    L.push('');
    L.push('── CLINICAL SUMMARY & CARE PLAN ──');
    L.push('Primary diagnosis: ' + xeVal('xe-primary-dx'));
    L.push('Secondary diagnoses: ' + xeVal('xe-secondary-dx'));
    L.push('Antecedents: ' + xeVal('xe-antecedents'));
    L.push('Triggers: ' + xeVal('xe-triggers'));
    L.push('Mediators: ' + xeVal('xe-mediators'));
    L.push('Phase 1 — Stabilisation: ' + xeVal('xe-phase1'));
    L.push('Phase 2 — Root-cause: ' + xeVal('xe-phase2'));
    L.push('Phase 3 — Restorative: ' + xeVal('xe-phase3'));
    L.push('Phase 4 — Maintenance: ' + xeVal('xe-phase4'));
    L.push('Patient communication: ' + xeVal('xe-communication'));
    L.push('Next appointment: ' + xeVal('xe-next-appt'));
    L.push('Date signed: ' + xeVal('xe-sign-date'));
    return L.join('\\n');
  }

  function xeBuildPrompt(data, name) {
    return 'You are a clinical decision-support assistant specialising in functional dentistry. ' +
      'I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. ' +
      'I have just completed a clinical examination for ' + name + '. ' +
      'Based on the full examination record below, generate a structured Treatment Planning Report.\\n\\n' +
      'The report must include:\\n\\n' +
      '1. CLINICAL SUMMARY — A concise 3–4 sentence overview of the key clinical findings and overall health picture.\\n\\n' +
      '2. PRIORITY PROBLEM LIST — Rank all identified problems from most to least urgent. For each:\\n' +
      '   - State the problem clearly\\n' +
      '   - Explain why it is at this priority level\\n' +
      '   - List 2–3 specific treatment options with brief pros/cons\\n\\n' +
      '3. PHASED TREATMENT PLAN:\\n' +
      '   Phase 1: Stabilisation & urgent care (within 1–2 visits)\\n' +
      '   Phase 2: Root-cause & systemic intervention (weeks 2–8)\\n' +
      '   Phase 3: Definitive restorative / rehabilitative care\\n' +
      '   Phase 4: Maintenance, recall & monitoring\\n\\n' +
      '4. FUNCTIONAL & SYSTEMIC FOCUS — Systemic or lifestyle interventions to run alongside dental treatment. Include specific nutrition, lifestyle, supplement, or referral recommendations.\\n\\n' +
      '5. PATIENT COMMUNICATION NOTES — How to explain the plan to this specific patient. Key messages, likely questions, and potential barriers to compliance.\\n\\n' +
      '6. RECALL & MONITORING SCHEDULE — Recommended recall interval, what to reassess, follow-up tests.\\n\\n' +
      'Be specific to the clinical findings. Do not be generic. After the report, produce a clean PDF using Python and reportlab ' +
      '(forest green header, patient name band, colour-coded priority levels HIGH/MODERATE/LOW, readable in under 2 minutes).\\n\\n' +
      'Clinical examination record:\\n\\n---\\n\\n' + data;
  }

  function xeSubmit() {
    var data = xeBuildData();
    var name = xeVal('xe-name') !== '—' ? xeVal('xe-name') : 'this patient';
    var prompt = xeBuildPrompt(data, name);

    document.getElementById('xe-prompt-text').textContent = prompt;
    document.getElementById('xe-data-text').textContent = data;
    document.getElementById('xe-sum-name').textContent =
      (name !== 'this patient' ? name : 'Patient') + ' — examination submitted';
    document.getElementById('xe-sum-time').textContent =
      new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'});

    // Save to Supabase
    saveFullExamToSupabase({
      primaryDx: xeVal('xe-primary-dx'),
      secondaryDx: xeVal('xe-secondary-dx'),
      phase1: xeVal('xe-phase1'),
      phase2: xeVal('xe-phase2'),
      phase3: xeVal('xe-phase3'),
      phase4: xeVal('xe-phase4'),
      nextAppt: xeVal('xe-next-appt')
    })

    document.getElementById('xe-steps').style.display = 'none';
    document.getElementById('xe-summary').classList.add('factive');
    window.scrollTo(0,0);
  }

  function xeCopy(textId, btnId, label) { spCopy(textId, btnId, label); }

  function xeReset() {
    if (!confirm('Clear and start a new examination record?')) return;
    location.reload();
  }`
      document.body.appendChild(appScript)
    }
    document.head.appendChild(supaScript)

    return () => {
      // Cleanup on unmount
      document.getElementById('welcome-styles')?.remove()
      document.getElementById('welcome-script')?.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: `<!-- ══ SCREEN 0 — FILE NUMBER LOOKUP ══ -->
<div class="screen active" id="screen-lookup">
  <div class="lookup-card">
    <div class="lookup-title">Welcome</div>
    <div class="lookup-sub">
      Your care team has registered you.<br>
      Please enter your file number to begin.
    </div>
    <label class="lookup-label">Your file number</label>
    <input
      class="lookup-input"
      id="lookup-file-input"
      type="text"
      placeholder="e.g. FD-470196"
      oninput="lookupFileNumber(this.value)"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="characters"
      spellcheck="false"
    />
    <div class="lookup-error" id="lookup-error"></div>
    <div class="lookup-patient-found" id="lookup-patient-box">
      <div class="lookup-patient-name" id="lookup-patient-name"></div>
      <div class="lookup-patient-meta" id="lookup-patient-meta"></div>
    </div>
    <button class="btn-lookup" id="lookup-btn" onclick="confirmLookup()" disabled>
      Begin →
    </button>
    <button class="btn-skip-lookup" onclick="skipLookup()">
      Skip — walk-in patient
    </button>
  </div>
</div>

<!-- ══ SCREEN 1 — WELCOME ══ -->
<div class="screen" id="screen-welcome">
  <div class="leaf leaf-1"></div>
  <div class="leaf leaf-2"></div>
  <div class="leaf leaf-3"></div>
  <div class="leaf leaf-4"></div>
  <div class="leaf leaf-5"></div>
  <div class="leaf leaf-6"></div>

  <div class="welcome-content">
    <div class="welcome-monogram">P</div>
    <div class="welcome-eyebrow">Dr. Priyanka Dhondaley · Bengaluru</div>
    <h1 class="welcome-headline">
      You are in<br><em>good hands.</em>
    </h1>
    <p class="welcome-subline">Welcome to a different kind of dental care.</p>

    <div class="welcome-quote">
      <p>"Your mouth is not separate from your body.<br>It is a window into your whole health."</p>
      <span>— Functional Dentistry</span>
    </div>

  </div>

  <!-- Button pinned to bottom centre -->
  <div style="position:relative;z-index:2;text-align:center;padding-bottom:0.5rem;">
    <button class="btn-begin" onclick="goToScreen('screen-about')" style="opacity:0;animation:fade-up 0.9s cubic-bezier(0.22,1,0.36,1) 1.1s forwards;">
      Begin your visit
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</div>


<!-- ══ SCREEN 2 — ABOUT FUNCTIONAL DENTISTRY ══ -->
<div class="screen" id="screen-about">
  <button class="btn-back" onclick="goToScreen('screen-welcome')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    Back
  </button>
  <div class="about-layout">

    <div class="about-visual">
      <div class="orbit-scene">

        <!-- Spinning rings (decorative) -->
        <div class="orbit-ring orbit-ring-1"></div>
        <div class="orbit-ring orbit-ring-2"></div>
        <div class="orbit-ring orbit-ring-3"></div>

        <!-- Fixed orbit nodes — placed at clock positions around centre (180px,180px) -->
        <!-- Nutrition: top centre (ring 2, 12 o'clock) -->
        <div class="orbit-node" style="left:180px; top:35px;">
          <div class="orbit-node-dot">🌿</div>
          <div class="orbit-node-label">Nutrition</div>
        </div>

        <!-- Airway: right (ring 1, 3 o'clock) -->
        <div class="orbit-node" style="left:275px; top:180px;">
          <div class="orbit-node-dot">🫁</div>
          <div class="orbit-node-label">Airway</div>
        </div>

        <!-- Microbiome: bottom right (ring 2, 4:30 o'clock) -->
        <div class="orbit-node" style="left:282px; top:282px;">
          <div class="orbit-node-dot">🧬</div>
          <div class="orbit-node-label">Microbiome</div>
        </div>

        <!-- Stress: bottom left (ring 1, 7:30 o'clock) -->
        <div class="orbit-node" style="left:85px; top:260px;">
          <div class="orbit-node-dot">🧠</div>
          <div class="orbit-node-label">Stress</div>
        </div>

        <!-- Systemic conditions: left (ring 2, 9 o'clock) -->
        <div class="orbit-node" style="left:58px; top:130px;">
          <div class="orbit-node-dot">🫀</div>
          <div class="orbit-node-label">Systemic Conditions</div>
        </div>

        <!-- Central glow -->
        <div class="central-glow"></div>

        <!-- Proper SVG tooth at centre -->
        <div class="tooth-svg-wrap">
          <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAQABAADASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAQFAgMBBggHCf/EAFQQAQACAQIDAwgGBgYGBggHAAABAgMEEQUSIQYxQQcTIjJRYXGBCBSRobHBFSMzUnKCQmKSosLRJDRDsuHwFiU1Y3OTFzdEU1R0w/E2VYSUs9Li/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EACsRAQACAgICAQMEAwADAQAAAAABAgMRITEEEkETIjIzQlFhBRRxFVJigf/aAAwDAQACEQMRAD8A+FAOV5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=" alt="tooth" style="width:100%;display:block;border-radius:50%;" />
        </div>

      </div>
    </div>

    <div class="about-text">
      <div class="about-eyebrow">What is functional dentistry?</div>
      <h2 class="about-headline">
        We treat the<br><em>reason</em>, not just<br>the result.
      </h2>
      <p class="about-lead">
        Every cavity, every aching jaw, every bleeding gum has a story behind it. Conventional dentistry treats what it can see. Functional dentistry asks why.
      </p>

      <div class="about-points">
        <div class="about-point">
          <div class="point-icon">🔍</div>
          <div class="point-text">
            <strong>Root cause thinking</strong>
            <p>We look at your diet, sleep, stress, gut health, and hormones — because your teeth reflect your whole body.</p>
          </div>
        </div>
        <div class="about-point">
          <div class="point-icon">🤝</div>
          <div class="point-text">
            <strong>Your body, connected</strong>
            <p>Gum disease is linked to heart health. Jaw tension connects to your nervous system. Nothing in the mouth exists in isolation.</p>
          </div>
        </div>
        <div class="about-point">
          <div class="point-icon">🌱</div>
          <div class="point-text">
            <strong>Long-term, not just today</strong>
            <p>We build care that lasts — so problems don't keep coming back year after year.</p>
          </div>
        </div>
      </div>

      <div class="vs-strip">
        <div class="vs-col conventional">
          <div class="vs-col-label">Conventional dentistry</div>
          <div class="vs-item"><span class="vs-dot"></span> Cavity found → filled</div>
          <div class="vs-item"><span class="vs-dot"></span> Gum disease → cleaned</div>
          <div class="vs-item"><span class="vs-dot"></span> Tooth pain → treated</div>
          <div class="vs-item"><span class="vs-dot"></span> Come back next year</div>
        </div>
        <div class="vs-col functional">
          <div class="vs-col-label">Functional dentistry</div>
          <div class="vs-item"><span class="vs-dot"></span> Why do cavities keep forming?</div>
          <div class="vs-item"><span class="vs-dot"></span> What's driving the inflammation?</div>
          <div class="vs-item"><span class="vs-dot"></span> What is the body trying to tell us?</div>
          <div class="vs-item"><span class="vs-dot"></span> Build health that holds</div>
        </div>
      </div>

      <button class="btn-continue" onclick="goToScreen('screen-choice')">
        Choose your consultation
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

  </div>
</div>


<!-- ══ SCREEN 3 — CONSULTATION CHOICE ══ -->
<div class="screen" id="screen-choice">
  <button class="btn-back" onclick="goToScreen('screen-about')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    Back
  </button>
  <div class="choice-inner">

    <div class="choice-header">
      <div class="choice-eyebrow">Before we begin</div>
      <h2 class="choice-headline">
        What would you like<br>from today's visit?
      </h2>
      <p class="choice-sub">There's no right or wrong answer. This is your consultation — you choose how deep you'd like to go.</p>
    </div>

    <div class="choice-grid" style="grid-template-columns: 1fr 1fr; max-width: 620px; margin: 0 auto;">

      <!-- Card 1: Quick Relief -->
      <div class="choice-card symptom" onclick="selectCard(this, 'symptom')">
        <div class="card-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="card-icon-wrap">🩹</div>
        <div class="card-tag">Quick Relief</div>
        <div class="card-title">Fix what's bothering me today</div>
        <p class="card-desc">Something is hurting or worrying you and you want it sorted. We focus entirely on your concern, give you relief, and tell you what to do next.</p>
        <div class="card-includes">
          <div class="card-includes-label">What happens</div>
          <div class="card-include-item"><span class="include-dot"></span> We examine the specific problem</div>
          <div class="card-include-item"><span class="include-dot"></span> You get immediate care or a clear plan</div>
          <div class="card-include-item"><span class="include-dot"></span> Focused and efficient</div>
        </div>
        <div style="margin-top:1rem;font-family:var(--serif);font-size:11.5px;font-style:italic;color:var(--ink-lt);line-height:1.5;">
          Best if you have a specific pain or concern to address today.
        </div>
      </div>

      <!-- Card 2: The Full Picture — RECOMMENDED -->
      <div class="choice-card both" onclick="selectCard(this, 'both')" style="position:relative;">
        <div style="position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:var(--gold);color:white;font-family:var(--sans);font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:4px 14px;border-radius:0 0 8px 8px;white-space:nowrap;">
          ✦ Recommended
        </div>
        <div class="card-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="card-icon-wrap" style="margin-top:1.25rem;">🌿</div>
        <div class="card-tag">The Full Picture</div>
        <div class="card-title">Fix it &amp; find the root cause</div>
        <p class="card-desc">We take care of what's bothering you today <em>and</em> do a full health assessment to understand why it started — so we can keep you healthy long-term.</p>
        <div class="card-includes">
          <div class="card-includes-label">What happens</div>
          <div class="card-include-item"><span class="include-dot"></span> Immediate care for your concern</div>
          <div class="card-include-item"><span class="include-dot"></span> Full body-mouth health assessment</div>
          <div class="card-include-item"><span class="include-dot"></span> A personalised long-term wellness plan</div>
        </div>
        <div style="margin-top:1rem;font-family:var(--serif);font-size:11.5px;font-style:italic;color:var(--ink-lt);line-height:1.5;">
          Best if you want to leave knowing the full picture.
        </div>
      </div>

    </div>

    <div class="choice-cta">
      <p class="selection-hint" id="selection-hint">Please choose one of the options above to continue.</p>
      <button class="btn-proceed" id="btn-proceed" onclick="confirmSelection()">
        Continue to intake form
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

  </div>
</div>


<!-- ══ SCREEN 4 — CONFIRMED ══ -->
<div class="screen" id="screen-confirmed">
  <button class="btn-back btn-back-light" onclick="goToScreen('screen-choice')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    Back
  </button>
  <div class="leaf leaf-1" style="opacity:0.07"></div>
  <div class="leaf leaf-3" style="opacity:0.07"></div>

  <div class="confirmed-content">
    <div class="confirmed-icon">🌿</div>
    <h2 class="confirmed-headline">
      Wonderful.<br>Let's <em>begin.</em>
    </h2>
    <div class="confirmed-selection" id="confirmed-badge">—</div>
    <p class="confirmed-message" id="confirmed-message">
      Your intake form is ready. Please take your time — there are no right or wrong answers. Everything you share helps Dr. Priyanka understand and support you better.
    </p>
    <p class="confirmed-next">A team member will hand you the intake form now.</p>
  </div>
</div>


<script>
  // ── Supabase connection ──────────────────────────────────────────────────
  const SUPA_URL = 'https://teqqwhvbkuudjmhxwgxo.supabase.co'
  const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcXF3aHZia3V1ZGptaHh3Z3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5Njg5NTAsImV4cCI6MjA5MzU0NDk1MH0.iE6LPe6SpMKciZyL8bZGzs-k6uQtTuoxGts-SVEXQmQ'
  const supa = window.supabase ? window.supabase.createClient(SUPA_URL, SUPA_KEY) : null

  // Current patient context (set by lookup)
  var currentPatient = null
  var lookupTimer = null

  // ── File number lookup ───────────────────────────────────────────────────
  function lookupFileNumber(val) {
    clearTimeout(lookupTimer)
    var v = val.trim().toUpperCase()
    document.getElementById('lookup-error').textContent = ''
    document.getElementById('lookup-patient-box').classList.remove('visible')
    document.getElementById('lookup-btn').disabled = true
    currentPatient = null

    if (v.length < 4) return

    lookupTimer = setTimeout(async function() {
      if (!supa) return
      var { data, error } = await supa
        .from('patients')
        .select('*')
        .ilike('file_number', v)
        .single()

      if (error || !data) {
        document.getElementById('lookup-error').textContent = 'File number not found. Check with reception.'
        return
      }

      currentPatient = data
      document.getElementById('lookup-patient-name').textContent = data.name
      document.getElementById('lookup-patient-meta').textContent =
        [data.age && 'Age ' + data.age, data.gender, data.occupation].filter(Boolean).join(' · ')
      document.getElementById('lookup-patient-box').classList.add('visible')
      document.getElementById('lookup-btn').disabled = false
      document.getElementById('lookup-error').textContent = ''

      // Auto-set consultation type from patient record
      if (data.consultation_type) {
        selectedType = data.consultation_type === 'quick_relief' ? 'symptom' : 'both'
      }
    }, 500)
  }

  function confirmLookup() {
    if (!currentPatient) return
    goToScreen('screen-welcome')
  }

  function skipLookup() {
    currentPatient = null
    goToScreen('screen-welcome')
  }

  // ── Save to Supabase ─────────────────────────────────────────────────────
  async function saveSimpleIntakeToSupabase(formData) {
    if (!supa || !currentPatient) return
    try {
      await supa.from('intake_simple').insert({
        patient_id: currentPatient.id,
        complaint: formData.complaint,
        duration: formData.duration,
        area_affected: formData.area,
        pain_score: parseInt(formData.pain) || null,
        health_conditions: formData.conditions,
        medications: formData.meds,
        allergies: formData.allergies,
        previous_treatment: formData.prev,
        previous_treatment_detail: formData.prevDetail,
        consent_signed: true,
        signature: formData.sig,
        raw_data: formData
      })
      console.log('Simple intake saved to Supabase')
    } catch(e) {
      console.error('Supabase save error:', e)
    }
  }

  async function saveFullIntakeToSupabase(formData) {
    if (!supa || !currentPatient) return
    try {
      await supa.from('intake_full').insert({
        patient_id: currentPatient.id,
        complaint: formData.complaint,
        duration: formData.duration,
        goal_short: formData.goalShort,
        goal_long: formData.goalLong,
        medications: formData.meds,
        allergy_drug: formData.allergyDrug,
        allergy_food: formData.allergyFood,
        sleep_hours: formData.sleepHrs,
        sleep_quality: formData.sleepQual,
        stress_level: parseInt(formData.stress) || null,
        brushing: formData.brush,
        flossing: formData.floss,
        anxiety_level: parseInt(formData.anxiety) || null,
        amalgam: formData.amalgam,
        consent_signed: true,
        signature: formData.sig,
        raw_data: formData
      })
      console.log('Full intake saved to Supabase')
    } catch(e) {
      console.error('Supabase save error:', e)
    }
  }

  async function saveSimpleExamToSupabase(formData) {
    if (!supa || !currentPatient) return
    try {
      await supa.from('examinations').insert({
        patient_id: currentPatient.id,
        exam_type: 'simple',
        chief_complaint: formData.complaint,
        pain_score: parseInt(formData.pain) || null,
        diagnosis: formData.diagnosis,
        prescription: formData.rx,
        further_treatment: formData.nextTx,
        next_appointment: formData.nextAppt,
        raw_data: formData
      })
      console.log('Exam saved to Supabase')
    } catch(e) {
      console.error('Supabase save error:', e)
    }
  }

  async function saveFullExamToSupabase(formData) {
    if (!supa || !currentPatient) return
    try {
      await supa.from('examinations').insert({
        patient_id: currentPatient.id,
        exam_type: 'full',
        primary_diagnosis: formData.primaryDx,
        secondary_diagnosis: formData.secondaryDx,
        phase1: formData.phase1,
        phase2: formData.phase2,
        phase3: formData.phase3,
        phase4: formData.phase4,
        next_appointment: formData.nextAppt,
        raw_data: formData
      })
      console.log('Full exam saved to Supabase')
    } catch(e) {
      console.error('Supabase save error:', e)
    }
  }


  var selectedType = null;

  var hints = {
    symptom:   'Perfect. We\\'ll focus completely on what\\'s bothering you today.',
    rootcause: 'Great choice. We\\'ll fix it and find out why it happened.',
    both:      'Great choice. You\\'ll leave knowing the full picture — today and long-term.'
  };

  var badges = {
    symptom:   'Quick Relief',
    rootcause: 'The Full Picture',
    both:      'The Full Picture'
  };

  var messages = {
    symptom:
      'Your intake form is ready. Please take your time — there are no right or wrong answers. ' +
      'Everything you share helps Dr. Priyanka understand and support you better today.',
    rootcause:
      'Your full intake form is ready. Please take your time — the more you share, the better Dr. Priyanka can understand and help you.',
    both:
      'Your complete intake form is ready. Take your time — you\\'re about to get the full picture of your health, inside and out.'
  };

  function goToScreen(id) {
    // Update badge if navigating to full form screens
    if ((id === 'screen-form-full' || id === 'screen-exam-full')) {
      var badge = document.getElementById('ff-badge');
      if (badge) badge.textContent = selectedType === 'both' ? 'The Complete Visit' : 'Deep Dive';
    }
    // Hide all screens immediately — no delay, no race condition
    document.querySelectorAll('.screen').forEach(function(s) {
      s.classList.remove('active', 'visible');
      s.style.display = 'none';
    });

    var target = document.getElementById(id);
    // Show the target screen
    target.style.display = 'flex';
    target.classList.add('active');

    // Trigger fade-in on the very next paint
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        target.classList.add('visible');
      });
    });

    window.scrollTo(0, 0);
  }

  function selectCard(card, type) {
    document.querySelectorAll('.choice-card').forEach(function(c) {
      c.classList.remove('selected');
    });
    card.classList.add('selected');
    selectedType = type;
    document.getElementById('selection-hint').textContent = hints[type];
    document.getElementById('btn-proceed').classList.add('ready');
  }

  function confirmSelection() {
    if (!selectedType) return;
    if (selectedType === 'symptom') {
      goToScreen('screen-form-simple');
    } else {
      goToScreen('screen-form-full');
    }
  }

  // Show first screen on load
  window.addEventListener('load', function() {
    var lookup = document.getElementById('screen-lookup');
    lookup.style.display = 'flex';
    lookup.classList.add('active');
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        lookup.classList.add('visible');
      });
    });
  });


  // ── Simple form stepper ─────────────────────────────────────────────────
  var spCurrent = 1;
  function spStep(n) {
    document.getElementById('sp-s' + spCurrent).classList.remove('active');
    spCurrent = n;
    document.getElementById('sp-s' + n).classList.add('active');
    document.getElementById('sp-fill').style.width = Math.round((n/4)*100) + '%';
    document.getElementById('sp-label').textContent = 'Step ' + n + ' of 4';
    window.scrollTo(0,0);
  }

  function spGetRadio(name) {
    var s = document.querySelector('input[name="' + name + '"]:checked');
    return s && s.nextElementSibling ? s.nextElementSibling.textContent.trim() : 'Not answered';
  }

  function spVal(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : '—';
  }

  function spBuildData() {
    var L = [];
    L.push('=== QUICK RELIEF PRE-CONSULTATION ===');
    L.push('Clinician: Dr. Priyanka Dhondaley | Bengaluru');
    L.push('Generated: ' + new Date().toLocaleString('en-IN'));
    L.push('Consultation type: Quick Relief Visit');
    L.push('');
    L.push('── PATIENT ──');
    L.push('Name: ' + spVal('sp-name'));
    L.push('Age: ' + spVal('sp-age'));
    L.push('Gender: ' + spVal('sp-gender'));
    L.push('Phone: ' + spVal('sp-phone'));
    L.push('Referred by: ' + spVal('sp-ref'));
    L.push('');
    L.push('── CHIEF CONCERN ──');
    L.push('Main complaint: ' + spVal('sp-complaint'));
    L.push('Duration: ' + spGetRadio('sp-dur'));
    L.push('Area affected: ' + spGetRadio('sp-area'));
    L.push('Pain / discomfort level: ' + spVal('sp-pain') + ' / 10');
    L.push('');
    L.push('── HEALTH BACKGROUND ──');
    L.push('Health conditions: ' + spVal('sp-conditions'));
    L.push('Medications / supplements: ' + spVal('sp-meds'));
    L.push('Allergies: ' + spVal('sp-allergies'));
    L.push('Previous dental treatment for this: ' + spGetRadio('sp-prev'));
    L.push('Previous treatment details: ' + spVal('sp-prev-detail'));
    L.push('');
    return L.join('\\n');
  }

  function spBuildPrompt(data, name) {
    return 'You are a clinical decision-support assistant specialising in functional dentistry. ' +
      'I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. ' +
      'I am about to see ' + name + ' for a focused Quick Relief consultation. ' +
      'Based on their brief intake below, generate a concise pre-consultation briefing with:\\n\\n' +
      '1. CHIEF CONCERN — Clinical read of their complaint in 2–3 sentences\\n' +
      '2. RED FLAGS — Any urgent or watch-level findings (max 4, colour coded: URGENT / WATCH / NOTE)\\n' +
      '3. FOCUS FOR TODAY — What to examine, what to look for, what to rule out (3–4 sentences)\\n' +
      '4. SAFETY CHECKS — Any allergy, medication, or health condition interactions to be aware of before treatment\\n' +
      '5. CHAIR-SIDE PROMPTS — 2–3 questions to ask this patient when they sit down\\n\\n' +
      'Keep it brief and action-focused — this is a targeted relief visit, not a full functional workup. ' +
      'After the briefing, produce a clean PDF using Python and reportlab in the same style as the functional dentistry briefings ' +
      '(forest green header, patient name band, colour-coded flags, readable in 30 seconds).\\n\\n' +
      'Patient intake:\\n\\n---\\n\\n' + data;
  }

  function spSubmit() {
    if (!document.getElementById('sp-consent-check').checked) {
      alert('Please tick the consent checkbox before submitting.');
      return;
    }
    var data = spBuildData();
    var name = spVal('sp-name') !== '—' ? spVal('sp-name') : 'this patient';
    var prompt = spBuildPrompt(data, name);

    document.getElementById('sp-prompt-text').textContent = prompt;
    document.getElementById('sp-data-text').textContent = data;
    document.getElementById('sp-sum-name').textContent = (name !== 'this patient' ? name : 'Patient') + ' — form submitted';
    document.getElementById('sp-sum-time').textContent = new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'});

    // Save to Supabase
    saveSimpleIntakeToSupabase({
      complaint: spVal('sp-complaint'),
      duration: spGetRadio('sp-dur'),
      area: spGetRadio('sp-area'),
      pain: spVal('sp-pain'),
      conditions: spVal('sp-conditions'),
      meds: spVal('sp-meds'),
      allergies: spVal('sp-allergies'),
      prev: spGetRadio('sp-prev'),
      prevDetail: spVal('sp-prev-detail'),
      sig: spVal('sp-sig'),
      date: spVal('sp-date')
    })

    document.getElementById('sp-steps').style.display = 'none';
    document.getElementById('sp-summary').classList.add('factive');
    window.scrollTo(0,0);
  }

  function spCopy(textId, btnId, label) {
    var text = document.getElementById(textId).textContent;
    function flash() {
      var btn = document.getElementById(btnId);
      btn.textContent = 'Copied ✓'; btn.classList.add('fdone');
      setTimeout(function() { btn.textContent = label; btn.classList.remove('fdone'); }, 2500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(flash).catch(function() { fbFallback(text, flash); });
    } else { fbFallback(text, flash); }
  }

  function fbFallback(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
    ta.setAttribute('readonly','');
    document.body.appendChild(ta);
    ta.select(); ta.setSelectionRange(0, ta.value.length);
    try { document.execCommand('copy'); cb(); } catch(e) { alert('Please copy manually: Ctrl+A then Ctrl+C'); }
    document.body.removeChild(ta);
  }

  function spReset() {
    if (!confirm('Clear and start over for a new patient?')) return;
    location.reload();
  }

  // ── Full form stepper ────────────────────────────────────────────────────
  var ffCurrent = 1;
  function ffStep(n) {
    document.getElementById('ff-s' + ffCurrent).classList.remove('active');
    ffCurrent = n;
    document.getElementById('ff-s' + n).classList.add('active');
    document.getElementById('ff-fill').style.width = Math.round((n/7)*100) + '%';
    document.getElementById('ff-label').textContent = 'Section ' + n + ' of 7';
    window.scrollTo(0,0);
  }

  function ffGetChecked(groupId) {
    var g = document.getElementById(groupId);
    if (!g) return 'None';
    var items = [];
    g.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) items.push(cb.nextElementSibling.textContent.trim());
    });
    return items.length ? items.join(', ') : 'None';
  }

  function ffGetRadio(name) {
    var s = document.querySelector('input[name="' + name + '"]:checked');
    return s && s.nextElementSibling ? s.nextElementSibling.textContent.trim() : 'Not answered';
  }

  function ffVal(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : '—';
  }

  function ffBuildData() {
    var L = [];
    L.push('=== FUNCTIONAL DENTISTRY PRE-CONSULTATION INTAKE ===');
    L.push('Clinician: Dr. Priyanka Dhondaley | Bengaluru');
    L.push('Generated: ' + new Date().toLocaleString('en-IN'));
    L.push('Consultation type: ' + (selectedType === 'both' ? 'Complete Visit' : 'Deep Dive'));
    L.push('');
    L.push('── PERSONAL INFORMATION ──');
    L.push('Name: ' + ffVal('ff-name'));
    L.push('Date of birth: ' + ffVal('ff-dob'));
    L.push('Age: ' + ffVal('ff-age'));
    L.push('Gender: ' + ffVal('ff-gender'));
    L.push('Phone: ' + ffVal('ff-phone'));
    L.push('Email: ' + ffVal('ff-email'));
    L.push('Address: ' + ffVal('ff-address'));
    L.push('Occupation: ' + ffVal('ff-occ'));
    L.push('Referred by: ' + ffVal('ff-ref'));
    L.push('');
    L.push('── CHIEF CONCERN & HEALTH GOALS ──');
    L.push('Main reason for consultation: ' + ffVal('ff-complaint'));
    L.push('Duration of concern: ' + ffGetRadio('ff-duration'));
    L.push('Previous treatment sought: ' + ffGetRadio('ff-prev-tx'));
    L.push('Previous treatment details: ' + ffVal('ff-prevtx-detail'));
    L.push('Short-term goal: ' + ffVal('ff-goal-short'));
    L.push('Long-term goal: ' + ffVal('ff-goal-long'));
    L.push('');
    L.push('── MEDICAL HISTORY ──');
    L.push('Current conditions: ' + ffGetChecked('ff-g-conditions'));
    L.push('Other conditions: ' + ffVal('ff-conditions-other'));
    L.push('Medications & supplements: ' + ffVal('ff-meds'));
    L.push('Drug allergies: ' + ffVal('ff-allergy-drug'));
    L.push('Material/metal allergies: ' + ffVal('ff-allergy-material'));
    L.push('Food allergies/intolerances: ' + ffVal('ff-allergy-food'));
    L.push('Surgical history: ' + ffVal('ff-surgeries'));
    L.push('Family history: ' + ffGetChecked('ff-g-family'));
    L.push('');
    L.push('── LIFESTYLE & NUTRITION ──');
    L.push('Diet type: ' + ffVal('ff-diet'));
    L.push('Meals per day: ' + ffVal('ff-meals'));
    L.push('Daily water intake: ' + ffVal('ff-water'));
    L.push('Diet habits: ' + ffGetChecked('ff-g-diet-habits'));
    L.push('Average sleep: ' + ffVal('ff-sleep-hrs'));
    L.push('Sleep quality: ' + ffVal('ff-sleep-qual'));
    L.push('Sleep symptoms: ' + ffGetChecked('ff-g-sleep'));
    L.push('Exercise frequency: ' + ffVal('ff-exercise'));
    L.push('Stress level: ' + ffVal('ff-stress') + '/10');
    L.push('Stress factors: ' + ffGetChecked('ff-g-stress'));
    L.push('Habits: ' + ffGetChecked('ff-g-habits'));
    L.push('');
    L.push('── DENTAL & ORAL HISTORY ──');
    L.push('Last dental visit: ' + ffVal('ff-last-visit'));
    L.push('Reason for last visit: ' + ffVal('ff-last-reason'));
    L.push('Current oral symptoms: ' + ffGetChecked('ff-g-oral-symptoms'));
    L.push('Brushing frequency: ' + ffVal('ff-brush'));
    L.push('Flossing frequency: ' + ffVal('ff-floss'));
    L.push('Toothpaste: ' + ffVal('ff-toothpaste'));
    L.push('Mouthwash: ' + ffVal('ff-mouthwash'));
    L.push('Extra hygiene tools: ' + ffGetChecked('ff-g-hygiene-extras'));
    L.push('Previous dental treatment: ' + ffGetChecked('ff-g-prev-dental'));
    L.push('Dental anxiety (0-10): ' + ffVal('ff-anxiety'));
    L.push('Past traumatic dental experience: ' + ffVal('ff-dental-trauma'));
    L.push('');
    L.push('── HORMONAL HEALTH & ENVIRONMENTAL EXPOSURE ──');
    L.push('Hormonal/reproductive: ' + ffGetChecked('ff-g-hormonal'));
    L.push('Hormonal oral changes: ' + ffVal('ff-hormonal-oral'));
    L.push('Environmental/toxic exposure: ' + ffGetChecked('ff-g-toxins'));
    L.push('Amalgam fillings: ' + ffVal('ff-amalgam'));
    L.push('Metal/material sensitivities: ' + ffVal('ff-metal-sensitivity'));
    L.push('Recent investigations: ' + ffVal('ff-recent-labs'));
    L.push('');
    return L.join('\\n');
  }

  function ffBuildPrompt(data, name) {
    return 'You are a clinical decision-support assistant specialising in functional dentistry. ' +
      'I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. ' +
      'I am about to see ' + name + ' and need a pre-consultation briefing based on their intake form.\\n\\n' +
      'Generate a structured clinical briefing and then produce it as a downloadable PDF. Use the following sections:\\n\\n' +
      '1. COMPLEXITY TIER — Rate as Low / Moderate / High / Complex with a one-line rationale\\n' +
      '2. CHIEF CONCERN — Clinical reframe of their presenting complaint in functional dentistry language (2-3 sentences)\\n' +
      '3. RED FLAGS — URGENT / WATCH / NOTE colour-coded list. Maximum 6 flags.\\n' +
      '4. SYSTEMIC DRIVERS — Which body systems are contributing to their oral health picture\\n' +
      '5. FOCUS AREAS FOR THIS CONSULT — What to examine carefully (3-5 sentences)\\n' +
      '6. SUGGESTED INVESTIGATIONS — Specific tests to consider ordering. Max 8.\\n' +
      '7. CHAIR-SIDE CONVERSATION PROMPTS — 3-4 open questions tailored to this patient\\n\\n' +
      'After the briefing, produce a clean PDF using Python and reportlab (forest green header, patient band, colour-coded flags).\\n\\n' +
      'Patient intake:\\n\\n---\\n\\n' + data;
  }

  function ffSubmit() {
    if (!document.getElementById('ff-consent-check').checked) {
      alert('Please tick the consent checkbox before submitting.');
      return;
    }
    var data = ffBuildData();
    var name = ffVal('ff-name') !== '—' ? ffVal('ff-name') : 'this patient';
    var prompt = ffBuildPrompt(data, name);

    document.getElementById('ff-prompt-text').textContent = prompt;
    document.getElementById('ff-data-text').textContent = data;
    document.getElementById('ff-sum-name').textContent = (name !== 'this patient' ? name : 'Patient') + ' — intake submitted';
    document.getElementById('ff-sum-time').textContent = new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'});

    // Save to Supabase
    saveFullIntakeToSupabase({
      complaint: ffVal('ff-complaint'),
      duration: ffGetRadio('ff-duration'),
      goalShort: ffVal('ff-goal-short'),
      goalLong: ffVal('ff-goal-long'),
      meds: ffVal('ff-meds'),
      allergyDrug: ffVal('ff-allergy-drug'),
      allergyFood: ffVal('ff-allergy-food'),
      sleepHrs: ffVal('ff-sleep-hrs'),
      sleepQual: ffVal('ff-sleep-qual'),
      stress: ffVal('ff-stress'),
      brush: ffVal('ff-brush'),
      floss: ffVal('ff-floss'),
      anxiety: ffVal('ff-anxiety'),
      amalgam: ffVal('ff-amalgam'),
      sig: ffVal('ff-sig'),
      date: ffVal('ff-sig-date')
    })

    document.getElementById('ff-steps').style.display = 'none';
    document.getElementById('ff-summary').classList.add('factive');
    window.scrollTo(0,0);
  }

  function ffCopy(textId, btnId, label) { spCopy(textId, btnId, label); }

  function ffReset() {
    if (!confirm('Clear and start over for a new patient?')) return;
    location.reload();
  }


  // ── Simple symptom consultation form ──────────────────────────────────────
  var seCurrent = 1;

  function seStep(n) {
    document.getElementById('se-s' + seCurrent).classList.remove('active');
    seCurrent = n;
    document.getElementById('se-s' + n).classList.add('active');
    document.getElementById('se-fill').style.width = Math.round((n/4)*100) + '%';
    document.getElementById('se-label').textContent = 'Section ' + n + ' of 4';
    window.scrollTo(0,0);
  }

  function seVal(id) {
    var el = document.getElementById(id); return el && el.value.trim() ? el.value.trim() : '—';
  }

  function seGetChecked(groupId) {
    var g = document.getElementById(groupId);
    if (!g) return 'None';
    var items = [];
    g.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) items.push(cb.nextElementSibling.textContent.trim());
    });
    return items.length ? items.join(', ') : 'None';
  }

  function seGetAllChecked(stepId) {
    var step = document.getElementById(stepId);
    if (!step) return [];
    var results = [];
    step.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb) {
      var divider = cb.closest('.fsection').querySelector('.fdivider');
      // Find nearest preceding divider
      var allDividers = Array.from(cb.closest('.fsection').querySelectorAll('.fdivider'));
      var preceding = null;
      allDividers.forEach(function(d) {
        if (d.compareDocumentPosition(cb) & Node.DOCUMENT_POSITION_FOLLOWING) preceding = d;
      });
      var label = preceding ? preceding.textContent.trim() : 'Selected';
      var text = cb.nextElementSibling ? cb.nextElementSibling.textContent.trim() : '';
      results.push(label + ': ' + text);
    });
    return results;
  }

  function seBuildSummary() {
    var L = [];
    L.push('=== SYMPTOM-BASED CONSULTATION RECORD ===');
    L.push('Clinician: Dr. Priyanka Dhondaley | Bengaluru');
    L.push('Date: ' + new Date().toLocaleString('en-IN'));
    L.push('');
    L.push('── PATIENT ──');
    L.push('Name: ' + seVal('se-name'));
    L.push('Age: ' + seVal('se-age'));
    L.push('Date: ' + seVal('se-date'));
    L.push('File no.: ' + seVal('se-file'));
    L.push('Consultation type: ' + seVal('se-type'));
    L.push('');
    L.push('── CHIEF COMPLAINT ──');
    L.push('Complaint: ' + seVal('se-complaint'));
    L.push('Duration: ' + seVal('se-duration'));
    L.push('Pain score: ' + seVal('se-pain') + ' / 10');

    // Pain character checkboxes
    var painChars = [];
    document.querySelectorAll('#se-s1 input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) painChars.push(cb.nextElementSibling.textContent.trim());
    });
    if (painChars.length) L.push('Pain character: ' + painChars.join(', '));
    L.push('');

    L.push('── CLINICAL FINDINGS ──');
    L.push('Tooth/teeth: ' + seVal('se-tooth'));
    L.push('Vitality test: ' + seVal('se-vitality'));
    L.push('Percussion: ' + seVal('se-percussion'));
    L.push('Palpation: ' + seVal('se-palpation'));
    L.push('Probing depths: ' + seVal('se-probing'));
    L.push('Bleeding on probing: ' + seVal('se-bop'));
    L.push('Gingival status: ' + seVal('se-gingiva'));
    L.push('Mobility: ' + seVal('se-mobility'));
    L.push('Radiograph taken: ' + seVal('se-xray-type'));
    L.push('Radiographic findings: ' + seVal('se-xray-findings'));
    L.push('Radiographic notes: ' + seVal('se-xray-notes'));
    L.push('Caries: ' + seVal('se-caries'));
    L.push('Existing restoration: ' + seVal('se-restoration'));
    L.push('Clinical notes: ' + seVal('se-clinical-notes'));
    L.push('');

    L.push('── DIAGNOSIS & TREATMENT ──');
    L.push('Diagnosis: ' + seVal('se-diagnosis'));
    L.push('Diagnosis notes: ' + seVal('se-diagnosis-notes'));
    L.push('Treatment provided: ' + seGetChecked('se-g-tx'));
    L.push('Treatment notes: ' + seVal('se-tx-notes'));
    L.push('Prescription: ' + seVal('se-rx'));
    L.push('Further treatment needed: ' + seVal('se-next-tx'));
    L.push('');

    L.push('── PATIENT COMMUNICATION ──');
    L.push('Diagnosis explained: ' + seVal('se-explained'));
    L.push('Home care advice: ' + seVal('se-homecare'));

    var postop = [];
    document.querySelectorAll('#se-s4 input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) postop.push(cb.nextElementSibling.textContent.trim());
    });
    if (postop.length) L.push('Post-op instructions given: ' + postop.join(', '));

    L.push('Next appointment: ' + seVal('se-next-appt'));
    L.push('Recall interval: ' + seVal('se-recall'));
    L.push('');
    L.push('Clinician: Dr. Priyanka Dhondaley');
    L.push('Date signed: ' + seVal('se-sign-date'));

    return L.join('\\n');
  }

  function seSubmit() {
    var summary = seBuildSummary();
    var patientName = seVal('se-name');

    var prompt = 'You are a clinical decision-support assistant specialising in functional dentistry. ' +
      'I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. ' +
      'I have just completed a symptom-based consultation for ' + patientName + '. ' +
      'Based on the consultation record below, generate a concise Treatment Summary Report with:\\n\\n' +
      '1. DIAGNOSIS SUMMARY — Confirm and briefly explain the working diagnosis in plain language\\n' +
      '2. TREATMENT PROVIDED — What was done today and why\\n' +
      '3. NEXT STEPS — What needs to happen next, in priority order\\n' +
      '4. PATIENT INSTRUCTIONS — Key home care points for this patient\\n' +
      '5. WATCH FOR — Signs that would indicate the patient needs to return urgently\\n\\n' +
      'Keep it concise — this is a symptom-based visit, not a full functional workup. ' +
      'After the report, produce a clean PDF using Python and reportlab ' +
      '(forest green header, patient name band, clean sections, clinician copy). ' +
      'Consultation record:\\n\\n---\\n\\n' + summary;

    document.getElementById('se-summary-text').textContent = prompt;
    document.getElementById('se-saved-name').textContent =
      (patientName !== '—' ? patientName : 'Patient') + ' — record complete';
    document.getElementById('se-saved-time').textContent =
      new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'});

    // Save to Supabase
    saveSimpleExamToSupabase({
      complaint: seVal('se-complaint'),
      pain: seVal('se-pain'),
      diagnosis: seVal('se-diagnosis'),
      rx: seVal('se-rx'),
      nextTx: seVal('se-next-tx'),
      nextAppt: seVal('se-next-appt')
    })

    document.getElementById('se-steps').style.display = 'none';
    document.getElementById('se-saved').classList.add('factive');
    window.scrollTo(0,0);
  }

  function seCopy() {
    var text = document.getElementById('se-summary-text').textContent;
    function flash() {
      var btn = document.getElementById('se-copy-btn');
      btn.textContent = 'Copied ✓'; btn.classList.add('fdone');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('fdone'); }, 2500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(flash).catch(function() { fbFallback(text, flash); });
    } else { fbFallback(text, flash); }
  }

  function seReset() {
    if (!confirm('Clear and start a new consultation record?')) return;
    location.reload();
  }


  // ── Full functional exam form (xe prefix) ──────────────────────────────────
  var xeCurrent = 1;

  function xeStep(n) {
    document.getElementById('xe-s' + xeCurrent).classList.remove('active');
    xeCurrent = n;
    document.getElementById('xe-s' + n).classList.add('active');
    document.getElementById('xe-fill').style.width = Math.round((n/6)*100) + '%';
    document.getElementById('xe-label').textContent = 'Section ' + n + ' of 6';
    window.scrollTo(0,0);
  }

  // Build muscle palpation table for xe form
  (function() {
    var muscles = ['Masseter','Temporalis (anterior)','Temporalis (posterior)',
      'Medial pterygoid','Lateral pterygoid','Sternocleidomastoid','Trapezius','Digastric'];
    var opts = '<option value="">—</option><option>NT</option><option>0 — no pain</option>' +
               '<option>1 — mild</option><option>2 — moderate</option><option>3 — severe</option>';
    var container = document.getElementById('xe-muscle-rows');
    if (!container) return;
    muscles.forEach(function(m, i) {
      var row = document.createElement('div');
      row.style.cssText = 'display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;align-items:center;margin-bottom:6px;';
      row.innerHTML = '<span style="font-family:var(--sans);font-size:13px;color:var(--ink);">' + m + '</span>' +
        '<select id="xe-muscle-r-' + i + '" style="font-family:var(--sans);font-size:12px;padding:5px 7px;border:0.5px solid var(--sand);border-radius:8px;background:var(--cream);color:var(--ink);width:100%;outline:none;-webkit-appearance:none;">' + opts + '</select>' +
        '<select id="xe-muscle-l-' + i + '" style="font-family:var(--sans);font-size:12px;padding:5px 7px;border:0.5px solid var(--sand);border-radius:8px;background:var(--cream);color:var(--ink);width:100%;outline:none;-webkit-appearance:none;">' + opts + '</select>';
      container.appendChild(row);
    });
  })();

  function xeVal(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : '—';
  }

  function xeGetChecked(groupId) {
    var g = document.getElementById(groupId);
    if (!g) return 'None';
    var items = [];
    g.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb) {
      if (cb.nextElementSibling) items.push(cb.nextElementSibling.textContent.trim());
    });
    return items.length ? items.join(', ') : 'None';
  }

  function xeGetMuscles() {
    var muscles = ['Masseter','Temporalis (anterior)','Temporalis (posterior)',
      'Medial pterygoid','Lateral pterygoid','Sternocleidomastoid','Trapezius','Digastric'];
    var lines = [];
    muscles.forEach(function(m, i) {
      var r = document.getElementById('xe-muscle-r-' + i);
      var l = document.getElementById('xe-muscle-l-' + i);
      if (r && l && (r.value || l.value)) {
        lines.push(m + ': R=' + (r.value||'—') + ' / L=' + (l.value||'—'));
      }
    });
    return lines.length ? lines.join('; ') : '—';
  }

  function xeBuildData() {
    var L = [];
    L.push('=== FUNCTIONAL DENTISTRY CLINICAL EXAMINATION RECORD ===');
    L.push('Clinician: Dr. Priyanka Dhondaley | Bengaluru');
    L.push('Generated: ' + new Date().toLocaleString('en-IN'));
    L.push('');
    L.push('── PATIENT IDENTIFICATION ──');
    L.push('Patient name: ' + xeVal('xe-name'));
    L.push('File number: ' + xeVal('xe-id'));
    L.push('Examination date: ' + xeVal('xe-date'));
    L.push('Consultation type: ' + xeVal('xe-type'));
    L.push('Referral source: ' + xeVal('xe-ref'));
    L.push('');
    L.push('── EXTRAORAL EXAMINATION ──');
    L.push('Facial symmetry: ' + xeVal('xe-symmetry'));
    L.push('Facial profile: ' + xeVal('xe-profile'));
    L.push('Vertical face height: ' + xeVal('xe-vfh'));
    L.push('Facial muscle tone: ' + xeVal('xe-muscle-tone'));
    L.push('Airway / breathing signs: ' + xeGetChecked('xe-g-airway'));
    L.push('Airway questionnaire score: ' + xeVal('xe-airway-score'));
    L.push('Lymph nodes: ' + xeGetChecked('xe-g-lymph'));
    L.push('Max mouth opening: ' + xeVal('xe-mmo') + ' mm');
    L.push('Opening pattern: ' + xeVal('xe-opening'));
    L.push('TMJ sounds — right: ' + xeVal('xe-tmj-r'));
    L.push('TMJ sounds — left: ' + xeVal('xe-tmj-l'));
    L.push('Muscle palpation: ' + xeGetMuscles());
    L.push('Skin / nutritional clues: ' + xeGetChecked('xe-g-skin'));
    L.push('Extraoral notes: ' + xeVal('xe-extraoral-notes'));
    L.push('');
    L.push('── INTRAORAL EXAMINATION ──');
    L.push('Lips: ' + xeVal('xe-lips'));
    L.push('Buccal mucosa: ' + xeVal('xe-buccal'));
    L.push('Tongue size: ' + xeVal('xe-tongue-size'));
    L.push('Tongue posture: ' + xeVal('xe-tongue-posture'));
    L.push('Tongue dorsum: ' + xeVal('xe-tongue-dorsum'));
    L.push('Frenulum: ' + xeVal('xe-frenulum'));
    L.push('Hard palate: ' + xeVal('xe-palate'));
    L.push('Soft palate / oropharynx: ' + xeVal('xe-oropharynx'));
    L.push('Floor of mouth: ' + xeVal('xe-floor'));
    L.push('Salivary flow: ' + xeVal('xe-saliva'));
    L.push('Halitosis: ' + xeVal('xe-halitosis') + ' — origin: ' + xeVal('xe-halitosis-origin'));
    L.push('Oral microbiome test: ' + xeVal('xe-microbiome'));
    L.push('Salivary pH: ' + xeVal('xe-ph'));
    L.push('BPE / Periodontal score: ' + xeVal('xe-bpe'));
    L.push('Bleeding on probing: ' + xeVal('xe-bop'));
    L.push('Furcation involvement: ' + xeVal('xe-furcation'));
    L.push('Recession: ' + xeVal('xe-recession'));
    L.push('Bone loss (radiographic): ' + xeVal('xe-bone-loss'));
    L.push('Periodontal staging: ' + xeVal('xe-perio-stage'));
    L.push('Nutritional oral clues: ' + xeGetChecked('xe-g-nutrition'));
    L.push('Intraoral notes: ' + xeVal('xe-intraoral-notes'));
    L.push('');
    L.push('── DENTAL STATUS & OCCLUSION ──');
    L.push('Teeth present: ' + xeVal('xe-teeth-count'));
    L.push('Missing teeth: ' + xeVal('xe-missing'));
    L.push('Caries activity: ' + xeVal('xe-caries'));
    L.push('Caries risk: ' + xeVal('xe-caries-risk'));
    L.push('Existing restorations: ' + xeVal('xe-restorations'));
    L.push('Existing implants: ' + xeVal('xe-implants'));
    L.push('Wear type: ' + xeVal('xe-wear-type') + ' | Severity: ' + xeVal('xe-wear-sev'));
    L.push('BEWE score: ' + xeVal('xe-bewe'));
    L.push('Wear aetiology: ' + xeVal('xe-wear-cause'));
    L.push("Angle's classification: " + xeVal('xe-angles'));
    L.push('Overjet: ' + xeVal('xe-overjet') + ' mm | Overbite: ' + xeVal('xe-overbite') + ' mm');
    L.push('Crossbite: ' + xeVal('xe-crossbite'));
    L.push('Upper arch: ' + xeVal('xe-arch-upper') + ' | Lower arch: ' + xeVal('xe-arch-lower'));
    L.push('Tongue space: ' + xeVal('xe-tongue-space'));
    L.push('Bruxism / parafunction: ' + xeVal('xe-bruxism'));
    L.push('Dental notes: ' + xeVal('xe-dental-notes'));
    L.push('');
    L.push('── INVESTIGATIONS & FUNCTIONAL MATRIX ──');
    L.push('Radiographs taken: ' + xeVal('xe-xrays'));
    L.push('Previous radiographs: ' + xeVal('xe-prev-xray'));
    L.push('Radiographic findings: ' + xeVal('xe-xray-findings'));
    L.push('Labs ordered: ' + xeGetChecked('xe-g-labs'));
    L.push('Other investigations: ' + xeVal('xe-other-labs'));
    L.push('Functional drivers identified: ' + xeGetChecked('xe-g-drivers'));
    L.push('Referrals indicated: ' + xeGetChecked('xe-g-referrals'));
    L.push('');
    L.push('── CLINICAL SUMMARY & CARE PLAN ──');
    L.push('Primary diagnosis: ' + xeVal('xe-primary-dx'));
    L.push('Secondary diagnoses: ' + xeVal('xe-secondary-dx'));
    L.push('Antecedents: ' + xeVal('xe-antecedents'));
    L.push('Triggers: ' + xeVal('xe-triggers'));
    L.push('Mediators: ' + xeVal('xe-mediators'));
    L.push('Phase 1 — Stabilisation: ' + xeVal('xe-phase1'));
    L.push('Phase 2 — Root-cause: ' + xeVal('xe-phase2'));
    L.push('Phase 3 — Restorative: ' + xeVal('xe-phase3'));
    L.push('Phase 4 — Maintenance: ' + xeVal('xe-phase4'));
    L.push('Patient communication: ' + xeVal('xe-communication'));
    L.push('Next appointment: ' + xeVal('xe-next-appt'));
    L.push('Date signed: ' + xeVal('xe-sign-date'));
    return L.join('\\n');
  }

  function xeBuildPrompt(data, name) {
    return 'You are a clinical decision-support assistant specialising in functional dentistry. ' +
      'I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. ' +
      'I have just completed a clinical examination for ' + name + '. ' +
      'Based on the full examination record below, generate a structured Treatment Planning Report.\\n\\n' +
      'The report must include:\\n\\n' +
      '1. CLINICAL SUMMARY — A concise 3–4 sentence overview of the key clinical findings and overall health picture.\\n\\n' +
      '2. PRIORITY PROBLEM LIST — Rank all identified problems from most to least urgent. For each:\\n' +
      '   - State the problem clearly\\n' +
      '   - Explain why it is at this priority level\\n' +
      '   - List 2–3 specific treatment options with brief pros/cons\\n\\n' +
      '3. PHASED TREATMENT PLAN:\\n' +
      '   Phase 1: Stabilisation & urgent care (within 1–2 visits)\\n' +
      '   Phase 2: Root-cause & systemic intervention (weeks 2–8)\\n' +
      '   Phase 3: Definitive restorative / rehabilitative care\\n' +
      '   Phase 4: Maintenance, recall & monitoring\\n\\n' +
      '4. FUNCTIONAL & SYSTEMIC FOCUS — Systemic or lifestyle interventions to run alongside dental treatment. Include specific nutrition, lifestyle, supplement, or referral recommendations.\\n\\n' +
      '5. PATIENT COMMUNICATION NOTES — How to explain the plan to this specific patient. Key messages, likely questions, and potential barriers to compliance.\\n\\n' +
      '6. RECALL & MONITORING SCHEDULE — Recommended recall interval, what to reassess, follow-up tests.\\n\\n' +
      'Be specific to the clinical findings. Do not be generic. After the report, produce a clean PDF using Python and reportlab ' +
      '(forest green header, patient name band, colour-coded priority levels HIGH/MODERATE/LOW, readable in under 2 minutes).\\n\\n' +
      'Clinical examination record:\\n\\n---\\n\\n' + data;
  }

  function xeSubmit() {
    var data = xeBuildData();
    var name = xeVal('xe-name') !== '—' ? xeVal('xe-name') : 'this patient';
    var prompt = xeBuildPrompt(data, name);

    document.getElementById('xe-prompt-text').textContent = prompt;
    document.getElementById('xe-data-text').textContent = data;
    document.getElementById('xe-sum-name').textContent =
      (name !== 'this patient' ? name : 'Patient') + ' — examination submitted';
    document.getElementById('xe-sum-time').textContent =
      new Date().toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'});

    // Save to Supabase
    saveFullExamToSupabase({
      primaryDx: xeVal('xe-primary-dx'),
      secondaryDx: xeVal('xe-secondary-dx'),
      phase1: xeVal('xe-phase1'),
      phase2: xeVal('xe-phase2'),
      phase3: xeVal('xe-phase3'),
      phase4: xeVal('xe-phase4'),
      nextAppt: xeVal('xe-next-appt')
    })

    document.getElementById('xe-steps').style.display = 'none';
    document.getElementById('xe-summary').classList.add('factive');
    window.scrollTo(0,0);
  }

  function xeCopy(textId, btnId, label) { spCopy(textId, btnId, label); }

  function xeReset() {
    if (!confirm('Clear and start a new examination record?')) return;
    location.reload();
  }

</script>


<!-- ══ SCREEN 5 — SIMPLE FORM (Quick Relief) ══ -->
<div class="screen" id="screen-form-simple">
  <button class="btn-back" onclick="goToScreen('screen-choice')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back</button>
  <div class="form-page-wrap">
    <div class="form-card">

      <div class="form-hdr">
        <div class="form-hdr-top">
          <div>
            <div class="form-hdr-clinic">Functional Dentistry</div>
            <div class="form-hdr-sub">Dr. Priyanka Dhondaley · Bengaluru</div>
          </div>
          <span class="form-hdr-badge">Quick Relief</span>
        </div>
        <div class="form-hdr-title">Tell us what's bothering you</div>
        <div class="form-hdr-desc">Just a few quick questions so Dr. Priyanka can focus on exactly what you need today.</div>
      </div>

      <!-- Progress -->
      <div class="form-progress-wrap">
        <div class="form-progress-bar"><div class="form-progress-fill" id="sp-fill" style="width:25%"></div></div>
        <div class="form-progress-label" id="sp-label">Step 1 of 4</div>
      </div>

      <div class="form-body-inner">

        <!-- Simple form steps -->
        <div id="sp-steps">

          <!-- S-Step 1: Who are you -->
          <div class="fstep active" id="sp-s1">
            <div class="fsection">
              <div class="fsection-label">Step 1 of 4</div>
              <div class="fsection-title">Nice to meet you</div>
              <div class="fsection-hint">Just the basics to get started.</div>
              <div class="fgrid2">
                <div class="ffield ffull"><label>Your full name</label><input type="text" id="sp-name" placeholder=""></div>
                <div class="ffield"><label>Age</label><input type="number" id="sp-age" min="1" max="120" placeholder="Years"></div>
                <div class="ffield"><label>Gender</label>
                  <select id="sp-gender"><option value="">Select</option><option>Female</option><option>Male</option><option>Non-binary / other</option><option>Prefer not to say</option></select>
                </div>
                <div class="ffield"><label>Phone number</label><input type="tel" id="sp-phone" placeholder="+91"></div>
                <div class="ffield"><label>Referred by</label><input type="text" id="sp-ref" placeholder="Doctor / friend / other"></div>
              </div>
            </div>
            <div class="fnav"><span class="fpage-ind">1 / 4</span><button class="fbtn fbtn-primary" onclick="spStep(2)">Next →</button></div>
          </div>

          <!-- S-Step 2: What's bothering you -->
          <div class="fstep" id="sp-s2">
            <div class="fsection">
              <div class="fsection-label">Step 2 of 4</div>
              <div class="fsection-title">What's brought you in today?</div>
              <div class="fsection-hint">Don't worry about the right words — just describe what you're feeling.</div>
              <div class="ffield"><label>What's the main thing bothering you?</label><textarea id="sp-complaint" placeholder="e.g. my tooth has been aching for two weeks, my gums bleed when I brush..."></textarea></div>
              <div class="fdivider">How long has this been going on?</div>
              <div class="finline-checks" id="sp-g-duration">
                <label class="fcheck-row"><input type="radio" name="sp-dur"><span>A few days</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-dur"><span>1–4 weeks</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-dur"><span>1–6 months</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-dur"><span>More than 6 months</span></label>
              </div>
              <div class="fdivider" style="margin-top:1.25rem;">Which area is it in?</div>
              <div class="finline-checks">
                <label class="fcheck-row"><input type="radio" name="sp-area"><span>Top teeth</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-area"><span>Bottom teeth</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-area"><span>Left side</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-area"><span>Right side</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-area"><span>Gums</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-area"><span>Jaw / face</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-area"><span>Not sure</span></label>
              </div>
              <div class="ffield" style="margin-top:1rem;"><label>On a scale of 1–10, how much is it bothering you?</label>
                <div class="fscale-row">
                  <span>Not much</span>
                  <input type="range" id="sp-pain" min="1" max="10" value="5" oninput="document.getElementById('sp-pain-val').textContent=this.value">
                  <span class="fscale-val" id="sp-pain-val">5</span>
                  <span>A lot</span>
                </div>
              </div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="spStep(1)">← Back</button><span class="fpage-ind">2 / 4</span><button class="fbtn fbtn-primary" onclick="spStep(3)">Next →</button></div>
          </div>

          <!-- S-Step 3: Quick health check -->
          <div class="fstep" id="sp-s3">
            <div class="fsection">
              <div class="fsection-label">Step 3 of 4</div>
              <div class="fsection-title">A couple of quick health questions</div>
              <div class="fsection-hint">This helps Dr. Priyanka make sure your treatment is safe for you.</div>
              <div class="ffield"><label>Do you have any health conditions we should know about?</label>
                <textarea id="sp-conditions" placeholder="e.g. diabetes, blood pressure, heart condition, pregnancy... or write 'none'"></textarea>
              </div>
              <div class="ffield"><label>Are you on any medications or supplements?</label>
                <textarea id="sp-meds" placeholder="List them here, or write 'none'"></textarea>
              </div>
              <div class="ffield"><label>Any allergies? (medicines, latex, metals, foods)</label>
                <input type="text" id="sp-allergies" placeholder="e.g. penicillin, latex — or 'none'">
              </div>
              <div class="fdivider">Have you seen a dentist before for this?</div>
              <div class="finline-checks">
                <label class="fcheck-row"><input type="radio" name="sp-prev"><span>Yes</span></label>
                <label class="fcheck-row"><input type="radio" name="sp-prev"><span>No — first time</span></label>
              </div>
              <div class="ffield" style="margin-top:0.9rem;"><label>If yes — what did they say or do?</label>
                <textarea id="sp-prev-detail" placeholder="Optional — whatever you remember"></textarea>
              </div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="spStep(2)">← Back</button><span class="fpage-ind">3 / 4</span><button class="fbtn fbtn-primary" onclick="spStep(4)">Next →</button></div>
          </div>

          <!-- S-Step 4: Consent -->
          <div class="fstep" id="sp-s4">
            <div class="fsection">
              <div class="fsection-label">Step 4 of 4</div>
              <div class="fsection-title">One last thing</div>
              <div class="fsection-hint">Please read and sign below — it only takes a moment.</div>
              <div class="fconsent-box">
                I confirm the information I've shared is accurate. I consent to Dr. Priyanka Dhondaley using this information to guide my care today. I understand this information is kept confidential and I may ask questions at any time.
              </div>
              <div class="fgrid2">
                <div class="ffield"><label>Your signature</label><input class="fsig" type="text" id="sp-sig" placeholder="Type your full name"></div>
                <div class="ffield"><label>Today's date</label><input type="date" id="sp-date"></div>
              </div>
              <div style="margin-top:1.1rem;"><label class="fcheck-row"><input type="checkbox" id="sp-consent-check"><span style="font-size:12.5px;">I have read and agree to the above</span></label></div>
            </div>
            <div class="fnav">
              <button class="fbtn" onclick="spStep(3)">← Back</button>
              <span class="fpage-ind">4 / 4</span>
              <button class="fbtn fbtn-submit" onclick="spSubmit()">Submit ✓</button>
            </div>
          </div>

        </div><!-- /sp-steps -->

        <!-- Summary screen -->
        <div class="fsum-screen" id="sp-summary">
          <div class="fsum-banner">
            <div class="fsum-icon">✓</div>
            <div>
              <div class="fsum-title" id="sp-sum-name">Form submitted</div>
              <div class="fsum-sub" id="sp-sum-time">Ready for Dr. Priyanka</div>
            </div>
          </div>
          <div class="finst-box">
            <div class="finst-row"><span class="finst-num">1</span><span>Copy the full prompt below.</span></div>
            <div class="finst-row"><span class="finst-num">2</span><span>Open <strong>Claude.ai</strong> and paste it — your clinical briefing will be ready in seconds.</span></div>
          </div>
          <div class="fsum-block">
            <div class="fsum-block-hdr">
              <span class="fsum-block-label">Full prompt — paste into Claude.ai</span>
              <button class="fcopy-btn" id="sp-copy-btn" onclick="spCopy('sp-prompt-text','sp-copy-btn','Copy prompt')">Copy prompt</button>
            </div>
            <pre class="fsum-pre" id="sp-prompt-text"></pre>
          </div>
          <div class="fsum-block">
            <div class="fsum-block-hdr">
              <span class="fsum-block-label">Patient data only</span>
              <button class="fcopy-btn" id="sp-copy-data-btn" onclick="spCopy('sp-data-text','sp-copy-data-btn','Copy data')">Copy data</button>
            </div>
            <pre class="fsum-pre" id="sp-data-text"></pre>
          </div>
          <div class="fsum-divider">Next step</div>
          <div class="fstep2-banner">
            <div class="fstep2-banner-title">Ready for your consultation?</div>
            <div class="fstep2-banner-desc">Once Dr. Priyanka has reviewed the briefing, proceed to the symptom-based consultation form below.</div>
          </div>
          <div class="fsum-footer">
            <button class="fghost-btn" onclick="spReset()">↺ New patient</button>
            <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;align-items:center;">
              <a href="https://claude.ai" target="_blank" class="fclaude-btn">Open Claude.ai →</a>
              <button class="fproceed-btn" onclick="goToScreen('screen-exam-simple')">
                Proceed to consultation <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

      </div><!-- /form-body-inner -->
    </div><!-- /form-card -->
  </div><!-- /form-page-wrap -->
</div>



<!-- ══ SCREEN 6 — FULL FORM (Deep Dive / Complete) ══ -->
<div class="screen" id="screen-form-full">
  <button class="btn-back" onclick="goToScreen('screen-choice')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    Back
  </button>
  <div class="form-page-wrap" style="margin-top:3.5rem;">
    <div class="form-card">

      <div class="form-hdr">
        <div class="form-hdr-top">
          <div>
            <div class="form-hdr-clinic">Functional Dentistry</div>
            <div class="form-hdr-sub">Dr. Priyanka Dhondaley · Bengaluru</div>
          </div>
          <span class="form-hdr-badge" id="ff-badge">Deep Dive</span>
        </div>
        <div class="form-hdr-title">Your full health picture</div>
        <div class="form-hdr-desc">Please take your time — everything you share helps Dr. Priyanka understand you fully, not just your teeth.</div>
      </div>

      <div class="form-progress-wrap">
        <div class="form-progress-bar"><div class="form-progress-fill" id="ff-fill" style="width:14%"></div></div>
        <div class="form-progress-label" id="ff-label">Section 1 of 7</div>
      </div>

      <div class="form-body-inner">
        <div id="ff-steps">

          <div class="fstep active" id="ff-s1">
            <div class="fsection">
              <div class="fsection-label">Section 1 of 7</div>
              <div class="fsection-title">Personal information</div>
              <div class="fsection-hint">Basic details to set up your consultation record.</div>
              <div class="fgrid2">
                <div class="ffield ffull"><label>Full name</label><input type="text" id="ff-name" placeholder="As per records"></div>
                <div class="ffield"><label>Date of birth</label><input type="date" id="ff-dob"></div>
                <div class="ffield"><label>Age</label><input type="number" id="ff-age" min="1" max="120" placeholder="Years"></div>
                <div class="ffield"><label>Gender</label><select id="ff-gender"><option value="">Select</option><option>Female</option><option>Male</option><option>Non-binary / other</option><option>Prefer not to say</option></select></div>
                <div class="ffield"><label>Phone number</label><input type="tel" id="ff-phone" placeholder="+91"></div>
                <div class="ffield"><label>Email address</label><input type="email" id="ff-email"></div>
                <div class="ffield ffull"><label>Residential address / city</label><input type="text" id="ff-address" placeholder="City, State"></div>
                <div class="ffield"><label>Occupation</label><input type="text" id="ff-occ"></div>
                <div class="ffield"><label>Referred by</label><input type="text" id="ff-ref" placeholder="Doctor / friend / social media"></div>
              </div>
            </div>
            <div class="fnav"><span class="fpage-ind">1 / 7</span><button class="fbtn fbtn-primary" onclick="ffStep(2)">Next →</button></div>
          </div>

          <div class="fstep" id="ff-s2">
            <div class="fsection">
              <div class="fsection-label">Section 2 of 7</div>
              <div class="fsection-title">Chief concern &amp; health goals</div>
              <div class="fsection-hint">Tell us what brought you here and what you'd like to achieve.</div>
              <div class="ffield"><label>What is your main reason for this consultation?</label><textarea id="ff-complaint" placeholder="Describe in your own words..."></textarea></div>
              <div class="fdivider">How long have you had this concern?</div>
              <div class="finline-checks">
                <label class="fcheck-row"><input type="radio" name="ff-duration"><span>Less than 1 month</span></label>
                <label class="fcheck-row"><input type="radio" name="ff-duration"><span>1–6 months</span></label>
                <label class="fcheck-row"><input type="radio" name="ff-duration"><span>6–12 months</span></label>
                <label class="fcheck-row"><input type="radio" name="ff-duration"><span>1–3 years</span></label>
                <label class="fcheck-row"><input type="radio" name="ff-duration"><span>More than 3 years</span></label>
              </div>
              <div class="fdivider">Have you sought treatment for this before?</div>
              <div class="finline-checks">
                <label class="fcheck-row"><input type="radio" name="ff-prev-tx"><span>Yes</span></label>
                <label class="fcheck-row"><input type="radio" name="ff-prev-tx"><span>No</span></label>
              </div>
              <div class="ffield" style="margin-top:0.9rem;"><label>If yes — what treatment? What helped or didn't?</label><textarea id="ff-prevtx-detail" placeholder="Treatments tried, outcomes..."></textarea></div>
              <div class="fdivider">Your health goals</div>
              <div class="finfobox">Functional dentistry looks beyond symptoms to root causes. What would a successful outcome look and feel like for you?</div>
              <div class="ffield"><label>Short-term goal (next 3–6 months)</label><textarea id="ff-goal-short" placeholder="e.g. reduce jaw pain, improve sleep quality..."></textarea></div>
              <div class="ffield"><label>Long-term goal</label><textarea id="ff-goal-long" placeholder="e.g. prevent chronic disease, optimise overall health..."></textarea></div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="ffStep(1)">← Back</button><span class="fpage-ind">2 / 7</span><button class="fbtn fbtn-primary" onclick="ffStep(3)">Next →</button></div>
          </div>

          <div class="fstep" id="ff-s3">
            <div class="fsection">
              <div class="fsection-label">Section 3 of 7</div>
              <div class="fsection-title">Medical history</div>
              <div class="fsection-hint">Your systemic health is deeply connected to your oral health.</div>
              <div class="fdivider">Current diagnosed conditions</div>
              <div class="fchecks" id="ff-g-conditions">
                <label class="fcheck-row"><input type="checkbox"><span>Hypertension</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Type 2 diabetes / pre-diabetes</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Thyroid disorder</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>PCOS / hormonal imbalance</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Autoimmune condition</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Cardiovascular disease</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Acid reflux / GERD</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>IBS / gut disorders</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Anxiety / depression</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Chronic fatigue</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Osteoporosis / osteopenia</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Respiratory / asthma</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Kidney / liver disorder</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Cancer (past or present)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Sleep apnoea</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Migraines / chronic headaches</span></label>
              </div>
              <div class="ffield" style="margin-top:0.9rem;"><label>Other conditions not listed</label><textarea id="ff-conditions-other"></textarea></div>
              <div class="fdivider">Current medications &amp; supplements</div>
              <div class="ffield"><label>List all medications, doses, and duration</label><textarea id="ff-meds" placeholder="Include prescription drugs, OTC medications, vitamins, supplements..."></textarea></div>
              <div class="fdivider">Allergies</div>
              <div class="fgrid2">
                <div class="ffield"><label>Drug allergies</label><input type="text" id="ff-allergy-drug" placeholder="e.g. penicillin, NSAIDs"></div>
                <div class="ffield"><label>Material / latex / metal allergy</label><input type="text" id="ff-allergy-material" placeholder="e.g. nickel, latex"></div>
                <div class="ffield ffull"><label>Food allergies or intolerances</label><input type="text" id="ff-allergy-food" placeholder="e.g. gluten, dairy, nuts"></div>
              </div>
              <div class="fdivider">Surgical &amp; hospitalisation history</div>
              <div class="ffield"><label>Past surgeries, hospitalisations, or major procedures</label><textarea id="ff-surgeries" placeholder="Year, reason, and outcome..."></textarea></div>
              <div class="fdivider">Family history</div>
              <div class="fchecks" id="ff-g-family">
                <label class="fcheck-row"><input type="checkbox"><span>Heart disease</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Diabetes</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Autoimmune conditions</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Cancer</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Osteoporosis</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Sleep or airway issues</span></label>
              </div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="ffStep(2)">← Back</button><span class="fpage-ind">3 / 7</span><button class="fbtn fbtn-primary" onclick="ffStep(4)">Next →</button></div>
          </div>

          <div class="fstep" id="ff-s4">
            <div class="fsection">
              <div class="fsection-label">Section 4 of 7</div>
              <div class="fsection-title">Lifestyle &amp; nutrition</div>
              <div class="fsection-hint">Diet, sleep, and stress profoundly shape oral and systemic health.</div>
              <div class="fdivider">Diet &amp; nutrition</div>
              <div class="fgrid2">
                <div class="ffield"><label>Typical diet type</label><select id="ff-diet"><option value="">Select</option><option>Omnivore (mixed)</option><option>Vegetarian</option><option>Vegan</option><option>Eggetarian</option><option>Keto / low-carb</option><option>Mediterranean</option><option>Other</option></select></div>
                <div class="ffield"><label>Meals per day</label><select id="ff-meals"><option value="">Select</option><option>1</option><option>2</option><option>3</option><option>4+</option><option>Irregular / grazing</option></select></div>
                <div class="ffield"><label>Daily water intake</label><select id="ff-water"><option value="">Select</option><option>Less than 1 litre</option><option>1–1.5 litres</option><option>1.5–2 litres</option><option>2–3 litres</option><option>More than 3 litres</option></select></div>
              </div>
              <div class="fchecks" id="ff-g-diet-habits" style="margin-top:10px;">
                <label class="fcheck-row"><input type="checkbox"><span>High sugar / refined carbs</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Frequent snacking</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Carbonated drinks / soda</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>High coffee / tea intake</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Alcohol consumption</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Processed / fast food regularly</span></label>
              </div>
              <div class="fdivider">Sleep</div>
              <div class="fgrid2">
                <div class="ffield"><label>Average sleep per night</label><select id="ff-sleep-hrs"><option value="">Select</option><option>Less than 5 hrs</option><option>5–6 hrs</option><option>6–7 hrs</option><option>7–8 hrs</option><option>More than 8 hrs</option></select></div>
                <div class="ffield"><label>Sleep quality</label><select id="ff-sleep-qual"><option value="">Select</option><option>Excellent</option><option>Good</option><option>Fair</option><option>Poor</option><option>Very poor</option></select></div>
              </div>
              <div class="fchecks" id="ff-g-sleep" style="margin-top:10px;">
                <label class="fcheck-row"><input type="checkbox"><span>Difficulty falling asleep</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Frequent waking at night</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Snoring</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Gasping / choking during sleep</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Daytime fatigue / sleepiness</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Unrefreshing sleep</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Mouth breathing at night</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Restless legs</span></label>
              </div>
              <div class="fdivider">Physical activity</div>
              <div class="ffield"><label>Exercise frequency</label><select id="ff-exercise"><option value="">Select</option><option>Sedentary (minimal activity)</option><option>Light (1–2x per week)</option><option>Moderate (3–4x per week)</option><option>Active (5+ times per week)</option></select></div>
              <div class="fdivider">Stress &amp; mental wellbeing</div>
              <div class="ffield"><label>Current stress level</label>
                <div class="fscale-row"><span>Low</span><input type="range" id="ff-stress" min="0" max="10" value="5" oninput="document.getElementById('ff-stress-val').textContent=this.value"><span class="fscale-val" id="ff-stress-val">5</span><span>High</span></div>
              </div>
              <div class="fchecks" id="ff-g-stress" style="margin-top:10px;">
                <label class="fcheck-row"><input type="checkbox"><span>Work-related stress</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Emotional / relationship stress</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Financial stress</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>History of trauma / PTSD</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Anxiety / panic episodes</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Currently in therapy / counselling</span></label>
              </div>
              <div class="fdivider">Habits</div>
              <div class="fchecks" id="ff-g-habits">
                <label class="fcheck-row"><input type="checkbox"><span>Smoking / tobacco</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Tobacco chewing</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Vaping / e-cigarettes</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Recreational drug use</span></label>
              </div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="ffStep(3)">← Back</button><span class="fpage-ind">4 / 7</span><button class="fbtn fbtn-primary" onclick="ffStep(5)">Next →</button></div>
          </div>

          <div class="fstep" id="ff-s5">
            <div class="fsection">
              <div class="fsection-label">Section 5 of 7</div>
              <div class="fsection-title">Dental &amp; oral history</div>
              <div class="fsection-hint">Help us understand your dental journey and any concerns you've noticed.</div>
              <div class="fdivider">Dental visit history</div>
              <div class="fgrid2">
                <div class="ffield"><label>Last dental visit</label><select id="ff-last-visit"><option value="">Select</option><option>Less than 6 months ago</option><option>6–12 months ago</option><option>1–2 years ago</option><option>More than 2 years ago</option><option>First dental visit</option></select></div>
                <div class="ffield"><label>Reason for last visit</label><input type="text" id="ff-last-reason" placeholder="e.g. routine check-up, pain..."></div>
              </div>
              <div class="fdivider">Current oral symptoms</div>
              <div class="fchecks" id="ff-g-oral-symptoms">
                <label class="fcheck-row"><input type="checkbox"><span>Tooth sensitivity (hot / cold)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Tooth pain / throbbing</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Bleeding gums</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Swollen / tender gums</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Loose teeth</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Gum recession</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Dry mouth (xerostomia)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Burning mouth / tongue</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Bad breath (halitosis)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Altered taste</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Mouth sores / ulcers</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Jaw pain or clicking</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Clenching / teeth grinding</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Difficulty chewing</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Difficulty opening mouth wide</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Angular cheilitis (cracks at corners)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Frequent cavities</span></label>
              </div>
              <div class="fdivider">Oral hygiene habits</div>
              <div class="fgrid2">
                <div class="ffield"><label>Brushing frequency</label><select id="ff-brush"><option value="">Select</option><option>Once a day</option><option>Twice a day</option><option>After every meal</option><option>Irregular</option></select></div>
                <div class="ffield"><label>Flossing frequency</label><select id="ff-floss"><option value="">Select</option><option>Daily</option><option>A few times a week</option><option>Rarely</option><option>Never</option></select></div>
                <div class="ffield"><label>Toothpaste type</label><input type="text" id="ff-toothpaste" placeholder="Brand / fluoride / natural"></div>
                <div class="ffield"><label>Mouthwash used</label><input type="text" id="ff-mouthwash" placeholder="Brand or none"></div>
              </div>
              <div class="fchecks" id="ff-g-hygiene-extras" style="margin-top:10px;">
                <label class="fcheck-row"><input type="checkbox"><span>Oil pulling</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Tongue scraping</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Water flosser</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Interdental brush</span></label>
              </div>
              <div class="fdivider">Previous dental treatment</div>
              <div class="fchecks" id="ff-g-prev-dental">
                <label class="fcheck-row"><input type="checkbox"><span>Fillings (amalgam / composite)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Root canal treatment(s)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Crowns / bridges</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Implants</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Tooth extractions</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Orthodontic treatment</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Night guard / splint</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Teeth whitening</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Veneers</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Periodontal treatment</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Amalgam removal</span></label>
              </div>
              <div class="fdivider">Dental anxiety</div>
              <div class="ffield"><label>Dental anxiety level</label>
                <div class="fscale-row"><span>None</span><input type="range" id="ff-anxiety" min="0" max="10" value="3" oninput="document.getElementById('ff-anxiety-val').textContent=this.value"><span class="fscale-val" id="ff-anxiety-val">3</span><span>Severe</span></div>
              </div>
              <div class="ffield" style="margin-top:0.9rem;"><label>Past traumatic dental experience?</label><textarea id="ff-dental-trauma" placeholder="Optional — please share if comfortable"></textarea></div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="ffStep(4)">← Back</button><span class="fpage-ind">5 / 7</span><button class="fbtn fbtn-primary" onclick="ffStep(6)">Next →</button></div>
          </div>

          <div class="fstep" id="ff-s6">
            <div class="fsection">
              <div class="fsection-label">Section 6 of 7</div>
              <div class="fsection-title">Hormonal health &amp; environmental exposure</div>
              <div class="fsection-hint">These factors significantly influence oral and systemic health.</div>
              <div class="fdivider">Hormonal &amp; reproductive health (if applicable)</div>
              <div class="fchecks" id="ff-g-hormonal">
                <label class="fcheck-row"><input type="checkbox"><span>Currently pregnant</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Planning to conceive</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Breastfeeding</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Perimenopause</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Post-menopause</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>On hormonal contraceptives</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>On hormone replacement therapy</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>History of fertility treatment</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Irregular menstrual cycle</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Severe PMS / PMDD</span></label>
              </div>
              <div class="ffield" style="margin-top:0.9rem;"><label>Oral / gum changes related to hormonal changes?</label><textarea id="ff-hormonal-oral" placeholder="e.g. bleeding in pregnancy, sensitivity around periods..."></textarea></div>
              <div class="fdivider">Environmental &amp; toxic exposure</div>
              <div class="finfobox">Exposure to certain metals, chemicals, and environmental toxins can affect inflammation, immune response, and oral health.</div>
              <div class="fchecks" id="ff-g-toxins">
                <label class="fcheck-row"><input type="checkbox"><span>Occupational chemical exposure</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Heavy metal exposure</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Mould / damp living conditions</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Use of plastic cookware / containers</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Conventional (non-organic) diet</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>High urban air pollution exposure</span></label>
              </div>
              <div class="ffield" style="margin-top:0.9rem;"><label>Do you have amalgam (silver) fillings?</label><select id="ff-amalgam"><option value="">Select</option><option>Yes, several</option><option>Yes, one or two</option><option>No</option><option>Removed previously</option><option>Not sure</option></select></div>
              <div class="ffield"><label>Known metal sensitivities or reactions to dental materials?</label><textarea id="ff-metal-sensitivity" placeholder="e.g. reactions to metal jewellery..."></textarea></div>
              <div class="fdivider">Recent investigations</div>
              <div class="ffield"><label>Blood tests, imaging, or lab reports in the past 12 months?</label><textarea id="ff-recent-labs" placeholder="List or bring reports to your appointment..."></textarea></div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="ffStep(5)">← Back</button><span class="fpage-ind">6 / 7</span><button class="fbtn fbtn-primary" onclick="ffStep(7)">Next →</button></div>
          </div>

          <div class="fstep" id="ff-s7">
            <div class="fsection">
              <div class="fsection-label">Section 7 of 7</div>
              <div class="fsection-title">Consent &amp; declaration</div>
              <div class="fsection-hint">Please read carefully and sign below.</div>
              <div class="fconsent-box">I confirm that the information provided in this form is accurate and complete to the best of my knowledge. I understand that functional dentistry consultations may include discussions about nutrition, lifestyle, systemic health, and referrals to other health professionals. I consent to my information being used by the clinical team to guide my care, and I understand that this information is confidential and protected. I give consent for clinical photographs and necessary diagnostic records to be taken and stored as part of my dental record. I may withdraw consent at any time by informing the clinic in writing.</div>
              <div class="fgrid2">
                <div class="ffield"><label>Patient signature</label><input class="fsig" type="text" id="ff-sig" placeholder="Type full name as signature"></div>
                <div class="ffield"><label>Date</label><input type="date" id="ff-sig-date"></div>
              </div>
              <div class="ffield" style="margin-top:0.9rem;"><label>If signing on behalf of patient — relationship</label><input type="text" id="ff-guardian" placeholder="Leave blank if signing for yourself"></div>
              <div style="margin-top:1.1rem;"><label class="fcheck-row"><input type="checkbox" id="ff-consent-check"><span style="font-size:12.5px;">I have read and understood the above consent statement</span></label></div>
            </div>
            <div class="fnav">
              <button class="fbtn" onclick="ffStep(6)">← Back</button>
              <span class="fpage-ind">7 / 7</span>
              <button class="fbtn fbtn-submit" onclick="ffSubmit()">Submit &amp; generate summary ✓</button>
            </div>
          </div>

        </div><!-- /ff-steps -->

        <div class="fsum-screen" id="ff-summary">
          <div class="fsum-banner">
            <div class="fsum-icon">✓</div>
            <div>
              <div class="fsum-title" id="ff-sum-name">Intake submitted</div>
              <div class="fsum-sub" id="ff-sum-time">Ready for Dr. Priyanka</div>
            </div>
          </div>
          <div class="finst-box">
            <div class="finst-row"><span class="finst-num">1</span><span>Copy the full prompt below.</span></div>
            <div class="finst-row"><span class="finst-num">2</span><span>Open <strong>Claude.ai</strong> and paste — your clinical briefing PDF will be ready in seconds.</span></div>
          </div>
          <div class="fsum-block">
            <div class="fsum-block-hdr">
              <span class="fsum-block-label">Full prompt — paste into Claude.ai</span>
              <button class="fcopy-btn" id="ff-copy-btn" onclick="ffCopy('ff-prompt-text','ff-copy-btn','Copy prompt')">Copy prompt</button>
            </div>
            <pre class="fsum-pre" id="ff-prompt-text"></pre>
          </div>
          <div class="fsum-block">
            <div class="fsum-block-hdr">
              <span class="fsum-block-label">Patient data only</span>
              <button class="fcopy-btn" id="ff-copy-data-btn" onclick="ffCopy('ff-data-text','ff-copy-data-btn','Copy data')">Copy data</button>
            </div>
            <pre class="fsum-pre" id="ff-data-text"></pre>
          </div>
          <div class="fsum-divider">Next step</div>
          <div class="fstep2-banner">
            <div class="fstep2-banner-title">Ready for your consultation?</div>
            <div class="fstep2-banner-desc">Once Dr. Priyanka has reviewed the briefing, proceed to the full functional clinical examination form.</div>
          </div>
          <div class="fsum-footer">
            <button class="fghost-btn" onclick="ffReset()">↺ New patient</button>
            <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;align-items:center;">
              <a href="https://claude.ai" target="_blank" class="fclaude-btn">Open Claude.ai →</a>
              <button class="fproceed-btn" onclick="goToScreen('screen-exam-full')">
                Proceed to consultation <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

      </div><!-- /form-body-inner -->
    </div><!-- /form-card -->
  </div><!-- /form-page-wrap -->
</div>



<!-- ══ SCREEN — SIMPLE SYMPTOM CONSULTATION FORM ══ -->
<div class="screen" id="screen-exam-simple">
  <button class="btn-back" onclick="goToScreen('screen-form-simple')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back
  </button>
  <div class="form-page-wrap" style="margin-top:3.5rem;">
    <div class="form-card">

      <div class="form-hdr">
        <div class="form-hdr-top">
          <div>
            <div class="form-hdr-clinic">Functional Dentistry</div>
            <div class="form-hdr-sub">Dr. Priyanka Dhondaley · Bengaluru</div>
          </div>
          <span class="form-hdr-badge">Symptom Consultation</span>
        </div>
        <div class="form-hdr-title">Clinical Examination</div>
        <div class="form-hdr-desc">For clinician use. A focused, symptom-based record of today's findings and treatment plan.</div>
      </div>

      <div class="form-progress-wrap">
        <div class="form-progress-bar"><div class="form-progress-fill" id="se-fill" style="width:25%"></div></div>
        <div class="form-progress-label" id="se-label">Section 1 of 4</div>
      </div>

      <div class="form-body-inner">
        <div id="se-steps">

          <!-- SE Step 1: Patient & Chief Complaint -->
          <div class="fstep active" id="se-s1">
            <div class="fsection">
              <div class="fsection-label">Section 1 of 4</div>
              <div class="fsection-title">Patient & chief complaint</div>
              <div class="fgrid2">
                <div class="ffield ffull"><label>Patient name</label><input type="text" id="se-name"></div>
                <div class="ffield"><label>Age</label><input type="number" id="se-age" min="1" max="120"></div>
                <div class="ffield"><label>Examination date</label><input type="date" id="se-date"></div>
                <div class="ffield"><label>File number</label><input type="text" id="se-file"></div>
                <div class="ffield"><label>Consultation type</label><select id="se-type"><option>New patient — symptom-based</option><option>Follow-up</option><option>Review</option></select></div>
              </div>
              <div class="fdivider">Presenting complaint</div>
              <div class="ffield"><label>Chief complaint (in patient's words)</label><textarea id="se-complaint" placeholder="e.g. tooth has been aching for two weeks, gums bleed when brushing..."></textarea></div>
              <div class="fgrid2">
                <div class="ffield"><label>Duration</label><select id="se-duration"><option value="">Select</option><option>A few days</option><option>1–4 weeks</option><option>1–6 months</option><option>More than 6 months</option></select></div>
                <div class="ffield"><label>Pain / discomfort score (0–10)</label><input type="number" id="se-pain" min="0" max="10" placeholder="0 = none, 10 = worst"></div>
              </div>
              <div class="fdivider">Pain character</div>
              <div class="fchecks">
                <label class="fcheck-row"><input type="checkbox"><span>Spontaneous</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>On biting / pressure</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Cold sensitive</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Hot sensitive</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Lingering after stimulus</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Sharp and transient</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Dull / throbbing</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Swelling present</span></label>
              </div>
            </div>
            <div class="fnav"><span class="fpage-ind">1 / 4</span><button class="fbtn fbtn-primary" onclick="seStep(2)">Next →</button></div>
          </div>

          <!-- SE Step 2: Clinical Findings -->
          <div class="fstep" id="se-s2">
            <div class="fsection">
              <div class="fsection-label">Section 2 of 4</div>
              <div class="fsection-title">Clinical findings</div>
              <div class="fdivider">Tooth / teeth involved</div>
              <div class="fgrid2">
                <div class="ffield"><label>Tooth / teeth (FDI notation)</label><input type="text" id="se-tooth" placeholder="e.g. 26, 36 — or describe region"></div>
                <div class="ffield"><label>Vitality test result</label><select id="se-vitality"><option value="">Select</option><option>Normal response</option><option>Exaggerated / hypersensitive</option><option>Diminished response</option><option>Non-vital (no response)</option><option>Not tested</option></select></div>
                <div class="ffield"><label>Percussion test</label><select id="se-percussion"><option value="">Select</option><option>Negative (no pain)</option><option>Positive (tender)</option><option>Not tested</option></select></div>
                <div class="ffield"><label>Palpation</label><select id="se-palpation"><option value="">Select</option><option>Negative</option><option>Positive — labial/buccal</option><option>Positive — palatal/lingual</option><option>Swelling present</option><option>Not tested</option></select></div>
              </div>
              <div class="fdivider">Periodontal findings</div>
              <div class="fgrid2">
                <div class="ffield"><label>Probing depths (affected area)</label><input type="text" id="se-probing" placeholder="e.g. 3–4 mm mesial, 2 mm distal"></div>
                <div class="ffield"><label>Bleeding on probing</label><select id="se-bop"><option value="">Select</option><option>None</option><option>Localised</option><option>Generalised</option></select></div>
                <div class="ffield"><label>Gingival status</label><select id="se-gingiva"><option value="">Select</option><option>Normal</option><option>Inflamed / erythematous</option><option>Swollen</option><option>Receded</option><option>Hyperplastic</option></select></div>
                <div class="ffield"><label>Mobility</label><select id="se-mobility"><option value="">Select</option><option>None (Grade 0)</option><option>Grade I — slight</option><option>Grade II — moderate</option><option>Grade III — severe</option></select></div>
              </div>
              <div class="fdivider">Radiographic findings</div>
              <div class="fgrid2">
                <div class="ffield"><label>Radiograph taken</label><select id="se-xray-type"><option value="">Select</option><option>IOPAR — periapical</option><option>Bitewing</option><option>OPG</option><option>None taken today</option></select></div>
                <div class="ffield"><label>Radiographic findings</label><select id="se-xray-findings"><option value="">Select</option><option>No abnormality detected</option><option>Caries — enamel</option><option>Caries — dentine</option><option>Periapical rarefaction</option><option>Bone loss</option><option>Widened PDL space</option><option>Root fracture suspected</option></select></div>
              </div>
              <div class="ffield"><label>Additional radiographic notes</label><input type="text" id="se-xray-notes" placeholder="Any further findings..."></div>
              <div class="fdivider">Caries assessment</div>
              <div class="fgrid2">
                <div class="ffield"><label>Caries present?</label><select id="se-caries"><option value="">Select</option><option>None</option><option>Enamel caries</option><option>Dentine caries — not involving pulp</option><option>Dentine caries — approaching pulp</option><option>Pulp involvement likely</option></select></div>
                <div class="ffield"><label>Existing restoration?</label><input type="text" id="se-restoration" placeholder="e.g. MOD composite, amalgam crown..."></div>
              </div>
              <div class="ffield"><label>Clinical notes</label><textarea id="se-clinical-notes" placeholder="Any additional clinical observations..."></textarea></div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="seStep(1)">← Back</button><span class="fpage-ind">2 / 4</span><button class="fbtn fbtn-primary" onclick="seStep(3)">Next →</button></div>
          </div>

          <!-- SE Step 3: Diagnosis & Treatment -->
          <div class="fstep" id="se-s3">
            <div class="fsection">
              <div class="fsection-label">Section 3 of 4</div>
              <div class="fsection-title">Diagnosis & treatment</div>
              <div class="fdivider">Diagnosis</div>
              <div class="ffield"><label>Working diagnosis</label>
                <select id="se-diagnosis">
                  <option value="">Select</option>
                  <option>Reversible pulpitis</option>
                  <option>Irreversible pulpitis</option>
                  <option>Pulp necrosis</option>
                  <option>Acute apical periodontitis</option>
                  <option>Chronic apical periodontitis</option>
                  <option>Acute apical abscess</option>
                  <option>Dentine hypersensitivity</option>
                  <option>Gingivitis</option>
                  <option>Periodontitis</option>
                  <option>Cracked tooth syndrome</option>
                  <option>Dental erosion</option>
                  <option>Dental attrition</option>
                  <option>Secondary / recurrent caries</option>
                  <option>Failed / fractured restoration</option>
                  <option>Other — see notes</option>
                </select>
              </div>
              <div class="ffield"><label>Diagnosis notes / differential</label><textarea id="se-diagnosis-notes" placeholder="Any additional diagnostic notes or differentials..."></textarea></div>
              <div class="fdivider">Treatment provided today</div>
              <div class="fchecks" id="se-g-tx">
                <label class="fcheck-row"><input type="checkbox"><span>Examination &amp; radiograph only</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Scaling / debridement</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Caries removal</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Composite restoration</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Amalgam restoration</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Glass ionomer restoration</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Pulp capping (direct / indirect)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Root canal treatment commenced</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Root canal treatment completed</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Extraction</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Desensitising agent applied</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Temporary restoration placed</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Medication / prescription given</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Advice / home care given</span></label>
              </div>
              <div class="ffield"><label>Treatment notes / materials used</label><textarea id="se-tx-notes" placeholder="e.g. MOD composite resin, shade A2, rubber dam used..."></textarea></div>
              <div class="fdivider">Prescription / medication</div>
              <div class="ffield"><label>Medications prescribed (if any)</label><textarea id="se-rx" placeholder="Drug, dose, duration — e.g. Amoxicillin 500mg TID x 5 days, Ibuprofen 400mg PRN"></textarea></div>
              <div class="fdivider">Further treatment needed</div>
              <div class="ffield"><label>Recommended next steps</label><textarea id="se-next-tx" placeholder="e.g. Crown placement, RCT completion, review in 2 weeks, monitor..."></textarea></div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="seStep(2)">← Back</button><span class="fpage-ind">3 / 4</span><button class="fbtn fbtn-primary" onclick="seStep(4)">Next →</button></div>
          </div>

          <!-- SE Step 4: Patient Communication & Sign-off -->
          <div class="fstep" id="se-s4">
            <div class="fsection">
              <div class="fsection-label">Section 4 of 4</div>
              <div class="fsection-title">Patient communication & sign-off</div>
              <div class="fdivider">What was communicated to the patient today</div>
              <div class="ffield"><label>Diagnosis explained</label><textarea id="se-explained" placeholder="What did you tell the patient about their diagnosis and treatment..."></textarea></div>
              <div class="ffield"><label>Home care advice given</label><textarea id="se-homecare" placeholder="e.g. avoid cold foods for 48 hrs, use sensitive toothpaste, avoid that side..."></textarea></div>
              <div class="fdivider">Post-operative instructions</div>
              <div class="fchecks">
                <label class="fcheck-row"><input type="checkbox"><span>Soft diet advice given</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Avoid biting on treated side</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Pain management explained</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Warning signs explained (pain, swelling, fever)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Contact number given for emergencies</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Patient understood and verbally consented</span></label>
              </div>
              <div class="fdivider">Follow-up</div>
              <div class="fgrid2">
                <div class="ffield"><label>Next appointment</label><input type="text" id="se-next-appt" placeholder="Date / procedure"></div>
                <div class="ffield"><label>Recall interval</label><select id="se-recall"><option value="">Select</option><option>2 weeks — review</option><option>1 month</option><option>3 months</option><option>6 months</option><option>1 year</option><option>As needed</option></select></div>
              </div>
              <div class="fdivider">Clinician sign-off</div>
              <div class="fgrid2">
                <div class="ffield"><label>Clinician</label><input type="text" value="Dr. Priyanka Dhondaley" readonly style="opacity:0.55;cursor:not-allowed;font-style:italic;"></div>
                <div class="ffield"><label>Date signed</label><input type="date" id="se-sign-date"></div>
              </div>
            </div>
            <div class="fnav">
              <button class="fbtn" onclick="seStep(3)">← Back</button>
              <span class="fpage-ind">4 / 4</span>
              <button class="fbtn fbtn-submit" onclick="seSubmit()">Save record ✓</button>
            </div>
          </div>

        </div><!-- /se-steps -->

        <!-- Saved confirmation -->
        <div class="fsum-screen" id="se-saved">
          <div class="fsum-banner">
            <div class="fsum-icon">✓</div>
            <div>
              <div class="fsum-title" id="se-saved-name">Consultation record saved</div>
              <div class="fsum-sub" id="se-saved-time">Record complete</div>
            </div>
          </div>
          <div class="finfobox" style="margin-bottom:1rem;">
            The consultation record has been completed. To generate a treatment report PDF, copy the summary below and paste it into Claude.ai.
          </div>
          <div class="fsum-block">
            <div class="fsum-block-hdr">
              <span class="fsum-block-label">Consultation summary — paste into Claude.ai for treatment report PDF</span>
              <button class="fcopy-btn" id="se-copy-btn" onclick="seCopy()">Copy</button>
            </div>
            <pre class="fsum-pre" id="se-summary-text"></pre>
          </div>
          <div class="fsum-footer">
            <button class="fghost-btn" onclick="seReset()">↺ New patient</button>
            <a href="https://claude.ai" target="_blank" class="fclaude-btn">Open Claude.ai →</a>
          </div>
        </div>

      </div><!-- /form-body-inner -->
    </div><!-- /form-card -->
  </div>
</div>


<!-- ══ SCREEN — FULL FUNCTIONAL EXAMINATION FORM ══ -->
<div class="screen" id="screen-exam-full">
  <button class="btn-back" onclick="goToScreen('screen-form-full')" style="position:absolute;top:1.25rem;left:1.5rem;z-index:10;">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back
  </button>
  <div class="form-page-wrap" style="margin-top:3.5rem;">
    <div class="form-card">

      <div class="form-hdr">
        <div class="form-hdr-top">
          <div>
            <div class="form-hdr-clinic">Functional Dentistry</div>
            <div class="form-hdr-sub">Dr. Priyanka Dhondaley · Bengaluru</div>
          </div>
          <span class="form-hdr-badge">Clinical Examination</span>
        </div>
        <div class="form-hdr-title">Clinical Examination Record</div>
        <div class="form-hdr-desc">For clinician use only. Complete all sections, then submit to generate the treatment planning prompt.</div>
      </div>

      <div class="form-progress-wrap">
        <div class="form-progress-bar"><div class="form-progress-fill" id="xe-fill" style="width:16%"></div></div>
        <div class="form-progress-label" id="xe-label">Section 1 of 6</div>
      </div>

      <div class="form-body-inner">
        <div id="xe-steps">

          <!-- XE Step 1: Patient ID -->
          <div class="fstep active" id="xe-s1">
            <div class="fsection">
              <div class="fsection-label">Section 1 of 6</div>
              <div class="fsection-title">Patient identification</div>
              <div class="fsection-hint">To be completed by Dr. Priyanka Dhondaley or designated clinician.</div>
              <div class="fgrid2">
                <div class="ffield ffull"><label>Patient name</label><input type="text" id="xe-name"></div>
                <div class="ffield"><label>Patient ID / file number</label><input type="text" id="xe-id"></div>
                <div class="ffield"><label>Examination date</label><input type="date" id="xe-date"></div>
                <div class="ffield"><label>Clinician</label><input type="text" value="Dr. Priyanka Dhondaley" readonly></div>
                <div class="ffield"><label>Consultation type</label><select id="xe-type"><option>New patient — functional consult</option><option>Follow-up</option><option>Second opinion</option><option>Review</option></select></div>
                <div class="ffield"><label>Referral source</label><input type="text" id="xe-ref"></div>
              </div>
            </div>
            <div class="fnav"><span class="fpage-ind">1 / 6</span><button class="fbtn fbtn-primary" onclick="xeStep(2)">Next →</button></div>
          </div>

          <!-- XE Step 2: Extraoral -->
          <div class="fstep" id="xe-s2">
            <div class="fsection">
              <div class="fsection-label">Section 2 of 6</div>
              <div class="fsection-title">Extraoral examination</div>
              <div class="fdivider">General observations</div>
              <div class="fgrid2">
                <div class="ffield"><label>Facial symmetry</label><select id="xe-symmetry"><option value="">Select</option><option>Symmetrical</option><option>Mild asymmetry</option><option>Moderate asymmetry</option><option>Severe asymmetry</option></select></div>
                <div class="ffield"><label>Facial profile</label><select id="xe-profile"><option value="">Select</option><option>Orthognathic (straight)</option><option>Convex</option><option>Concave</option></select></div>
                <div class="ffield"><label>Vertical face height</label><select id="xe-vfh"><option value="">Select</option><option>Normal</option><option>Increased</option><option>Decreased</option></select></div>
                <div class="ffield"><label>Facial muscle tone</label><select id="xe-muscle-tone"><option value="">Select</option><option>Normal</option><option>Hypertonic</option><option>Hypotonic</option></select></div>
              </div>
              <div class="fdivider">Airway &amp; breathing screen</div>
              <div class="fchecks" id="xe-g-airway">
                <label class="fcheck-row"><input type="checkbox"><span>Mouth breathing at rest</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Lip incompetence</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Long lower face height</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Retrognathic mandible</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Dark circles under eyes</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Allergic shiners / nasal crease</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Deviated nasal septum (visible)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Nasal flaring on breathing</span></label>
              </div>
              <div class="ffield"><label>Airway questionnaire score (ESS / STOP-BANG / Berlin)</label><input type="text" id="xe-airway-score" placeholder="Tool used and score"></div>
              <div class="fdivider">Lymph nodes</div>
              <div class="fchecks" id="xe-g-lymph">
                <label class="fcheck-row"><input type="checkbox"><span>Submandibular — palpable</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Cervical — palpable</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Submental — palpable</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Preauricular — palpable</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Tender on palpation</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Fixed / indurated</span></label>
              </div>
              <div class="fdivider">TMJ examination</div>
              <div class="fgrid2">
                <div class="ffield"><label>Maximum mouth opening (mm)</label><input type="number" id="xe-mmo" placeholder="mm"></div>
                <div class="ffield"><label>Opening pattern</label><select id="xe-opening"><option value="">Select</option><option>Straight</option><option>Deviation (right)</option><option>Deviation (left)</option><option>Deflection (right)</option><option>Deflection (left)</option></select></div>
                <div class="ffield"><label>Joint sounds — right</label><select id="xe-tmj-r"><option value="">Select</option><option>None</option><option>Click (opening)</option><option>Click (closing)</option><option>Reciprocal click</option><option>Crepitus</option></select></div>
                <div class="ffield"><label>Joint sounds — left</label><select id="xe-tmj-l"><option value="">Select</option><option>None</option><option>Click (opening)</option><option>Click (closing)</option><option>Reciprocal click</option><option>Crepitus</option></select></div>
              </div>
              <div class="fdivider">Muscle palpation</div>
              <div class="muscle-head" style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;padding:4px 0;border-bottom:0.5px solid var(--sand);margin-bottom:6px;">
                <span style="font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;color:var(--earth);">Muscle</span>
                <span style="font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;color:var(--earth);">Right</span>
                <span style="font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;color:var(--earth);">Left</span>
              </div>
              <div id="xe-muscle-rows"></div>
              <div class="fdivider">Skin &amp; nutritional clues</div>
              <div class="fchecks" id="xe-g-skin">
                <label class="fcheck-row"><input type="checkbox"><span>Pale conjunctiva / skin (anaemia clue)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Brittle / ridged nails</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Hair thinning</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Angular cheilitis</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Perioral dryness / scaling</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Facial puffiness / oedema</span></label>
              </div>
              <div class="ffield"><label>Extraoral notes</label><textarea id="xe-extraoral-notes" placeholder="Additional observations..."></textarea></div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="xeStep(1)">← Back</button><span class="fpage-ind">2 / 6</span><button class="fbtn fbtn-primary" onclick="xeStep(3)">Next →</button></div>
          </div>

          <!-- XE Step 3: Intraoral -->
          <div class="fstep" id="xe-s3">
            <div class="fsection">
              <div class="fsection-label">Section 3 of 6</div>
              <div class="fsection-title">Intraoral examination</div>
              <div class="fdivider">Soft tissues</div>
              <div class="fgrid2">
                <div class="ffield"><label>Lips</label><input type="text" id="xe-lips" placeholder="Normal / dry / cracked..."></div>
                <div class="ffield"><label>Buccal mucosa</label><input type="text" id="xe-buccal" placeholder="Normal / linea alba / ulcer..."></div>
                <div class="ffield"><label>Tongue — size</label><select id="xe-tongue-size"><option value="">Select</option><option>Normal</option><option>Macroglossia</option><option>Microglossia</option></select></div>
                <div class="ffield"><label>Tongue — posture</label><select id="xe-tongue-posture"><option value="">Select</option><option>Normal (palatal)</option><option>Low / forward</option><option>Lateral thrust</option></select></div>
                <div class="ffield"><label>Tongue — dorsum</label><input type="text" id="xe-tongue-dorsum" placeholder="Scalloped / coated / geographic..."></div>
                <div class="ffield"><label>Frenulum</label><select id="xe-frenulum"><option value="">Select</option><option>Normal</option><option>High labial frenum</option><option>Lingual tie (tongue-tie)</option><option>Buccal tie</option></select></div>
                <div class="ffield"><label>Hard palate</label><input type="text" id="xe-palate" placeholder="Normal / high-arched / torus palatinus..."></div>
                <div class="ffield"><label>Soft palate / oropharynx</label><input type="text" id="xe-oropharynx" placeholder="Mallampati class / tonsil grade..."></div>
                <div class="ffield"><label>Floor of mouth</label><input type="text" id="xe-floor" placeholder="Normal / indurated / varicosities..."></div>
                <div class="ffield"><label>Salivary flow</label><select id="xe-saliva"><option value="">Select</option><option>Normal</option><option>Reduced (xerostomia)</option><option>Increased (sialorrhoea)</option></select></div>
              </div>
              <div class="fdivider">Halitosis &amp; microbiome screen</div>
              <div class="fgrid2">
                <div class="ffield"><label>Halitosis</label><select id="xe-halitosis"><option value="">Select</option><option>None</option><option>Mild</option><option>Moderate</option><option>Severe</option></select></div>
                <div class="ffield"><label>Likely origin</label><select id="xe-halitosis-origin"><option value="">Select</option><option>Not applicable</option><option>Tongue coating</option><option>Periodontal</option><option>Systemic / metabolic</option><option>Unclear</option></select></div>
                <div class="ffield"><label>Oral microbiome test ordered?</label><select id="xe-microbiome"><option value="">Select</option><option>Yes — ordered</option><option>Pending discussion</option><option>Not indicated at this time</option></select></div>
                <div class="ffield"><label>Salivary pH (if tested)</label><input type="text" id="xe-ph" placeholder="e.g. 6.8"></div>
              </div>
              <div class="fdivider">Periodontal assessment</div>
              <div class="fgrid2">
                <div class="ffield"><label>BPE / Periodontal screening score</label><input type="text" id="xe-bpe" placeholder="Per sextant scores"></div>
                <div class="ffield"><label>Bleeding on probing</label><select id="xe-bop"><option value="">Select</option><option>None</option><option>Localised (&lt;10%)</option><option>Generalised (10–30%)</option><option>Extensive (&gt;30%)</option></select></div>
                <div class="ffield"><label>Furcation involvement</label><select id="xe-furcation"><option value="">Select</option><option>None</option><option>Class I</option><option>Class II</option><option>Class III</option></select></div>
                <div class="ffield"><label>Recession (generalised)</label><select id="xe-recession"><option value="">Select</option><option>None</option><option>Mild</option><option>Moderate</option><option>Severe</option></select></div>
                <div class="ffield"><label>Bone loss (radiographic)</label><select id="xe-bone-loss"><option value="">Select</option><option>None evident</option><option>Mild horizontal</option><option>Moderate horizontal</option><option>Severe / vertical</option></select></div>
                <div class="ffield"><label>Periodontal staging (2017)</label><select id="xe-perio-stage"><option value="">Select</option><option>Stage I</option><option>Stage II</option><option>Stage III</option><option>Stage IV</option></select></div>
              </div>
              <div class="fdivider">Nutritional oral clues</div>
              <div class="fchecks" id="xe-g-nutrition">
                <label class="fcheck-row"><input type="checkbox"><span>Glossitis (smooth red tongue)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Angular cheilitis</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Burning tongue / BMS</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Delayed healing / ulcers</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Enamel hypoplasia</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Generalised demineralisation</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Gingival hyperplasia</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Pallor of mucosa</span></label>
              </div>
              <div class="ffield"><label>Intraoral notes</label><textarea id="xe-intraoral-notes" placeholder="Additional observations..."></textarea></div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="xeStep(2)">← Back</button><span class="fpage-ind">3 / 6</span><button class="fbtn fbtn-primary" onclick="xeStep(4)">Next →</button></div>
          </div>

          <!-- XE Step 4: Dental & Occlusion -->
          <div class="fstep" id="xe-s4">
            <div class="fsection">
              <div class="fsection-label">Section 4 of 6</div>
              <div class="fsection-title">Dental status &amp; occlusion</div>
              <div class="fdivider">Dental charting summary</div>
              <div class="finfobox">Detailed charting to be completed in clinical software. Record summary findings below.</div>
              <div class="fgrid2">
                <div class="ffield"><label>Number of teeth present</label><input type="number" id="xe-teeth-count" min="0" max="32"></div>
                <div class="ffield"><label>Missing teeth (FDI notation)</label><input type="text" id="xe-missing" placeholder="e.g. 16, 26, 36..."></div>
                <div class="ffield"><label>Caries activity</label><select id="xe-caries"><option value="">Select</option><option>None</option><option>Low</option><option>Moderate</option><option>High</option><option>Rampant</option></select></div>
                <div class="ffield"><label>Caries risk level</label><select id="xe-caries-risk"><option value="">Select</option><option>Low</option><option>Moderate</option><option>High</option></select></div>
                <div class="ffield"><label>Existing restorations</label><input type="text" id="xe-restorations" placeholder="Composite, amalgam, crowns, RCT..."></div>
                <div class="ffield"><label>Existing implants</label><input type="text" id="xe-implants" placeholder="Location / type / condition"></div>
              </div>
              <div class="fdivider">Tooth wear</div>
              <div class="fgrid2">
                <div class="ffield"><label>Wear type</label><select id="xe-wear-type"><option value="">Select</option><option>None</option><option>Attrition</option><option>Erosion</option><option>Abrasion</option><option>Abfraction</option><option>Mixed</option></select></div>
                <div class="ffield"><label>Wear severity</label><select id="xe-wear-sev"><option value="">Select</option><option>Not applicable</option><option>Mild</option><option>Moderate</option><option>Severe</option></select></div>
                <div class="ffield"><label>BEWE score</label><input type="text" id="xe-bewe" placeholder="Total BEWE score"></div>
                <div class="ffield"><label>Likely aetiology</label><input type="text" id="xe-wear-cause" placeholder="Acid / parafunction / dietary..."></div>
              </div>
              <div class="fdivider">Occlusion</div>
              <div class="fgrid2">
                <div class="ffield"><label>Angle's classification</label><select id="xe-angles"><option value="">Select</option><option>Class I</option><option>Class II Div 1</option><option>Class II Div 2</option><option>Class III</option></select></div>
                <div class="ffield"><label>Overjet (mm)</label><input type="number" id="xe-overjet" placeholder="mm"></div>
                <div class="ffield"><label>Overbite (mm)</label><input type="number" id="xe-overbite" placeholder="mm"></div>
                <div class="ffield"><label>Crossbite</label><select id="xe-crossbite"><option value="">Select</option><option>None</option><option>Anterior</option><option>Unilateral posterior</option><option>Bilateral posterior</option></select></div>
                <div class="ffield"><label>Upper arch width</label><select id="xe-arch-upper"><option value="">Select</option><option>Normal</option><option>Narrow (V-shaped)</option><option>Wide</option></select></div>
                <div class="ffield"><label>Lower arch width</label><select id="xe-arch-lower"><option value="">Select</option><option>Normal</option><option>Narrow</option><option>Wide</option></select></div>
                <div class="ffield"><label>Tongue space</label><select id="xe-tongue-space"><option value="">Select</option><option>Adequate</option><option>Reduced</option><option>Severely reduced</option></select></div>
                <div class="ffield"><label>Bruxism / parafunction signs</label><select id="xe-bruxism"><option value="">Select</option><option>None</option><option>Wear facets only</option><option>Scalloped tongue</option><option>Linea alba</option><option>Multiple signs</option></select></div>
              </div>
              <div class="ffield"><label>Dental notes</label><textarea id="xe-dental-notes" placeholder="Additional findings..."></textarea></div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="xeStep(3)">← Back</button><span class="fpage-ind">4 / 6</span><button class="fbtn fbtn-primary" onclick="xeStep(5)">Next →</button></div>
          </div>

          <!-- XE Step 5: Investigations & Matrix -->
          <div class="fstep" id="xe-s5">
            <div class="fsection">
              <div class="fsection-label">Section 5 of 6</div>
              <div class="fsection-title">Investigations &amp; functional matrix</div>
              <div class="fdivider">Radiographic investigations</div>
              <div class="fgrid2">
                <div class="ffield"><label>Radiographs taken today</label><input type="text" id="xe-xrays" placeholder="IOPAR, OPG, CBCT..."></div>
                <div class="ffield"><label>Previous radiographs</label><select id="xe-prev-xray"><option value="">Select</option><option>Yes — reviewed</option><option>Yes — requested</option><option>None available</option></select></div>
              </div>
              <div class="ffield"><label>Radiographic findings — summary</label><textarea id="xe-xray-findings" placeholder="Bone levels, periapical pathology, airway dimensions, sinus health, TMJ status, cavitations..."></textarea></div>
              <div class="fdivider">Lab investigations ordered</div>
              <div class="fchecks" id="xe-g-labs">
                <label class="fcheck-row"><input type="checkbox"><span>CBC with differential</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>HbA1c / fasting glucose</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Fasting insulin</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Lipid profile</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>hs-CRP</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Homocysteine</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Vitamin D (25-OH)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Vitamin B12 / folate</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Ferritin / serum iron</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Zinc / magnesium</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Thyroid panel (TSH, T3, T4)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Cortisol mapping</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Hormonal panel</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Salivary pathogen panel (PCR)</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Oral microbiome test</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Gut microbiome profile</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Heavy metal screen</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Food reactivity panel</span></label>
              </div>
              <div class="ffield"><label>Other investigations</label><input type="text" id="xe-other-labs" placeholder="Any additional tests..."></div>
              <div class="fdivider">Functional dental matrix — drivers identified</div>
              <div class="finfobox">Check all systemic and lifestyle domains contributing to this patient's oral health picture.</div>
              <div class="fchecks" id="xe-g-drivers">
                <label class="fcheck-row"><input type="checkbox"><span>Nutritional deficiency / poor diet</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Metabolic dysfunction / insulin resistance</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Gut-oral dysbiosis</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Hormonal imbalance</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Chronic stress / HPA dysregulation</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Sleep-disordered breathing</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Airway / structural issue</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Toxic burden / heavy metals</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Environmental / occupational exposure</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Immune dysfunction / autoimmunity</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Psychosocial / emotional drivers</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Poor oral hygiene / biofilm</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Medication side effects</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Cardiovascular / systemic inflammation</span></label>
              </div>
              <div class="fdivider">Interdisciplinary referrals indicated</div>
              <div class="fchecks" id="xe-g-referrals">
                <label class="fcheck-row"><input type="checkbox"><span>Integrative / functional physician</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Sleep medicine specialist</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>ENT</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Nutritionist / dietician</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Physiotherapist / myofunctional therapist</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Psychologist / therapist</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Cardiologist</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Endocrinologist</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Gastroenterologist</span></label>
                <label class="fcheck-row"><input type="checkbox"><span>Oncologist / biopsy referral</span></label>
              </div>
            </div>
            <div class="fnav"><button class="fbtn" onclick="xeStep(4)">← Back</button><span class="fpage-ind">5 / 6</span><button class="fbtn fbtn-primary" onclick="xeStep(6)">Next →</button></div>
          </div>

          <!-- XE Step 6: Clinical Summary -->
          <div class="fstep" id="xe-s6">
            <div class="fsection">
              <div class="fsection-label">Section 6 of 6</div>
              <div class="fsection-title">Clinical summary &amp; functional care plan</div>
              <div class="fdivider">Diagnoses</div>
              <div class="ffield"><label>Primary diagnosis</label><textarea id="xe-primary-dx" placeholder="e.g. Generalised periodontitis Stage III Grade B with airway risk..."></textarea></div>
              <div class="ffield"><label>Secondary / comorbid diagnoses</label><textarea id="xe-secondary-dx"></textarea></div>
              <div class="fdivider">Root-cause summary (IFM framework)</div>
              <div class="ffield"><label>Antecedents (predisposing factors)</label><textarea id="xe-antecedents" placeholder="Genetic, developmental, early-life factors..."></textarea></div>
              <div class="ffield"><label>Triggers (activating factors)</label><textarea id="xe-triggers" placeholder="Events, exposures, or changes that worsened the condition..."></textarea></div>
              <div class="ffield"><label>Mediators (perpetuating factors)</label><textarea id="xe-mediators" placeholder="Ongoing drivers — diet, stress, dysbiosis, toxin load..."></textarea></div>
              <div class="fdivider">Treatment plan — phases</div>
              <div class="ffield"><label>Phase 1 — Stabilisation / immediate</label><textarea id="xe-phase1" placeholder="Urgent dental treatment, emergency hygiene, immediate lifestyle advice..."></textarea></div>
              <div class="ffield"><label>Phase 2 — Root-cause intervention</label><textarea id="xe-phase2" placeholder="Nutritional support, microbiome treatment, lab follow-up, specialist referrals..."></textarea></div>
              <div class="ffield"><label>Phase 3 — Restorative / definitive</label><textarea id="xe-phase3" placeholder="Restorations, periodontal surgery, implants, ortho, TMD appliances..."></textarea></div>
              <div class="ffield"><label>Phase 4 — Maintenance &amp; monitoring</label><textarea id="xe-phase4" placeholder="Recall intervals, microbiome retest schedule, lifestyle coaching..."></textarea></div>
              <div class="fdivider">Patient communication</div>
              <div class="ffield"><label>Key messages communicated to patient today</label><textarea id="xe-communication" placeholder="Topics covered, patient's questions, response and understanding..."></textarea></div>
              <div class="fdivider">Clinician sign-off</div>
              <div class="fgrid2">
                <div class="ffield"><label>Clinician</label><input type="text" value="Dr. Priyanka Dhondaley" readonly style="opacity:0.55;cursor:not-allowed;font-style:italic;"></div>
                <div class="ffield"><label>Date</label><input type="date" id="xe-sign-date"></div>
              </div>
              <div class="ffield"><label>Next appointment</label><input type="text" id="xe-next-appt" placeholder="Date / type of visit"></div>
            </div>
            <div class="fnav">
              <button class="fbtn" onclick="xeStep(5)">← Back</button>
              <span class="fpage-ind">6 / 6</span>
              <button class="fbtn fbtn-submit" onclick="xeSubmit()">Submit &amp; generate prompt ✓</button>
            </div>
          </div>

        </div><!-- /xe-steps -->

        <!-- XE Summary screen -->
        <div class="fsum-screen" id="xe-summary">
          <div class="fsum-banner">
            <div class="fsum-icon">✓</div>
            <div>
              <div class="fsum-title" id="xe-sum-name">Examination record submitted</div>
              <div class="fsum-sub" id="xe-sum-time">Treatment planning prompt ready</div>
            </div>
          </div>
          <div class="finst-box">
            <div class="finst-row"><span class="finst-num">1</span><span>Copy the full prompt below.</span></div>
            <div class="finst-row"><span class="finst-num">2</span><span>Open <strong>Claude.ai</strong> and paste — your treatment planning report PDF will be ready in seconds.</span></div>
          </div>
          <div class="fsum-block">
            <div class="fsum-block-hdr">
              <span class="fsum-block-label">Full prompt — paste into Claude.ai</span>
              <button class="fcopy-btn" id="xe-copy-btn" onclick="xeCopy('xe-prompt-text','xe-copy-btn','Copy prompt')">Copy prompt</button>
            </div>
            <pre class="fsum-pre" id="xe-prompt-text"></pre>
          </div>
          <div class="fsum-block">
            <div class="fsum-block-hdr">
              <span class="fsum-block-label">Examination data only</span>
              <button class="fcopy-btn" id="xe-copy-data-btn" onclick="xeCopy('xe-data-text','xe-copy-data-btn','Copy data')">Copy data</button>
            </div>
            <pre class="fsum-pre" id="xe-data-text"></pre>
          </div>
          <div class="fsum-footer">
            <button class="fghost-btn" onclick="xeReset()">↺ New patient</button>
            <a href="https://claude.ai" target="_blank" class="fclaude-btn">Open Claude.ai →</a>
          </div>
        </div>

      </div><!-- /form-body-inner -->
    </div><!-- /form-card -->
  </div><!-- /form-page-wrap -->
</div>` }}
      style={{ minHeight: '100vh' }}
    />
  )
}
