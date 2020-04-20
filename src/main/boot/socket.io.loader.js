/**
 * This router class loads all routes ./src/main/routes/*.*.js files.
 */
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

class SocketIOLoader {
  constructor() {
    this.path = path.join(__dirname, "../app/socket-io");
  }
  load() {
    fs.readdirSync(this.path).forEach((file) => {
      require(path.join(this.path, file));
    });
  }
}

module.exports = new SocketIOLoader();
