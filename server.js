const express = require('express');
const router = require('./controllers');
const sequelize = require('./config/connection');
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express.static is a middleware used to serve an entire folder as front-end files
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(router);

// turn on connection to db and server
//changing the value of "force" to "true"syncs database connection and model defs&associations. Meaning if there are changes to associations, tables will recreate."false" is better than "true" bc dropping all tables constantly could be annoying
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});