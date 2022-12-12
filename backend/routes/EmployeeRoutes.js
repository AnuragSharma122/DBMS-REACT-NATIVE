const express = require("express");
const mysqlConnection = require("../models/Database");
const {
  createEmployee,
  getEmployee,
  getEmployeeByDepartment,
  getEmployeeDetailsById,
  getActiveEmployee,
  employeeLogin,
} = require("../controllers/employee-controller");
const router = express.Router();

// router.get("/", getClass);
router.post("/", createEmployee);
router.get("/", getEmployee);
router.post("/getByDepartment", getEmployeeByDepartment);
router.post("/getEmployeeDetailsById", getEmployeeDetailsById);
router.get("/getActiveEmployee", getActiveEmployee);
router.post("/login", employeeLogin);

module.exports = router;
