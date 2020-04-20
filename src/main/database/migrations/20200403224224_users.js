exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.bigIncrements("id").unsigned().notNullable();
    table.string("first_name", 64).nullable();
    table.string("last_name", 64).nullable();
    table.string("email", 128).nullable();
    table.string("dp_url", 512).defaultTo("");
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {};
