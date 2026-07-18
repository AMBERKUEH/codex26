# Five-minute presentation script for the PDF deck

This script follows the 11-page PDF titled `Predictive peatland management
command centre for climate resilience`. Aim for approximately 25-30 seconds per
page. On pages 6-8, move from the deck to the live Databricks App when indicated.

## Page 1 - Title and opportunity | 0:00-0:25

"Good morning. We are presenting PeatCycle AI, a predictive peatland
management command centre for climate resilience. Our promise is simple:
prevent the fire before it starts.

Malaysia has a significant tropical peatland area. These ecosystems are not
just forests; they are carbon stores and important natural assets. That is why
peatland fire prevention is both an environmental and an operational priority."

## Page 2 - The landscape | 0:25-0:50

"A peatland is a waterlogged ecosystem made from partially decomposed organic
matter. The waterlogged condition slows decomposition and stores carbon for
centuries.

The danger begins when the water table falls. The peat becomes dry and exposed
to oxygen, the organic matter becomes fuel, and fire can smoulder underground.
This makes peat fires difficult to detect early and can lead to haze, emissions,
and lost livelihoods."

## Page 3 - The problem | 0:50-1:15

"Today, many teams respond after the damage has begun. The first problem is
fragmented signals: sensors, weather, satellite imagery, and field notes are in
different places.

The second problem is late action. When smoke or a hotspot becomes visible, the
window for a low-cost intervention is already smaller. The third problem is
that teams need evidence showing what happened, what action was taken, and what
impact it had for ESG, insurance, and future MRV work."

## Page 4 - The product | 1:15-1:40

"PeatCycle turns raw signals into a field decision. Our users are plantation
managers, field teams, and environmental agencies. They need three answers:
where is the risk, why is it increasing, and what should we do next?

The product has four stages: sense using IoT and weather data, explain using AI
reasoning, act through gates and patrols, and prove the response with an
evidence trail. The promise is to move from monitoring the peatland to managing
the risk."

## Page 5 - Physical sensor layer | 1:40-2:05

"The software is designed around a real physical deployment. A field kit can
include a water-table depth probe, soil-moisture and temperature sensors, a
solar-powered weatherproof enclosure, and LoRa or cellular connectivity.

The current demo uses simulated telemetry so it is reliable during judging.
However, the data contract is already designed for future ESP32, LoRaWAN, or
similar field devices. The commercial model can combine hardware deployment
kits with software priced per hectare per year."

## Page 6 - Dashboard | 2:05-2:35

"This is the operational dashboard. A manager can view the entire estate or
focus on a specific block, such as Block C. The cards show risk index, peat
moisture, water-table condition, and carbon at risk.

The map gives immediate spatial context. In this example, the alert is high
because peat moisture is low, the water table is below the critical level, and
surface temperature and wind are elevated. This is not just a generic weather
dashboard; it connects a prediction to an accountable field action."

**Action:** Switch from the PDF to the live Databricks App.

## Page 7 - Multi-agent loop | 2:35-3:05

"The intelligence behind the dashboard is a multi-agent loop. Raw input comes
from telemetry, weather, and vision logs.

The Sensor Agent checks moisture and water-table thresholds. The Vision Agent
checks surface temperature, dry biomass, and smoke or image anomalies. The
Weather Agent checks wind, humidity, and the short-term forecast.

These specialists run in parallel. The Prediction Agent aggregates their risk
impacts into a risk index, ignition probability, and carbon at risk. The
Recommendation Agent then proposes actions such as water-gate release, patrol,
or higher-frequency monitoring. The output is deterministic JSON, so the same
input is reproducible and testable."

## Page 8 - Live demo | 3:05-3:45

"Now I will run the loop. I click Simulate sensor pulse.

The example values are 38 percent moisture, a 42 centimetre water-table depth,
34.2 degrees surface temperature, 18 kilometres per hour wind, and 58 percent
humidity, with dry biomass detected by vision.

The dashboard shows the reasoning from each agent rather than hiding it behind
a single score. We can see which factors contributed to the risk. I can then
review the recommended water-gate release, dispatch a patrol, and increase
monitoring. In a production system, these actions would require human approval
and would be recorded in an intervention log."

## Page 9 - Competitive advantage | 3:45-4:15

"We know there are strong alternatives. NASA FIRMS and global platforms detect
active fire or provide regional fire risk. Satellite companies provide fire
probability maps. IoT providers provide sensor alerts. Malaysia also has
peatland monitoring research and geospatial companies.

PeatCycle is not trying to replace these tools. Our differentiation is the
operational layer for tropical peatlands: we combine hydrology, weather, and
vision before ignition, explain the score, and connect it to a field action such
as restoring moisture or dispatching a patrol. We move from detect, to explain,
to act."

## Page 10 - Business model | 4:15-4:40

"Our business model follows the asset and the buyer. Plantations can use a
tiered per-hectare-per-year subscription, so the price scales with the estate
being protected.

Government users fit an annual enterprise license with support, procurement, and
budget cycles. Insurers and ESG teams can use the evidence layer for underwriting
and audit preparation. We position PeatCycle as pre-compliance and risk
reduction, not as a promise of instant carbon credits."

## Page 11 - Ask and close | 4:40-5:00

"Our next pilot is to instrument one estate and connect the first live
water-table network.

We will measure success through earlier warnings, faster field response, and
audit-ready intervention evidence.

PeatCycle makes the next decision visible before the fire does. It protects the
peat, protects the people who manage it, and helps prove the impact. Thank you."

## If judges interrupt during the demo

Use this short answer:

"The current demo uses simulated telemetry, but it is a working multi-agent
orchestration loop deployed on Databricks Apps. The production version would
connect LoRaWAN or MQTT sensors and store historical telemetry for calibration.
The system is decision support: actions require human approval, and the score is
based on transparent thresholds rather than an unexplained generative answer."
