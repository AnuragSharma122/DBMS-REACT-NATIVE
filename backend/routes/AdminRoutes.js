const express = require("express");
const mysqlConnection = require("../models/Database");
const { adminLogin } = require("../controllers/admin-controller");
const router = express.Router();

// router.get("/", getClass);
router.post("/login", adminLogin);

module.exports = router;
