const jwt = require("jsonwebtoken");
const AppConfig = require("../../config/app");
const Boom = require("@hapi/boom");
const _ = require("lodash");
// const Logger = require("../commons/logger");

const customize = (payload) => {
  /** set default values */
  _.set(payload, "sub", _.get(payload, "sub", 0));
  _.set(payload, "role", _.get(payload, "role", "unknown"));
  const twodaysahead = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2;
  _.set(payload, "exp", _.get(payload, "exp", twodaysahead));
  _.set(payload, "iss", _.get(payload, "iss", AppConfig.appName));
  return payload;
};

/**
 * Generates jwt token
 *
 * @param {Object} payload
 */
const sign = (payload) => {
  payload = customize(payload);
  return jwt.sign(payload, AppConfig.jwtSecret);
};

/**
 * Verify jwt token
 *
 * Verify token and returns payload decoded
 * throw errors
 *
 * @param {String} token
 */
const verify = (token) => {
  try {
    return jwt.verify(token, AppConfig.jwtSecret);
  } catch (err) {
    throw Boom.badRequest(err.message, err);
  }
};

module.exports = {
  sign,
  verify,
};
