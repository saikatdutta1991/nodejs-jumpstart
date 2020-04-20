const dbConfig = require("../../config/database");
const logger = require("./logger");
const Knex = require("knex");

const knex = Knex(dbConfig);
knex.on("query", function(queryData) {
  logger.debug(queryData);
});

module.exports = knex;
