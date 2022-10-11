//contain all user-facing routes, such as homepage and login page


//setting up main homepage
const router = require("express").Router();

router.get("/", (req, res)=> {
    res.render("homepage");
});

module.exports = router;