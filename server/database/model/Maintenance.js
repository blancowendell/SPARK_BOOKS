const Maintenance = {
  maintenance_dashboards: {
  tablename: "maintenance_dashboards",
  prefix: "md",
  prefix_: "md_",
  insertColumns: [
      "user_id",
      "user_type",
      "title",
      "description",
      "owner"
    ],
  selectColumns: [
      "md_id",
      "md_user_id",
      "md_user_type",
      "md_title",
      "md_description",
      "md_owner",
      "md_created_at"
    ],
  selectOptionColumns: {
    id: "md_id",
    user_id: "md_user_id",
    user_type: "md_user_type",
    title: "md_title",
    description: "md_description",
    owner: "md_owner",
    created_at: "md_created_at"
  },
  updateOptionColumns: {
    id: "id",
    user_id: "user_id",
    user_type: "user_type",
    title: "title",
    description: "description",
    owner: "owner",
    created_at: "created_at"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(md_created_at, 'T', ' '), 'Z', '') AS md_created_at"
  },
  selectMiscColumns: {

  }
},
  maintenance_widgets: {
  tablename: "maintenance_widgets",
  prefix: "mw",
  prefix_: "mw_",
  insertColumns: [
      "dashboard_id",
      "type",
      "title",
      "content",
      "api_url",
      "param",
      "headers",
      "has_actions",
      "chart_type"
    ],
  selectColumns: [
      "mw_widget_id",
      "mw_dashboard_id",
      "mw_type",
      "mw_title",
      "mw_content",
      "mw_api_url",
      "mw_param",
      "mw_x",
      "mw_y",
      "mw_width",
      "mw_height",
      "mw_headers",
      "mw_has_actions",
      "mw_chart_type",
      "mw_created_at"
    ],
  selectOptionColumns: {
    widget_id: "mw_widget_id",
    dashboard_id: "mw_dashboard_id",
    type: "mw_type",
    title: "mw_title",
    content: "mw_content",
    api_url: "mw_api_url",
    param: "mw_param",
    x: "mw_x",
    y: "mw_y",
    width: "mw_width",
    height: "mw_height",
    headers: "mw_headers",
    has_actions: "mw_has_actions",
    chart_type: "mw_chart_type",
    created_at: "mw_created_at"
  },
  updateOptionColumns: {
    widget_id: "widget_id",
    dashboard_id: "dashboard_id",
    type: "type",
    title: "title",
    content: "content",
    api_url: "api_url",
    param: "param",
    x: "x",
    y: "y",
    width: "width",
    height: "height",
    headers: "headers",
    has_actions: "has_actions",
    chart_type: "chart_type",
    created_at: "created_at"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(mw_created_at, 'T', ' '), 'Z', '') AS mw_created_at"
  },
  selectMiscColumns: {

  }
},
  maintenance_api: {
  tablename: "maintenance_api",
  prefix: "ma",
  prefix_: "ma_",
  insertColumns: [
      "name",
      "api_name",
      "api_description"
    ],
  selectColumns: [
      "ma_id",
      "ma_name",
      "ma_api_name",
      "ma_api_description",
      "ma_status",
      "ma_create_date",
      "ma_update_date"
    ],
  selectOptionColumns: {
    id: "ma_id",
    name: "ma_name",
    api_name: "ma_api_name",
    api_description: "ma_api_description",
    status: "ma_status",
    create_date: "ma_create_date",
    update_date: "ma_update_date"
  },
  updateOptionColumns: {
    id: "id",
    name: "name",
    api_name: "api_name",
    api_description: "api_description",
    status: "status",
    create_date: "create_date",
    update_date: "update_date"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(ma_create_date, 'T', ' '), 'Z', '') AS ma_create_date",
    update_date: "REPLACE(REPLACE(ma_update_date, 'T', ' '), 'Z', '') AS ma_update_date"
  },
  selectMiscColumns: {

  }
},
  maintenance_sequence: {
  tablename: "maintenance_sequence",
  prefix: "ms",
  prefix_: "ms_",
  insertColumns: [
      "employee_level",
      "prefix",
      "separator",
      "start_number",
      "padding_length",
      "include_year",
      "year_format",
      "include_month",
      "include_day"
    ],
  selectColumns: [
      "ms_id",
      "ms_employee_level",
      "ms_prefix",
      "ms_separator",
      "ms_start_number",
      "ms_padding_length",
      "ms_include_year",
      "ms_year_format",
      "ms_include_month",
      "ms_include_day",
      "ms_create_at"
    ],
  selectOptionColumns: {
    id: "ms_id",
    employee_level: "ms_employee_level",
    prefix: "ms_prefix",
    separator: "ms_separator",
    start_number: "ms_start_number",
    padding_length: "ms_padding_length",
    include_year: "ms_include_year",
    year_format: "ms_year_format",
    include_month: "ms_include_month",
    include_day: "ms_include_day",
    create_at: "ms_create_at"
  },
  updateOptionColumns: {
    id: "id",
    employee_level: "employee_level",
    prefix: "prefix",
    separator: "separator",
    start_number: "start_number",
    padding_length: "padding_length",
    include_year: "include_year",
    year_format: "year_format",
    include_month: "include_month",
    include_day: "include_day",
    create_at: "create_at"
  },
  selectDateFormatColumns: {
    create_at: "REPLACE(REPLACE(ms_create_at, 'T', ' '), 'Z', '') AS ms_create_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Maintenance = Maintenance;