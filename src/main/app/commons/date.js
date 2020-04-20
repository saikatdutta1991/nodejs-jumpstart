const Moment = require("moment");

/** return string of current date time in utc */
exports.nowString = () => {
  return Moment.utc().format("Y-MM-DD HH:mm:ss");
};

/**
 * This method to validate
 * is given datetime is greater than current time.
 * It assumes, timezone is in utc
 * and takes Date time in format YYYY-MM-DD HH:mm:ss
 */
exports.isSameOrAfter = date => {
  const givenDate = Moment.utc(date, "YYYY-MM-DD HH:mm:ss", true);
  if (!givenDate.isValid()) {
    throw new Error("Datetime format YYYY-MM-DD HH:mm:ss");
  }

  if (!givenDate.isSameOrAfter(Moment.utc())) {
    throw new Error("Must be same or greater than current time.");
  }

  return date;
};
