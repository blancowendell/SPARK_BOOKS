const { DataModeling } = require("../../services/data_modeling/Database");
const { DecrypterString } = require("./cryptography");
const { InsertStatement, SelectStatement, UpdateStatement, GetCurrentDatetime } = require("./customhelper");
const { Maintenance } = require("../../database/model/Maintenance");
const { Token } = require("../../database/model/Token");
const { Select, Check, Insert, InsertTable, Update } = require("./dbconnect");
const { SendEmail } = require("./mailer");
const crypto = require("crypto");

if (typeof ReadableStream === "undefined") {
  global.ReadableStream =
    require("web-streams-polyfill/polyfill").ReadableStream;
}
const juice = require("juice");
const e = require("express");

exports.showSweetAlert = (title, text, icon, buttonText) => {
  try {
    swal({
      title: title,
      text: text,
      icon: icon,
      button: buttonText,
    });
  } catch (error) {
    console.log(error);
  }
};

// Example of how to use the custom function:
// showSweetAlert("success", "Log in Successfully", "success", "Let's go!");
// showSweetAlert("incorrect", "Incorrect Credentials. Please try again!", "error", "AWW NO!!!");

//#region SLQ SNIPPET CODE
exports.InsertStatement = (tablename, prefix, columns) => {
  let cols = "";

  columns.forEach((col) => {
    cols += `${prefix}_${col},`;
  });

  cols = cols.slice(0, -1);

  let statement = `INSERT INTO ${tablename}(${cols}) VALUES ?`;

  return statement;
};

exports.UpdateStatement = (tablename, prefix, columns, args) => {
  let cols = "";
  let agrs = "";

  columns.forEach((col) => {
    cols += `${prefix}_${col} = ?,`;
  });

  args.forEach((arg) => {
    agrs += `${prefix}_${arg} = ? AND `;
  });

  cols = cols.slice(0, -1);
  agrs = agrs.slice(0, -5);

  let statement = `UPDATE ${tablename} SET ${cols} WHERE ${agrs}`;

  return statement;
};

exports.UpdateNoPrefixStatement = (tablename, columns, args) => {
  let cols = "";
  let agrs = "";

  columns.forEach((col) => {
    cols += `${col} = ?,`;
  });

  args.forEach((arg) => {
    agrs += `${arg} = ? AND `;
  });

  cols = cols.slice(0, -1);
  agrs = agrs.slice(0, -5);

  let statement = `UPDATE ${tablename} SET ${cols} WHERE ${agrs}`;

  return statement;
};

exports.SelectStatement = (str, data) => {
  let statement = "";
  let found = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "?") {
      statement += `'${data[found]}'`;
      found += 1;
    } else {
      statement += str[i];
    }
  }
  return statement;
};

//#endregion

//#region Email Notification

exports.SendNotification = (subgroupid, requesttype, body) => {
  try {
    let sql = `select me_email as s_email, s_name as s_subgroup,
                concat(me_firstname, '', me_lastname) as s_fullname 
                from master_employee
                inner join master_user on me_id = mu_employeeid
                inner join user_subgroup on us_userid = mu_userid
                inner join subgroup on s_id = us_subgroupid
                where s_id = ?`;

    let cmd = this.SelectStatement(sql, [subgroupid]);
    let emailList = "";

    Select(cmd, (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        let data = DataModeling(result, "s_");

        data.forEach((d) => {
          emailList += d.email + ",";
        });

        SendEmail(emailList.slice(0, -1), requesttype, body);
      }
    });
  } catch (error) {
    throw error;
  }
};

exports.SendEmployeeNotification = (employeeid, requesttype, body) => {
  try {
    let sql = `select 
              me_email
              from master_employee
              where me_id=?`;

    let cmd = this.SelectStatement(sql, [employeeid]);
    let emailList = "";

    Select(cmd, (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        let data = DataModeling(result, "me_");

        data.forEach((d) => {
          emailList += d.email + ",";
        });

        SendEmail(emailList.slice(0, -1), requesttype, body);
      }
    });
  } catch (error) {
    throw error;
  }
};

const style = /*css*/ `@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');

* {font-family: "Merriweather", serif;font-weight: 400;}


/* desktop style */

.card-style {width: 15rem;top: 100px;}
.header-style {background-color: #fffafa !important;text-align: center;border-bottom: 5px solid red !important;}
.card-logo {margin-top: 15px;width: 55px;height: 55px;}
.header-title {font-size: 16px;color: black !important;text-shadow: rgb(58, 1, 1) 1px 1px;font-weight: 700;font-style: italic !important;letter-spacing: .05rem;padding: 15px;}
.line-title {color: black !important;padding-top: 35px;font-weight: 700;font-size: 30px;}
.icon-style {width: 30px;height: 30px;padding: 2px;color: rgb(66, 65, 65) !important;}
.shift-title {color: rgb(97, 96, 96) !important;font-size: 15px;margin-right: 0.35rem;font-weight: 600;}
hr {border-bottom-width: 3px; --tw-border-opacity: 1;border-bottom-color: rgb(97 96 96 / var(--tw-border-opacity)); margin-bottom: 1rem;}
body,table,td,a {-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;}
table,td {mso-table-rspace: 0pt;mso-table-lspace: 0pt;}
img {-ms-interpolation-mode: bicubic;}
body {margin: 0;padding: 0;width: 100% !important;-webkit-font-smoothing: antialiased;}
.container { max-width: 650px;margin: 2rem auto;}
.container-lg { max-width: 900px;margin: 2rem auto;}
.card {background-color: white !important;box-shadow: 0 .15rem 1.75rem 0 rgba(35, 36, 41, 0.15);border: 2px solid #757474 !important;border-radius: .3125rem;padding: 10px;}
.time-card {background-color: rgb(252, 251, 251) !important;border: 1px solid #757474 !important;padding: 35px;margin-top: 20px !important;}
.check {margin-top: 1rem;float: right;}
.bmss-link {color: rgb(15, 172, 15) !important;font-weight: 900;font-size: 14px;}
.bmss-link:hover {color: rgb(8, 124, 😎 !important;font-weight: 900);}
.company-link {color: black !important;font-size: 12px;font-weight: 600;}
.company-link:hover { color: red !important;font-weight: 900;}
.company-logo {width: 25px;height: 25px;}
.card-header {text-align: center;font-size: 2.5rem;padding: 10px;}
.card-body { padding: 10px;}
.card-footer { text-align: center;padding-top: 25px !important;background-color: white !important;}
.title-footer {color: black !important;font-weight: 900;font-family: 'Franklin Gothic Medium';}
.label-title {color: black !important;font-size: 18px;margin-right: 0.35rem;font-weight: 400;font-family: 'Franklin Gothic Medium';}
.start-date {color: black !important;font-size: 18px;margin-right: 0.35rem;font-weight: 400;font-family: 'Franklin Gothic Medium';padding: 2px;}
.start-time {color: rgb(23, 165, 23) !important;font-size: 18px;margin-right: 0.35rem;font-weight: 400;font-family: 'Franklin Gothic Medium';text-transform: uppercase;padding: 2px;}
.text-left {text-align: left;}
.table-container {border: 1px solid #e4e4e4;border-radius: .3125rem;width: 100%;margin: 1rem 0;}
.table {width: 100%;border-collapse: collapse;}
.table th,
.table td {padding: .75rem;text-align: left;border-bottom: 1px solid #e4e4e4;}
.table-header { background-color: #eaecf4;}
.text-md {font-size: 18px;font-weight: 400;font-family: 'Franklin Gothic Medium';}
.label-value {font-size: 18px;font-weight: 600;font-family: 'Franklin Gothic Medium';color: rgb(23, 165, 23) !important;}
.label-end {font-size: 18px;font-weight: 600;font-family: 'Franklin Gothic Medium';color: rgb(221, 14, 14) !important;}
.row {display: flex;flex-wrap: wrap;gap: 50%;padding-left: 4%;padding-right: 3%;padding-top: 1%;}
.date {margin-left: auto;float: right;}
.employeename {margin-top: 5%;padding: 2px;}
.status-context {color: black !important;font-size: 18px;font-weight: 400;font-family: 'Franklin Gothic Medium';text-transform: uppercase;}
.reason-context {color: rgb(73, 72, 72) !important;font-size: 15px;font-weight: 600;font-style: italic;}
.col-full { flex: 0 0 100%; width: 100%;}
.mt-1 {margin-top: 0.25rem;}
.col-half { margin-bottom: 1rem;flex: 1 1 0%;}
.text-right {text-align: right !important;}`;
exports.EmailNotification = (details) => {
  // Read and combine CSS files

  const {
    employeename,
    date,
    timein,
    timeout,
    reason,
    requesttype,
    startdate,
    enddate,
    status,
  } = details[0];

  const template = /*html*/ `
    <html lang="en">

<head>
    <link rel="stylesheet" href="css/template.css">

    <!--boostrap css-->
    <link rel="stylesheet" href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

    <!--bootstrap icons-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!--boxicons-->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

</head>

<body>

    <div class="container">
        <div class="card">
            <div class="card-header header-style">
                <img rel src="https://hrmis.5lsolutions.com/images/img/5L.png" alt="Logo" class="card-logo">
                <b class="header-title">Solutions Supply and Allied Services Corp.</b>
                <h2 class="line-title">${requesttype} Request</h2>
            </div>

            <div class="card-body">
                <div class="date"> 
                    <i class='bx bx-calendar-alt icon-style'></i>
                    <span class="label-title">Date:</span>
                    <span class="text-md">${date}</span>
                </div>  
        
                <div class="employeename">
                    <i class='bx bx-user icon-style'></i>
                    <span class="label-title">Employee:</span>
                    <span class="text-md">${employeename}</span>
                </div>
          

                <div class="status">
                    <i class='bx bx-stats icon-style'></i>
                    <span class="label-title">Status:</span>
                    <span class="status-context">${status}</span>
                  </div>


                  <div class="reason">
                    <i class='bx bx-message-alt-detail icon-style'></i>
                    <span class="label-title">Reason:</span>
                    <span class="reason-context">${
                      reason == undefined ? "N/A" : reason
                    }</span>
                  </div>

                <div class="card time-card">
                    <h6 class="shift-title">These are your shift records:</h6>
                <div class="row mt-4">
                    <div class="col">
                        <h6 class="label-title">${
                          timein == undefined ? "Start Date" : "Time In"
                        }:</h6>
                        <h6 class="label-value">${
                          timein == undefined ? startdate : timein
                        }</h6>
                    </div>
                </div>

                <hr className="border-b-[3px] border-b-red-800 mb-4" />

                <div class="row mt-4">
                  <div class="col">
                        <h6 class="label-title">${
                          timeout == undefined ? "Start Date" : "Time Out"
                        }:</h6>
                        <h6 class="label-value">${
                          timeout == undefined ? enddate : timeout
                        }</h6>
                    </div>
                </div>
            </div>

          
                <div class="check">
                    <a href="https://hrmis.5lsolutions.com/" class="bmss-link">Check here</a>
                </div>
            </div>

            <div class="card-footer">
                <span class="title-footer">Chronus MTK Powered by </span>
                <a href="https://www.5lsolutions.com/" class="company-link"><img src="https://hrmis.5lsolutions.com/images/img/5L.png" alt="Logo" class="company-logo">Solutions Supply and Allied Services Corp.</a>
            </div>
        </div>
    </div>



    <!-- bootstrap js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!--script for lordicon-->
    <script src="https://cdn.lordicon.com/lordicon.js"></script>
</body>

</html>`;

  //juice.inlineContent(template, style)
  const inlinedHtml = juice.inlineContent(template, style);
  return inlinedHtml;
};

exports.ForgotPasswordTemplate = (details) => {
  // Read and combine CSS files

  const { id, fullname, password } = details[0];

  const template = /*html*/ `
<html lang="en">
<head>
    <link rel="stylesheet" href="css/template.css">
    <!--boostrap css-->
    <link rel="stylesheet" href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <!--bootstrap icons-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!--boxicons-->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

</head>

<body>

    <div class="container">
        <div class="card">
            <div class="card-header header-style">
                <img rel src="https://hrmis.5lsolutions.com/images/img/5L.png" alt="Logo" class="card-logo">
                <b class="header-title">Solutions Supply and Allied Services Corp.</b>
                <h2 class="line-title">Forgot Password</h2>
            </div>

            <div class="card-body">
                <div class="date"> 
                    <span class="label-title">ID:</span>
                    <span class="text-md">${id}</span>
                </div>
        
                    <div class="employeename">
                        <i class='bx bx-user icon-style'></i>
                        <span class="label-title">Employee:</span>
                        <span class="text-md">${fullname}</span>
                    </div>
          
                <div class="reason">
                    <i class='bx bx-stats icon-style'></i>
                    <span class="label-title">Password:</span>
                    <span class="reason-context">${DecrypterString(
                      password
                    )}</span>
                  </div>
            </div>

           



                <div class="check">
                    <a href="https://hrmis.5lsolutions.com/" class="bmss-link">Login here</a>
                </div>
            </div>

            <div class="card-footer">
                <span class="title-footer">Chronus MTK Powered by </span>
                <a href="https://www.5lsolutions.com/" class="company-link"> <img src="https://hrmis.5lsolutions.com/images/img/5L.png" alt="Logo" class="company-logo"> Solutions Supply and Allied Services Corp.</a>
            </div>
        </div>
    </div>



    <!-- bootstrap js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!--script for lordicon-->
    <script src="https://cdn.lordicon.com/lordicon.js"></script>
</body>

</html>`;

  //juice.inlineContent(template, style)
  const inlinedHtml = juice.inlineContent(template, style);
  return inlinedHtml;
};

exports.UnauthorizedTemplate = () => {
  const unauthorizedError = /*html*/ `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Token Expired</title>
    <!-- Bootstrap 4 CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body {
        background-color: #f8f9fa;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .error-container {
        text-align: center;
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 40px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }

      .error-title {
        font-size: 3rem;
        font-weight: 700;
        color: #dc3545;
      }

      .error-message {
        font-size: 1.25rem;
        margin: 20px 0;
        color: #6c757d;
      }
    </style>
  </head>

  <body>
    <div class="error-container">
      <h1 class="error-title">401</h1>
      <p class="error-message">Token Expired</p>
      <p>Your session has expired. Please log in again to continue.</p>
      <a href="/" class="btn btn-primary mt-3">Log In</a>
    </div>

    <!-- Bootstrap 4 JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.4.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  </body>

  </html>


  `;

  return unauthorizedError;
};

exports.CompanySetupEmail = ({ companyName, token, expiredDate }) => {
  const template = /*html*/ `
  <html lang="en">
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <style>
      .card {
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        padding: 20px;
      }
      .header-style {
        background: #f8f9fa;
        padding: 15px;
        border-bottom: 2px solid #ddd;
      }
      .header-title {
        font-size: 1.2rem;
        margin-left: 10px;
      }
      .token-box {
        font-size: 1.1rem;
        font-weight: bold;
        background: #f1f3f5;
        padding: 10px;
        border-radius: 6px;
        word-break: break-all;
      }
      .bmss-link {
        background: #007bff;
        color: #fff !important;
        padding: 10px 15px;
        border-radius: 6px;
        text-decoration: none;
      }
      .bmss-link:hover {
        background: #0056b3;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="card">
        <div class="card-header header-style d-flex align-items-center">
          <img src="https://hrmis.5lsolutions.com/images/img/5L.png" alt="Logo" class="card-logo" width="40">
          <b class="header-title">Solutions Supply and Allied Services Corp.</b>
        </div>

        <div class="card-body">
          <h4>Welcome to GPOS back office</h4>
          <p>Your company <b>${companyName}</b> has been successfully created.</p>
          <p>Please use the following token to activate your company account:</p>

          <div class="token-box">${token}</div>

          <p><i class='bx bx-time-five'></i> <b>Expiry:</b> ${expiredDate}</p>

          <div class="mt-4">
            <a href="https://5lsolutions.com/activate?token=${token}" class="bmss-link">
              Activate Company
            </a>
          </div>
        </div>

        <div class="card-footer text-muted mt-3">
          <span class="title-footer">GPOS BACK OFFICE</span>
          <a href="https://www.5lsolutions.com/" class="company-link">
            <img src="https://hrmis.5lsolutions.com/images/img/5L.png" alt="Logo" width="40">
            Solutions Supply and Allied Services Corp.
          </a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  return template;
};

exports.SyncOTPEmail = ({ email, token, expiredDate }) => {
  const template = /*html*/ `
  <html lang="en">
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <style>
      .card {
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        padding: 20px;
      }
      .header-style {
        background: #f8f9fa;
        padding: 15px;
        border-bottom: 2px solid #ddd;
      }
      .header-title {
        font-size: 1.2rem;
        margin-left: 10px;
      }
      .token-box {
        font-size: 1.4rem;
        font-weight: bold;
        background: #e9ecef;
        color: #0d6efd;
        padding: 12px;
        border-radius: 8px;
        word-break: break-all;
        letter-spacing: 2px;
        text-align: center;
      }
      .bmss-link {
        background: #0d6efd;
        color: #fff !important;
        padding: 10px 15px;
        border-radius: 6px;
        text-decoration: none;
      }
      .bmss-link:hover {
        background: #0b5ed7;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="card">
        <div class="card-header header-style d-flex align-items-center">
          <img src="https://hrmis.5lsolutions.com/images/img/5L.png" alt="Logo" class="card-logo" width="40">
          <b class="header-title">Solutions Supply and Allied Services Corp.</b>
        </div>

        <div class="card-body">
          <h4><i class="bi bi-shield-lock"></i> Sync OTP Request</h4>
          <p>Hello <b>${email}</b>,</p>
          <p>We received a request to synchronize your system. Please use the OTP below to continue:</p>

          <div class="token-box">${token}</div>

          <p class="mt-3"><i class='bx bx-time-five'></i> <b>Expiry:</b> ${expiredDate}</p>

          <div class="mt-4">
            <a href="https://5lsolutions.com/sync-auth?token=${token}" class="bmss-link">
              Verify Sync Request
            </a>
          </div>

          <p class="mt-4 text-muted" style="font-size: 0.9rem;">
            If you did not initiate this request, please ignore this email or contact support immediately.
          </p>
        </div>

        <div class="card-footer text-muted mt-3">
          <span class="title-footer">GPOS BACK OFFICE</span>
          <a href="https://www.5lsolutions.com/" class="company-link">
            <img src="https://hrmis.5lsolutions.com/images/img/5L.png" alt="Logo" width="40">
            Solutions Supply and Allied Services Corp.
          </a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  return template;
};


//#endregion

//#region FUNCTIONS

exports.generateCustomerCredentials = (firstName, lastName, phone) => {
  try {
    const username = lastName.toLowerCase().replace(/\s+/g, "");
    const password = lastName.toLowerCase().replace(/\s+/g, "");
    return { username, password };
  } catch (error) {
    console.log("Error generating customer credentials:", error);
    return null;
  }
};

exports.generateOwnerCredentials = (ownerName, companyName) => {
  try {
    const username = ownerName.toLowerCase().replace(/\s+/g, "");
    const password = ownerName.toLowerCase().replace(/\s+/g, "");
    return { username, password };
  } catch (error) {
    console.log("Error generating owner credentials:", error);
    return null;
  }
};

exports.generateUniqueTicketId = async (ticket_level) => {
  try {
    const select_sql = `
      SELECT * FROM maintenance_sequence
      WHERE ms_id = ?
      LIMIT 1
    `;

    const seq = await new Promise((resolve, reject) => {
      Select({ sql: select_sql, values: [ticket_level] }, (err, res) => {
        if (err) return reject(err);
        if (!res || res.length === 0) return reject(new Error("No sequence config found."));
        resolve(res[0]);
      });
    });

    const now = new Date();

    // Assemble date parts based on config
    const dateParts = [];
    if (seq.ms_include_year) dateParts.push(now.getFullYear());
    if (seq.ms_include_month) dateParts.push(String(now.getMonth() + 1).padStart(2, "0"));
    if (seq.ms_include_day) dateParts.push(String(now.getDate()).padStart(2, "0"));

    const datePart = dateParts.join(seq.ms_separator); // Only use separator between date parts

    // Build the LIKE pattern for checking existing tickets
    const likePattern = `${seq.ms_prefix}${datePart ? datePart + seq.ms_separator : ""}%`;

    const check_sql = `SELECT t_id FROM tickets WHERE t_id LIKE ? ORDER BY t_id DESC LIMIT 1`;

    const latestTicket = await new Promise((resolve, reject) => {
      Select({ sql: check_sql, values: [likePattern] }, (err, res) => {
        if (err) return reject(err);
        resolve(res.length > 0 ? res[0].t_id : null);
      });
    });

    let nextNumber;
    if (!latestTicket) {
      nextNumber = parseInt(seq.ms_start_number, 10);
    } else {
      const lastPart = latestTicket.split(seq.ms_separator).pop();
      const parsed = parseInt(lastPart, 10);
      nextNumber = isNaN(parsed) ? parseInt(seq.ms_start_number, 10) : parsed + 1;
    }

    const padded = String(nextNumber).padStart(seq.ms_padding_length, "0");

    // ✅ Final ticket ID: no separator between prefix and date
    const ticket_id = `${seq.ms_prefix}${datePart ? datePart + seq.ms_separator : ""}${padded}`;

    return ticket_id;
  } catch (error) {
    console.error("Error generating unique ticket ID:", error);
    throw error;
  }
};

exports.generateDashboardId = (userId, userType, title, description, owner) => {
  return new Promise((resolve, reject) => {
    try {
      const insert_data = [[
        userId,
        userType,
        title,
        description,
        owner,
      ]];      

      console.log("Insert Data for Dashboard:", insert_data);
      

      const sql_insert = InsertStatement(
        Maintenance.maintenance_dashboards.tablename,
        Maintenance.maintenance_dashboards.prefix,
        Maintenance.maintenance_dashboards.insertColumns
      );

      const checkStatement = SelectStatement(
        "SELECT * FROM maintenance_dashboards WHERE md_user_id = ? AND md_user_type = ? AND md_title = ? AND md_description = ? AND md_owner = ?",
        [userId, userType, title, description, owner]
      );

      Check(checkStatement)
        .then((result) => {
          if (result && result.length > 0) {
            return reject("Dashboard already exists.");
          }

          Insert(sql_insert, insert_data, (err) => {
            if (err) {
              return reject(err);
            }
            return resolve();
          });
        })
        .catch((error) => {
          return reject(error);
        });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.sanitizeInput = (input) => {
  if (typeof input === "string") {
    // Replace single quotes with escaped single quotes and trim spaces
    return input.replace(/'/g, "''").trim();
  }
  return input;
};

exports.createToken = (referenceId, tableName, name, type, email, durationInHours) => {
  return new Promise(async (resolve, reject) => {
    try {
      const generatedToken = crypto.randomBytes(10).toString("hex");

      const now = new Date();
      const expiredDate = new Date(
        now.getTime() + durationInHours * 60 * 60 * 1000
      );

      const checkSql = SelectStatement(
        "SELECT * FROM token WHERE t_reference_table_id = ? AND t_table_name = ? AND t_name = ? AND t_type = ?",
        [referenceId, tableName, name, type]
      );

      const existing = await Check(checkSql);

      if (existing != 0) {
        const update_data = [
          generatedToken,
          now,
          expiredDate,
          "AVAILABLE",
          referenceId,
          tableName,
          name,
          type,
        ];

        const update_sql = UpdateStatement(
          Token.token.tablename,
          Token.token.prefix,
          [
            Token.token.updateOptionColumns.token,
            Token.token.updateOptionColumns.create_date,
            Token.token.updateOptionColumns.expired_date,
            Token.token.updateOptionColumns.status,
          ],
          [
            Token.token.updateOptionColumns.reference_table_id,
            Token.token.updateOptionColumns.table_name,
            Token.token.updateOptionColumns.name,
            Token.token.updateOptionColumns.type,
          ]
        );

        Update(update_sql, update_data, (err) => {
          if (err) return reject(err);
          resolve({ token: generatedToken, expiredDate });
        });
      } else {
        const insert_data = [
          [
            name,
            generatedToken,
            type,
            referenceId,
            tableName,
            email,
            now,
            expiredDate,
          ],
        ];

        const insert_sql = InsertStatement(
          Token.token.tablename,
          Token.token.prefix,
          Token.token.insertColumns
        );

        Insert(insert_sql, insert_data, (err) => {
          if (err) return reject(err);
          resolve({ token: generatedToken, expiredDate });
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.ImageUpload = (type, tableId, imageData, callback) => {
  try {
    const create_date = GetCurrentDatetime();

    const checkStatement = SelectStatement(
      "SELECT * FROM master_file_image WHERE mfi_type = ? AND mfi_table_id = ?",
      [type, tableId]
    );

    Check(checkStatement)
      .then((existing) => {
        console.log("Check existing image result:", existing);

        if (Array.isArray(existing) && existing.length > 0) {
          const updateStatement = UpdateStatement(
            "master_file_image",
            "mfi",
            ["image", "create_date"],
            ["type", "table_id"]
          );
          const updateData = [imageData, create_date, type, tableId];

          Update(updateStatement, updateData, (err, result) => {
            if (err) {
              console.error("Image update error:", err);
              return callback(err);
            } else {
              console.log("Image updated, affected rows:", result.affectedRows);
              return callback(null, { success: true, message: "Image updated successfully" });
            }
          });
        } else {
          const insertStatement = InsertStatement("master_file_image", "mfi", [
            "type",
            "table_id",
            "image",
            "create_date",
          ]);
          const insertData = [[type, tableId, imageData, create_date]];

          InsertTable(insertStatement, insertData, (err, result) => {
            if (err) {
              console.error("Image insert error:", err);
              return callback(err);
            } else {
              console.log("Image inserted successfully:", result);
              return callback(null, { success: true, message: "Image inserted successfully" });
            }
          });
        }
      })

      .catch((error) => {
        console.error("Error in ImageUpload Check:", error);
        return callback(error);
      });
  } catch (error) {
    console.error("Error in ImageUpload:", error);
    return callback(error);
  }
};

exports.generateUniqueEmployeeId = async (employee_level) => {
  try {
    const select_sql = `
      SELECT * FROM maintenance_sequence
      WHERE ms_id = ?
      LIMIT 1
    `;

    const seq = await new Promise((resolve, reject) => {
      Select({ sql: select_sql, values: [employee_level] }, (err, res) => {
        if (err) return reject(err);
        if (!res || res.length === 0)
          return reject(new Error("No sequence config found."));
        resolve(res[0]);
      });
    });

    const now = new Date();
    const dateParts = [];

    if (seq.ms_include_year) {
      const year = now.getFullYear().toString();
      const formattedYear = seq.ms_year_format === "YY" ? year.slice(2) : year;
      dateParts.push(formattedYear);
    }

    if (seq.ms_include_month) {
      dateParts.push(String(now.getMonth() + 1).padStart(2, "0"));
    }

    if (seq.ms_include_day) {
      dateParts.push(String(now.getDate()).padStart(2, "0"));
    }

    const separator = seq.ms_separator || "";
    const datePart = dateParts.join(separator);
    const likePattern = `${seq.ms_prefix}${datePart ? datePart + separator : ""}%`;

    const check_sql = `SELECT me_id FROM master_employee WHERE me_id LIKE ? ORDER BY me_id DESC LIMIT 1`;

    const latestEmployee = await new Promise((resolve, reject) => {
      Select({ sql: check_sql, values: [likePattern] }, (err, res) => {
        if (err) return reject(err);
        resolve(res.length > 0 ? res[0].me_id : null);
      });
    });

    let nextNumber;
    if (!latestEmployee) {
      nextNumber = parseInt(seq.ms_start_number, 10);
    } else {
      const lastPart = latestEmployee.split(separator).pop();
      const parsed = parseInt(lastPart, 10);
      nextNumber = isNaN(parsed)
        ? parseInt(seq.ms_start_number, 10)
        : parsed + 1;
    }

    const padded = String(nextNumber).padStart(seq.ms_padding_length, "0");
    const employee_id = `${seq.ms_prefix}${datePart ? datePart + separator : ""}${padded}`;

    return employee_id;
  } catch (error) {
    console.error("Error generating unique employee ID:", error);
    throw error;
  }
};

exports.genPassword = async ({ id }) => {
  const password = `${id}`
    .toLowerCase()
    .replace(/\s+/g, "");
  return { password };
};

//#endregion
