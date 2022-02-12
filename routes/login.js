// Dependencies
const express = require('express');
const router  = express.Router();

// 7. GET /login - The end-user wants to log into their account.
router.get('/login', (req, res) => {
  // REMINDER: Need to replace with login.ejs before merging with -b master.
  res.render('temp_login');
});

module.exports = router;
