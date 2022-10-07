const router = require("express").Router();

const userRoutes = require("./user-routes");
const postRoutes=require("./post-routes");
const commentRoutes = require("./comment-routes");


//adding prefixes to all apiRoutes, meaning adding new endpoints
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;