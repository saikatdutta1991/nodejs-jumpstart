const _ = require("lodash");
const Base = require("./base");

class Reason extends Base {
  static get tableName() {
    return "reasons";
  }

  get $secureFields() {
    return ["created_at", "updated_at"];
  }

  $formatJson(json, options) {
    json = super.$formatJson(json, options);
    return _.omit(json, this.$secureFields);
  }

  static relationMappings = {};
}

module.exports = Reason;
