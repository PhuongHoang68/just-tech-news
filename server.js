const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
//changing the value of "force" to "true"syncs database connection and model defs&associations. Meaning if there are changes to associations, tables will recreate."false" is better than "true" bc dropping all tables constantly could be annoying
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});