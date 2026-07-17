const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "..", "data", "mock_ux_interface_data.csv");

const columns = [
  "Recording",
  "Participant",
  "Timeline",
  "TOI",
  "Interval",
  "Media",
  "AOI",
  "AOI_size",
  "Duration_of_interval",
  "Start_of_interval",
  "Total_duration_of_fixations",
  "Average_duration_of_fixations",
  "Number_of_fixations",
  "Time_to_first_fixation",
  "Total_duration_of_Glances",
  "Number_of_Glances",
];

const aois = [
  {
    name: "hero_banner",
    type: "distractor",
    size: 122000,
    ttff: 420,
    fixTotal: 2450,
    fixAvg: 205,
    fixCount: 11.8,
    glanceTotal: 1250,
    glanceCount: 3.2,
  },
  {
    name: "product_image",
    type: "distractor",
    size: 98000,
    ttff: 690,
    fixTotal: 2100,
    fixAvg: 230,
    fixCount: 8.9,
    glanceTotal: 1060,
    glanceCount: 2.9,
  },
  {
    name: "checkout_target",
    type: "target",
    size: 14300,
    ttff: 7200,
    fixTotal: 860,
    fixAvg: 540,
    fixCount: 1.6,
    glanceTotal: 230,
    glanceCount: 0.5,
  },
  {
    name: "add_to_cart_target",
    type: "target",
    size: 16800,
    ttff: 5400,
    fixTotal: 1120,
    fixAvg: 470,
    fixCount: 2.2,
    glanceTotal: 310,
    glanceCount: 0.7,
  },
  {
    name: "promo_popup",
    type: "distractor",
    size: 45000,
    ttff: 510,
    fixTotal: 1760,
    fixAvg: 195,
    fixCount: 8.6,
    glanceTotal: 1340,
    glanceCount: 3.7,
  },
  {
    name: "price_label",
    type: "target",
    size: 9200,
    ttff: 2950,
    fixTotal: 720,
    fixAvg: 390,
    fixCount: 1.9,
    glanceTotal: 280,
    glanceCount: 0.8,
  },
  {
    name: "navigation_menu",
    type: "distractor",
    size: 33000,
    ttff: 1140,
    fixTotal: 980,
    fixAvg: 180,
    fixCount: 5.4,
    glanceTotal: 820,
    glanceCount: 2.6,
  },
  {
    name: "search_bar_target",
    type: "target",
    size: 19200,
    ttff: 3800,
    fixTotal: 910,
    fixAvg: 420,
    fixCount: 2.0,
    glanceTotal: 260,
    glanceCount: 0.6,
  },
  {
    name: "recommended_items",
    type: "distractor",
    size: 76000,
    ttff: 1550,
    fixTotal: 1540,
    fixAvg: 185,
    fixCount: 7.9,
    glanceTotal: 980,
    glanceCount: 3.1,
  },
  {
    name: "reviews_section",
    type: "support",
    size: 56000,
    ttff: 6200,
    fixTotal: 650,
    fixAvg: 300,
    fixCount: 2.4,
    glanceTotal: 450,
    glanceCount: 1.3,
  },
  {
    name: "shipping_info_target",
    type: "target",
    size: 12800,
    ttff: 7900,
    fixTotal: 760,
    fixAvg: 455,
    fixCount: 1.7,
    glanceTotal: 210,
    glanceCount: 0.5,
  },
  {
    name: "footer_links",
    type: "distractor",
    size: 39000,
    ttff: 9800,
    fixTotal: 220,
    fixAvg: 160,
    fixCount: 1.4,
    glanceTotal: 510,
    glanceCount: 1.8,
  },
];

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20260618);

function jitter(value, spread, min = 0) {
  const centered = random() * 2 - 1;
  return Math.max(min, Math.round(value * (1 + centered * spread)));
}

function csvEscape(value) {
  const text = String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const rows = [columns.join(",")];
const participants = 36;
const repeats = 3;

for (let participant = 1; participant <= participants; participant += 1) {
  for (let repeat = 1; repeat <= repeats; repeat += 1) {
    for (const aoi of aois) {
      const interval = jitter(12000, 0.08, 9000);
      const missedTarget = aoi.type === "target" && random() < 0.14;
      const fixationCount = missedTarget ? 0 : jitter(aoi.fixCount, 0.35, 0);
      const avgFix = missedTarget ? 0 : jitter(aoi.fixAvg, 0.28, 60);
      const totalFix = missedTarget ? 0 : Math.max(avgFix * Math.max(1, fixationCount), jitter(aoi.fixTotal, 0.25, 0));
      const ttff = missedTarget ? interval : Math.min(interval, jitter(aoi.ttff, 0.32, 120));
      const glanceCount = jitter(aoi.glanceCount, 0.42, 0);
      const totalGlance = jitter(aoi.glanceTotal, 0.35, 0);

      rows.push([
        `UXRecording${repeat}`,
        `UXP${String(participant).padStart(2, "0")}`,
        "EcommerceCheckoutTimeline",
        "Ecommerce_Checkout_Page",
        repeat,
        "Checkout mockup",
        aoi.name,
        jitter(aoi.size, 0.08, 1000),
        interval,
        (repeat - 1) * 15000,
        totalFix,
        avgFix,
        fixationCount,
        ttff,
        totalGlance,
        glanceCount,
      ].map(csvEscape).join(","));
    }
  }
}

fs.writeFileSync(outputPath, `${rows.join("\n")}\n`, "utf8");
console.log(`Generated ${rows.length - 1} mock UX rows at ${outputPath}`);
