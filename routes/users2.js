// users2.js should be merged with users.js after discussing with the team.

// Dependencies
const express = require('express');
const router = express.Router();
const database = require('../database'); //contains all SQL query functions

// 5. GET /users/:id - The end-user wants to see the collection for a specific profile.
router.get('/users/:id', (req, res) => {
  // REMINDER: Need to replace with users_index.

  const resourceID = req.params.id;
  const userID = 4; //id = 4 is a guest id (for testing)
  const resParams = { resourceID: resourceID, userID: userID };


  // get the resource details from the resources & user tables
  database.getAllResources(resourceID)
    .then(data => {
      resParams.resourceID = data;
      // console.log("DATA", resParams.resourceID);
    })

    // pass our resParams data and render the user's index page
    .then(() => res.render('temp_users_index', resParams));
});

module.exports = router;
