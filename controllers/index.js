const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes= require("./home-routes");

//prefixing api endpoints with /api
router.use('/api', apiRoutes);

router.use("/", homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;