# Career Roadmap v2 — Manan Khaldwa
**Rewritten 26 Jul 2026, replacing v1. Destination: Full Stack Developer.**

---

## 0. Where I was wrong

v1 killed ERPNext and made Salesforce primary. That was wrong, and the reason it was wrong is
worth naming: **I weighted a referral I never verified.** You said "my brother's company" and I
treated it as a Salesforce referral. It is a **full stack** referral. Once that flips, the entire
ranking flips with it. My mistake was building a 22-week plan on an unchecked assumption instead
of asking one more question.

Your conclusion — that the common path is Full Stack Dev — is correct. Here is the sharper version
of it.

## 1. RPA: killed, agreed

You know nothing about it, you have two months of exposure, and you already know full stack. It
was only ever on the list because it was free. Spending any evening minutes on it while you
already have a more marketable skill is backwards. Gone.

## 2. The thing you are missing

**Your brother's company is hiring full stack devs right now, and you are spending this week
designing a study app.**

[Certain] Openings are perishable. Your skills are not. Every week you spend preparing instead of
applying is a week the requisition can close. You do not need to be interview-perfect to apply —
you need to be in the pipeline while the pipeline exists.

This is why the app has a **gate** on the Roadmap tab that blocks the daily verdict until you tick
"applied." Not a suggestion. The single highest-value action available to you this week is one
conversation and one CV, and it does not require you to be less tired after office.

## 3. Certinia — the part your brother may not have thought through

He told you to prepare for Salesforce Certinia. [Likely] that advice is well-meant and badly
timed. What the market actually asks for:

- **25** Certinia postings on Indeed India. Not a volume market.
- Typical senior listings ask **8+ years Salesforce development with 4+ years hands-on Certinia
  (FinancialForce)**, plus **Platform Developer I** as a baseline, plus deep PSA domain knowledge —
  billing, revenue management, resource planning.
- The technical stack is **Apex, Visualforce, LWC, JavaScript** and a real understanding of
  governor limits and platform architecture.

You do not know Apex. Entering a 25-opening niche that screens for 8 years of the exact thing you
lack is the **worst** risk-adjusted use of your evenings of the three options. Not impossible —
just the slowest door with the smallest frame.

**The one honest counterpoint:** if his company runs Certinia and will hire you into full stack
*and let you grow into the Certinia work internally*, that is a completely different proposition —
you would be paid to learn the scarce skill. **Ask him that specific question.** It is the only
version where Certinia makes sense as your bet.

## 4. What the three markets actually look like

| | Volume | Entry pay | Notes |
|---|---|---|---|
| **MERN / Full Stack** | High — dominant hiring demand in SaaS, fintech, GCCs | avg **₹6.57 LPA**, range **₹4.9L–₹12L**; remote for global clients up to **₹35 LPA** | You already have the base. Largest number of doors. |
| **ERPNext / Frappe** | Moderate — ~100 postings, remote-friendly | junior **₹35–40k/month**; **6–12 LPA** at 4–8 yrs | Your Tally ERP background is a genuine edge most Python devs lack. |
| **Salesforce / Certinia** | Low — 25 Certinia postings in India | senior-skewed, PD1 baseline | Needs Apex from zero. Slowest entry. |

**Verdict: Full Stack primary. ERPNext is the strong second and the better of the two
specialisations. Salesforce stays in the app as a separate section because you asked for it, and
because if your brother's company pays you to learn it, the maths changes.**

## 5. You were right about the overlap — here is exactly how much

You said there are common things and it will be beneficial. Correct, and it is worth being precise,
because the overlap is not uniform:

| Skill | Transfers to |
|---|---|
| **JavaScript** | React, Node, **and LWC**. The single highest-leverage thing on this list. |
| **React** | MERN directly. LWC *conceptually* — components and reactivity — but LWC is native web components, a different API. Partial credit. |
| **SQL / data modelling** | ERPNext (MariaDB), any backend. SOQL is different syntax, same relational thinking. |
| **Git, REST/API design, deployment** | Everything. Every job. |
| **Python** | ERPNext / Frappe **only**. |
| **Apex** | **Nothing else on this list.** Salesforce-only, Java-like. |

**Shared work is 164 of the 304 total hours — about 54%.** That is the real number behind your
intuition. The remaining 46% splits into two branches that share almost no code.

Which produces the one rule that matters:

> **Do the shared 54% first. Pick a branch only when a real interview forces the choice.**

Studying Apex and Python/Frappe in the same month is the fastest way to be mediocre at both. The
Pace tab tracks exactly this — if both branches log more than 5 hours in a 28-day window, the app
calls it out.

## 6. Scope and dates

| Scope | Hours |
|---|---|
| Core (JS, TS, React, SQL, Git, deploy) | 60 |
| Projects (3 shipped, public) | 60 |
| MERN / Full Stack | 44 |
| **Base scope, no branch** | **164** |
| + ERPNext branch | 216 |
| + Salesforce branch | 224 |
| Extras (DSA, system design, resume) — never in scope | 28 |

At 45 min × 5 weekdays (3.75 h/week), 164 hours is **~44 weeks**. That number is deliberately
alarming, and it is also wrong for you — **because you already know a lot of it.**

**Week 1's real job: open every section and tick what you already know.** In the app, tapping a
module marks it "I already know this," pulls it out of scope, and recomputes both dates. If you
genuinely have full stack, Core and half of MERN should collapse, and 164 becomes something like
60–90 hours — a **4 to 6 month** plan, not a year.

Be honest when you tick. You are the one sitting in the interview.

## 7. Sequence

**Phase 0 — this week.** Apply to your brother's company. Ask him the Certinia question from
section 3. Tick the gate in the app.

**Phase 1 — weeks 1 to 8.** Audit and tick what you know. Fill the Core gaps. **Ship P1** — a
deployed CRUD app with auth and a public URL. One shipped project outranks three certificates you
are halfway through.

**Phase 2 — week 8, branch decision.** Choose from evidence, not preference: which interviews are
you actually getting? Full stack offers → keep going, no branch needed. ERPNext callbacks → take
branch A, your Tally edge is doing the work. Salesforce/Certinia only viable if someone is paying
you to learn Apex.

**Phase 3 — after.** P2 and P3. P3 goes in whichever branch won.

## 8. The contract — unchanged

**45 minutes, 5 weekdays. Weekly floor 150 minutes. Weekends free.**

- **Rule 1** — Missed time becomes debt, clearable inside the same week only. Sunday midnight it is
  written off.
- **Rule 2** — Escalation: day 1 noted, day 3 blunt, day 7 I stop discussing tactics and ask you to
  justify that the goal is real.
- **Rule 3** — Two consecutive weeks below the floor and I stop nagging: I recompute your finish
  date from actual pace and show you both dates. Arithmetic, not guilt.
- **Rule 4** — The log is append-only. The app has no edit and no delete.
- **Rule 5** — Vague entries rejected. "Learned React" is worthless in three months. "Built a form
  with useReducer and field-level validation" is an interview answer.

Check-in runs weekdays at 21:05.

## 9. The thing that will actually decide this

Not the roadmap. **Whether you apply this week.**

You told me you are getting nothing where you are and that your motivation is dropping. [Guessing]
the fastest fix for that is not a better study plan — it is one interview that goes well, which
converts an abstract goal into a real one. Study is what you do *between* applications, not
*before* them.

Apply first. Then log your 45 minutes.

---

## Sources

- [MERN Stack Developer Salary In India: 2026 — Brolly Academy](https://brollyacademy.com/mern-stack-developer-salary-in-india/)
- [MERN Stack Full Stack Developer salary, India — Glassdoor](https://www.glassdoor.co.in/Salaries/india-mern-stack-full-stack-developer-salary-SRCH_IL.0,5_KO6,37_IP2.htm)
- [Full-Stack Developer Hiring in 2026: Roles Where Demand Is Highest in India — Taggd](https://taggd.in/blogs/full-stack-developer-hiring-india/)
- [Full Stack Developer Jobs in India 2026: MERN, Next.js, AI — HuntingCube](https://blog.huntingcube.ai/full-stack-developer-jobs-india-2026-guide/)
- [Certinia job vacancies, India — Indeed](https://in.indeed.com/q-certinia-jobs.html)
- [Staff Salesforce & Certinia Developer — Procore Careers](https://careers.procore.com/jobs/360732fd-c0b6-4087-8a8f-fb9312e130de)
- [Salesforce Certinia (FinancialForce) Developer — xtagservices](https://xtagservices.com/career/salesforce-certinia-financialforce-developer/)
- [ERPNext Developer Salary Range, India — Frappe Forum](https://discuss.frappe.io/t/erpnext-developer-salary-range-india-0-6-1-year-experience/161451)
- [ERPNext / Frappe Developer role requirements — Alliance Recruitment](https://www.allianceinternational.co.in/job/3924/seeb/erpnext-frappe-developer/)
- [ERPNext, Frappe job vacancies — Indeed India](https://in.indeed.com/q-erpnext,-frappe-jobs.html)
