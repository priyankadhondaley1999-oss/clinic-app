// Builds the clinical prompts from saved database records
// These are the same prompts the welcome.html generates,
// but now built from structured database data

export function buildQuickReliefPrompt(patient, intake) {
  const data = `
=== QUICK RELIEF PRE-CONSULTATION ===
Clinician: Dr. Priyanka Dhondaley | Bengaluru
Generated: ${new Date().toLocaleString('en-IN')}
Consultation type: Quick Relief Visit

── PATIENT ──
Name: ${patient.name}
Age: ${patient.age || '—'}
Gender: ${patient.gender || '—'}
Phone: ${patient.phone || '—'}
Referred by: ${patient.referred_by || '—'}
File number: ${patient.file_number}

── CHIEF CONCERN ──
Main complaint: ${intake.complaint || '—'}
Duration: ${intake.duration || '—'}
Area affected: ${intake.area_affected || '—'}
Pain / discomfort level: ${intake.pain_score || '—'} / 10

── HEALTH BACKGROUND ──
Health conditions: ${intake.health_conditions || '—'}
Medications / supplements: ${intake.medications || '—'}
Allergies: ${intake.allergies || '—'}
Previous dental treatment for this: ${intake.previous_treatment || '—'}
Previous treatment details: ${intake.previous_treatment_detail || '—'}
  `.trim()

  return `You are a clinical decision-support assistant specialising in functional dentistry. I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. I am about to see ${patient.name} for a focused Quick Relief consultation. Based on their brief intake below, generate a concise pre-consultation briefing with:

1. CHIEF CONCERN — Clinical read of their complaint in 2–3 sentences
2. RED FLAGS — Any urgent or watch-level findings (max 4, colour coded: URGENT / WATCH / NOTE)
3. FOCUS FOR TODAY — What to examine, what to look for, what to rule out (3–4 sentences)
4. SAFETY CHECKS — Any allergy, medication, or health condition interactions to be aware of before treatment
5. CHAIR-SIDE PROMPTS — 2–3 questions to ask this patient when they sit down

Keep it brief and action-focused — this is a targeted relief visit, not a full functional workup. After the briefing, produce a clean PDF using Python and reportlab in the same style as the functional dentistry briefings (forest green header, patient name band, colour-coded flags, readable in 30 seconds).

Patient intake:

---

${data}`
}

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
=== FUNCTIONAL DENTISTRY PRE-CONSULTATION INTAKE ===
Clinician: Dr. Priyanka Dhondaley | Bengaluru
Generated: ${new Date().toLocaleString('en-IN')}
Consultation type: The Full Picture

── PERSONAL INFORMATION ──
Name: ${patient.name}
Age: ${patient.age || '—'}
Gender: ${patient.gender || '—'}
Phone: ${patient.phone || '—'}
Address: ${patient.address || '—'}
Occupation: ${patient.occupation || '—'}
Referred by: ${patient.referred_by || '—'}
File number: ${patient.file_number}

── CHIEF CONCERN & HEALTH GOALS ──
Main reason for consultation: ${intake.complaint || '—'}
Duration of concern: ${intake.duration || '—'}
Previous treatment sought: ${intake.previous_treatment || '—'}
Previous treatment details: ${intake.previous_treatment_detail || '—'}
Short-term goal: ${intake.goal_short || '—'}
Long-term goal: ${intake.goal_long || '—'}

── MEDICAL HISTORY ──
Current conditions: ${conditions}
Other conditions: ${intake.conditions_other || '—'}
Medications & supplements: ${intake.medications || '—'}
Drug allergies: ${intake.allergy_drug || '—'}
Material/metal allergies: ${intake.allergy_material || '—'}
Food allergies/intolerances: ${intake.allergy_food || '—'}
Surgical history: ${intake.surgeries || '—'}
Family history: ${familyHistory}

── LIFESTYLE & NUTRITION ──
Diet type: ${intake.diet_type || '—'}
Meals per day: ${intake.meals_per_day || '—'}
Daily water intake: ${intake.water_intake || '—'}
Diet habits: ${dietHabits}
Average sleep: ${intake.sleep_hours || '—'}
Sleep quality: ${intake.sleep_quality || '—'}
Sleep symptoms: ${sleepSymptoms}
Exercise frequency: ${intake.exercise || '—'}
Stress level: ${intake.stress_level || '—'}/10
Stress factors: ${stressFactors}
Habits: ${habits}

── DENTAL & ORAL HISTORY ──
Last dental visit: ${intake.last_visit || '—'}
Reason for last visit: ${intake.last_visit_reason || '—'}
Current oral symptoms: ${oralSymptoms}
Brushing frequency: ${intake.brushing || '—'}
Flossing frequency: ${intake.flossing || '—'}
Toothpaste: ${intake.toothpaste || '—'}
Mouthwash: ${intake.mouthwash || '—'}
Previous dental treatment: ${prevDental}
Dental anxiety (0-10): ${intake.anxiety_level ?? '—'}
Past traumatic dental experience: ${intake.dental_trauma || '—'}

── HORMONAL HEALTH & ENVIRONMENTAL EXPOSURE ──
Hormonal/reproductive: ${hormonal}
Hormonal oral changes: ${intake.hormonal_oral || '—'}
Amalgam fillings: ${intake.amalgam || '—'}
Metal/material sensitivities: ${intake.metal_sensitivity || '—'}
Recent investigations: ${intake.recent_labs || '—'}
  `.trim()

  return `You are a clinical decision-support assistant specialising in functional dentistry. I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. I am about to see ${patient.name} and need a pre-consultation briefing based on their intake form.

Generate a structured clinical briefing and then produce it as a downloadable PDF. Use the following sections:

1. COMPLEXITY TIER — Rate as Low / Moderate / High / Complex with a one-line rationale
2. CHIEF CONCERN — Clinical reframe of their presenting complaint in functional dentistry language (2-3 sentences)
3. RED FLAGS — URGENT / WATCH / NOTE colour-coded list. Maximum 6 flags.
4. SYSTEMIC DRIVERS — Which body systems are contributing to their oral health picture
5. FOCUS AREAS FOR THIS CONSULT — What to examine carefully (3-5 sentences)
6. SUGGESTED INVESTIGATIONS — Specific tests to consider ordering. Max 8.
7. CHAIR-SIDE CONVERSATION PROMPTS — 3-4 open questions tailored to this patient

After the briefing, produce a clean PDF using Python and reportlab (forest green header, patient band, colour-coded flags).

Patient intake:

---

${data}`
}

export function buildExamPrompt(patient, exam) {
  const raw = exam.raw_data || {}

  return `You are a clinical decision-support assistant specialising in functional dentistry. I am Dr. Priyanka Dhondaley, a functional dentist in Bengaluru. I have just completed a ${exam.exam_type === 'simple' ? 'symptom-based' : 'full functional'} consultation for ${patient.name}.

Based on the consultation record below, generate a ${exam.exam_type === 'simple' ? 'concise Treatment Summary Report' : 'structured Treatment Planning Report'}.

${exam.exam_type === 'simple' ? `The report must include:
1. DIAGNOSIS SUMMARY — Confirm and briefly explain the working diagnosis in plain language
2. TREATMENT PROVIDED — What was done today and why
3. NEXT STEPS — What needs to happen next, in priority order
4. PATIENT INSTRUCTIONS — Key home care points for this patient
5. WATCH FOR — Signs that would indicate the patient needs to return urgently` :
`The report must include:
1. CLINICAL SUMMARY — A concise 3–4 sentence overview of the key clinical findings and overall health picture.
2. PRIORITY PROBLEM LIST — Rank all identified problems from most to least urgent. For each: state the problem, explain the priority level, list 2–3 treatment options with brief pros/cons.
3. PHASED TREATMENT PLAN: Phase 1 (Stabilisation), Phase 2 (Root-cause), Phase 3 (Definitive), Phase 4 (Maintenance)
4. FUNCTIONAL & SYSTEMIC FOCUS — Systemic or lifestyle interventions alongside dental treatment.
5. PATIENT COMMUNICATION NOTES — Key messages, likely questions, compliance barriers.
6. RECALL & MONITORING SCHEDULE`}

After the report, produce a clean PDF using Python and reportlab (forest green header, patient name band, colour-coded priority levels, readable in under 2 minutes).

Consultation record:

---

Patient: ${patient.name} | Age: ${patient.age || '—'} | File: ${patient.file_number}
Date: ${new Date(exam.created_at).toLocaleDateString('en-IN')}

Diagnosis: ${exam.diagnosis || exam.primary_diagnosis || '—'}
${exam.secondary_diagnosis ? `Secondary: ${exam.secondary_diagnosis}` : ''}

Chief complaint: ${exam.chief_complaint || '—'}
Pain score: ${exam.pain_score || '—'}/10

Treatment provided: ${Array.isArray(exam.treatment_provided) ? exam.treatment_provided.join(', ') : '—'}
Prescription: ${exam.prescription || '—'}
Further treatment needed: ${exam.further_treatment || '—'}
Next appointment: ${exam.next_appointment || '—'}

${exam.phase1 ? `Phase 1 — Stabilisation: ${exam.phase1}` : ''}
${exam.phase2 ? `Phase 2 — Root-cause: ${exam.phase2}` : ''}
${exam.phase3 ? `Phase 3 — Restorative: ${exam.phase3}` : ''}
${exam.phase4 ? `Phase 4 — Maintenance: ${exam.phase4}` : ''}

Full examination data:
${JSON.stringify(raw, null, 2)}`
}
