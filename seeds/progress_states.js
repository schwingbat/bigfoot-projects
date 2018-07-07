
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('progress_states').del()
    .then(function () {
      // Inserts seed entries
      return knex('progress_states').insert([
        { id: 1, label: 'Submitted' },
        { id: 2, label: 'Started' },
        { id: 3, label: 'Final Tweaks' },
        { id: 4, label: 'Ready' }
      ]);
    });
};
