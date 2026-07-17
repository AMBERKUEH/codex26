# PeatCycle AI

**PeatCycle AI** is a predictive peatland-management command centre for the
**Climate Resilience** track. It helps plantation managers and environmental
agencies identify peat-fire risk before ignition, understand the causes, and
choose a practical field intervention.

## Live demo

Open the deployed Databricks App:

<https://peatcycleai-7474656257191923.aws.databricksapps.com/>

## What problem does it solve?

Peatlands store significant amounts of carbon, but drained or dry peat can
become vulnerable to underground fires. A response that starts only after smoke
appears is often too late. PeatCycle AI combines hydrology, weather, and
drone/satellite observations into one explainable risk view.

The demo shows how the system can:

- monitor an estate or an individual block such as Block C;
- combine sensor, vision, and weather signals;
- calculate a deterministic risk index and ignition probability;
- explain the factors behind the score;
- recommend actions such as releasing water gates, dispatching a patrol, and
  increasing monitoring; and
- estimate carbon currently at risk.

The hackathon version uses simulated telemetry so that the full workflow can be
tested reliably. The same API contract can later receive live LoRaWAN, MQTT,
weather, and satellite feeds.

## How the multi-agent loop works

1. **Sensor Agent** evaluates soil moisture and water-table depth against
   peatland safety thresholds.
2. **Vision Agent** evaluates surface temperature, dry biomass, and smoke or
   other image anomalies.
3. **Weather Agent** evaluates wind speed, humidity, and the 12-hour forecast.
4. The **Prediction Agent** sums the specialist impacts into the global risk
   index, ignition probability, and carbon at risk.
5. The **Recommendation Agent** converts the result into physical actions with
   estimated risk-reduction points.

The first three specialist agents run concurrently with `Promise.all`. For the
same input, the risk calculation and recommendations are deterministic, which
makes the workflow easy to demonstrate and test.

## Setup and run locally

Requirements: Node.js 18 or newer.

From the `GazeUX` directory:

```powershell
npm install
npm test
npm start
```

Open <http://localhost:8000>.

No `.env` file, API key, database, or sensor hardware is required for the
hackathon demo. The app uses the built-in sample telemetry below.

## Sample telemetry

The dashboard calls `POST /api/analyze-block`. You can test the orchestration
loop directly with PowerShell:

```powershell
$payload = @{
  block_id = "Block C"
  sensor_data = @{
    soil_moisture_pct = 38
    water_table_depth_cm = 42
    surface_temp_c = 34.2
  }
  weather_data = @{
    wind_speed_kmh = 18
    humidity_pct = 58
    forecast_12h = "hot and dry"
  }
  vision_logs = @{
    dry_biomass_detected = $true
    smoke_detected = $false
    anomaly = "dry biomass accumulation"
  }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8000/api/analyze-block `
  -ContentType "application/json" `
  -Body $payload
```

Health check:

```text
GET http://localhost:8000/api/health
```

## Databricks deployment

The deployed app runs on Databricks Apps. The Databricks-specific configuration
is in `app.yaml`; the server uses `DATABRICKS_APP_PORT` and listens on
`0.0.0.0`. The Git deployment source is the `GazeUX` subdirectory of this
repository.

For a new deployment, use:

- Repository: `https://github.com/AMBERKUEH/codex26`
- Branch: `codex/databricks-deploy`
- Source code path: `GazeUX`
- Start command: `npm run start`

In a production sensor deployment, secrets for a sensor gateway, weather
provider, database, or AI service should be configured in the hosting platform
and never committed to GitHub.

## How Codex and GPT-5.6 accelerated the workflow

Codex and GPT-5.6 were used as implementation partners throughout the build.
Key decisions and accelerators included:

- converting the product idea into a working Node.js dashboard instead of only
  producing static UI mockups;
- designing the multi-agent loop with separate Sensor, Vision, Weather,
  Prediction, and Recommendation responsibilities;
- encoding the project thresholds and deterministic JSON output so the agent
  reasoning is visible and testable;
- iterating on the dashboard based on operational feedback: estate/block scope,
  an overview digital-twin map, explainable risk factors, and one-click-style
  interventions;
- generating sample telemetry, automated orchestration tests, a 10-slide demo
  deck, a sensor product concept, and a short recording script; and
- adapting the Node server for Databricks Apps by adding `app.yaml`, using the
  Databricks port, and binding to `0.0.0.0`.

The human design decisions remained focused on safety and credibility: the
demo does not claim that predictions are certain, does not promise instant
carbon credits, and presents field actions as recommendations requiring human
approval. Live sensors, historical data, confidence bands, intervention logs,
and MRV integrations are the next production steps.

## Project files

- `server.js` — HTTP server, static dashboard, API routes, and health check.
- `agents/orchestrator.js` — multi-agent analysis loop.
- `assets/agent-loop.js` — dashboard-to-agent API integration.
- `tests/orchestrator.test.js` — high-risk and safe-block checks.
- `app.yaml` — Databricks Apps start configuration.
- `SUBMISSION.md` — competition submission notes.
- `DEMO_SCRIPT.md` — timed demo recording script.
- `outputs/PeatCycle_AI_Full_Demo_Deck.pptx` — full demo presentation.
- `assets/peatcycle-sensor-concept.png` — future sensor product concept.

## License

MIT. See [LICENSE](LICENSE).
