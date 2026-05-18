// Builds the clinical prompts from saved database records
// All prompts now target the editorial PDF style —
// matching the Aniket Chhabra treatment summary template:
// dark cover page, numbered sections, editorial headings,
// navy/white/red only, generous white space, patient-facing language

const PDF_STYLE_SPEC = `
═══ PDF DESIGN SPECIFICATION — FOLLOW EXACTLY ═══

This PDF must match the American Dental Practices house style precisely.

COLOUR PALETTE — no other colours permitted:
  NAVY      = HexColor('#1a2e5a')   backgrounds, large headings
  OFF_WHITE = HexColor('#f5f3ef')   page background
  INK       = HexColor('#2c2c2a')   body text
  INK_MED   = HexColor('#5a5a56')   secondary text
  INK_LT    = HexColor('#9a9a94')   labels, hints, dividers
  RED       = HexColor('#c0392b')   urgency only: section labels, signal markers
  WHITE     = HexColor('#ffffff')

TYPOGRAPHY — two modes only:
  Editorial / display: 36–42pt, Helvetica-Bold, navy or white
  Body text: 10.5pt Helvetica, INK, leading 15pt
  Section labels: 7pt Helvetica-Bold, letter-spacing 1.5, RED, spaced uppercase
  Page numbers: 7pt Helvetica, INK_LT, top right, format "01 / 06"
  Stats: 52pt Helvetica-Bold, NAVY
  Stat labels: 9pt Helvetica, INK_LT, beneath the number
  Card labels: 7pt Helvetica-Bold, RED, spaced (e.g. "01 — Microbiome")
  Card headings: 18pt Helvetica-Bold, NAVY

MARGINS: 18mm left/right, 16mm top/bottom
SPACING: extremely generous — large gaps between elements, lots of breathing room
          The white space IS the design. Never fill every inch.

PAGE STRUCTURE — exactly 6 pages:

─── PAGE 1 — COVER ───────────────────────────────────────────────────────────
Full bleed NAVY background (#1a2e5a), no margins.

Top left: "TREATMENT SUMMARY" — 7pt, spaced, WHITE, 18mm from top-left corner

Centre of page: editorial headline — 2 to 3 short punchy lines.
  White, 40–44pt Helvetica-Bold.
  Left-aligned, starting around x=18mm, y centred slightly above midpage.
  Example: "Caught early.\nTen cavities. All still in enamel.\nAll still simple — while the\nwindow is open."

Bottom 28mm: white/off-white strip across full width.
  Four columns evenly spaced: PATIENT / AGE / PAIN / CLINICIAN
  Label in 7pt spaced uppercase INK_LT above the value.
  Value in 11pt Helvetica-Bold NAVY.

─── PAGE 2 — FINDINGS (01/06) ────────────────────────────────────────────────
Background: OFF_WHITE (#f5f3ef)
Page number "01 / 06" top right, 7pt INK_LT

Section label: "FINDINGS" — 7pt RED, spaced uppercase, 18mm from top
Editorial heading: e.g. "Where things stand." — 38pt Helvetica-Bold NAVY, below label
Body: 2 paragraphs. 10.5pt INK, leading 15. Plain English, patient-facing.
     Generous gap below body.
Thin divider rule (0.4pt INK_LT) across full column width.
Stats row: 3 large numbers (52pt NAVY bold), each with a 2-line label below (9pt INK_LT).
     Evenly spaced across full width.

─── PAGE 3 — TIMING + PRESCRIBED (02/06 + 03/06) ────────────────────────────
If timing/urgency relevant:
  Section 02: "TIMING" label, editorial heading e.g. "A window, open now."
  Body: 1 paragraph explaining the timing context.
  Two-column comparison (equal width, 6mm gap):
    Left card: navy border, label "IF TREATED NOW" (7pt RED spaced), heading, bullet points
    Right card: navy border, label "IF POSTPONED 6–12 MONTHS" (7pt RED spaced), heading, bullet points
  Cards have OFF_WHITE background, 0.5pt NAVY border, rx=4.

Section 03: "STARTED TODAY" label, heading "Four things, working in your favour."
  Body: 1 sentence connecting each product to a problem it solves.
  2x2 grid of product cards. Each card:
    - OFF_WHITE bg, 0.5pt INK_LT border, generous padding
    - Card label: "01 — Microbiome" in 7pt RED spaced uppercase
    - Product name: 18pt Helvetica-Bold NAVY
    - Description: 9.5pt INK, 2–3 sentences
    - Thin divider
    - Usage instruction: 9pt Helvetica-Italic INK_LT

─── PAGE 4 — NEXT STEPS (04/06) ─────────────────────────────────────────────
Section label "NEXT STEPS", editorial heading e.g. "Three things to book."
Subheading: "In this order. Each step makes the next one work." — 11pt INK_MED italic

Three numbered steps, each:
  - Large step number: "01" — 52pt Helvetica-Bold, NAVY, left margin
  - Timing: small spaced uppercase label, 7pt INK_LT (e.g. "THIS WEEK")
  - Step name: 18pt Helvetica-Bold NAVY
  - Body: 9.5pt INK, 2–3 sentences on why this step matters
  - Thin rule between steps

Optional: clinical principle pull-quote box between steps.
  Dark navy background, white text, centred, italic quote + label beneath.

─── PAGE 5 — HABITS + SIGNALS (05/06 + 06/06) ───────────────────────────────
Section 05: "DAILY, STARTING TOMORROW"
  Heading: "Small habits, big leverage."
  Subheading: "Anchor each to a moment that already exists in your day." — 11pt italic INK_MED
  Four habits in 2x2 grid:
    Bold number + bold habit name on same line
    Plain description on next line, 9.5pt INK_MED

Section 06: "SIGNALS"
  Heading: "Come back sooner if..."
  Body: "Any of the following means the timing has shifted. Do not wait."
  Four signals in 2x2 grid:
    Each starts with "!" in RED (10pt bold)
    Bold trigger (one line)
    Plain detail (9pt INK_MED)
  Thin divider between the two columns

─── PAGE 6 — COLOPHON ────────────────────────────────────────────────────────
Full bleed NAVY background.

Left third: "PREPARED BY" label (7pt RED spaced), then doctor name (28pt WHITE bold),
  then credentials (10pt WHITE), then clinic (9.5pt HexColor('#8899bb'))

Middle third: "MUMBAI" label, clinic location in white

Right third: "BENGALURU" label, clinic location in white

Bottom strip: thin white rule, then in tiny type:
  Left: "FILE FD-XXXXXX · DD MONTH YYYY"
  Right: "AMERICAN DENTAL PRACTICES · EST. 2011"
  Both in 7pt HexColor('#6677aa')
`

// ── Quick Relief pre-consultation briefing ────────────────────────────────────
export function buildQuickReliefPrompt(patient, intake) {
  const data = `
PATIENT: ${patient.name} | Age: ${patient.age || '—'} | Gender: ${patient.gender || '—'}
File: ${patient.file_number} | Phone: ${patient.phone || '—'}

CHIEF CONCERN
Complaint: ${intake.complaint || '—'}
Duration: ${intake.duration || '—'}
Area affected: ${intake.area_affected || '—'}
Pain level: ${intake.pain_score || '—'} / 10

HEALTH BACKGROUND
Conditions: ${intake.health_conditions || '—'}
Medications: ${intake.medications || '—'}
Allergies: ${intake.allergies || '—'}
Previous treatment for this: ${intake.previous_treatment || '—'}
Previous treatment detail: ${intake.previous_treatment_detail || '—'}
  `.trim()

  return `You are a clinical decision-support assistant specialising in functional dentistry. I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. I am about to see ${patient.name} for a Quick Relief consultation.

Generate a concise pre-consultation clinical briefing:

1. CHIEF CONCERN — clinical read of their complaint (2–3 sentences)
2. RED FLAGS — max 4, graded URGENT / WATCH / NOTE
3. FOCUS FOR TODAY — what to examine and rule out (3–4 sentences)
4. SAFETY CHECKS — allergy or medication interactions before treatment
5. CHAIR-SIDE PROMPTS — 2–3 questions to ask when they sit down

After the briefing produce a brief clinician-facing PDF:
- NAVY header band with clinic name and date in white
- Patient name band below header (off-white background)
- Sections clearly separated, body text in INK on OFF_WHITE background
- Red used only for URGENT flags
- Clean, minimal, readable in 60 seconds

Patient intake:
---
${data}`
}

// ── Full Picture pre-consultation briefing ────────────────────────────────────
export function buildFullPicturePrompt(patient, intake) {
  const conditions = Array.isArray(intake.conditions) ? intake.conditions.join(', ') : '—'
  const oralSymptoms = Array.isArray(intake.oral_symptoms) ? intake.oral_symptoms.join(', ') : '—'
  const sleepSymptoms = Array.isArray(intake.sleep_symptoms) ? intake.sleep_symptoms.join(', ') : '—'
  const stressFactors = Array.isArray(intake.stress_factors) ? intake.stress_factors.join(', ') : '—'
  const habits = Array.isArray(intake.habits) ? intake.habits.join(', ') : 'None'
  const prevDental = Array.isArray(intake.prev_dental) ? intake.prev_dental.join(', ') : '—'
  const hormonal = Array.isArray(intake.hormonal) ? intake.hormonal.join(', ') : 'None'
  const dietHabits = Array.isArray(intake.diet_habits) ? intake.diet_habits.join(', ') : 'None'
  const familyHistory = Array.isArray(intake.family_history) ? intake.family_history.join(', ') : 'None'

  const data = `
PATIENT: ${patient.name} | Age: ${patient.age || '—'} | Gender: ${patient.gender || '—'}
Occupation: ${patient.occupation || '—'} | File: ${patient.file_number}

CHIEF CONCERN: ${intake.complaint || '—'}
Duration: ${intake.duration || '—'}
Short-term goal: ${intake.goal_short || '—'}
Long-term goal: ${intake.goal_long || '—'}

MEDICAL: ${conditions} | Meds: ${intake.medications || '—'}
Allergies — drug: ${intake.allergy_drug || '—'}, food: ${intake.allergy_food || '—'}
Family history: ${familyHistory}

LIFESTYLE: ${intake.diet_type || '—'}, ${intake.meals_per_day || '—'} meals/day
Water: ${intake.water_intake || '—'} | Diet habits: ${dietHabits}
Sleep: ${intake.sleep_hours || '—'} hrs, quality ${intake.sleep_quality || '—'}
Sleep symptoms: ${sleepSymptoms}
Exercise: ${intake.exercise || '—'} | Stress: ${intake.stress_level || '—'}/10
Stress factors: ${stressFactors} | Habits: ${habits}

DENTAL: Last visit ${intake.last_visit || '—'}
Oral symptoms: ${oralSymptoms}
Brushing: ${intake.brushing || '—'} | Flossing: ${intake.flossing || '—'}
Previous dental: ${prevDental} | Anxiety: ${intake.anxiety_level ?? '—'}/10

HORMONAL / ENVIRONMENTAL: ${hormonal}
Amalgam: ${intake.amalgam || '—'} | Recent labs: ${intake.recent_labs || '—'}
  `.trim()

  return `You are a clinical decision-support assistant specialising in functional dentistry. I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. I am about to see ${patient.name} for a Full Picture functional dentistry consultation.

Generate a structured clinical briefing:

1. COMPLEXITY TIER — Low / Moderate / High / Complex, one-line rationale
2. CHIEF CONCERN — clinical reframe in functional dentistry language (2–3 sentences)
3. RED FLAGS — URGENT / WATCH / NOTE, max 6
4. SYSTEMIC DRIVERS — which body systems are contributing
5. FOCUS AREAS — what to examine carefully (3–5 sentences)
6. SUGGESTED INVESTIGATIONS — specific tests, max 8
7. CHAIR-SIDE PROMPTS — 3–4 open questions for this patient

After the briefing produce a patient-facing PDF. This PDF will be given to the patient after the consultation.

${PDF_STYLE_SPEC}

COVER HEADLINE: Write 2–3 short punchy lines capturing their situation in plain English.
Warm, honest, direct. Speak to them, not about them.
Examples of the right tone:
"The pattern is clear.\nEverything points to the same root.\nThis is where we start."
"We know what is driving this.\nAnd it is entirely fixable."

Patient intake:
---
${data}`
}

// ── Post-consultation treatment summary ───────────────────────────────────────
export function buildExamPrompt(patient, exam) {
  const raw = exam.raw_data || {}
  const isSimple = exam.exam_type === 'simple'

  return `You are a clinical decision-support assistant specialising in functional dentistry. I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. I have just completed a ${isSimple ? 'symptom-based' : 'full functional'} consultation for ${patient.name}.

Generate a patient-facing treatment summary, then produce it as a PDF.

The report must cover:
1. FINDINGS — what was found, in plain English. Include the root cause if identifiable.
2. TIMING — if any treatment is still needed, explain why now matters vs waiting. Be honest about consequences of delay (loss framing where true — e.g. "enamel-level now" vs "reaches the nerve in 6–12 months").
3. STARTED TODAY — every prescription, product or treatment done today. Each with: what it is, which part of the problem it targets, and how to use it.
4. NEXT STEPS — 3 steps maximum, each with a timing label (THIS WEEK / WITHIN 4–6 WEEKS / AT YOUR NEXT VISIT) and a clear reason why.
5. DAILY HABITS — exactly 4 habits. Each anchored to an existing moment in their day (implementation intention format: "Before brushing → tongue scrape"). Plain English.
6. SIGNALS — exactly 4 triggers to come back sooner. Each starts with "!" and is written as a plain condition, not clinical language.

After generating the content produce the PDF in this exact style:

${PDF_STYLE_SPEC}

COVER HEADLINE for ${patient.name}:
Write 2–3 short punchy lines as the cover headline. Match the tone to the clinical situation:
- If caught early / timing is good: "Caught early." / "The right time is now."
- If root cause identified: "The source is clear." / "We know what is driving this."
- If treatment completed: "Done today." / "The hard part is behind you."
- Always end on something honest and forward-looking.

The cover bottom strip must contain: PATIENT / AGE / PAIN / CLINICIAN in four columns.

The last page (colophon) must say:
PREPARED BY: Dr. Priyanka Dhondaley
Endodontist
American Dental Practices · Indiranagar, Bengaluru
Mumbai: Goregaon East — American Dental Practices
Bengaluru: Indiranagar — American Dental Practices
File number and date at the bottom.

Consultation record:
---
Patient: ${patient.name} | Age: ${patient.age || '—'} | File: ${patient.file_number}
Date: ${exam.created_at ? new Date(exam.created_at).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'}) : '—'}

Diagnosis: ${exam.diagnosis || exam.primary_diagnosis || '—'}
${exam.secondary_diagnosis ? `Secondary: ${exam.secondary_diagnosis}` : ''}
Chief complaint: ${exam.chief_complaint || '—'}
Pain score: ${exam.pain_score ?? 0} / 10
Treatment provided: ${Array.isArray(exam.treatment_provided) ? exam.treatment_provided.join(', ') : '—'}
Prescription: ${exam.prescription || '—'}
Further treatment needed: ${exam.further_treatment || '—'}
Next appointment: ${exam.next_appointment || '—'}
${exam.phase1 ? `Phase 1: ${exam.phase1}` : ''}
${exam.phase2 ? `Phase 2: ${exam.phase2}` : ''}
${exam.phase3 ? `Phase 3: ${exam.phase3}` : ''}
${exam.phase4 ? `Phase 4: ${exam.phase4}` : ''}

Full examination data:
${JSON.stringify(raw, null, 2)}`
}
