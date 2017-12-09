const db = require('./db');

describe('query builders', () => {
  test('insertQueryFor generates a proper query', () => {
    const testFields = {
      'first_name': 'Chester',
      'last_name': 'Cheetah',
      'age': 65
    };

    expect(db.insertQueryFor('characters', testFields)).toEqual({
      statement: 'INSERT INTO characters (first_name, last_name, age) VALUES ($1, $2, $3)',
      values: ['Chester', 'Cheetah', 65]
    });
  });

  test('updateQueryFor generates a proper query', () => {
    const testFields = {
      'first_name': 'Chester',
      'last_name': 'Cheetah',
      'age': 65
    };

    expect(db.updateQueryFor('characters', testFields)).toEqual({
      statement: 'UPDATE characters SET first_name = $1, last_name = $2, age = $3',
      values: ['Chester', 'Cheetah', 65]
    });
  });

  test('updateQueryFor generates a proper query with WHERE clause', () => {
    const testFields = {
      'first_name': 'Chester',
      'last_name': 'Cheetah',
      'age': 65
    };

    expect(db.updateQueryFor('characters', testFields, { 'last_name': 'Cheetah' })).toEqual({
      statement: 'UPDATE characters SET first_name = $1, last_name = $2, age = $3 WHERE last_name = \'Cheetah\'',
      values: ['Chester', 'Cheetah', 65]
    });
  });
});
