const express = require("express");
const mysqlConnection = require("../models/Database");

const getDepartmentList = (req, res) => {
  try {
    let query = `SELECT * FROM payrollmanagementsystem.departmentmst; `;
    mysqlConnection.query(query, (err, result) => {
      res.status(201).json({ result: result });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Request failed" });
  }
};

module.exports = {
  getDepartmentList,
};
