import { supabase } from './supabase'
export { supabase }

// ── Patients ──────────────────────────────────────────────────────────────────

export async function getPatients(search = '') {
  let query = supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query
  return { data, error }
}

export async function getPatient(id) {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      intake_simple(*),
      intake_full(*),
      examinations(*),
      reports(*)
    `)
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createPatient(patientData) {
  // Auto-generate file number
  const fileNumber = `FD-${Date.now().toString().slice(-6)}`
  const { data, error } = await supabase
    .from('patients')
    .insert({ ...patientData, file_number: fileNumber })
    .select()
    .single()
  return { data, error }
}

export async function updatePatient(id, updates) {
  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

// ── Intake forms ──────────────────────────────────────────────────────────────

export async function saveSimpleIntake(patientId, formData) {
  const { data, error } = await supabase
    .from('intake_simple')
    .insert({
      patient_id: patientId,
      complaint: formData.complaint,
      duration: formData.duration,
      area_affected: formData.areaAffected,
      pain_score: parseInt(formData.painScore),
      health_conditions: formData.healthConditions,
      medications: formData.medications,
      allergies: formData.allergies,
      previous_treatment: formData.previousTreatment,
      previous_treatment_detail: formData.previousTreatmentDetail,
      consent_signed: formData.consentSigned,
      signature: formData.signature,
      raw_data: formData
    })
    .select()
    .single()
  return { data, error }
}

export async function saveFullIntake(patientId, formData) {
  const { data, error } = await supabase
    .from('intake_full')
    .insert({
      patient_id: patientId,
      complaint: formData.complaint,
      duration: formData.duration,
      previous_treatment: formData.previousTreatment,
      previous_treatment_detail: formData.previousTreatmentDetail,
      goal_short: formData.goalShort,
      goal_long: formData.goalLong,
      conditions: formData.conditions || [],
      conditions_other: formData.conditionsOther,
      medications: formData.medications,
      allergy_drug: formData.allergyDrug,
      allergy_material: formData.allergyMaterial,
      allergy_food: formData.allergyFood,
      surgeries: formData.surgeries,
      family_history: formData.familyHistory || [],
      diet_type: formData.dietType,
      meals_per_day: formData.mealsPerDay,
      water_intake: formData.waterIntake,
      diet_habits: formData.dietHabits || [],
      sleep_hours: formData.sleepHours,
      sleep_quality: formData.sleepQuality,
      sleep_symptoms: formData.sleepSymptoms || [],
      exercise: formData.exercise,
      stress_level: parseInt(formData.stressLevel),
      stress_factors: formData.stressFactors || [],
      habits: formData.habits || [],
      last_visit: formData.lastVisit,
      last_visit_reason: formData.lastVisitReason,
      oral_symptoms: formData.oralSymptoms || [],
      brushing: formData.brushing,
      flossing: formData.flossing,
      toothpaste: formData.toothpaste,
      mouthwash: formData.mouthwash,
      hygiene_extras: formData.hygieneExtras || [],
      prev_dental: formData.prevDental || [],
      anxiety_level: parseInt(formData.anxietyLevel),
      dental_trauma: formData.dentalTrauma,
      hormonal: formData.hormonal || [],
      hormonal_oral: formData.hormonalOral,
      toxins: formData.toxins || [],
      amalgam: formData.amalgam,
      metal_sensitivity: formData.metalSensitivity,
      recent_labs: formData.recentLabs,
      consent_signed: formData.consentSigned,
      signature: formData.signature,
      raw_data: formData
    })
    .select()
    .single()
  return { data, error }
}

// ── Examinations ──────────────────────────────────────────────────────────────

export async function saveExamination(patientId, examType, formData) {
  const { data, error } = await supabase
    .from('examinations')
    .insert({
      patient_id: patientId,
      exam_type: examType,
      raw_data: formData,
      chief_complaint: formData.complaint,
      pain_score: formData.painScore ? parseInt(formData.painScore) : null,
      diagnosis: formData.diagnosis,
      treatment_provided: formData.treatmentProvided || [],
      prescription: formData.prescription,
      further_treatment: formData.furtherTreatment,
      next_appointment: formData.nextAppointment,
      primary_diagnosis: formData.primaryDx,
      secondary_diagnosis: formData.secondaryDx,
      phase1: formData.phase1,
      phase2: formData.phase2,
      phase3: formData.phase3,
      phase4: formData.phase4
    })
    .select()
    .single()
  return { data, error }
}

// ── Reports ───────────────────────────────────────────────────────────────────

export async function saveReport(patientId, reportType, promptUsed, pdfBlob) {
  // Upload PDF to storage
  const fileName = `${patientId}/${reportType}_${Date.now()}.pdf`
  const { error: uploadError } = await supabase.storage
    .from('patient-reports')
    .upload(fileName, pdfBlob, { contentType: 'application/pdf' })

  if (uploadError) return { error: uploadError }

  // Save report record
  const { data, error } = await supabase
    .from('reports')
    .insert({
      patient_id: patientId,
      report_type: reportType,
      prompt_used: promptUsed,
      storage_path: fileName
    })
    .select()
    .single()

  return { data, error }
}

export async function getReportUrl(storagePath) {
  const { data } = await supabase.storage
    .from('patient-reports')
    .createSignedUrl(storagePath, 3600) // 1 hour expiry
  return data?.signedUrl
}

// ── Stats for dashboard ───────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [patientsResult, todayResult, reportsResult] = await Promise.all([
    supabase.from('patients').select('id', { count: 'exact' }),
    supabase.from('patients').select('id', { count: 'exact' })
      .gte('created_at', new Date().toISOString().split('T')[0]),
    supabase.from('reports').select('id', { count: 'exact' })
  ])

  return {
    totalPatients: patientsResult.count || 0,
    todayPatients: todayResult.count || 0,
    totalReports: reportsResult.count || 0
  }
}
