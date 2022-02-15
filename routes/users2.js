// users2.js should be merged with users.js after discussing with the team.

// Dependencies
const express = require('express');
const router = express.Router();
const database = require('../database');

// 5. GET /users/:id - The end-user wants to see the collection for a specific profile.
router.get('/users/:id', (req, res) => {
  // REMINDER: Need to replace with users_index.

  const resourcesID = req.params.id;
  console.log(resourceID);
  const userID = 4; //id = 4 is a guest id (for testing)
  const resParams = { resourceID: resourcesID };
  database.getResourceDetails(resourceID)
    .then(data => {
      console.log("DATA:", data);
      resParams.id = data.id;
    })
    .then(() => res.render('temp_users_index', resParams));
});

module.exports = router;
