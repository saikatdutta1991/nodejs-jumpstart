const express = require("express");
const router = express.Router();
const AppConfig = require("../../config/app");

router.get("/", (req, res) => {
  res.send(`Welcome to ${AppConfig.appName}. This is api middleware`);
});

module.exports = {
  prefix: "/",
  router
};
