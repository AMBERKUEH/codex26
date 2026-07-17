const assert = require("node:assert/strict");
const { analyzeBlock } = require("../agents/orchestrator");

async function run() {
  const highRisk = await analyzeBlock({
    block_id: "Block C",
    sensor_data: { soil_moisture_pct: 38, water_table_depth_cm: 42, surface_temp_c: 34.2 },
    weather_data: { wind_speed_kmh: 18, humidity_pct: 58 },
    vision_logs: { dry_biomass_detected: true, smoke_detected: false, anomaly: "dry biomass accumulation" },
  });
  assert.equal(highRisk.status, "success");
  assert.equal(highRisk.block_id, "Block C");
  assert.equal(highRisk.agent_reasoning.length, 3);
  assert.equal(highRisk.agent_reasoning[0].agent, "Sensor Agent");
  assert.ok(highRisk.agent_reasoning.every((item) => Number.isInteger(item.impact)));
  assert.ok(highRisk.global_risk_index >= 70);
  assert.ok(highRisk.recommended_actions.some((item) => item.action_id === "ACT-WATER-01"));

  const safe = await analyzeBlock({
    block_id: "Block A",
    sensor_data: { soil_moisture_pct: 62, water_table_depth_cm: 28, surface_temp_c: 29 },
    weather_data: { wind_speed_kmh: 8, humidity_pct: 82 },
    vision_logs: { dry_biomass_detected: false, smoke_detected: false },
  });
  assert.ok(safe.global_risk_index < highRisk.global_risk_index);
  assert.equal(safe.agent_reasoning.length, 3);
  console.log("orchestrator tests passed");
}

run().catch((error) => { console.error(error); process.exitCode = 1; });
