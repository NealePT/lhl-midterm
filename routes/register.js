// Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
const getUserWithEmail = require("./login.js");

// 6. GET /register - The end-user wants to register an account.
router.get('/register', (req, res) => {
  // REMINDER: Need to replace with register.ejs.
  res.render('temp_register');
});


const addUser = (db, user) => {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [user.name, user.email, user.password];
  return db.query(queryString, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

router.post("/register", (req, res) => {
  const newUser = req.body;
  const email = req.body.email;
  let userCookieId;
  //encrypt user's password and save to database
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  req.session.user_id = userCookieId; //save the cookie session
  console.log(userCookieId);

  // new users will get added to the database
  addUser(db, newUser).then(res.redirect("/collections"));

});


module.exports = router;
