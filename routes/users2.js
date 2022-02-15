// users2.js should be merged with users.js after discussing with the team.

// Dependencies
const express = require('express');
const router = express.Router();
const database = require('../database'); //contains all SQL query functions

// PG database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("../lib/db.js");
// const db = new Pool(dbParams);

// 5. GET /users/:id - The end-user wants to see the collection for a specific profile.
router.get('/users/:id', (req, res) => {
  // REMINDER: Need to replace with users_index.

  const resourceID = req.params.id;
  console.log("PARAMS", req.params.id);
  const userID = 4; //id = 4 is a guest id (for testing)
  const resParams = { resourceID: resourceID, userID: userID };

  // get the resource details from the resources & user tables
  database.getResourceDetails(resourceID)
    .then(data => {
      console.log("DATA", data);
      resParams.name = data.name;
      resParams.title = data.title;
      resParams.description = data.description;
      resParams.date_created = data.date_created;
    })

    // pass our resParams data and render the user's index page
    .then(() => res.render('temp_users_index', resParams));
});

module.exports = router;
