CREATE TABLE attachments (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL,
  file_path TEXT NOT NULL
);