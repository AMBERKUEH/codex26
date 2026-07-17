async function runPeatlandAgentLoop() {
  const reasoningList = document.querySelector(".reason-list");
  const status = document.querySelector("#directActionStatus");
  if (reasoningList) reasoningList.innerHTML = "<span>Running Sensor, Vision, and Weather agents...</span>";
  try {
    const response = await fetch("/api/analyze-block", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        block_id: "Block C",
        sensor_data: { soil_moisture_pct: Number(document.querySelector("#moistureMetric")?.textContent || 38), water_table_depth_cm: 42, surface_temp_c: 34.2 },
        weather_data: { wind_speed_kmh: 18, humidity_pct: 58, forecast_12h: "hot and dry" },
        vision_logs: { dry_biomass_detected: true, smoke_detected: false, anomaly: "dry biomass accumulation" },
      }),
    });
    const data = await response.json();
    if (!response.ok || data.status !== "success") throw new Error(data.message || "Agent loop failed");
    if (reasoningList) reasoningList.innerHTML = data.agent_reasoning.map((item) => `<span><b>${item.agent}</b> · ${item.factor} <strong>+${item.impact}</strong></span>`).join("");
    const risk = document.querySelector("#riskMetric");
    if (risk) risk.textContent = data.global_risk_index;
    if (status) status.textContent = `Agent loop complete · ${data.agent_reasoning.length} specialists coordinated · ${data.recommended_actions.length} actions recommended.`;
    const actionTitle = document.querySelector(".direct-actions h2");
    if (actionTitle) actionTitle.textContent = data.recommended_actions[0].title;
  } catch (error) {
    if (reasoningList) reasoningList.innerHTML = `<span>Agent loop unavailable · ${error.message}</span>`;
  }
}

document.querySelector("#simulateBtn")?.addEventListener("click", runPeatlandAgentLoop);
document.querySelector("#gateBtn")?.addEventListener("click", runPeatlandAgentLoop);
