const { apiAuthKey, codes } = require("../../config/app");
const logger = require("./logger");
const Boom = require("@hapi/boom");

/** sends generic api json response */
module.exports.sendResponse = (response, statusCode, type, message, data) => {
  response.status(statusCode).json({
    type: type,
    message: message,
    data: data,
  });
};
