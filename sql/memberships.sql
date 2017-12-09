CREATE TABLE memberships (
  id SERIAL PRIMARY KEY,
  group_id INT NOT NULL,
  user_id INT NOT NULL
);
