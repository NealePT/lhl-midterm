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
      resParams.user_id = data[0].owner_id;
      console.log("USERID:", resParams.user_id);
    })

    .then(() => database.getAllResources(resourceID))
    .then(data => {
      console.log("ALL resources", data);
      resParams.resourceID = data;
      // resParams.allTitles = data.title;
      // resParams.allDesc = data.description;
      // resParams.allDate_Created = data.date_created;
    })

    .then(() => database.getAllLikedResources(likesResourceID))
    .then(data => {
      resParams.name = data[0].name;
      console.log(resParams.name);
    })
    // get all of a user's liked resources
    .then(() => database.getAllLikedResources(likesResourceID))
    .then(data => {
      console.log("LIKED", data);
      resParams.likesResourceID = data;
      // resParams.likedTitles = data.title;
      // resParams.likedDesc = data.description;
      // resParams.likedDate_Created = data.date_created;
    })

    //pass our resParams data and render the user's index page
    .then(() => res.render('temp_users_index', resParams));
  console.log(resParams);



  // database.getAllResources(resourceID)
  //   .then(data => {
  //     resParams.resourceID = data;
  //     resParams.title = data[0].title;
  //     console.log("TITLE", data[0].title);
  //     console.log("DATA", data);
  //   })

  // database.getAllLikedResources(likesResourceID)
  //   .then(data => {
  //     // console.log("LIKED", data);
  //     resParams.likesResourceID = data;
  //   })
  // .then(() => res.render('temp_users_index', resParams));
});

module.exports = router;

