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
      console.log("I WORK??", res.rows);
      return res.rows[0];
    })
    .catch((err) => {
      return console.log(err.message);
    })
}

const login = function(email, password) {
  return db.getUserWithEmail(email)
    .then(user => {
      console.log(user);
      // WILL NEED BCRYPT HERE TO COMPARE IF PASSWORDS MATCH
      if (password === user.password) {
        return user;
      }
      return null;
    });
}

router.post('/login', (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  login(email, password)
    .then(user => {
      if (!user) {
        //if user doesn't exist
        return res.send("💩");
      }
      //WILL NEED TO CREATE A COOKIE ID FOR EXISTING USERS (user.id)
      res.send({ users: { id: user.id, name: user.name, email: user.email } });
    })
    .catch(err => res.send(err.message));
})
module.exports = router;
