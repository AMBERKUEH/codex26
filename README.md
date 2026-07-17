# PeatCycle AI

PeatCycle AI is a front-end MVP for predictive peatland management. It turns the hackathon plan into one demoable operating story: detect rising fire risk in Block C, explain the drivers, recommend an intervention, estimate avoided emissions, and preserve an evidence trail for MRV.
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

## MVP experience
## Setup and run locally

- Live estate overview with risk, moisture, carbon, and action KPIs.
- Digital twin-style risk landscape with block-level status and sensor pulse simulation.
- Explainable predictive alert showing moisture, heat, and wind drivers.
- Recommended intervention with an in-progress state.
- Carbon Twin showing estimated emissions with and without action.
- Intervention history and lightweight PeatCycle Assistant responses.
Requirements: Node.js 18 or newer.

## Multi-agent loop
From the `GazeUX` directory:

The app now runs a real local orchestration pipeline through `POST /api/analyze-block`:
```powershell
npm install
npm test
npm start
```

1. Sensor Agent evaluates soil moisture, water-table depth, and hydrological thresholds.
2. Vision Agent evaluates surface temperature, dry biomass, and smoke anomalies.
3. Weather Agent evaluates wind, humidity, and forecast conditions.
4. Prediction Agent aggregates the specialist impacts into risk, ignition probability, and carbon at risk.
5. Recommendation Agent turns the state into physical interventions with estimated risk reduction.
Open <http://localhost:8000>.

The first three agents execute concurrently with `Promise.all`, and the final JSON is deterministic for the same input. The `Simulate sensor pulse` and `Trigger water gate release` controls call this endpoint and update the agent reasoning panel.
No `.env` file, API key, database, or sensor hardware is required for the
hackathon demo. The app uses the built-in sample telemetry below.

## Run locally
## Sample telemetry

From this folder:
The dashboard calls `POST /api/analyze-block`. You can test the orchestration
loop directly with PowerShell:

```powershell
node server.js
$payload = @{
  block_id = "Block C"
  sensor_data = @{
    soil_moisture_pct = 38
    water_table_depth_cm = 42
    surface_temp_c = 34.2
  }
  weather_data = @{
