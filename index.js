const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./logger/logger");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

// global middlewares
app.use(cors());
app.use(express.json());

// logs are for dev only
app.use((req, res, next) => {
    logger.log(`PROCESSING INCOMING REQUEST AT ROUTE: ${req.path}`, 0);
    next();
  }
);

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