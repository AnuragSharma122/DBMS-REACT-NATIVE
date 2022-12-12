const express = require("express");
const mysqlConnection = require("../models/Database");
const jwt = require("jsonwebtoken");
const adminLogin = (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let query = `SELECT AID FROM payrollmanagementsystem.adminmst WHERE email = "${email}" AND password = "${password}"; `;
    mysqlConnection.query(query, (err, result) => {
      if (result && result.length > 0) {
        let token = jwt.sign(
          {
            Id: result[0].AID,
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
  adminLogin,
};
