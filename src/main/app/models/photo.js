const _ = require("lodash");
const Base = require("./base");

class Photo extends Base {
  static get tableName() {
    return "photos";
  }

  get $secureFields() {
    return [];
  }

  $formatJson(json, options) {
    json = super.$formatJson(json, options);
    return _.omit(json, this.$secureFields);
  }

  /**
   * Get photos by reason ids
   *
   * @param {Array} reasonIds
   */
  static async getByReasonIds(reasonIds) {
    return this.query()
      .select("reason_submissions.reason_id", "photos.*")
      .from("reason_submissions")
      .leftJoin(
        "photos",
        "photos.submission_id",
        "reason_submissions.submission_id"
      )
      .whereIn("reason_submissions.reason_id", reasonIds);
  }
}

module.exports = Photo;
