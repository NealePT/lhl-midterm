// Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
const login = require("./login");

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
  //encrypt user's password and save to database
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  newUser.cookie_id = req.session.user_id; //save the cookie session
  // console.log(req.session);

  login.getUserWithEmail =
    addUser(db, newUser).then(res.redirect("/collections"));
});


module.exports = router;
