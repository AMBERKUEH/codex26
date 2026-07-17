const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let simulated = false;
function pulse() {
  const risk = $("#riskMetric");
  const moisture = $("#moistureMetric");
  if (!simulated) {
    risk.textContent = "74"; moisture.textContent = "37";
    $("#simulateBtn").textContent = "Pulse received · just now ↗";
  } else {
    risk.textContent = "72"; moisture.textContent = "38";
    $("#simulateBtn").textContent = "Simulate sensor pulse ↗";
  }
  simulated = !simulated;
}

function intervene() {
  $("#actionNote").textContent = "Intervention queued · Water control team notified for gates W-04 and W-05. Risk model will recalculate after the next sensor pulse.";
  $("#executeBtn").innerHTML = "In progress ✓";
  $("#executeBtn").classList.add("queued");
  $("#interveneBtn").textContent = "Intervention queued";
  $("#interveneBtn").disabled = true;
}

function answer(question) {
  const reply = $("#chatReply");
  const answers = {
    "Why is Block C at risk?": "Block C is at 89% risk because moisture is 38%, surface heat is 34.2°C, and dry westerly winds are increasing spread potential. Raising the water table is the highest-impact action.",
    "Show me the best next action": "Open canal gates W-04 and W-05 to raise the water table by 8–12 cm, then send a patrol to Block C west. This is expected to reduce risk by about 31 points.",
  };
  reply.textContent = answers[question] || "I can help explain risk drivers, recommend interventions, or prepare an evidence trail for MRV.";
  reply.hidden = false;
}

function updateClock() {
  const now = new Date();
  $("#clock").textContent = now.toLocaleTimeString("en-MY", { hour12: false });
}

$("#simulateBtn").addEventListener("click", pulse);
$("#executeBtn").addEventListener("click", intervene);
$("#interveneBtn").addEventListener("click", () => $("#action-card")?.scrollIntoView({ behavior: "smooth" }) || $(".action-card").scrollIntoView({ behavior: "smooth" }));
$("#reportBtn").addEventListener("click", (event) => { event.currentTarget.textContent = "Evidence trail ready ✓"; });
$("#detailsBtn").addEventListener("click", (event) => { event.currentTarget.textContent = "Model details: 5 signals, 3 agents, 12h horizon ✓"; });
$("#alternativesBtn").addEventListener("click", (event) => { event.currentTarget.textContent = "Alternative: deploy patrol first"; });
$("#chatForm").addEventListener("submit", (event) => { event.preventDefault(); const input = $("#chatInput"); answer(input.value.trim()); input.value = ""; });
$$('.quick-asks button').forEach((button) => button.addEventListener("click", () => answer(button.dataset.question)));
$$('.filter').forEach((button) => button.addEventListener("click", () => { $$('.filter').forEach((item) => item.classList.remove("active")); button.classList.add("active"); }));
setInterval(updateClock, 1000); updateClock();
