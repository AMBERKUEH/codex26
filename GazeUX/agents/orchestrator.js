const DEFAULT_INPUT = {
  block_id: "Block C",
  sensor_data: { soil_moisture_pct: 38, water_table_depth_cm: 42, surface_temp_c: 34.2 },
  weather_data: { wind_speed_kmh: 18, humidity_pct: 58, forecast_12h: "hot and dry" },
  vision_logs: { dry_biomass_detected: true, smoke_detected: false, anomaly: "dry biomass accumulation" },
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, Math.round(value)));

async function sensorAgent(input) {
  const moisture = Number(input.sensor_data?.soil_moisture_pct ?? 0);
  const depth = Number(input.sensor_data?.water_table_depth_cm ?? 0);
  const temp = Number(input.sensor_data?.surface_temp_c ?? 0);
  let impact = 0;
  const factors = [];
  if (moisture < 45) { impact += clamp(30 + (45 - moisture) * 0.5, 30, 40); factors.push(`Soil moisture is ${moisture}%, below the 45% high-risk threshold`); }
  if (depth > 40) { impact += 4; factors.push(`Water table is ${depth} cm below the 40 cm critical threshold`); }
  return { agent: "Sensor Agent", factor: factors.join("; ") || "Hydrological conditions are within safe range", impact: clamp(impact, 0, 44), raw: { moisture, depth, temp } };
}

async function visionAgent(input) {
  const vision = input.vision_logs || {};
  const temp = Number(input.sensor_data?.surface_temp_c ?? 0);
  let impact = 0;
  const factors = [];
  if (temp > 32) { impact += clamp(20 + (temp - 32) * 2, 20, 30); factors.push(`Surface temperature is ${temp}°C, above the 32°C threshold`); }
  if (vision.dry_biomass_detected) { impact += 3; factors.push(`Satellite/drone detected ${vision.anomaly || "dry biomass accumulation"}`); }
  if (vision.smoke_detected) { impact += 8; factors.push("Smoke anomaly detected in the vision feed"); }
  return { agent: "Vision Agent", factor: factors.join("; ") || "Canopy conditions are stable", impact: clamp(impact, 0, 38), raw: vision };
}

async function weatherAgent(input) {
  const weather = input.weather_data || {};
  const wind = Number(weather.wind_speed_kmh ?? 0);
  const humidity = Number(weather.humidity_pct ?? 100);
  let impact = 0;
  const factors = [];
  if (wind > 15) { impact += clamp(10 + (wind - 15) * 1.5, 10, 20); factors.push(`Wind is ${wind} km/h, above the 15 km/h spread-risk threshold`); }
  if (humidity < 60) { impact += 3; factors.push(`Humidity is ${humidity}%, creating a dry microclimate`); }
  return { agent: "Weather Agent", factor: factors.join("; ") || "Weather conditions are within safe range", impact: clamp(impact, 0, 25), raw: weather };
}

async function predictionAgent(input, agents) {
  const totalImpact = agents.reduce((sum, agent) => sum + agent.impact, 0);
  const hasSmoke = Boolean(input.vision_logs?.smoke_detected);
  const probability = clamp(totalImpact + (hasSmoke ? 8 : 10), 0, 100);
  const risk = clamp(totalImpact, 0, 100);
  const carbon = clamp(800 + risk * 5.6, 0, 5000);
  return { global_risk_index: risk, ignition_probability_pct: probability, carbon_at_risk_tco2e: carbon };
}

async function recommendationAgent(input, prediction) {
  const actions = [];
  if (Number(input.sensor_data?.soil_moisture_pct ?? 0) < 45) actions.push({ action_id: "ACT-WATER-01", title: "Release Block C water gates", description: "Open gates W-04 and W-05 to raise the water table by 8–12 cm and restore peat moisture above 45%.", risk_reduction_points: 31 });
  if (Number(input.weather_data?.wind_speed_kmh ?? 0) > 15 || input.vision_logs?.dry_biomass_detected) actions.push({ action_id: "ACT-PATROL-01", title: "Dispatch west-boundary patrol", description: "Send Field Team 02 to inspect Block C west for smoke, hotspots, exposed peat, and dry biomass.", risk_reduction_points: 12 });
  actions.push({ action_id: "ACT-MONITOR-01", title: "Increase sensor monitoring", description: "Set Block C telemetry to five-minute intervals and escalate if temperature exceeds 35°C or moisture falls below 35%.", risk_reduction_points: 6 });
  return actions;
}

async function analyzeBlock(payload = {}) {
  const input = {
    ...DEFAULT_INPUT,
    ...payload,
    sensor_data: { ...DEFAULT_INPUT.sensor_data, ...(payload.sensor_data || {}) },
    weather_data: { ...DEFAULT_INPUT.weather_data, ...(payload.weather_data || {}) },
    vision_logs: { ...DEFAULT_INPUT.vision_logs, ...(payload.vision_logs || {}) },
  };
  const agents = await Promise.all([sensorAgent(input), visionAgent(input), weatherAgent(input)]);
  const prediction = await predictionAgent(input, agents);
  const recommended_actions = await recommendationAgent(input, prediction);
  return { status: "success", block_id: input.block_id, ...prediction, agent_reasoning: agents.map(({ agent, factor, impact }) => ({ agent, factor, impact })), recommended_actions, meta: { loop: "parallel-specialists -> prediction -> recommendations", generated_at: new Date().toISOString() } };
}

module.exports = { analyzeBlock, DEFAULT_INPUT };
