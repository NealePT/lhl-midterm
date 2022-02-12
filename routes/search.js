// Dependencies
const express = require('express');
const router  = express.Router();

// 8. GET /search/:id - The end-user wants to find a resource using a specific search phrase.
router.get('/search/:id', (req, res) => {
  // REMINDER: Need to replace with search.ejs.
  res.render('temp_search');
});

module.exports = router;
