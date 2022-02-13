// Dependencies
const express = require('express');
const router  = express.Router();

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);

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
  res.render('collections_show');
});


// 4. GET /collections/:id/update - The end-user wants to update an existing resource.
router.get('/collections/:id/update', (req, res) => {
  // REMINDER: Need to replace with collections_edit.
  res.render('temp_collections_edit');
});

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

router.post("/collections", (req, res) => {
  const newResourceParams = req.body;
  addResource(db, newResourceParams).then(res.redirect("/collections"));
});

module.exports = router;
