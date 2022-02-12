// Dependencies
const express = require('express');
const router  = express.Router();

// GET /collection
router.get("/collections", (req, res) => {

  // REMINDER: Need to replace with collections_index before merging with -b master.
  res.render('temp_collections_index');
});

module.exports = router;
