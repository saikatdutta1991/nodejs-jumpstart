const _ = require("lodash");
const knex = require("../commons/knex");

/**
 * Bulk insert
 *
 * Insert or update records in bulk
 *
 * @param {array} records Array of plain object
 * @return {boolean}
 * @throws {Exception} It may throw Query exception
 */
const bulkInsert = async (table, records, trx) => {
  const cols = _.keys(_.head(records));

  /** build the raw insert query */
  const insertQuery = [
    `INSERT INTO ${table} (${cols.join(", ")}) VALUES`,
    _.map(records, () => "(?)").join(","),
  ].join(" ");

  /** build the array of array of each record values
   * Ex : [ [ 'col1val', 'col2val' ], [ 'col1val', 'col2val' ] ]
   */
  const vals = _.map(records, (record) => _.values(record));

  const qBuilder = trx ? trx : knex;
  return qBuilder.raw(insertQuery, vals);
};

module.exports = {
  bulkInsert,
};
