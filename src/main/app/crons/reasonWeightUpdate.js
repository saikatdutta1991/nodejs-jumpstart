const cron = require("node-cron");
const ReasonHelper = require("../commons/helpers/reason");
const Moment = require("moment");
const _ = require("lodash");
const Logger = require("../commons/logger");

/**
 * This cron runs every minute
 * 1. fetch count of reason submisions
 * 2. fetch each reason counts
 * 3. update weight based on formula
 */
cron.schedule("* * * * *", async () => {
  Logger.info("Reason weight update cron started");
  const count = await ReasonHelper.reasonSubmissionsCount();
  const reasonCounts = await ReasonHelper.getReasonsCount();
  const now = Moment.utc();

  // to update reason objects
  const reasonsMap = _.map(reasonCounts, (record) => {
    return {
      id: record.reason_id,
      updated_at: now,
      weight: (record.count / count) * 100,
    };
  });

  // update reason weights
  await ReasonHelper.insertOrUpdateReasons(reasonsMap);

  Logger.info("Reason weight update cron ended");
});
