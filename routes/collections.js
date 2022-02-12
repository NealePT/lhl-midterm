// Dependencies
const express = require('express');
const router  = express.Router();
// Temp database
const { usersDB, resourcesDB } = require('../db/temp/temp_db.js');

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

module.exports = router;
