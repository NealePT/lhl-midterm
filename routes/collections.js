// Dependencies
const express = require('express');
const router  = express.Router();
const database = require('../database');

// 1. GET /collection - The end user wants to see all collections.
router.get('/collections', (req, res) => {
  // REMINDER: Need to replace with collections_index before merging with -b master.
  res.render('temp_collections_index');
});


// 2. GET /collections/new - The end-user wants to save a new resource.
// NOTE: GET /collections/new must go before GET collections/:id, otherwise, '/new' will be misinterpreted as a '/:id' variable.
router.get('/collections/new', (req, res) => {
  // REMINDER: Need to replace with collections_new.
  console.log('Successfully Loaded - GET /collections/new');
  res.render('collections_new');
});


// 3. GET /collections/:id - The end-user wants to see a particular resource.
router.get('/collections/:id', (req, res) => {
  const resourcesID = req.params.id;
  const resParams = { resourceID: resourcesID };

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
  .then(data => resParams.rating = data.rating)

  // Get the total number of likes.
  .then(() => database.getLikes(resourcesID))
  .then(data => resParams.likes = data.likes)

  // Get all the comments.
  .then(() => database.getComments(resourcesID))
  .then(data => resParams.comments = data)

  // Pass in the relevant data (resParams) and render the page.
  .then(() => res.render('collections_show', resParams));
});


// 4. GET /collections/:id/update - The end-user wants to update an existing resource.
router.get('/collections/:id/update', (req, res) => {
  // REMINDER: Need to replace with collections_edit.
  res.render('temp_collections_edit');
});

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

// NEED TO FIGURE OUT OWNER ID WITH COOKIES BEFORE IMPLEMENTING THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const addResource = (db, resource) => {
  const queryString = `
  INSERT INTO resources (title, description, category, url, date_created)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;
  const values = [resource.title, resource.description, resource.category, resource.url, new Date()];

  return db.query(queryString, values)
    .then(res => {
      console.log(values);
      return res.rows[0];
    })
    .catch(err => {
      console.log(values);
      return console.log('query error:', err);
    });
};

// POST /collections
router.post("/collections", (req, res) => {
  const newResourceParams = req.body;
  addResource(db, newResourceParams).then(res.redirect("/collections"));
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
