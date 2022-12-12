const express = require("express");
const mysqlConnection = require("../models/Database");
const jwt = require("jsonwebtoken");
const createEmployee = async (req, res) => {
  try {
    // let {Name, Address, Class, SALARY, Designation } = req.body;
    let query = `INSERT INTO payrollmanagementsystem.employeemst (Name, Address, Class, Designation,Branch) Values("${req.body.Name}","${req.body.Address}",${req.body.Class},"${req.body.Designation}","${req.body.Branch}");
    INSERT INTO payrollmanagementsystem.salarymst (Employee, BankAccount, Salary, Leave,Month) Values(5,"${req.body.BankAccount}","${req.body.Salary}","${req.body.Leave}","${req.body.Month}");`;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ result: "employee created" });
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

const getEmployee = (req, res) => {
  try {
    let query = "SELECT * from payrollmanagementsystem.employeemst";
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        throw new error();
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

const getEmployeeByDepartment = (req, res) => {
  try {
    let query = `SELECT EID,Name from payrollmanagementsystem.employeemst WHERE Branch = "${req.body.Department}" `;
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

const getEmployeeDetailsById = (req, res) => {
  try {
    let query = `SELECT * FROM payrollmanagementsystem.employeemst LEFT JOIN payrollmanagementsystem.departmentmst on payrollmanagementsystem.departmentmst.JID = payrollmanagementsystem.employeemst.JobID WHERE EID = "${req.body.Id}" `;
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

const getActiveEmployee = (req, res) => {
  try {
    let query1 = `SELECT count(EID) AS employeeCount from payrollmanagementsystem.employeemst; SELECT count(LID) AS deactive from payrollmanagementsystem.leavemst; SELECT count(LID) AS accepted from payrollmanagementsystem.leavemst WHERE Accepted = 1; `;
    // let query2 = `SELECT count(LID) from payrollmanagementsystem.leavemst`;
    mysqlConnection.query(query1, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      list = {
        result: [
          {
            name: "Employee",
            count: result[0][0].employeeCount,
          },
          {
            name: "Active",
            count: result[0][0].employeeCount - result[2][0].accepted,
          },
          {
            name: "Deactive",
            count: result[2][0].accepted,
          },
          {
            name: "New Leave",
            count: result[2][0].accepted,
          },
          {
            name: "Aprroved",
            count: result[2][0].accepted,
          },
          {
            name: "Rejected",
            count: result[1][0].deactive - result[2][0].accepted,
          },
        ],
      };
      res.status(201).json(list);
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

const employeeLogin = (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    
    let query = `SELECT EID FROM payrollmanagementsystem.employeemst WHERE emp_email = "${email}" AND emp_pass = "${password}"; `;
    mysqlConnection.query(query, (err, result) => {
      console.log(result);
      if (result && result.length > 0) {
        let token = jwt.sign(
          {
            Id: result[0].EID,
            email: email,
          },
          "o4Gpgedteng6VBXIaCNFfzBUgEHA9vKxAKgHu4lhp_WfRIX0rQhOqeSiOPapVJAGr3dOmj5h30Z1qmhY6nGNStLEdueudPGx0isMMkIiXA79roBui5Cu1XMfqsTG8ZhEheHMjUqMuSuCs0eakpenmRczk3nVPXwc2w_TNUqCMYECSRkqz2lwGciO4Y_yv5FJAHFADSsvaCVEQypc8aOy5UgTC0N_CA-khooGapUAV3FNkleFlIo5Q07MP2oPgqf3qk_LyWhzD4O1_bBEOnRKu3WmRkvMFzhR595__DqWJm8Uw8i1DUE-5iALKq40NUPZgj1XpKhcKC5npt_K2qaUYQ",
          { expiresIn: "1h" }
        );
        res.status(201).json({ result: token });
      } else {
        res
          .status(400)
          .json({ code: 400, message: "Invalid username or password" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Login failed" });
  }
};
module.exports = {
  createEmployee,
  getEmployee,
  getEmployeeByDepartment,
  getEmployeeDetailsById,
  getActiveEmployee,
  employeeLogin,
};
