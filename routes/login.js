// Dependencies
const express = require('express');
const router = express.Router();
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();


// 7. GET /login - The end-user wants to log into their account.
router.get('/login', (req, res) => {
  // REMINDER: Need to replace with login.ejs.
  res.render('temp_login');
});

const getUserWithEmail = function(db, user) {
  const queryString = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  const values = [user.email, user.password];

  return db.query(queryString, values)
    .then((res) => {
      console.log(res.rows[0]);
      return res.rows;
    })
    .catch((err) => {
      return console.log(err.message);
    })
}

router.post('/login', (req, res) => {
  console.log(req.body);
  const user = req.body;

  // if no email is entered
  // NEEDS TO BE UPDATED TO CHECK USERID AGAINST COOKIES
  if (!user) {
    return res.send("💩");
  }

  // queries the db to check if user exists, then redirects back to temp index page
  getUserWithEmail(db, user).then(res.redirect('/collections'));
})
module.exports = router;
