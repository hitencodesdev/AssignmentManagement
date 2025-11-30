const express = require("express");
const cookie = require("cookie-parser");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const departmentRoutes = require("./routes/department");
const userRoutes = require("./routes/user");
const assignmentRoutes = require("./routes/assignment");
const dashboardRoutes = require("./routes/dashboard");
const passwordRoutes=require('./routes/password')
const professorRoutes=require('./routes/professor')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());
app.set("view engine", "ejs");    

connectDB();

app.use("/", authRoutes);
app.use("/department", departmentRoutes);
app.use("/users", userRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/dashboard", dashboardRoutes);
app.use('/password',passwordRoutes)
app.use('/professor',professorRoutes)


app.listen(5000, () => console.log("Server started"));
     