exports.up = async knex => {
  await knex.schema.createTable("users", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("name").notNull();
    t.string("surname").notNull();
    t.timestamps(true, true);
  });
  await knex.schema.createTable("accounts", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("customerId")
      .notNull()
      .unsigned()
      .index();
    t.timestamps(true, true);
    t.foreign("customerId")
      .references("id")
      .inTable("users");
  });
  await knex.schema.createTable("transactions", t => {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("accountId")
      .notNull()
      .unsigned()
      .index();
    t.integer("amount").notNull();
    t.timestamp("created_at")
      .notNull()
      .defaultTo(knex.fn.now());
    t.foreign("accountId")
      .references("id")
      .inTable("accounts");
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("accounts");
  await knex.schema.dropTable("transactions");
};
