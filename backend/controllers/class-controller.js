const express = require("express");
const mysqlConnection = require("../models/Database");

const getClass = async (req, res) => {
  try {
    let query = "SELECT * from classmst";
    let message = "Class created";
    mysqlConnection.query(query, (err,result)=>{
        if (err) {
          throw new error;
          return;
        }
        res.status(201).json({ result: result});
    });
  } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};
const createClass = async(req,res)=>{
    // const {CID, Class, BasicPay, SALARY, TA,MA} = req.body;
    try {
        let query = `Insert INTO payrollmanagementsystem.classmst (Class,BasicPay,SALARY,TA,MA)Values (
          "${req.body.Class}",
          ${req.body.BasicPay},
          ${req.body.SALARY},
          ${req.body.TA},
          ${req.body.MA}
        )`;
        mysqlConnection.query(query,(err, result)=>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({ result: "class created" });
        });
    } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ code: 400, message: "invalid data or invalid syntax" });
    }
}
module.exports = {
  getClass,
  createClass,
};