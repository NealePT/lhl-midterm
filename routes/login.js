// Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const database = require('../database'); // Contains all SQL query functions.

// 7. GET /login - The end-user wants to log into their account.
router.get('/login', (req, res) => {
  const sessionID = req.session.user_id;
  const resParams = {};

  // If there is a session cookie, pass the cookie and matching user name before rendering the page.
  if (!sessionID) {
    res.render('login', { sessionID: null });
  } else {
    database.getNameByUserID(sessionID)
    .then(data => {
      resParams.username = data.name;
      resParams.sessionID = sessionID;
      console.log('resParams =', resParams) // Remove test code.
    })

    // REMINDER: Remove test code
    .then(() => console.log('GET /login =', resParams))
    .then(() => res.render('login', resParams));
  }


});


// POST /login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  database.getUserByEmail(email)
  .then(data => {

    // If the email is not registered, display a 400 error.
    if (!data) {
      return res.status(400).send(`
      ${email} is not a registered email.\n <a href="/register">Click here to register.</a>
      `);
    } else {
      const hashedPassword = data.password;

      // Continue with login if the password matches the hashed password from the database.
      if (bcrypt.compareSync(password, hashedPassword)) {
        req.session.user_id = data.id;
        res.redirect('/collections');
      } else {
        res.status(400).send('Incorrect password. <a href="/login">Please try again.</a>');
      }
    }
  })

});

module.exports = router;
