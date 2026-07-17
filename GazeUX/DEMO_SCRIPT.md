# Three-minute demo script

## 0:00–0:25 — Set the context

Open the dashboard and say: “Peatland monitoring is usually reactive. PeatCycle AI gives an estate manager a predictive command centre for acting before ignition.” Point to the Block C alert and the scope toggle.

## 0:25–1:10 — Show the multi-agent loop

Click **Simulate sensor pulse**. Explain that the frontend sends telemetry to `POST /api/analyze-block`. The Sensor Agent evaluates moisture and water table, the Vision Agent evaluates heat and biomass, and the Weather Agent evaluates wind and humidity. The three agents run concurrently before the prediction and recommendation stages.

## 1:10–1:55 — Explain and act

Open the AI reasoning panel. Point out the three agent findings and the impact points. Click **Trigger Block C water gate release** and then **Dispatch patrol team**. Explain that the system is prescriptive, not just descriptive.

## 1:55–2:35 — Show the business impact

Point to Carbon Twin and say: “The immediate business value is avoided loss, better insurance conversations, and faster ESG evidence preparation. We position this as pre-compliance and readiness, not instant carbon credits.”

## 2:35–3:00 — Close with the architecture

Show the repository README and say: “This is a working local project with a dependency-free Node backend, deterministic agent tests, and a frontend that consumes the same JSON contract a future FastAPI or LangGraph service can provide.”
