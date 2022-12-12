const express = require("express");
const mysqlConnection = require("../models/Database");

const generatePayrollMonth = async (req, res) => {
  try {
    let query =
      "SELECT EID,JobID,LID,SID,amount,annual,bonus,ha,da,IFNULL(LeavesMonthTaken, 0) AS L from payrollmanagementsystem.employeemst LEFT JOIN  payrollmanagementsystem.leavemst  ON payrollmanagementsystem.leavemst.Employee = payrollmanagementsystem.employeemst.EID LEFT JOIN payrollmanagementsystem.salarymst ON payrollmanagementsystem.employeemst.JobID = payrollmanagementsystem.salarymst.JID_FK";
    // var details;
    // var data;
    var a = 10;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      var thisMonth = new Date().getMonth() + 1;
      
      const queryArr = [
        result.map((field) => [
          field.EID,
          field.JobID,
          field.SID,
          field.LID,
          thisMonth,

          parseFloat(0.7*field.amount) +
            parseFloat(field.bonus) +
            parseFloat(field.ha) +
            parseFloat(field.da) -
            parseFloat(field.L),
        ]),
      ];
      console.log(queryArr);
      if (queryArr) {
        var sql =
          "INSERT INTO payrollmanagementsystem.payrollmst (EID, JID, SID, LID, month, total_amount) VALUES ?";
        // console.log(queryArr);
        mysqlConnection.query(sql,queryArr,(err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            // console.log(result);
            res.status(201).json({ result: result });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

const getPaySlipDetails = async (req, res) => {
  try {
    let query =
      `SELECT * from payrollmanagementsystem.payrollmst LEFT JOIN  payrollmanagementsystem.employeemst ON payrollmanagementsystem.payrollmst.EID = payrollmanagementsystem.employeemst.EID LEFT JOIN payrollmanagementsystem.departmentmst ON payrollmanagementsystem.payrollmst.JID = payrollmanagementsystem.departmentmst.JID LEFT JOIN payrollmanagementsystem.salarymst ON payrollmanagementsystem.payrollmst.SID = payrollmanagementsystem.salarymst.SID WHERE payrollmanagementsystem.payrollmst.EID = ${req.body.EID}`;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ result: result });
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};
module.exports = {
  generatePayrollMonth,
  getPaySlipDetails,
};
