const _ = require("lodash");
const Boom = require("@hapi/boom");

const isAuthorized = (req, res, next) => {
  if (_.get(req, "auth.id", "") == _.get(req, "params.id")) next();
  else throw Boom.forbidden(`You don't have access`);
};

module.exports = isAuthorized;
