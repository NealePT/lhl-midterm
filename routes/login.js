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
  console.log(req.body);
  res.render('temp_login');
});

const getUserWithEmail = function(email password) {
  const queryString = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  const values = [user.email, user.password];
  return db.query(queryString, values)
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      return console.log(err.message);
    })
}

// exports.getUserWithEmail = getUserWithEmail;

router.post('/login', (req, res) => {
  console.log(req.body);
  const userEmail = req.body.email;

  // if no email is entered
  if (!userEmail) {
    return console.log("💩");
  }

  res.render('temp_collections_index');
})
module.exports = router;
