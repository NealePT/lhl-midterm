// Dependencies
const express = require('express');
const router  = express.Router();
const database = require('../database'); // Contains all SQL query functions.

// 1. GET /collection - The end user wants to see all collections.
router.get('/search', (req, res) => {
  // REMINDER: Need to eventually replace with collections_index.
  res.render('defaultSearchPage');
});

// 8. GET /search/:id - The end-user wants to find a resource using a specific search phrase.
router.get('/search/:id', (req, res) => {
  const searchPhrase = req.params.id;
  const resParams = {};

  database.getSearchResults(searchPhrase)
    .then(data => {
      resParams.searchResults = data;
    })
    .then(() => res.render('temp_search', resParams));
});

// POST /search
router.post('/search', (req, res) => {
  const searchPhrase = req.body['search-phrase'];
  res.redirect(`/search/${searchPhrase}`);
});

module.exports = router;
