CREATE TABLE progress_states (
  id INT NOT NULL,
  label TEXT NOT NULL
);

INSERT INTO progress_states (id, label)
                     VALUES ( 0, 'Draft');

INSERT INTO progress_states (id, label)
                     VALUES ( 1, 'Submitted');

INSERT INTO progress_states (id, label)
                     VALUES ( 2, 'In Progress');

INSERT INTO progress_states (id, label)
                     VALUES ( 3, 'Finishing Touches');

INSERT INTO progress_states (id, label)
                     VALUES ( 4, 'Completed');