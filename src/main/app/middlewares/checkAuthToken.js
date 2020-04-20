const jwt = require("../commons/jwt");
const _ = require("lodash");
const Logger = require("../commons/logger");

const checkAuthToken = (req, res, next) => {
  // Extract token from header
  const token = _.get(req, "headers.authorization", "").replace("Bearer ", "");

  try {
    // Verify jwt auth token
    const decoded = jwt.verify(token);
    Logger.info("Jwt token payload", decoded);

    // add id to decodeed object
    _.set(decoded, "id", decoded.sub);

    // add decoded payload as auth into request object
    _.set(req, "auth", decoded);

    // pass the controll to next
    next();
  } catch (err) {
    sendResponse(res, 401, "Unauthorized", "Yor are not authorized", err.data);
  }
};

module.exports = checkAuthToken;
