# PeatCycle AI

PeatCycle AI is a front-end MVP for predictive peatland management. It turns the hackathon plan into one demoable operating story: detect rising fire risk in Block C, explain the drivers, recommend an intervention, estimate avoided emissions, and preserve an evidence trail for MRV.

## MVP experience

- Live estate overview with risk, moisture, carbon, and action KPIs.
- Digital twin-style risk landscape with block-level status and sensor pulse simulation.
- Explainable predictive alert showing moisture, heat, and wind drivers.
- Recommended intervention with an in-progress state.
- Carbon Twin showing estimated emissions with and without action.
- Intervention history and lightweight PeatCycle Assistant responses.

## Multi-agent loop

The app now runs a real local orchestration pipeline through `POST /api/analyze-block`:

1. Sensor Agent evaluates soil moisture, water-table depth, and hydrological thresholds.
2. Vision Agent evaluates surface temperature, dry biomass, and smoke anomalies.
3. Weather Agent evaluates wind, humidity, and forecast conditions.
4. Prediction Agent aggregates the specialist impacts into risk, ignition probability, and carbon at risk.
5. Recommendation Agent turns the state into physical interventions with estimated risk reduction.

The first three agents execute concurrently with `Promise.all`, and the final JSON is deterministic for the same input. The `Simulate sensor pulse` and `Trigger water gate release` controls call this endpoint and update the agent reasoning panel.

## Run locally

From this folder:

```powershell
node server.js
```

Then open `http://localhost:8000`.

## Submission materials

- [SUBMISSION.md](SUBMISSION.md) contains the project description, Codex usage summary, repository checklist, feedback-session placeholder, and run instructions.
- [DEMO_SCRIPT.md](DEMO_SCRIPT.md) contains a timed under-three-minute recording plan.
- `npm test` runs the deterministic high-risk and safe-block orchestration checks.

The current interface uses realistic demo data from the project plan so the 48-hour hackathon story can be shown without a backend. The commercial direction is deliberately more specific than generic SaaS: tiered per-hectare/year pricing for plantations, annual enterprise licenses with dedicated support for government, and an ESG readiness / insurance evidence layer. The product should reduce audit preparation and strengthen underwriting conversations; it should not promise instant carbon credits.

The next production step would be to replace the simulated values with sensor, weather, satellite, and model API responses while keeping the same UI contract. Because predictions can be wrong, production deployments should include confidence bands, human approval for field actions, intervention logs, and a clear service/liability boundary.
