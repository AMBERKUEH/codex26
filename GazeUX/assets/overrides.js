const scopeButtons = document.querySelectorAll(".scope");
const scopeContext = document.querySelector("#scopeContext");
scopeButtons.forEach((button) => button.addEventListener("click", () => {
  scopeButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  scopeContext.textContent = button.dataset.scope === "block"
    ? "KPIs now focus on Block C · 1.2 km west boundary alert zone."
    : "KPIs show estate-wide conditions. Select Block C to focus the alert zone.";
}));

const directStatus = document.querySelector("#directActionStatus");
document.querySelector("#gateBtn")?.addEventListener("click", (event) => {
  event.currentTarget.textContent = "Gate release queued ✓";
  directStatus.textContent = "Water control team notified · gates W-04 and W-05 queued for release.";
});

// Put the scope and location context into the first operational viewport.
const alertBanner = document.querySelector("#alerts");
if (alertBanner && !document.querySelector(".top-scope")) {
  const topScope = document.createElement("div");
  topScope.className = "top-scope";
  topScope.innerHTML = `<span class="eyebrow">VIEW</span><button class="top-scope-button active" data-scope="estate">Entire estate · 4,820 ha</button><button class="top-scope-button" data-scope="block">Block C · alert zone</button><span class="scope-context-top">Estate-wide conditions</span>`;
  alertBanner.parentNode.insertBefore(topScope, alertBanner);

  const map = document.createElement("div");
  map.className = "overview-map card";
  map.innerHTML = `<div class="overview-map-head"><div><span class="eyebrow">DIGITAL TWIN · LOCATION</span><strong>Block C · HIGH RISK</strong></div><span class="mini-map-status">89</span></div><div class="overview-map-plot"><span class="map-block map-a">A</span><span class="map-block map-b">B</span><span class="map-block map-c">C<i>89</i></span><span class="map-block map-d">D</span><span class="map-pin"></span></div><small>West boundary · 1.2 km from gate W-04</small>`;
  const row = document.createElement("div");
  row.className = "alert-map-row";
  alertBanner.parentNode.insertBefore(row, alertBanner);
  row.appendChild(alertBanner);
  row.appendChild(map);

  topScope.querySelectorAll(".top-scope-button").forEach((button) => button.addEventListener("click", () => {
    topScope.querySelectorAll(".top-scope-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    topScope.querySelector(".scope-context-top").textContent = button.dataset.scope === "block" ? "Block C focus · 1.2 km west boundary" : "Estate-wide conditions";
    document.querySelectorAll(".scope").forEach((item) => item.classList.toggle("active", item.dataset.scope === button.dataset.scope));
  }));
}
document.querySelector("#patrolBtn")?.addEventListener("click", (event) => {
  event.currentTarget.textContent = "Patrol dispatched ✓";
  directStatus.textContent = "Field team 02 dispatched to Block C west · ETA 18 minutes.";
});
