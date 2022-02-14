// Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);

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
  newUser.password = bcrypt.hashSync(newUser.password, 10);

  addUser(db, newUser).then(res.redirect("/collections"));
});


module.exports = router;
