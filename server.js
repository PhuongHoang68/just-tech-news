const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
const app = express();
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars")


const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

//express.static is a middleware used to serve an entire folder as front-end files
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
//changing the value of "force" to "true"syncs database connection and model defs&associations. Meaning if there are changes to associations, tables will recreate."false" is better than "true" bc dropping all tables constantly could be annoying
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});