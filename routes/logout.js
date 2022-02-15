const express = require('express');
const router  = express.Router();

// POST /logout
router.post('/logout', (req, res) => {

  // Delete the session cookie.
  req.session = null;

  res.redirect('/login');
});

module.exports = router;
