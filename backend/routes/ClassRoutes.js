const express = require("express");
const mysqlConnection = require("../models/Database");
const { getClass, createClass } = require("../controllers/class-controller");
const router = express.Router();

router.get("/", getClass);
router.post("/", createClass);

module.exports = router;