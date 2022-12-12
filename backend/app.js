var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var classRouter = require("./routes/ClassRoutes");
var employeeRouter = require("./routes/EmployeeRoutes");
var leaveRouter = require("./routes/LeaveRoutes");
var adminRouter = require("./routes/AdminRoutes");
var departmentRouter = require("./routes/Department");
var payrollRouter = require("./routes/PayrollRoutes");

var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/class", classRouter);
app.use("/employee", employeeRouter);
app.use("/leave", leaveRouter);
app.use("/admin", adminRouter);
app.use("/department", departmentRouter);
app.use("/payroll", payrollRouter);
module.exports = app;
