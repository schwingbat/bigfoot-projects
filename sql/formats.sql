CREATE TABLE formats (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true
);

INSERT INTO formats (name, description) VALUES (
  'Quarter-sheet Handout',
  '4.5" x 5.5" quarter-page sized handouts');

INSERT INTO formats (name, description) VALUES (
  'Half-sheet Handout',
  '5.5" x 8.5" half-page sized handout.');

INSERT INTO formats (name, description) VALUES (
  'Full-sheet Handout',
  '8.5" x 11" full-page handout also suitable for posting on boards.');

INSERT INTO formats (name, description) VALUES (
  'Board Poster (Glossy)',
  '11" x 17" poster for posting boards with a glossy finish.');

INSERT INTO formats (name, description) VALUES (
  'Board Poster (Matte)', 
  '11" x 17" poster for posting boards with a flat finish.');

INSERT INTO formats (name, description) VALUES (
  'A-Frame Poster (Glossy)',
  '19" x 32" poster for A-frame poster stands with a glossy finish.');

INSERT INTO formats (name, description) VALUES (
  'A-Frame Poster (Matte)',
  '19" x 32" poster for A-frame poster stands with a flat finish.');

INSERT INTO formats (name, description) VALUES (
  'Digital Only',
  'A non-print design suitable for posting on social media or websites.');

INSERT INTO formats (name, description) VALUES (
  'Custom',
  'Any size or shape you need. Just describe it in the details text box.');