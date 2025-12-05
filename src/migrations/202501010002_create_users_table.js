exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    table
      .integer("role_id")
      .unsigned()
      .references("id")
      .inTable("roles")
      .onDelete("SET NULL");

    table.string("username", 100).notNullable().unique();
    table.string("email", 150).notNullable().unique();
    table.string("phone", 30);
    table.string("password", 255).notNullable();

    table.string("status", 50).defaultTo("ACTIVE");
    table.timestamp("last_login_at");
    table.boolean("is_otp_verified").defaultTo(false);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
