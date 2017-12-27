
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(() => {
      return knex('groups').insert([
        { name: 'Bigfoot Events' }
      ]);
    });
};
