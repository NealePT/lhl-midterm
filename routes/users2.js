// users2.js should be merged with users.js after discussing with the team.

// Dependencies
const express = require('express');
const router = express.Router();
const database = require('../database'); //contains all SQL query functions

// 5. GET /users/:id - The end-user wants to see the collection for a specific profile.
router.get('/users/:id', (req, res) => {
  // REMINDER: Need to replace with users_index.

  const resourceID = req.params.id;
  const likesResourceID = resourceID;
  const userID = 1;
  const resParams = { resourceID: resourceID, likesResourceID: likesResourceID, userID: userID };
  // console.log("resourceID", resourceID);
  // console.log("LIKES", likesResourceID);

  // get the resource details from the user's resources
  database.getAllResources(resourceID)
    .then(data => {
      resParams.resourceID = data;
      console.log("ALL resources", resParams.resourceID);
      // console.log("params", resParams);
    })

  database.getAllLikedResources(likesResourceID)
    .then(data => {
      console.log("LIKED", data);
      resParams.likesResourceID = data;
    })

    // pass our resParams data and render the user's index page
    .then(() => res.render('temp_users_index', resParams));
});

module.exports = router;

