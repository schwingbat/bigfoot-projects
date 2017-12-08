CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  details TEXT,
  progress_state INT NOT NULL DEFAULT 1,
  due_date DATE,
  event_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  user_id INT NOT NULL
);