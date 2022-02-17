// users2.js should be merged with users.js after discussing with the team.

// Dependencies
const express = require('express');
const router = express.Router();
const database = require('../database'); //contains all SQL query functions

// 5. GET /users/:id - The end-user wants to see the collection for a specific profile.
router.get('/users/:id', (req, res) => {
  // REMINDER: Need to replace with users_index.
  const sessionID = req.session.user_id;
  const resourceID = req.params.id;
  const likesResourceID = resourceID;
  const resParams = { resourceID: resourceID, likesResourceID: likesResourceID };

  //If there is a session cookie, pass the cookie and matching user name before rendering the page
  if (!sessionID) {
    res.render('users_index', resParams);
  } else {
    database.getNameByUserID(sessionID)
      .then(data => {
        resParams.username = data.name;
        resParams.sessionID = sessionID;
      })

      // REMOVE TEST CODE
      .then(() => console.log('GET /users/:id =', resParams));
  }


  // get the resource details from the user's resources
  database.getAllResources(resourceID)
    .then(data => {
      console.log("DATA:", data);
      resParams.user_id = resourceID;
      console.log("USERID:", resParams.user_id);
      resParams.resources = data;
      console.log("resourceID", data);
    })
    // .then(() => database.getAllResources(resourceID))
    // .then(data => {
    //   // console.log("ALL resources", data);
    //   resParams.resourceID = data;
    // })

    // get all of a user's liked resources
    .then(() => database.getAllLikedResources(likesResourceID))
    .then(data => {
      console.log("LIKED", data);
      resParams.likesResourceID = data;
    })

    //pass our resParams data and render the user's index page
    .then(() => res.render('temp_users_index', resParams));
});

module.exports = router;

