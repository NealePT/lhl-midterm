// Dependencies
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

// Get all properties from the resources & users tables for a specific resources id.
const getResourceDetails = resourceID => {
  const values = [resourceID];
  const query = `
  SELECT * FROM resources
  JOIN users ON users.id = owner_id
  WHERE resources.id = $1;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.getResourceDetails = getResourceDetails;

// Get the two dates from the resources table in (Mon dd, yyyy) format for a specific resources id.
const getResourceDates = resourceID => {
  const values = [resourceID];
  const query = `
  SELECT TO_CHAR(date_created, 'Mon dd, yyyy') AS date_created,
    TO_CHAR(date_modified, 'Mon dd, yyyy') AS date_modified
  FROM resources
  WHERE id = $1;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.getResourceDates = getResourceDates;

// Get the average rating from the resource_ratings table for a specifc resources id.
const getRating = resourceID => {
  const values = [resourceID];
  const query = `
  SELECT ROUND(AVG(rating), 1) AS rating
  FROM resource_ratings
  WHERE resource_id = $1;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.getRating = getRating;

const addRating = (ownerID, resourceID, rating) => {
  const values = [ownerID, resourceID, rating];
  const query = `
  INSERT INTO resource_ratings (owner_id, resource_id, rating)
  VALUES ($1, $2, $3);
  `;
  return db.query(query, values);
};
exports.addRating = addRating;

const checkRating = (ownerID, resourceID) => {
  const values = [ownerID, resourceID];
  const query = `
  SELECT * FROM resource_ratings
  WHERE owner_id = $1
    AND resource_id = $2;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.checkRating = checkRating;

// Get the total number of likes from the resource_likes table for a specific resources id.
const getLikes = resourceID => {
  const values = [resourceID];
  const query = `
  SELECT COUNT(*) AS likes
  FROM resource_likes
  WHERE resource_id = $1;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.getLikes = getLikes;

const addLike = (resourceID, ownerID) => {
  const values = [ownerID, resourceID];
  const query = `
  INSERT INTO resource_likes (owner_id, resource_id)
  VALUES ($1, $2);
  `;
  return db.query(query, values);
};
exports.addLike = addLike;

const removeLike = (resourceID, ownerID) => {
  const values = [ownerID, resourceID];
  const query = `
  DELETE FROM resource_likes
  WHERE owner_id = $1
  AND resource_id = $2;
  `;
  return db.query(query, values);
};
exports.removeLike = removeLike;

const checkLike = (resourceID, ownerID) => {
  const values = [ownerID, resourceID];
  const query = `
  SELECT * FROM resource_likes
  WHERE owner_id = $1
    AND resource_id = $2;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.checkLike = checkLike;

// Get all the comments from the resource_comments table for a specific resource id.
const getComments = resourceID => {
  const values = [resourceID];
  const query = `
  SELECT name AS commenter ,comment
  FROM users
  JOIN resource_comments ON owner_id = users.id
  WHERE resource_id = $1
  ORDER BY date DESC
  LIMIT 10;
  `;
  return db.query(query, values)
    .then(res => res.rows);
};
exports.getComments = getComments;

// Helper function for POST /collections/:id/comment - Need to modify after implementing user cookies to track owner_id
// users table id 4 = Guest (for testing purposes)
const addComment = (ownerID, resourceID, comment) => {
  const values = [ownerID, resourceID, comment];
  const query = `
  INSERT INTO resource_comments (owner_id, resource_id, date, comment)
  VALUES ($1, $2, CURRENT_TIMESTAMP, $3)
  RETURNING *;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.addComment = addComment;

const addResource = (ownerID, title, description, url, category) => {
  const values = [ownerID, title, description, url, category];
  const query = `
  INSERT INTO resources (owner_id, title, description, url, category, date_created)
  VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
  RETURNING *;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.addResource = addResource;

const updateResource = (resourceID, newTitle, newDescription, newCategory, newURL) => {
  const values = [resourceID, newTitle, newDescription, newCategory, newURL];
  const query = `
  UPDATE resources
  SET title = $2,
    description = $3,
    category = $4,
    url = $5,
    date_modified = CURRENT_DATE
  WHERE id = $1
  `;
  return db.query(query, values);
};
exports.updateResource = updateResource;

const deleteResource = resourceID => {
  const values = [resourceID];
  const query = `
  DELETE FROM resources
  WHERE id = $1;
  `;
  return db.query(query, values);
};
exports.deleteResource = deleteResource;

const getUserByEmail = (email) => {
  const values = [email];
  const query = `
  SELECT * FROM users
  WHERE email = $1
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.getUserByEmail = getUserByEmail;

const getNameByUserID = userID => {
  const values = [userID];
  const query = `
  SELECT name FROM users
  WHERE id = $1;
  `;
  return db.query(query, values)
    .then(res => res.rows[0]);
};
exports.getNameByUserID = getNameByUserID;

const getSearchResults = searchPhrase => {
  const values = [searchPhrase];
  const query = `
  SELECT resources.id as id, title, url, category, description, TO_CHAR(date_created, 'Mon dd, yyyy') AS date_created, TO_CHAR(date_modified, 'Mon dd, yyyy') AS date_modified, users.name as username, ROUND( AVG(resource_ratings.rating)::numeric, 1 ) as avgrating, count(resource_likes.id) as numlikes, count(resource_comments.comment) as numcomments
  FROM resources
  LEFT JOIN users ON owner_id = users.id
  LEFT JOIN resource_ratings ON resources.id = resource_ratings.resource_id
  LEFT JOIN resource_likes ON resources.id = resource_likes.resource_id
  LEFT JOIN resource_comments ON resources.id = resource_comments.resource_id
  WHERE title LIKE '%' || $1 || '%'
    OR description LIKE '%' || $1 || '%'
    OR category LIKE '%' || $1 || '%'
    OR url LIKE '%' || $1 || '%'
  GROUP BY title, url, description, date_created, category, users.name, date_modified, date_created, resources.id
  ORDER BY title
  LIMIT 10;
  `;
  return db.query(query, values)
    .then(res => res.rows);
};
exports.getSearchResults = getSearchResults;

const addUser = (name, email, hashedPassword) => {
  const values = [name, email, hashedPassword];
  const query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  return db.query(query, values)
  .then(res => res.rows[0]);
};
exports.addUser = addUser;
