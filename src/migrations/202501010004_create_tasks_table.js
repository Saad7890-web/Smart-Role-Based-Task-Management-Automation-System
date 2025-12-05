exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();

    table
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE");

    table
      .integer("assigned_to")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table
      .integer("created_by")
      .unsigned()
      .references("id")
      .inTable("users");

    table.string("title", 255).notNullable();
    table.text("description");
    table.string("priority", 20).defaultTo("Medium");

    table.timestamp("deadline");

    table.string("status", 20).defaultTo("Pending");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
