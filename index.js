const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const logger = require("./logger/logger");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

//#region db connection setup
var isDbConnected = true;
// const mysqlConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'shivansh'
// });

// mysqlConnection.connect((err)=> {
//   if(!err) {
//     isDbConnected = true;
//     console.log('Connection Established Successfully');
//   }
//   else {
//     console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
//   }
// });
//#endregion db connection setup

// global middlewares
app.use(cors());
app.use(express.json());

// logs are for dev only
app.use((req, res, next) => {
  if (!isDbConnected) {
    logger.log(`DB NOT CONEECTED :- REJECTED INCOMING REQUEST AT ROUTE: ${req.path}`, 0);
    res.json({
      message: "error",
      detail: "Service not available for accepting requests",
    });
  } else{
    logger.log(`PROCESSING INCOMING REQUEST AT ROUTE: ${req.path}`, 0);
    next();
  }
});

// app routes
app.use("/contact", require("./routes/contactRoutes"));

// error handler
app.use((err, req, res, next) => {
  logger.log(err.message, 0);

  res.send({
    message: "error",
    detail: err.message,
  });
});

app.listen(PORT, () => {
  logger.log(`Listening at PORT: ${PORT}`, 3);
});