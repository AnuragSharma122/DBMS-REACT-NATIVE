const express = require("express");
const mysqlConnection = require("../models/Database");

const getActiveLeave = async (req, res) => {
  try {
    let query =
      "SELECT * from payrollmanagementsystem.leavemst JOIN payrollmanagementsystem.employeemst ON payrollmanagementsystem.leavemst.Employee = payrollmanagementsystem.employeemst.EID WHERE status = 1";
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ result: result, title: "Active Leaves" });
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};
const getPendingLeave = async (req, res) => {
  try {
    let query =
      "SELECT * from payrollmanagementsystem.leavemst JOIN payrollmanagementsystem.employeemst ON payrollmanagementsystem.leavemst.Employee = payrollmanagementsystem.employeemst.EID WHERE status = 0";
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ result: result, title: "Pending Leaves" });
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

const updateLeave = async (req, res) => {
  try {
    var query = `UPDATE payrollmanagementsystem.leavemst SET status = 1 WHERE LID = ${req.body.LID}`;
    if (req.body.delete != 0) {
      query = `DELETE from payrollmanagementsystem.leavemst WHERE LID = ${req.body.LID} AND status = 0`;
    }
    console.log(query);
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ result: result, title: "Pending Leaves" });
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};
module.exports = {
  getActiveLeave,
  getPendingLeave,
  updateLeave,
};
