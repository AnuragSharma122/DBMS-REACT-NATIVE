const express = require("express");
const mysqlConnection = require("../models/Database");

const {
  generatePayrollMonth,
  getPaySlipDetails,
} = require("../controllers/payroll-controller");
const router = express.Router();

router.get("/generatePayrollMonth", generatePayrollMonth);
router.post("/getPaySlipDetails", getPaySlipDetails);

module.exports = router;
