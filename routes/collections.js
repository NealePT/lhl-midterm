// Dependencies
const { use } = require('bcrypt/promises');
const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();
const database = require('../database'); // Contains all SQL query functions.
const addStars = require('../public/scripts/ratings');

// 1. GET /collection - The end user wants to see all collections.
router.get('/collections', (req, res) => {
  // REMINDER: Need to eventually replace with collections_index.
  res.render('temp_collections_index');
});


// 2. GET /collections/new - The end-user wants to save a new resource.
// NOTE: GET /collections/new must go before GET collections/:id, otherwise, '/new' will be misinterpreted as a '/:id' variable.
router.get('/collections/new', (req, res) => res.render('collections_new'));


// 3. GET /collections/:id - The end-user wants to see a particular resource.
router.get('/collections/:id', (req, res) => {
  const resourcesID = req.params.id;
  const userID = 4; // Table users id = 4 is Guest (for testing only and not an actual Guest account)
  const resParams = {
    resourceID: resourcesID,
    userID: userID
  };

  // Get most of the relevant properties from the resources & users tables.
  database.getResourceDetails(resourcesID)
  .then(data => {
    resParams.title = data.title;
    resParams.description = data.description;
    resParams.category = data.category;
    resParams.url = data.url;
    resParams.name = data.name;
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
  .then(() => database.checkRating(userID, resourcesID))
  .then(data => data ? resParams.userRating = data.rating : resParams.userRating = 0)

  // Get the total number of likes.
  .then(() => database.getLikes(resourcesID))
  .then(data => resParams.likes = data.likes)

  // Check if the user has already liked the page
  .then(() => database.checkLike(resourcesID, userID))
  .then(data => data ? resParams.checkLike = true : resParams.checkLike = false)

  // Get all the comments.
  .then(() => database.getComments(resourcesID))
  .then(data => resParams.comments = data)


  .then(() => addStars())


  // Pass in the relevant data (resParams) and render the page.
  .then(() => {res.render('collections_show2', resParams)});
});


// 4. GET /collections/:id/update - The end-user wants to update an existing resource.
router.get('/collections/:id/update', (req, res) => {
  const resourceID = req.params.id;
  const resParams = { resourceID: resourceID };

  database.getResourceDetails(resourceID)
  .then(data => {
    resParams.title = data.title;
    resParams.description = data.description;
    resParams.category = data.category;
    resParams.url = data.url;
  })
  .then(() => res.render('collections_update', resParams));
});

// POST /collections
router.post('/collections', (req, res) => {
  const ownerID = 4; // Table users id = 4 is Guest (for testing only and not an actual Guest account)
  const title = req.body.title;
  const description = req.body.description;
  const url = req.body.url;
  const category = req.body.category;
  let resourceID;

  database.addResource(ownerID, title, description, url, category)
  .then(data => resourceID = data.id)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/update
router.post('/collections/:id/update', (req, res) => {
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
  const userID = 4; // Table users id = 4 is Guest (for testing only and not an actual Guest account)
  const resourceID = req.params.id;

  database.deleteResource(resourceID)
  .then(() => res.redirect(`/users/${userID}`))
});

// POST /collections/:id/like
router.post('/collections/:id/like', (req, res) => {
  const ownerID = 4; // Table users id = 4 is Guest (for testing only and not an actual Guest account)
  const resourceID = req.params.id;

  database.addLike(resourceID, ownerID)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/unlike
router.post('/collections/:id/unlike', (req, res) => {
  const ownerID = 4; // Table users id = 4 is Guest (for testing only and not an actual Guest account)
  const resourceID = req.params.id;

  database.removeLike(resourceID, ownerID)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/rating
router.post('/collections/:id/rating' ,(req, res) => {
  const ownerID = 4; // Table users id = 4 is Guest (for testing only and not an actual Guest account)
  const resourceID = req.params.id;
  const rating = Number(req.body.rating);

  database.addRating(ownerID, resourceID, rating)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

// POST /collections/:id/comment
router.post('/collections/:id/comment', (req, res) => {
  const ownerID = 4; // Table users id = 4 is Guest (for testing only and not an actual Guest account)
  const resourceID = req.params.id;
  const comment = req.body['comment-text'];

  database.addComment(ownerID, resourceID, comment)
  .then(() => res.redirect(`/collections/${resourceID}`));
});

module.exports = router;
