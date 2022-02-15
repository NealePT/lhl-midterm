// Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const database = require('../database'); // Contains all SQL query functions.

// 7. GET /login - The end-user wants to log into their account.
router.get('/login', (req, res) => {
  const sessionID = req.session.user_id;
  const resParams = {};

  if (!sessionID) {
    res.render('temp_login', { sessionID: null });
  }

  if (sessionID) {
    database.getNameBySessionID(sessionID)
    .then(data => {
      resParams.name = data.name;
      resParams.sessionID = sessionID;
    })
    .then(() => res.render('temp_login', resParams));
  }
});


// POST /login
router.post('/login', (req, res) => {
  const email = req.body.email;

  database.getUserByEmail(email)
  .then(data => {
    if (!data) {
      res.status(400).send('Incorrect email or password. <a href="/login">Please try again</a>');
    } else {
      req.session.user_id = data.id;
      const sessionID = req.session.user_id;
      res.redirect('/login');
    }
  });
});

module.exports = router;
