const _ = require("lodash");
const Boom = require("@hapi/boom");

const cacheMap = new Map();

/**
 * Check requested api has access to roles
 *
 * @param {Array[String]} roles Roles from constants role
 */
const hasRole = (roles) => {
  // Join roles
  const rolesStr = _.join(roles);

  if (cacheMap.has(rolesStr)) {
    return cacheMap.get(rolesStr);
  }

  const _middleware = (req, res, next) => {
    // Extract auth role
    const { role: authRole } = req.auth;

    if (!_.includes(roles, authRole)) {
      throw Boom.forbidden("You don't have access");
    }

    next();
  };

  cacheMap.set(rolesStr, _middleware);
  return _middleware;
};

module.exports = hasRole;
