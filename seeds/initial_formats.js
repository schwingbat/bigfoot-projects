
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('formats')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('formats').insert([
        {
          name: 'Quarter-sheet Handout',
          description: `4.5" x 5.5" quarter-page sized handouts`,
          width: 4.5,
          height: 5.5,
          landscape: false,
          digital: false,
        },
        {
          name: 'Half-sheet Handout',
          description: `5.5" x 8.5" half-page sized handout.`,
          width: 5.5,
          height: 8.5,
          landscape: false,
          digital: false,
        },
        {
          name: 'Full-sheet Handout',
          description: `8.5" x 11" full-page handout also suitable for posting on boards.`,
          width: 8.5,
          height: 11,
          landscape: false,
          digital: false,
        },
        {
          name: 'Board Poster',
          description: `11" x 17" poster for posting boards`,
          width: 11,
          height: 17,
          landscape: false,
          digital: false,
        },
        {
          name: 'A-Frame Poster',
          description: `19" x 32" poster for A-frame poster stands`,
          width: 19,
          height: 32,
          landscape: false,
          digital: false,
        },
        {
          name: 'Digital',
          description: `Digital files suitable for posting on social media or websites.`,
          digital: true,
        },
        {
          name: 'Custom',
          description: `Any size or shape you need.`,
        }
      ]);
    });
};
