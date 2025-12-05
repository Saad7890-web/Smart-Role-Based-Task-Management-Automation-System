exports.up = function (knex) {
  return knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();

    table.string("name", 255).notNullable();
    table.text("description");

    table
      .integer("created_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
