// Dependencies
const express = require('express');
const router  = express.Router();

// 6. GET /register - The end-user wants to register an account.
router.get('/register', (req, res) => {
  // REMINDER: Need to replace with register.ejs before merging with -b master.
  res.render('temp_register');
});

module.exports = router;
