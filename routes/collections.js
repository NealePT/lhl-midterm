// Dependencies
const { use } = require('bcrypt/promises');
const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();
const database = require('../database'); // Contains all SQL query functions.

// 1. GET /collections - The end user wants to see all collections.
router.get('/collections', (req, res) => {
  const sessionID = req.session.user_id;
  const resParams = {};

  // Get individual resource details.
  database.getTrendingResources(4)
  .then(data => resParams.trendingResources = data)
  .then(() => database.getRandomVideoResources(4))
  .then(data => resParams.videoResources = data)
  .then(() => database.getRandomBlogResources(4))
  .then(data => resParams.blogResources = data)
  .then(() => database.getRandomTutorialResources(4))
  .then(data => resParams.tutorialResources = data)
  .then(() => database.getRandomNewsResources(4))
  .then(data => resParams.newsResources = data)

  .then(() => {

    // If there is a session cookie, pass the cookie and matching user name before rendering the page.
    if (!sessionID) {
      resParams.sessionID = null;
      // REMINDER: Need to eventually replace with collections_index.
      res.render('collections_index2', resParams);
    } else {
      database.getNameByUserID(sessionID)
      .then(data => {
        resParams.username = data.name;
        resParams.sessionID = sessionID;
      })

      // Remove test code.
      .then(() => console.log('resParams =', resParams))

      // REMINDER: Need to eventually replace with collections_index.
      .then(() => res.render('collections_index2', resParams));
    }
  })

});


// 2. GET /collections/new - The end-user wants to save a new resource.
// NOTE: GET /collections/new must go before GET collections/:id, otherwise, '/new' will be misinterpreted as a '/:id' variable.
router.get('/collections/new', (req, res) => {
  const sessionID = req.session.user_id;
  const resParams = {};

  // If there is a session cookie, pass the cookie and matching user name before rendering the page.
  if (!sessionID) {
    return res.status(404).send(`
      Please <a href="/login">login</a> to view this page.
    `);
  } else {
    database.getNameByUserID(sessionID)
    .then(data => {
      resParams.username = data.name;
      resParams.sessionID = sessionID;
    })

    // REMINDER: Remove test code
    .then(() => console.log('GET /collections/new =', resParams))
    .then(() => res.render('collections_new', resParams));
  }
});


// 3. GET /collections/:id - The end-user wants to see a particular resource.
router.get('/collections/:id', (req, res) => {
  const sessionID = req.session.user_id;
  const resourcesID = req.params.id;
  const resParams = { resourceID: resourcesID };

  // Get most of the relevant properties from the resources & users tables.
  database.getResourceDetails(resourcesID)
  .then(data => {
    resParams.title = data.title;
    resParams.description = data.description;
    resParams.category = data.category;
    resParams.url = data.url;
    resParams.publisher = data.name;
    resParams.publisherID = data['owner_id'];
  })

  // If there is a session cookie, pass the cookie and matching user name before rendering the page.
  .then(() => {
    if (!sessionID) {
      resParams.sessionID = null;
    } else {
      database.getNameByUserID(sessionID)
      .then(data => {
        resParams.username = data.name;
        resParams.sessionID = sessionID;
      });
    }
  })

  // Get the two dates from the resources table.
  .then(() => database.getResourceDates(resourcesID))
  .then(data => {
    resParams.date_created = data.date_created;
    resParams.date_modified = data.date_modified;
  })

  // Get the average rating.
  .then(() => database.getRating(resourcesID))
  .then(data => resParams.avgRating = data.rating)

  // Get the user's rating.
  .then(() => database.checkRating(sessionID, resourcesID))
  .then(data => data ? resParams.userRating = data.rating : resParams.userRating = 0)

  // Get the total number of likes.
  .then(() => database.getLikes(resourcesID))
  .then(data => resParams.likes = data.likes)

  // Check if the user has already liked the page
  .then(() => database.checkLike(resourcesID, sessionID))
  .then(data => data ? resParams.checkLike = true : resParams.checkLike = false)

  // Get all the comments.
  .then(() => database.getComments(resourcesID))
  .then(data => resParams.comments = data)

  // REMINDER: Remove test code
  .then(() => console.log('GET /collections/:id =', resParams))

  // Pass in the relevant data (resParams) and render the page.
  .then(() => {res.render('collections_show', resParams)});
});


// 4. GET /collections/:id/update - The end-user wants to update an existing resource.
router.get('/collections/:id/update', (req, res) => {
  const sessionID = req.session.user_id;
  const resourceID = req.params.id;
  const resParams = { resourceID: resourceID };

  if (!sessionID) {
    return res.status(404).send(`
      Please <a href="/login">login</a> to view this page.
    `);
  } else {
    database.getResourceDetails(resourceID)
    .then(data => {
      let publisherID = data['owner_id'];
      console.log('publisherID =', publisherID);
      console.log('sessionID =', sessionID);
      if (publisherID !== sessionID) {
        return res.status(403).send(`
        Access Denied: This resource belongs to someone else.
        `);
      } else {
        resParams.title = data.title;
        resParams.description = data.description;
        resParams.category = data.category;
        resParams.url = data.url;
      }
    })
    .then(() => database.getNameByUserID(sessionID))
    .then(data => {
      resParams.username = data.name;
      resParams.sessionID = sessionID;
    })

    // REMINDER: Remove test code
    .then(() => console.log('GET /collections/:id/update =', resParams))
    .then(() => res.render('collections_update', resParams));
  }
});

// POST /collections
router.post('/collections', (req, res) => {

  // IMPORTANT: Add conditional to prevent access through curl unless logged in.

  const sessionID = req.session.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const url = req.body.url;
  const category = req.body.category;
  let resourceID;

  database.addResource(sessionID, title, description, url, category)
  .then(data => resourceID = data.id)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/update
router.post('/collections/:id/update', (req, res) => {

  // IMPORTANT: Add conditional to prevent access through curl unless logged in AND publisher.

  const resourceID = req.params.id;
  const newTitle = req.body.title;
  const newDescription = req.body.description;
  const newCategory = req.body.category;
  const newURL = req.body.url;

  database.updateResource(resourceID, newTitle, newDescription, newCategory, newURL)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/delete
router.post('/collections/:id/delete', (req, res) => {

  // IMPORTANT: Add conditional to prevent access through curl unless logged in AND publisher.

  const userID = 4; // Table users id = 4 is Guest (for testing only and not an actual Guest account)
  const resourceID = req.params.id;

  database.deleteResource(resourceID)
  .then(() => res.redirect(`/users/${userID}`))
});

// POST /collections/:id/like
router.post('/collections/:id/like', (req, res) => {
  const sessionID = req.session.user_id;
  const resourceID = req.params.id;

  if (!sessionID) {
    return res.status(403).send(`
    Please <a href="/login">login</a> to like this page.
    `);
  }

  database.addLike(resourceID, sessionID)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/unlike
router.post('/collections/:id/unlike', (req, res) => {
  const sessionID = req.session.user_id;
  const resourceID = req.params.id;

  if (!sessionID) {
    return res.status(403).send(`
    You must be <a href="/login">signed-in</a> to use this feature.
    `);
  }

  database.removeLike(resourceID, sessionID)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/rating
router.post('/collections/:id/rating' ,(req, res) => {
  const sessionID = req.session.user_id;
  const resourceID = req.params.id;

  if (!sessionID) {
    return res.status(403).send(`
    Please <a href="/login">login</a> to rate this page.
    `);
  }

  const rating = Number(req.body.rating);
  database.addRating(sessionID, resourceID, rating)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/comment
router.post('/collections/:id/comment', (req, res) => {
  const sessionID = req.session.user_id;
  const resourceID = req.params.id;

  if (!sessionID) {
    return res.status(403).send(`
    Please <a href="/login">login</a> to comment on this page.
    `);
  }

  const comment = req.body['comment-text'];
  database.addComment(sessionID, resourceID, comment)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

module.exports = router;
