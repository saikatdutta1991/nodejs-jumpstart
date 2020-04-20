// const _ = require("lodash");
// const Base = require("./base");

// class User extends Base {
//   static get tableName() {
//     return "users";
//   }

//   get $secureFields() {
//     return [];
//   }

//   $formatJson(json, options) {
//     json = super.$formatJson(json, options);
//     return _.omit(json, this.$secureFields);
//   }

//   static relationMappings = {
//     social_account: {
//       relation: Base.HasOneRelation,
//       modelClass: `${__dirname}/socialAccount`,
//       join: {
//         from: "users.id",
//         to: "user_social_accounts.user_id"
//       }
//     }
//   };
// }

// module.exports = User;
