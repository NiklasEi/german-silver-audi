
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Niklas', surname: 'Eicker'},
        {id: 2, name: 'Jon', surname: 'Doe'},
        {id: 3, name: 'Jane', surname: 'Doe'}
      ]);
    });
};
