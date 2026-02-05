const Philippine = {
  philippine_regions: {
  tablename: "philippine_regions",
  prefix: "pr",
  prefix_: "pr_",
  insertColumns: [
      "psgc_code",
      "region_number",
      "region_description",
      "region_code"
    ],
  selectColumns: [
      "pr_id",
      "pr_psgc_code",
      "pr_region_number",
      "pr_region_description",
      "pr_region_code",
      "pr_created_at",
      "pr_updated_at"
    ],
  selectOptionColumns: {
    id: "pr_id",
    psgc_code: "pr_psgc_code",
    region_number: "pr_region_number",
    region_description: "pr_region_description",
    region_code: "pr_region_code",
    created_at: "pr_created_at",
    updated_at: "pr_updated_at"
  },
  updateOptionColumns: {
    id: "id",
    psgc_code: "psgc_code",
    region_number: "region_number",
    region_description: "region_description",
    region_code: "region_code",
    created_at: "created_at",
    updated_at: "updated_at"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(pr_created_at, 'T', ' '), 'Z', '') AS pr_created_at",
    updated_at: "REPLACE(REPLACE(pr_updated_at, 'T', ' '), 'Z', '') AS pr_updated_at"
  },
  selectMiscColumns: {

  }
},
  philippine_provinces: {
  tablename: "philippine_provinces",
  prefix: "pp",
  prefix_: "pp_",
  insertColumns: [
      "psgc_code",
      "province_description",
      "region_code",
      "province_code"
    ],
  selectColumns: [
      "pp_id",
      "pp_psgc_code",
      "pp_province_description",
      "pp_region_code",
      "pp_province_code",
      "pp_created_at",
      "pp_updated_at"
    ],
  selectOptionColumns: {
    id: "pp_id",
    psgc_code: "pp_psgc_code",
    province_description: "pp_province_description",
    region_code: "pp_region_code",
    province_code: "pp_province_code",
    created_at: "pp_created_at",
    updated_at: "pp_updated_at"
  },
  updateOptionColumns: {
    id: "id",
    psgc_code: "psgc_code",
    province_description: "province_description",
    region_code: "region_code",
    province_code: "province_code",
    created_at: "created_at",
    updated_at: "updated_at"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(pp_created_at, 'T', ' '), 'Z', '') AS pp_created_at",
    updated_at: "REPLACE(REPLACE(pp_updated_at, 'T', ' '), 'Z', '') AS pp_updated_at"
  },
  selectMiscColumns: {

  }
},
  philippine_cities: {
  tablename: "philippine_cities",
  prefix: "pc",
  prefix_: "pc_",
  insertColumns: [
      "psgc_code",
      "city_name",
      "region_code",
      "province_code",
      "city_code"
    ],
  selectColumns: [
      "pc_id",
      "pc_psgc_code",
      "pc_city_name",
      "pc_region_code",
      "pc_province_code",
      "pc_city_code",
      "pc_created_at",
      "pc_updated_at"
    ],
  selectOptionColumns: {
    id: "pc_id",
    psgc_code: "pc_psgc_code",
    city_name: "pc_city_name",
    region_code: "pc_region_code",
    province_code: "pc_province_code",
    city_code: "pc_city_code",
    created_at: "pc_created_at",
    updated_at: "pc_updated_at"
  },
  updateOptionColumns: {
    id: "id",
    psgc_code: "psgc_code",
    city_name: "city_name",
    region_code: "region_code",
    province_code: "province_code",
    city_code: "city_code",
    created_at: "created_at",
    updated_at: "updated_at"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(pc_created_at, 'T', ' '), 'Z', '') AS pc_created_at",
    updated_at: "REPLACE(REPLACE(pc_updated_at, 'T', ' '), 'Z', '') AS pc_updated_at"
  },
  selectMiscColumns: {

  }
},
  philippine_barangays: {
  tablename: "philippine_barangays",
  prefix: "pb",
  prefix_: "pb_",
  insertColumns: [
      "psgc_code",
      "barangay_name",
      "region_code",
      "province_code",
      "city_code"
    ],
  selectColumns: [
      "pb_id",
      "pb_psgc_code",
      "pb_barangay_name",
      "pb_region_code",
      "pb_province_code",
      "pb_city_code",
      "pb_created_at",
      "pb_updated_at"
    ],
  selectOptionColumns: {
    id: "pb_id",
    psgc_code: "pb_psgc_code",
    barangay_name: "pb_barangay_name",
    region_code: "pb_region_code",
    province_code: "pb_province_code",
    city_code: "pb_city_code",
    created_at: "pb_created_at",
    updated_at: "pb_updated_at"
  },
  updateOptionColumns: {
    id: "id",
    psgc_code: "psgc_code",
    barangay_name: "barangay_name",
    region_code: "region_code",
    province_code: "province_code",
    city_code: "city_code",
    created_at: "created_at",
    updated_at: "updated_at"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(pb_created_at, 'T', ' '), 'Z', '') AS pb_created_at",
    updated_at: "REPLACE(REPLACE(pb_updated_at, 'T', ' '), 'Z', '') AS pb_updated_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Philippine = Philippine;