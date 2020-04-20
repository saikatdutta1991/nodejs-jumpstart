exports.up = function (knex) {
  return knex.schema.createTable("photos", function (table) {
    table.bigIncrements("id").unsigned().notNullable();
    table
      .bigInteger("submission_id")
      .unsigned()
      .references("id")
      .inTable("submissions")
      .onDelete("CASCADE");
    table.string("url", 512).defaultTo("");
    table.string("storage", 64).nullable();
    table.string("bucket", 128).nullable();
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
