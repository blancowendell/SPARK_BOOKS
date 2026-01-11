const Token = {
  token: {
  tablename: "token",
  prefix: "t",
  prefix_: "t_",
  insertColumns: [
      "name",
      "token",
      "type",
      "reference_table_id",
      "table_name",
      "email",
      "create_date",
      "expired_date"
    ],
  selectColumns: [
      "t_id",
      "t_name",
      "t_token",
      "t_type",
      "t_reference_table_id",
      "t_table_name",
      "t_email",
      "t_create_date",
      "t_expired_date",
      "t_status"
    ],
  selectOptionColumns: {
    id: "t_id",
    name: "t_name",
    token: "t_token",
    type: "t_type",
    reference_table_id: "t_reference_table_id",
    table_name: "t_table_name",
    email: "t_email",
    create_date: "t_create_date",
    expired_date: "t_expired_date",
    status: "t_status"
  },
  updateOptionColumns: {
    id: "id",
    name: "name",
    token: "token",
    type: "type",
    reference_table_id: "reference_table_id",
    table_name: "table_name",
    email: "email",
    create_date: "create_date",
    expired_date: "expired_date",
    status: "status"
  },
  selectDateFormatColumns: {
    create_date: "REPLACE(REPLACE(t_create_date, 'T', ' '), 'Z', '') AS t_create_date",
    expired_date: "REPLACE(REPLACE(t_expired_date, 'T', ' '), 'Z', '') AS t_expired_date"
  },
  selectMiscColumns: {

  }
},
};

exports.Token = Token;