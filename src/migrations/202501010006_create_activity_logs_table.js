exports.up = function (knex) {
  return knex.schema.createTable("activity_logs", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.string("action", 255).notNullable();
    table.string("module", 100).notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("activity_logs");
};
