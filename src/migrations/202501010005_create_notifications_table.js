exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("message", 255).notNullable();
    table.boolean("is_read").defaultTo(false);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notifications");
};
