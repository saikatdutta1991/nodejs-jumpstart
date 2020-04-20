const Boom = require("@hapi/boom");
const Logger = require("./logger");
const Api = require("./api");

module.exports = (err, req, res, next) => {
  // Log error if not boom err
  if (err.error && err.error.isJoi) {
    err = Boom.badRequest(err.error.toString(), err.error.details);
  } else if (err.name == "MulterError") {
    err = Boom.badRequest(err);
  } else if (!err.isBoom) {
    Logger.error(err);
    err = Boom.badImplementation();
  }

  const {
    data,
    output: {
      payload: { statusCode: code, error: type, message },
    },
  } = err;
  return Api.sendResponse(res, code, type, message, data);
};
