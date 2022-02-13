DROP TABLE IF EXISTS resource_comments CASCADE;

CREATE TABLE resource_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  date TIMESTAMP,
  comment TEXT
);
