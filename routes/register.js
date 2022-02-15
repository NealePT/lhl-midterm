// Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const database = require('../database'); // Contains all SQL query functions.

// GET /register
router.get('/register', (req, res) => {
  const sessionID = req.session.user_id;
  const resParams = {};

  // If there is a session cookie, pass the cookie and matching user name before rendering the page.
  if (!sessionID) {
    res.render('register', { sessionID: null });
  } else {
    database.getNameByUserID(sessionID)
    .then(data => {
      resParams.username = data.name;
      resParams.sessionID = sessionID;
    })
    .then(() => res.render('register', resParams));
  }
});


// POST /register
router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  let hashedPassword = '';

  // If any of the fields are empty, display a 400 error.
  if (name === '' || email === '' || password === '') {
    return res.status(400).send(`
    Empty name, email, and/or password field. <a href="/register">Please try again</a>
    `);
  }
  database.getUserByEmail(email)
  .then(data => {

    // If the email has already been registered, display a 400 error.
    if (data) {
      return res.status(400).send(`
      ${email} has already been registered. <a href="/login">Click here to login</a>
      `);
    } else {

      // Encrypt the password.
      hashedPassword = bcrypt.hashSync(password, 10);
    }
  })

  // Add the new user to the users SQL table.
  .then(() => database.addUser(name, email, hashedPassword))
  .then(data => {

    // Set the session cookie to the user id.
    req.session.user_id = data.id;
  })
  .then(() => res.redirect('/collections'));
});

module.exports = router;
