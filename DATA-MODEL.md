# Data model — v3

## The one rule

**Nothing stores progress. Everything recomputes from `sessions`, which is append-only.**

If the app let you type "70% done", you would type 70% on a bad week and the charts would become
self-flattery. Every number traces back to a dated session you logged.

## Stored (localStorage key `ct-v3`)

```js
{
  v: 3,
  startedOn: "2026-07-26",
  commitMin: 45,          // per weekday
  weekdays:  5,
  floorMin:  150,         // weekly floor
  branch:    null,        // null | "erp" | "sf"  — one branch max
  sessions:  [ {id, date, min, mod, note} ],   // APPEND-ONLY
  forced:    { modId: true },                  // "I already know this"
  freezes:   [ "2026-07-28", ... ],            // declared no-study days
  gate:      { applied: false }
}
```

`id` is a millisecond timestamp — unique per device, which is what makes merge work without a
server.

## Tracks

Each track has a `kind` that decides whether its hours count toward the finish date:

| kind | tracks | in scope? |
|---|---|---|
| `shared` | Core, Projects, MERN | Always — 164 h |
| `branchA` | ERPNext / Frappe | Only if `branch === "erp"` (+52 h) |
| `branchB` | Salesforce Apex + LWC | Only if `branch === "sf"` (+60 h) |
| `extra` | DSA, system design, resume | **Never.** That is what makes them extras. |

`branchA` and `branchB` are disjoint — Python/Frappe and Apex share no code. If both log more than
5 hours in a 28-day window, the app says so.

## Freezes — and why I argued against them first

I originally refused freezes: the 150-minute floor against a 225-minute commitment already allows
**two missed weekdays a week**, so freezes looked like forgiveness stacked on forgiveness.

The counter-argument that won: the *daily streak* was the thing punishing unpredictable family
evenings, and a streak dying is demoralising in a way that a weekly number is not. So freezes
exist, with the teeth kept in:

- **A freeze protects the streak. It does not reduce the weekly floor.** The hours are still owed
  and still have to be cleared before Sunday.
- A frozen day is **skipped**, like a weekend — it does not break the streak and does not add to
  it. Freeze two days mid-run and an 18-day streak becomes 16, not 0.
- **4 per rolling 30 days.** Enforced, not advisory.
- Every freeze is **visible** in the Log tab and counted in Pace. Four every month means the
  commitment is wrong and should be lowered — that is data, not failure.
- Show-up rate excludes frozen days from the **denominator**, so a freeze can't dent the number,
  and can't inflate it either.

## Derived at render — never stored

| Value | How |
|---|---|
| `minsOn(date)` / `minsInWeek(mon)` | sums over sessions; weeks are Monday-start |
| `streak()` | consecutive weekdays with minutes; weekends and freezes skipped |
| `pace()` | mean hours/week over last 4 weeks, **excluding the current incomplete week** |
| `remainingHours()` | Σ over in-scope modules of `max(0, budget − logged)`, ticked ones = 0 |
| `plannedDate()` | today + `remaining ÷ committed pace`, rounded up to whole weeks |
| `projectedDate()` | today + `remaining ÷ pace()`. **null below 0.25 h/week** — a fake date is worse than no date |
| `slipWeeks()` | `projected − planned`. This is the consequence. |
| `focus()` | last 28 days split shared / branchA / branchB / extra |
| show-up rate | distinct days logged ÷ non-frozen weekdays since start |

## Merge (Pace → Backup / transfer)

Union of `sessions` keyed by `id`; union of `freezes`; `forced` and `gate.applied` OR'd together;
earliest `startedOn` wins. Therefore:

- **Commutative** — `A merge B` equals `B merge A`.
- **Idempotent** — merging the same export twice changes nothing.
- **Lossless** — nothing is overwritten or dropped.

That is why append-only ids matter: they turn "sync" into set union, which needs no server and has
no conflicts.

## Bugs caught by verification, kept here as reminders

1. **Week bucketing was inverted** — used `+ dayOfWeek` where it needed `+ (6 − dayOfWeek)`.
   Everything landed one bucket early, so the current week always read empty. A silently wrong
   chart is worse than no chart, because you trust it.
2. **A flat 10-day stall threshold flagged a 3-year goal as stalled after 11 quiet days.** Idle
   thresholds must scale with the horizon or you learn to ignore every alert.

## Not built

- No push notifications — the nightly check-in is deliberately outside the app.
- No edit or delete on sessions — append-only is the enforcement.
- No accounts or server sync — see README section 3 for the Supabase path if it's ever earned.
