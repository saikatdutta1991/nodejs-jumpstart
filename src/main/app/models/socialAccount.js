const _ = require("lodash");
const Base = require("./base");

class SocialAccount extends Base {
  static get tableName() {
    return "user_social_accounts";
  }

  get $secureFields() {
    return [];
  }

  $formatJson(json, options) {
    json = super.$formatJson(json, options);
    return _.omit(json, this.$secureFields);
  }

  static relationMappings = {
    user: {
      relation: Base.BelongsToOneRelation,
      modelClass: `${__dirname}/user`,
      join: {
        from: "user_social_accounts.user_id",
        to: "users.id"
      }
    }
  };
}

module.exports = SocialAccount;
