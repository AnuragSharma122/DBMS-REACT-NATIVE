const express = require("express");
const mysqlConnection = require("../models/Database");
const { getDepartmentList } = require("../controllers/department-controller");
const router = express.Router();

// router.get("/", getClass);
router.get("/", getDepartmentList);

module.exports = router;
