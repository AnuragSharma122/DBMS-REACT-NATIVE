const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "anurag",
  database: "payrollmanagementsystem",
  multipleStatements: true,
});

mysqlConnection.connect(function(err) {
     if (err) throw err;
    console.log("Database Connected!");
});

module.exports = mysqlConnection;