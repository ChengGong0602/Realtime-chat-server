
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('user_name');
    table.string('room_name');
    table.string('message');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
