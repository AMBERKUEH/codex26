# Six-minute PeatCycle AI presentation script

Use this script with the 10-slide deck and the live Databricks App. The timing
is flexible; prioritize the live workflow if the judges interrupt with
questions.

## 0:00-0:35 - Opening and problem

"Good morning. We are presenting PeatCycle AI, a predictive peatland
management command centre for climate resilience.

Peatlands are important carbon stores, but when the water table drops and the
peat becomes dry, fire risk increases. Peat fires can spread underground, are
difficult to detect early, and create environmental, operational, and financial
losses.

The usual response is reactive: teams act after smoke or a hotspot is already
visible. PeatCycle AI helps teams act before ignition by combining telemetry,
weather, and vision signals into one operational decision view." 

## 0:35-1:15 - What PeatCycle AI does

"Our target users are plantation managers, field teams, and environmental
agencies. They need three answers: Where is the risk? Why is it increasing? And
what should we do next?

This dashboard provides those answers. The manager can view the whole estate or
focus on a specific block, such as Block C. The top cards show the risk index,
peat moisture, water-table condition, and carbon at risk. The digital-twin view
shows the location of the danger zone instead of hiding it behind another page.

The product is not designed as a generic weather dashboard. It connects a
prediction to an accountable field action." 

## 1:15-2:00 - Live dashboard walkthrough

"This is the current Block C situation. The alert is high because the peat is
dry, the water table is below the critical level, and the surface temperature
and wind are elevated.

The map gives the spatial context. The manager can see which block needs
attention and can use the scope control to compare the block with the entire
estate.

For this competition demo, the sensor values are simulated. That makes the
demo repeatable, but the interface and API are designed for the same fields from
future real sensors: soil moisture, water-table depth, temperature, weather,
and drone or satellite observations." 

## 2:00-3:05 - Multi-agent orchestration loop

"Now I will run the analysis. I click Simulate sensor pulse.

The frontend sends a telemetry payload to the orchestration endpoint. The first
stage runs three specialist agents concurrently.

The Sensor Agent evaluates hydrological stability. It flags soil moisture below
45 percent and a water table deeper than the safe threshold.

The Vision Agent evaluates surface conditions. It checks temperature, dry
biomass, smoke, and image anomalies.

The Weather Agent evaluates the atmospheric spread conditions, including wind,
humidity, and the short-term forecast.

The Prediction Agent then aggregates the individual impacts into a global risk
index, ignition probability, and carbon at risk. Finally, the Recommendation
Agent translates that result into physical interventions.

This is a real working loop in the application, not only a diagram. The agents
return a structured JSON result, which is rendered by the dashboard. The first
three agents run in parallel, while prediction and recommendation run after
their findings are available." 

## 3:05-3:45 - Explainable AI

"The important part is that the system explains the score. I open the AI
reasoning panel.

Here we can see the exact factors and the risk points contributed by each
specialist. For example, low moisture contributes the largest hydrological
impact, while heat, dry biomass, wind, and low humidity add separate evidence.

This makes the result easier to review by a human operator. The system is not
asking a manager to trust an unexplained percentage. It presents the evidence
that caused the score and keeps the agent responsibilities separate." 

## 3:45-4:30 - Prescriptive intervention

"PeatCycle AI is prescriptive, not only descriptive. I can select the proposed
Block C water-gate release. The recommendation explains which gates should be
opened and the expected risk reduction. I can also dispatch a patrol to inspect
the west boundary for smoke, hotspots, exposed peat, and dry biomass.

In a production deployment, these actions would require human approval and an
intervention log. The system recommends an action; it does not independently
operate physical infrastructure without authorization." 

## 4:30-5:15 - Databricks and product viability

"The working application is deployed on Databricks Apps. For this MVP, the
dashboard and multi-agent loop run with simulated data so judges can test it
without hardware or external API credentials.

The production architecture can extend this flow: real LoRaWAN or MQTT sensors
send telemetry into Databricks, historical readings are stored for analysis,
and the application uses the same JSON contract to display current risk and
recommended actions.

The commercial model is a per-hectare annual subscription for plantations and an
annual enterprise license for government users. The value is earlier response,
avoided loss, better insurance evidence, and faster ESG or pre-compliance
reporting. We do not claim instant carbon credits." 

## 5:15-6:00 - Codex, GPT-5.6, and close

"Codex and GPT-5.6 accelerated this project from a product concept into a
working demo. They helped structure the multi-agent architecture, implement the
Node.js API and dashboard integration, generate realistic sample telemetry,
write deterministic tests, prepare the Databricks configuration, and iterate on
the interface based on operational feedback.

The key human decisions were to bring the digital-twin map into the overview,
make the estate or block scope explicit, show AI reasoning, and connect each
prediction to a field intervention. We also chose simulated data for a reliable
hackathon demo and kept human approval in the operational safety model.

To conclude, PeatCycle AI helps peatland teams move from reacting to fires to
predicting risk, explaining the cause, and taking timely action. Thank you."

## Judge Q&A preparation

### 1. Is this using real sensors?

"The hackathon demo uses simulated telemetry for repeatability. The payload
matches the fields expected from real soil-moisture, water-table, temperature,
weather, and drone or satellite systems. The next integration is a LoRaWAN or
MQTT gateway." 

### 2. Why use Databricks?

"Databricks gives us a sponsor-aligned path to store historical telemetry,
govern environmental data, run analytics, and deploy the operational app in one
platform. The current MVP is intentionally lightweight, but its API contract is
ready for a Databricks data layer." 

### 3. Is this really multi-agent or just one model?

"It is an implemented orchestration loop with separate Sensor, Vision, and
Weather specialist functions running concurrently, followed by Prediction and
Recommendation stages. Each specialist returns its own factor and impact, and
the orchestrator combines them into one JSON response." 

### 4. How is the risk score calculated?

"The demo uses transparent threshold rules. Low moisture, low water table,
high temperature, high wind, low humidity, dry biomass, and smoke each add risk
points. The final index is clamped to 0-100 and the same input produces the same
result, which makes it testable." 

### 5. What happens if the prediction is wrong?

"The score is decision support, not an autonomous fire-control system. We show
the evidence and confidence should be added in production. Field actions need
human approval, and production deployments need intervention logs, escalation
rules, and clear liability boundaries." 

### 6. What is the most important action in the demo?

"Restoring peat moisture is the first intervention when moisture and water-table
conditions are unsafe. A patrol recommendation provides independent ground
verification, while higher-frequency monitoring checks whether the condition is
improving." 

### 7. How would you connect real hardware?

"A gateway would publish sensor readings through LoRaWAN or MQTT. An ingestion
service would validate and timestamp the readings, store them in Databricks,
and call the same `/api/analyze-block` contract used by the demo." 

### 8. What makes this different from a normal dashboard?

"It combines three evidence types, explains the contribution of each one, and
recommends a physical intervention. The focus is the decision loop: detect,
explain, act, and record." 

### 9. How can this make money?

"Plantations can be charged by hectares per year, aligning price with the asset
being protected. Government customers fit an annual enterprise license with
support. The ROI comes from earlier response, reduced loss, insurance evidence,
and lower audit preparation effort." 

### 10. Why not promise carbon credits?

"Carbon-credit validation takes time and depends on accepted methodologies and
audits. We position PeatCycle AI as an ESG readiness and pre-compliance tool
that produces better evidence, not as an instant credit generator." 

### 11. What did Codex contribute?

"Codex accelerated implementation, debugging, testing, documentation, the
Databricks deployment configuration, and demo assets. GPT-5.6 helped reason
through architecture and convert the product requirements into code and a
presentable story. Human decisions controlled the thresholds, safety boundaries,
user flow, and product positioning." 

### 12. What is next after the hackathon?

"The next steps are live sensor ingestion, historical data storage, model
calibration against real fire events, confidence intervals, role-based access,
and audited human approval for field actions." 
