const { codes, constants } = require("../config/app");
const { sendResponse } = require("../app/commons/api");

// Load default globals
global.codes = codes;
global.constants = constants;
global.sendResponse = sendResponse;
global.role = constants.role;

// Load gloab on demand
const load = (key, value) => {
  global[key] = value;
};

module.exports = { load };
