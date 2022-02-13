// Dependencies
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

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

