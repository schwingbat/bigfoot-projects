CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

INSERT INTO groups (name)
  VALUES ('Bigfoot Marketing');
