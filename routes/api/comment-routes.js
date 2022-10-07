const router = require("express").Router();
const { Comment } = require("../../models") 



//get all comments on post
router.get("/", (req, res)=> {
    Comment.findAll()
    .then(dbCommentData=> res.json(dbCommentData))
    .catch(err=>{
        res.status(500).json(err);
    })

});





//post comments on a post
router.post("/", (req, res)=> {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });

});



//user could delete comments
router.delete('/:id', (req, res)=> {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData=> {
        if (!dbCommentData) {
            res.status(404).json({message: "No comment found with this id"});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err=> {
        res.status(500).json(err);
    })

});

module.exports = router;