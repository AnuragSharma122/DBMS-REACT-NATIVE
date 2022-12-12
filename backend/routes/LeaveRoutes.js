const express = require("express");
const mysqlConnection = require("../models/Database");

const {
  getActiveLeave,
  getPendingLeave,
  updateLeave,
} = require("../controllers/leave-controller");
const router = express.Router();

router.get("/getactiveleave", getActiveLeave);
router.get("/getpendingleave", getPendingLeave);
router.post("/updateLeave", updateLeave);

module.exports = router;