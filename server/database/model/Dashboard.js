const Dashboard = {
  dashboard_widgets: {
  tablename: "dashboard_widgets",
  prefix: "dw",
  prefix_: "dw_",
  insertColumns: [
      "dashboard_id",
      "type",
      "title",
      "position_x",
      "position_y",
      "width",
      "height"
    ],
  selectColumns: [
      "dw_id",
      "dw_dashboard_id",
      "dw_type",
      "dw_title",
      "dw_position_x",
      "dw_position_y",
      "dw_width",
      "dw_height",
      "dw_created_at",
      "dw_updated_at"
    ],
  selectOptionColumns: {
    id: "dw_id",
    dashboard_id: "dw_dashboard_id",
    type: "dw_type",
    title: "dw_title",
    position_x: "dw_position_x",
    position_y: "dw_position_y",
    width: "dw_width",
    height: "dw_height",
    created_at: "dw_created_at",
    updated_at: "dw_updated_at"
  },
  updateOptionColumns: {
    id: "id",
    dashboard_id: "dashboard_id",
    type: "type",
    title: "title",
    position_x: "position_x",
    position_y: "position_y",
    width: "width",
    height: "height",
    created_at: "created_at",
    updated_at: "updated_at"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(dw_created_at, 'T', ' '), 'Z', '') AS dw_created_at",
    updated_at: "REPLACE(REPLACE(dw_updated_at, 'T', ' '), 'Z', '') AS dw_updated_at"
  },
  selectMiscColumns: {

  }
},
  dashboard_widget_configs: {
  tablename: "dashboard_widget_configs",
  prefix: "dwc",
  prefix_: "dwc_",
  insertColumns: [
      "widget_id",
      "card_type",
      "content",
      "param",
      "api_id",
      "chart_type",
      "table_columns",
      "table_data",
      "custom_styles",
      "refresh_interval",
      "card_icon"
    ],
  selectColumns: [
      "dwc_id",
      "dwc_widget_id",
      "dwc_card_type",
      "dwc_content",
      "dwc_param",
      "dwc_api_id",
      "dwc_chart_type",
      "dwc_table_columns",
      "dwc_table_data",
      "dwc_custom_styles",
      "dwc_refresh_interval",
      "dwc_card_icon",
      "dwc_created_at",
      "dwc_updated_at"
    ],
  selectOptionColumns: {
    id: "dwc_id",
    widget_id: "dwc_widget_id",
    card_type: "dwc_card_type",
    content: "dwc_content",
    param: "dwc_param",
    api_id: "dwc_api_id",
    chart_type: "dwc_chart_type",
    table_columns: "dwc_table_columns",
    table_data: "dwc_table_data",
    custom_styles: "dwc_custom_styles",
    refresh_interval: "dwc_refresh_interval",
    card_icon: "dwc_card_icon",
    created_at: "dwc_created_at",
    updated_at: "dwc_updated_at"
  },
  updateOptionColumns: {
    id: "id",
    widget_id: "widget_id",
    card_type: "card_type",
    content: "content",
    param: "param",
    api_id: "api_id",
    chart_type: "chart_type",
    table_columns: "table_columns",
    table_data: "table_data",
    custom_styles: "custom_styles",
    refresh_interval: "refresh_interval",
    card_icon: "card_icon",
    created_at: "created_at",
    updated_at: "updated_at"
  },
  selectDateFormatColumns: {
    created_at: "REPLACE(REPLACE(dwc_created_at, 'T', ' '), 'Z', '') AS dwc_created_at",
    updated_at: "REPLACE(REPLACE(dwc_updated_at, 'T', ' '), 'Z', '') AS dwc_updated_at"
  },
  selectMiscColumns: {

  }
},
};

exports.Dashboard = Dashboard;