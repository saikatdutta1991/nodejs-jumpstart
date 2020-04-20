const ReasonSubmissionModel = require("../../models/reasonSubmission");
const ReasonModel = require("../../models/reason");
const knex = require("knex");
const _ = require("lodash");

const reasonSubmissionsCount = async () => {
  const record = await ReasonSubmissionModel.query().count("id as count");
  return _.get(_.head(record), "count", 0);
};

/**
 * Insert or update reasons in bulk
 *
 * @param {Array} records Array of objects
 */
const insertOrUpdateReasons = async (records) => {
  return await ReasonModel.query().upsertGraph(records);
};

/**
 * Get reasons count
 */
const getReasonsCount = async () => {
  return await ReasonSubmissionModel.query()
    .select("reason_id", knex.raw("COUNT(*) as count"))
    .groupBy("reason_id");
};

module.exports = {
  getReasonsCount,
  insertOrUpdateReasons,
  reasonSubmissionsCount,
};
