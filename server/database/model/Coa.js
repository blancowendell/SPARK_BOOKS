const Coa = {
  coa_run_bal: {
  tablename: "coa_run_bal",
  prefix: "crb",
  prefix_: "crb_",
  insertColumns: [
      "coa_id",
      "history_date",
      "create_by",
      "update_date",
      "status"
    ],
  selectColumns: [
      "crb_id",
      "crb_coa_id",
      "crb_history_date",
      "crb_create_by",
      "crb_update_date",
      "crb_status"
    ],
  selectOptionColumns: {
    id: "crb_id",
    coa_id: "crb_coa_id",
    history_date: "crb_history_date",
    create_by: "crb_create_by",
    update_date: "crb_update_date",
    status: "crb_status"
  },
  updateOptionColumns: {
    id: "id",
    coa_id: "coa_id",
    history_date: "history_date",
    create_by: "create_by",
    update_date: "update_date",
    status: "status"
  },
  selectDateFormatColumns: {
    history_date: "REPLACE(REPLACE(crb_history_date, 'T', ' '), 'Z', '') AS crb_history_date",
    update_date: "REPLACE(REPLACE(crb_update_date, 'T', ' '), 'Z', '') AS crb_update_date"
  },
  selectMiscColumns: {

  }
},
};

exports.Coa = Coa;