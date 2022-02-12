// users2.js should be merged with users.js after discussing with the team.

// Dependencies
const express = require('express');
const router  = express.Router();

// 5. GET /users/:id - The end-user wants to see the collection for a specific profile.
router.get('/users/:id', (req, res) => {
  // REMINDER: Need to replace with users_index before merging with -b master.
  res.render('temp_users_index');
});

module.exports = router;
