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

    // get the resource details from the user's resources
    database.getAllResources(userID)
      .then(data => {
        resParams.user_id = userID;
        // console.log("USERID:", resParams.user_id);
        resParams.resources = data;
        const resources = resParams.resources;
        database.shortenResourceText(resources, 90);
      })

      .then(() => database.getNameByUserID(userID))
      .then(data => {
        resParams.userProfileName = data.name;
        resParams.sessionID = sessionID;
      })

      .then(() => database.getNameByUserID(sessionID))
      .then(data => {
        resParams.username = data.name;
        resParams.sessionID = sessionID;
      })

      .then(() => console.log('resParams =', resParams))

      // get all of a user's liked resources
      .then(() => database.getAllLikedResources(userLikesID))
      .then(data => {
        // console.log("LIKED", data);
        resParams.userLikes = data;
        const resources = resParams.userLikes;
        database.shortenResourceText(resources, 90);
      })
      // REMOVE TEST CODE
      .then(() => console.log('GET /users/:id =', resParams))
      //pass our resParams data and render the user's index page
      .then(() => res.render('users_index', resParams));
});

module.exports = router;

