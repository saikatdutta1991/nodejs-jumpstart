exports.up = function (knex) {
  return knex.schema.createTable("reasons", function (table) {
    table.bigIncrements("id").unsigned().notNullable();
    table.string("text", 512).nullable();
    table.decimal("weight").default(0.0);
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
