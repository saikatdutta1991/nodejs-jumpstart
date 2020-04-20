exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("role", 15).defaultTo("user").after("dp_url");
  });
};

exports.down = function (knex) {};
