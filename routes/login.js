// Dependencies
const express = require('express');
const router = express.Router();


// 7. GET /login - The end-user wants to log into their account.
router.get('/login', (req, res) => {
  // REMINDER: Need to replace with login.ejs.
  console.log(req.body);
  res.render('temp_login');
});

const getUserWithEmail = function(email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;

  return db.query(queryString, [email])
    .then((res) => {
      console.log(res.rows);
      // return res.rows;
    })
    .catch((err) => {
      return console.log(err.message);
    })
}

router.post('/login', (req, res) => {
  console.log(req.body);
  res.render('temp_collections_index');
})
module.exports = router;
