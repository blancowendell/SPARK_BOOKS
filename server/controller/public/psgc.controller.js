"use strict";

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const OUTPUT_DIR = path.join(__dirname, "../../database/seeders/data");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/* ================= AXIOS ================= */

const axiosSafe = axios.create({
  timeout: 60000, // 60s (safe for PSGC Cloud)
  family: 4,      // force IPv4
});

/* ================= HELPERS ================= */

const writeJSON = (fileName, data) => {
  fs.writeFileSync(
    path.join(OUTPUT_DIR, fileName),
    JSON.stringify(data, null, 2)
  );
};

/* ================= PAGINATOR (WITH LOGS ONLY) ================= */

const fetchAllPages = async (label, baseUrl, limit) => {
  let results = [];
  let offset = 0;
  let page = 1;

  console.log(`\n▶️ START ${label.toUpperCase()}`);

  while (true) {
    console.log(
      `   ⏳ ${label}: page ${page} | offset=${offset} | limit=${limit}`
    );

    const res = await axiosSafe.get(baseUrl, {
      params: { limit, offset },
    });

    if (!res.data || !Array.isArray(res.data.data)) {
      throw new Error(`${label} response format invalid`);
    }

    const batch = res.data.data;
    results.push(...batch);

    console.log(
      `   ✅ ${label}: fetched ${batch.length} | total ${results.length}`
    );

    // stop condition (no meta.total dependency)
    if (batch.length < limit) {
      console.log(
        `🏁 FINISHED ${label.toUpperCase()} | total ${results.length}\n`
      );
      break;
    }

    offset += limit;
    page++;
  }

  return results;
};

/* ================= CONTROLLER ================= */

const generatePSGCJson = async (req, res) => {
  try {
    console.log("\n==============================");
    console.log("🚀 PSGC JSON GENERATION START");
    console.log("==============================");

    /* ========== REGIONS ========== */
    const regionsRaw = await fetchAllPages(
      "regions",
      "https://psgc.cloud/api/v2/regions",
      100
    );

    const regions = regionsRaw.map(r => ({
      code: r.code,
      name: r.name,
    }));

    writeJSON("regions.json", regions);

    /* ========== PROVINCES ========== */
    const provincesRaw = await fetchAllPages(
      "provinces",
      "https://psgc.cloud/api/v2/provinces",
      300
    );

    const provinces = provincesRaw.map(p => ({
      code: p.code,
      name: p.name,
      region_code: p.region.code,
    }));

    writeJSON("provinces.json", provinces);

    /* ========== CITIES / MUNICIPALITIES ========== */
    // 🔴 reduced limit to avoid deep OFFSET timeouts
    const citiesRaw = await fetchAllPages(
      "cities_municipalities",
      "https://psgc.cloud/api/v2/cities-municipalities",
      300
    );

    const cities = citiesRaw.map(c => ({
      code: c.code,
      name: c.name,
      province_code: c.province.code,
      is_city: c.type === "City",
    }));

    writeJSON("cities_municipalities.json", cities);

    /* ========== BARANGAYS ========== */
    // 🔴 reduced limit for stability
    const barangaysRaw = await fetchAllPages(
      "barangays",
      "https://psgc.cloud/api/v2/barangays",
      500
    );

    const barangays = barangaysRaw.map(b => ({
      code: b.code,
      name: b.name,
      city_code: b.city_municipality.code,
    }));

    writeJSON("barangays.json", barangays);

    console.log("==============================");
    console.log("✅ PSGC JSON GENERATION DONE");
    console.log("==============================\n");

    return res.status(200).json({
      success: true,
      message: "PSGC Cloud JSON files generated successfully",
      counts: {
        regions: regions.length,
        provinces: provinces.length,
        cities_municipalities: cities.length,
        barangays: barangays.length,
      },
    });
  } catch (error) {
    console.error("❌ PSGC generation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate PSGC JSON",
      error: error.message,
    });
  }
};

module.exports = {
  generatePSGCJson,
};
