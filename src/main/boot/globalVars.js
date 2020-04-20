const { codes, constants } = require("../config/app");
const { sendResponse } = require("../app/commons/api");
const loadGlobals = () => {
  global.codes = codes;
  global.constants = constants;
  global.sendResponse = sendResponse;
  global.role = constants.role;
};
module.exports = { load: loadGlobals };
