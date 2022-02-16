// Dependencies
const express = require('express');
const router  = express.Router();
const database = require('../database'); // Contains all SQL query functions.

// 1. GET /search
router.get('/search', (req, res) => {
  const sessionID = req.session.user_id;
  const resParams = {};

  if (!sessionID) {
    res.render('defaultSearchPage', { sessionID: null });
  } else {
    database.getNameByUserID(sessionID)
    .then(data => {
      resParams.username = data.name;
      resParams.sessionID = sessionID;
    })

    // REMINDER: Remove test code
    .then(() => console.log('GET /search =', resParams))
    .then(() => res.render('login', resParams));
  }

  // REMINDER: Need to rename to search_index.
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

    // REMINDER: Need to rename to search_show.
    .then(() => res.render('temp_search', resParams));
});

// POST /search
router.post('/search', (req, res) => {
  const searchPhrase = req.body['search-phrase'];
  res.redirect(`/search/${searchPhrase}`);
});

module.exports = router;
