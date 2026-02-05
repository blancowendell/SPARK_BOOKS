const Pricing = {
  pricing_formula: {
  tablename: "pricing_formula",
  prefix: "pf",
  prefix_: "pf_",
  insertColumns: [
      "code",
      "name",
      "pricing_type",
      "operation",
      "value",
      "rounding_rule",
      "rounding_precision",
      "created_at",
      "created_by"
    ],
  selectColumns: [
      "pf_id",
      "pf_code",
      "pf_name",
      "pf_pricing_type",
      "pf_operation",
      "pf_value",
      "pf_rounding_rule",
      "pf_rounding_precision",
      "pf_status",
      "pf_created_at",
      "pf_created_by"
    ],
  selectOptionColumns: {
    id: "pf_id",
    code: "pf_code",
    name: "pf_name",
    pricing_type: "pf_pricing_type",
    operation: "pf_operation",
    value: "pf_value",
    rounding_rule: "pf_rounding_rule",
    rounding_precision: "pf_rounding_precision",
    status: "pf_status",
    created_at: "pf_created_at",
    created_by: "pf_created_by"
  },
  updateOptionColumns: {
    id: "id",
    code: "code",
    name: "name",
    pricing_type: "pricing_type",
    operation: "operation",
    value: "value",
    rounding_rule: "rounding_rule",
    rounding_precision: "rounding_precision",
    status: "status",
    created_at: "created_at",
    created_by: "created_by"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(pf_created_at, 'T', ' '), 'Z', '') AS pf_created_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Pricing = Pricing;