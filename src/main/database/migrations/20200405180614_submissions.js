exports.up = function (knex) {
  return knex.schema.createTable("submissions", function (table) {
    table.bigIncrements("id").unsigned().notNullable();
    table
      .bigInteger("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
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
