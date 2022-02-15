// users2.js should be merged with users.js after discussing with the team.

// Dependencies
const express = require('express');
const router = express.Router();
const database = require('../database');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);

// 5. GET /users/:id - The end-user wants to see the collection for a specific profile.
router.get('/users/:id', (req, res) => {
  // REMINDER: Need to replace with users_index.

  const resourceID = req.params.id;
  console.log("PARAMS", req.params.id);
  const userID = 1; //id = 4 is a guest id (for testing)
  const resParams = { resourceID: resourceID, userID: userID };
  res.render('temp_users_index', resParams);
});

module.exports = router;
