const _ = require("lodash");
const Base = require("./base");

class Submission extends Base {
  static get tableName() {
    return "submissions";
  }

  get $secureFields() {
    return [];
  }

  $formatJson(json, options) {
    json = super.$formatJson(json, options);
    return _.omit(json, this.$secureFields);
  }

  static relationMappings = {};
}

module.exports = Submission;