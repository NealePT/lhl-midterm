// users2.js should be merged with users.js after discussing with the team.

// Dependencies
const express = require('express');
const router = express.Router();
const database = require('../database'); //contains all SQL query functions

// 5. GET /users/:id - The end-user wants to see the collection for a specific profile.
router.get('/users/:id', (req, res) => {
  // REMINDER: Need to replace with users_index.
  const sessionID = req.session.user_id;
  const userID = req.params.id;
  const userLikesID = userID;
  const resParams = { userID: userID, userLikes: userLikesID };

  //If there is a session cookie, pass the cookie and matching user name before rendering the page
  if (!sessionID) {
    return res.status(400).send(`Please <a href="/login">login</a> first to view this page!`);
  } else {
    database.getUserWithID(userID)
      .then(data => {
        let creatorID = data.id;
        console.log("CREATOR", creatorID);
        console.log("SESSIONID", sessionID);

        // check if the user is the same as the sessionID
        if (creatorID !== sessionID) {
          // console.log('TESTING GET /users/:id =', resParams);

          return res.status(403).send("Access denied. This user page belongs to another user.")
        }
      })
    // get the resource details from the user's resources
    database.getAllResources(userID)
      .then(data => {
        resParams.user_id = userID;
        // console.log("USERID:", resParams.user_id);
        resParams.resources = data;
        const resources = resParams.resources;
        database.shortenResourceText(resources, 90);
      })

      .then(() => database.getNameByUserID(sessionID))
      .then(data => {
        resParams.username = data.name;
        resParams.sessionID = sessionID;
      })
      // get all of a user's liked resources
      .then(() => database.getAllLikedResources(userLikesID))
      .then(data => {
        console.log("LIKED", data);
        resParams.userLikes = data;
        const resources = resParams.userLikes;
        database.shortenResourceText(resources, 90);
      })
      // REMOVE TEST CODE
      .then(() => console.log('GET /users/:id =', resParams))
      //pass our resParams data and render the user's index page
      .then(() => res.render('temp_users_index', resParams));
  }
});

module.exports = router;

