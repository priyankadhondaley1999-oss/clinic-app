# Functional Dentistry Clinic App
### Dr. Priyanka Dhondaley · Bengaluru

A private clinic management web app — patient records, intake form data, examination records, and clinical report prompts. Clinic-only access. Free to host.

---

## Stack
- **Frontend**: React · hosted free on Vercel
- **Database + Auth + Storage**: Supabase (free tier)
- **AI**: Claude.ai (copy-paste prompt workflow — no API costs)

---

## Setup in 5 steps

### Step 1 — Supabase project
1. Go to supabase.com → create account → New project
2. Name: `functional-dentistry` · Region: Southeast Asia (Singapore)
3. Save your database password
4. Go to **Settings → API** and copy:
   - Project URL
   - `anon` public key

### Step 2 — Add your Supabase credentials
Open `src/lib/supabase.js` and replace:
```js
const SUPABASE_URL = 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'
```

### Step 3 — Set up the database
1. In Supabase dashboard → SQL Editor
2. Copy the entire `SCHEMA_SQL` string from `src/lib/supabase.js`
3. Paste it into the SQL Editor and click Run
4. This creates all tables, RLS policies, and storage bucket

### Step 4 — Create your login account
1. In Supabase → Authentication → Users → Add user
2. Add your email and a strong password
3. This is the only account that can access the app

### Step 5 — Deploy to Vercel
```bash
npm install -g vercel
cd clinic-app
vercel
```
Follow the prompts. Your app will be live at `https://your-app.vercel.app` in ~2 minutes.

For subsequent deploys: `vercel --prod`

---

## Running locally (for testing)
```bash
npm install
npm start
```
Opens at http://localhost:3000

---

## File structure
```
src/
  lib/
    supabase.js    ← Supabase client + database schema
    auth.js        ← Login state management
    db.js          ← All database operations
    prompts.js     ← Clinical prompt builders
  pages/
    Login.jsx      ← Sign in screen
    Dashboard.jsx  ← Stats + recent patients
    Patients.jsx   ← Patient list with search
    PatientDetail.jsx ← Full patient record
    NewPatient.jsx ← Register new patient
  components/
    Sidebar.jsx    ← Navigation
  index.css        ← All styles (matches welcome.html palette)
```

---

## Patient workflow
1. Staff registers patient in the app (name, age, phone etc.)
2. Patient is handed a tablet with `welcome.html` open
3. Patient completes the welcome flow + intake form
4. *(Future)* Intake form data auto-saves to the patient's record
5. Staff opens the patient record → copies the clinical prompt
6. Pastes into Claude.ai → gets the briefing PDF
7. After consultation, staff completes the exam form
8. Copies the treatment report prompt → Claude.ai → PDF

---

## Supabase free tier limits
- Database: 500MB (enough for ~100,000 patient records)
- Storage: 1GB (enough for ~2,000 PDF reports)
- Auth: unlimited users
- API calls: 500,000 / month

---

## Environment variables (for Vercel)
If you don't want credentials in the source code, add these in Vercel dashboard:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

Then update `supabase.js` to use:
```js
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY
```
