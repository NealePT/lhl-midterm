// Dependencies
const express = require('express');
const router  = express.Router();
const database = require('../database'); // Contains all SQL query functions.

// 1. GET /search
router.get('/search', (req, res) => {
  const sessionID = req.session.user_id;
  const resParams = {};

  if (!sessionID) {
    res.render('search_index', { sessionID: null });
  } else {
    database.getNameByUserID(sessionID)
      .then(data => {
        resParams.username = data.name;
        resParams.sessionID = sessionID;
      })

    // REMINDER: Remove test code
      .then(() => console.log('GET /search =', resParams))
      .then(() => res.render('search_index', resParams));
  }
});


// 8. GET /search/:id - The end-user wants to find a resource using a specific search phrase.
router.get('/search/:id', (req, res) => {
  const searchPhrase = req.params.id;
  const sessionID = req.session.user_id;
  const resParams = {};

  // Test code
  // console.log('sessionID =', sessionID);

  if (!sessionID) {
    res.render('search_show', { sessionID: null });

  } else {
    database.getNameByUserID(sessionID)
      .then(data => {
        resParams.username = data.name;
        resParams.sessionID = sessionID;
      })
      .then(() => database.getSearchResults(searchPhrase))
      .then(data => resParams.searchResults = data)

      .then(() => console.log('resParams =', resParams))

      .then(() => res.render('search_show', resParams));
  }
});

// POST /search
router.post('/search', (req, res) => {
  const searchPhrase = req.body['search-phrase'];
  res.redirect(`/search/${searchPhrase}`);
});

module.exports = router;
