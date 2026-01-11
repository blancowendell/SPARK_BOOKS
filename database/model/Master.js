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
};

exports.Master = Master;