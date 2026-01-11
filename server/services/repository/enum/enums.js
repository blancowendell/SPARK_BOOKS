const REQUEST = {
  COA: "Correction of Attendance",
  OVERTIME: "Overtime",
  LEAVE: "Leave",
  CA: "Cash Advance",
  LOAN: "Loan",
  OTMEAL: "Overtime Meal",
  HD: "Holiday OT",
  RD: "Rest Day OT",
  OB: "Official Business",
  UT: "Undertime",
};

exports.REQUEST = REQUEST;

const STAFF_HOUSE_STATUS = {};
exports.STAFF_HOUSE_STATUS = STAFF_HOUSE_STATUS;

const STATUS_LOG = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  REQUESTED: "REQUESTED",
  NEW: "New",
  UPDATE: "Update",
  DELETE: "Delete",
  REQUEST: "Request",
};

exports.STATUS_LOG = STATUS_LOG;

const REQUEST_STATUS = {
  pending: "PENDING",
  approved: "APPROVED",
  rejected: "REJECTED",
  cancelled: "CANCELLED",
  applied: "APPLIED",
};

exports.REQUEST_STATUS = REQUEST_STATUS;

const STATUS_REQUEST = {
  APPLIED: "Applied",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
};

exports.STATUS_REQUEST = STATUS_REQUEST;

const STATIC_ROLE = {
  ADMIN: "Administrator",
};

exports.STATIC_ROLE = STATIC_ROLE;


// constants/coaEnums.js

const COA_ACCOUNT_TYPES = [
  'Asset Accounts',
  'Liability Accounts',
  'Equity Accounts',
  'Revenue Accounts',
  'COGS Accounts',
  'Expense Accounts',
  'Other Accounts'
];

exports.COA_ACCOUNT_TYPES = COA_ACCOUNT_TYPES;

const COA_SEGMENT_RANGES = [
  '1000-1999',
  '2000-2999',
  '3000-3999',
  '4000-4999',
  '5000-5999',
  '6000-6999',
  '7000-7999'
];

exports.COA_SEGMENT_RANGES = COA_SEGMENT_RANGES;
