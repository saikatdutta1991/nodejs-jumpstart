const validation = require("express-joi-validation");

module.exports = validation.createValidator({
  passError: true,
});
