exports.up = function (knex) {
  return knex.schema.createTable("reason_submissions", function (table) {
    table.bigIncrements("id").unsigned().notNullable();
    table
      .bigInteger("submission_id")
      .unsigned()
      .references("id")
      .inTable("submissions")
      .onDelete("CASCADE");
    table
      .bigInteger("reason_id")
      .unsigned()
      .references("id")
      .inTable("reasons")
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