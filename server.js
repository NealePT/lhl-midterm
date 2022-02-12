// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users');
const users2Routes = require('./routes/users2'); // TEMPORARY: Need to merge with './routes/users'.
const widgetsRoutes = require('./routes/widgets');
const collectionsRoutes = require('./routes/collections');
const searchRoutes = require('./routes/search');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// GET /
app.get("/", (req, res) => {
  res.redirect('/collections');
});

// 1. GET /collections
app.get("/collections", collectionsRoutes);

// 2. GET /collections/new
app.get('/collections/new', collectionsRoutes);

// 3. GET /collections/:id
app.get('/collections/:id', collectionsRoutes);

// 4. GET /collections/:id/update
app.get('/collections/:id/update', collectionsRoutes);

// 5. GET /users/:id
app.get('/users/:id', users2Routes);

// 6. GET /register
app.get('/register', registerRoutes);

// 7. GET /login
app.get('/login', loginRoutes);

// 8. GET /search/:id
app.get('/search/:id', searchRoutes);

app.listen(PORT, () => {
  console.log(`Resource Haven is listening on http://localhost:${PORT}/`);
});

app.post('/register', registerRoutes);
