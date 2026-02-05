const Master = {
  master_access: {
  tablename: "master_access",
  prefix: "ma",
  prefix_: "ma_",
  insertColumns: [
      "name",
      "create_by"
    ],
  selectColumns: [
      "ma_id",
      "ma_name",
      "ma_status",
      "ma_create_date",
      "ma_create_by"
    ],
  selectOptionColumns: {
    id: "ma_id",
    name: "ma_name",
    status: "ma_status",
    create_date: "ma_create_date",
    create_by: "ma_create_by"
  },
  updateOptionColumns: {
    id: "id",
    name: "name",
    status: "status",
    create_date: "create_date",
    create_by: "create_by"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(ma_create_date, 'T', ' '), 'Z', '') AS ma_create_date"
  },
  selectMiscColumns: {

  }
},
  master_employee: {
  tablename: "master_employee",
  prefix: "me",
  prefix_: "me_",
  insertColumns: [
      "id",
      "first_name",
      "last_name",
      "email"
    ],
  selectColumns: [
      "me_id",
      "me_first_name",
      "me_last_name",
      "me_email"
    ],
  selectOptionColumns: {
    id: "me_id",
    first_name: "me_first_name",
    last_name: "me_last_name",
    email: "me_email"
  },
  updateOptionColumns: {
    id: "id",
    first_name: "first_name",
    last_name: "last_name",
    email: "email"
  },
  selectDateFormatColumns: {

  },
  selectMiscColumns: {
    fullname: "CONCAT(me_first_name,' ',me_last_name) AS fullname"
  }
},
  master_users: {
  tablename: "master_users",
  prefix: "mu",
  prefix_: "mu_",
  insertColumns: [
      "employeeid",
      "access_id",
      "username",
      "password",
      "create_by"
    ],
  selectColumns: [
      "mu_id",
      "mu_employeeid",
      "mu_access_id",
      "mu_username",
      "mu_password",
      "mu_status",
      "mu_is_update_password",
      "mu_create_date",
      "mu_create_by"
    ],
  selectOptionColumns: {
    id: "mu_id",
    employeeid: "mu_employeeid",
    access_id: "mu_access_id",
    username: "mu_username",
    password: "mu_password",
    status: "mu_status",
    is_update_password: "mu_is_update_password",
    create_date: "mu_create_date",
    create_by: "mu_create_by"
  },
  updateOptionColumns: {
    id: "id",
    employeeid: "employeeid",
    access_id: "access_id",
    username: "username",
    password: "password",
    status: "status",
    is_update_password: "is_update_password",
    create_date: "create_date",
    create_by: "create_by"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(mu_create_date, 'T', ' '), 'Z', '') AS mu_create_date"
  },
  selectMiscColumns: {

  }
},
  master_access_types: {
  tablename: "master_access_types",
  prefix: "mat",
  prefix_: "mat_",
  insertColumns: [
      "name",
      "access_id",
      "permission_name",
      "create_by"
    ],
  selectColumns: [
      "mat_id",
      "mat_name",
      "mat_access_id",
      "mat_permission_name",
      "mat_status",
      "mat_create_date",
      "mat_create_by"
    ],
  selectOptionColumns: {
    id: "mat_id",
    name: "mat_name",
    access_id: "mat_access_id",
    permission_name: "mat_permission_name",
    status: "mat_status",
    create_date: "mat_create_date",
    create_by: "mat_create_by"
  },
  updateOptionColumns: {
    id: "id",
    name: "name",
    access_id: "access_id",
    permission_name: "permission_name",
    status: "status",
    create_date: "create_date",
    create_by: "create_by"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(mat_create_date, 'T', ' '), 'Z', '') AS mat_create_date"
  },
  selectMiscColumns: {

  }
},
  master_coa_type: {
  tablename: "master_coa_type",
  prefix: "mct",
  prefix_: "mct_",
  insertColumns: [
      "account_name",
      "account_type",
      "segment_start",
      "create_date",
      "create_by",
      "update_date",
      "status"
    ],
  selectColumns: [
      "mct_id",
      "mct_account_name",
      "mct_account_type",
      "mct_segment_start",
      "mct_create_date",
      "mct_create_by",
      "mct_update_date",
      "mct_status"
    ],
  selectOptionColumns: {
    id: "mct_id",
    account_name: "mct_account_name",
    account_type: "mct_account_type",
    segment_start: "mct_segment_start",
    create_date: "mct_create_date",
    create_by: "mct_create_by",
    update_date: "mct_update_date",
    status: "mct_status"
  },
  updateOptionColumns: {
    id: "id",
    account_name: "account_name",
    account_type: "account_type",
    segment_start: "segment_start",
    create_date: "create_date",
    create_by: "create_by",
    update_date: "update_date",
    status: "status"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(mct_create_date, 'T', ' '), 'Z', '') AS mct_create_date",
    update_date: "REPLACE(REPLACE(mct_update_date, 'T', ' '), 'Z', '') AS mct_update_date"
  },
  selectMiscColumns: {

  }
},
  master_coa: {
  tablename: "master_coa",
  prefix: "mc",
  prefix_: "mc_",
  insertColumns: [
      "coa_type_id",
      "account_code",
      "description",
      "running_bal",
      "create_by",
      "create_date",
      "update_date",
      "status"
    ],
  selectColumns: [
      "mc_id",
      "mc_coa_type_id",
      "mc_account_code",
      "mc_description",
      "mc_running_bal",
      "mc_create_by",
      "mc_create_date",
      "mc_update_date",
      "mc_status"
    ],
  selectOptionColumns: {
    id: "mc_id",
    coa_type_id: "mc_coa_type_id",
    account_code: "mc_account_code",
    description: "mc_description",
    running_bal: "mc_running_bal",
    create_by: "mc_create_by",
    create_date: "mc_create_date",
    update_date: "mc_update_date",
    status: "mc_status"
  },
  updateOptionColumns: {
    id: "id",
    coa_type_id: "coa_type_id",
    account_code: "account_code",
    description: "description",
    running_bal: "running_bal",
    create_by: "create_by",
    create_date: "create_date",
    update_date: "update_date",
    status: "status"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(mc_create_date, 'T', ' '), 'Z', '') AS mc_create_date",
    update_date: "REPLACE(REPLACE(mc_update_date, 'T', ' '), 'Z', '') AS mc_update_date"
  },
  selectMiscColumns: {

  }
},
  master_customer_type: {
  tablename: "master_customer_type",
  prefix: "mct",
  prefix_: "mct_",
  insertColumns: [
      "type_name",
      "description",
      "create_by",
      "create_date",
      "update_date",
      "status"
    ],
  selectColumns: [
      "mct_id",
      "mct_type_name",
      "mct_description",
      "mct_create_by",
      "mct_create_date",
      "mct_update_date",
      "mct_status"
    ],
  selectOptionColumns: {
    id: "mct_id",
    type_name: "mct_type_name",
    description: "mct_description",
    create_by: "mct_create_by",
    create_date: "mct_create_date",
    update_date: "mct_update_date",
    status: "mct_status"
  },
  updateOptionColumns: {
    id: "id",
    type_name: "type_name",
    description: "description",
    create_by: "create_by",
    create_date: "create_date",
    update_date: "update_date",
    status: "status"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(mct_create_date, 'T', ' '), 'Z', '') AS mct_create_date",
    update_date: "REPLACE(REPLACE(mct_update_date, 'T', ' '), 'Z', '') AS mct_update_date"
  },
  selectMiscColumns: {

  }
},
  master_vendor_type: {
  tablename: "master_vendor_type",
  prefix: "mvt",
  prefix_: "mvt_",
  insertColumns: [
      "type_name",
      "description",
      "create_by",
      "create_date",
      "update_date",
      "status"
    ],
  selectColumns: [
      "mvt_id",
      "mvt_type_name",
      "mvt_description",
      "mvt_create_by",
      "mvt_create_date",
      "mvt_update_date",
      "mvt_status"
    ],
  selectOptionColumns: {
    id: "mvt_id",
    type_name: "mvt_type_name",
    description: "mvt_description",
    create_by: "mvt_create_by",
    create_date: "mvt_create_date",
    update_date: "mvt_update_date",
    status: "mvt_status"
  },
  updateOptionColumns: {
    id: "id",
    type_name: "type_name",
    description: "description",
    create_by: "create_by",
    create_date: "create_date",
    update_date: "update_date",
    status: "status"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(mvt_create_date, 'T', ' '), 'Z', '') AS mvt_create_date",
    update_date: "REPLACE(REPLACE(mvt_update_date, 'T', ' '), 'Z', '') AS mvt_update_date"
  },
  selectMiscColumns: {

  }
},
  master_customer_general: {
  tablename: "master_customer_general",
  prefix: "mcg",
  prefix_: "mcg_",
  insertColumns: [
      "id",
      "type_id",
      "sales_rep_id",
      "name",
      "is_prospect",
      "account_number",
      "billing_address",
      "country",
      "region",
      "province",
      "city",
      "zip_code",
      "baranggay_street",
      "is_tax",
      "telephone",
      "fax",
      "email",
      "website",
      "create_by",
      "create_date",
      "update_date",
      "status"
    ],
  selectColumns: [
      "mcg_id",
      "mcg_type_id",
      "mcg_sales_rep_id",
      "mcg_name",
      "mcg_is_prospect",
      "mcg_account_number",
      "mcg_billing_address",
      "mcg_country",
      "mcg_region",
      "mcg_province",
      "mcg_city",
      "mcg_zip_code",
      "mcg_baranggay_street",
      "mcg_is_tax",
      "mcg_telephone",
      "mcg_fax",
      "mcg_email",
      "mcg_website",
      "mcg_create_by",
      "mcg_create_date",
      "mcg_update_date",
      "mcg_status"
    ],
  selectOptionColumns: {
    id: "mcg_id",
    type_id: "mcg_type_id",
    sales_rep_id: "mcg_sales_rep_id",
    name: "mcg_name",
    is_prospect: "mcg_is_prospect",
    account_number: "mcg_account_number",
    billing_address: "mcg_billing_address",
    country: "mcg_country",
    region: "mcg_region",
    province: "mcg_province",
    city: "mcg_city",
    zip_code: "mcg_zip_code",
    baranggay_street: "mcg_baranggay_street",
    is_tax: "mcg_is_tax",
    telephone: "mcg_telephone",
    fax: "mcg_fax",
    email: "mcg_email",
    website: "mcg_website",
    create_by: "mcg_create_by",
    create_date: "mcg_create_date",
    update_date: "mcg_update_date",
    status: "mcg_status"
  },
  updateOptionColumns: {
    id: "id",
    type_id: "type_id",
    sales_rep_id: "sales_rep_id",
    name: "name",
    is_prospect: "is_prospect",
    account_number: "account_number",
    billing_address: "billing_address",
    country: "country",
    region: "region",
    province: "province",
    city: "city",
    zip_code: "zip_code",
    baranggay_street: "baranggay_street",
    is_tax: "is_tax",
    telephone: "telephone",
    fax: "fax",
    email: "email",
    website: "website",
    create_by: "create_by",
    create_date: "create_date",
    update_date: "update_date",
    status: "status"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(mcg_create_date, 'T', ' '), 'Z', '') AS mcg_create_date",
    update_date: "REPLACE(REPLACE(mcg_update_date, 'T', ' '), 'Z', '') AS mcg_update_date"
  },
  selectMiscColumns: {

  }
},
  master_vendor_general: {
  tablename: "master_vendor_general",
  prefix: "mvg",
  prefix_: "mvg_",
  insertColumns: [
      "id",
      "type_id",
      "coa_account_id",
      "name",
      "account_number",
      "billing_address",
      "email"
    ],
  selectColumns: [
      "mvg_id",
      "mvg_type_id",
      "mvg_coa_account_id",
      "mvg_name",
      "mvg_account_number",
      "mvg_billing_address",
      "mvg_email"
    ],
  selectOptionColumns: {
    id: "mvg_id",
    type_id: "mvg_type_id",
    coa_account_id: "mvg_coa_account_id",
    name: "mvg_name",
    account_number: "mvg_account_number",
    billing_address: "mvg_billing_address",
    email: "mvg_email"
  },
  updateOptionColumns: {
    id: "id",
    type_id: "type_id",
    coa_account_id: "coa_account_id",
    name: "name",
    account_number: "account_number",
    billing_address: "billing_address",
    email: "email"
  },
  selectDateFormatColumns: {

  },
  selectMiscColumns: {

  }
},
  master_inventory_methods: {
  tablename: "master_inventory_methods",
  prefix: "mim",
  prefix_: "mim_",
  insertColumns: [
      "code",
      "method_name",
      "method_description",
      "create_date",
      "update_date",
      "status"
    ],
  selectColumns: [
      "mim_id",
      "mim_code",
      "mim_method_name",
      "mim_method_description",
      "mim_create_date",
      "mim_update_date",
      "mim_status"
    ],
  selectOptionColumns: {
    id: "mim_id",
    code: "mim_code",
    method_name: "mim_method_name",
    method_description: "mim_method_description",
    create_date: "mim_create_date",
    update_date: "mim_update_date",
    status: "mim_status"
  },
  updateOptionColumns: {
    id: "id",
    code: "code",
    method_name: "method_name",
    method_description: "method_description",
    create_date: "create_date",
    update_date: "update_date",
    status: "status"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(mim_create_date, 'T', ' '), 'Z', '') AS mim_create_date",
    update_date: "REPLACE(REPLACE(mim_update_date, 'T', ' '), 'Z', '') AS mim_update_date"
  },
  selectMiscColumns: {

  }
},
  master_inventory: {
  tablename: "master_inventory",
  prefix: "mi",
  prefix_: "mi_",
  insertColumns: [
      "item_id",
      "description",
      "description_sales_purchase",
      "item_class",
      "gl_sales_account",
      "gl_inventory_account",
      "gl_cogs_account",
      "item_price",
      "upc_sku",
      "item_type",
      "item_location",
      "stocking_uom",
      "size",
      "weight",
      "location",
      "brand",
      "created_at",
      "create_by",
      "status"
    ],
  selectColumns: [
      "mi_id",
      "mi_item_id",
      "mi_description",
      "mi_description_sales_purchase",
      "mi_item_class",
      "mi_gl_sales_account",
      "mi_gl_inventory_account",
      "mi_gl_cogs_account",
      "mi_item_price",
      "mi_upc_sku",
      "mi_item_type",
      "mi_item_location",
      "mi_stocking_uom",
      "mi_size",
      "mi_weight",
      "mi_location",
      "mi_brand",
      "mi_created_at",
      "mi_create_by",
      "mi_status"
    ],
  selectOptionColumns: {
    id: "mi_id",
    item_id: "mi_item_id",
    description: "mi_description",
    description_sales_purchase: "mi_description_sales_purchase",
    item_class: "mi_item_class",
    gl_sales_account: "mi_gl_sales_account",
    gl_inventory_account: "mi_gl_inventory_account",
    gl_cogs_account: "mi_gl_cogs_account",
    item_price: "mi_item_price",
    upc_sku: "mi_upc_sku",
    item_type: "mi_item_type",
    item_location: "mi_item_location",
    stocking_uom: "mi_stocking_uom",
    size: "mi_size",
    weight: "mi_weight",
    location: "mi_location",
    brand: "mi_brand",
    created_at: "mi_created_at",
    create_by: "mi_create_by",
    status: "mi_status"
  },
  updateOptionColumns: {
    id: "id",
    item_id: "item_id",
    description: "description",
    description_sales_purchase: "description_sales_purchase",
    item_class: "item_class",
    gl_sales_account: "gl_sales_account",
    gl_inventory_account: "gl_inventory_account",
    gl_cogs_account: "gl_cogs_account",
    item_price: "item_price",
    upc_sku: "upc_sku",
    item_type: "item_type",
    item_location: "item_location",
    stocking_uom: "stocking_uom",
    size: "size",
    weight: "weight",
    location: "location",
    brand: "brand",
    created_at: "created_at",
    create_by: "create_by",
    status: "status"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(mi_created_at, 'T', ' '), 'Z', '') AS mi_created_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Master = Master;