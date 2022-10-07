const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment")



//creating associations between User n Posts
User.hasMany(Post, {
    //user_id in Post model
    foreignKey: "user_id"
});

Post.belongsTo(User, {
    //user_id in Post model
    foreignKey: "user_id"
});



//creating a many-to-many relationship between User n Post n Vote
User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id"
});

Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id"
});



//Vote association
Vote.belongsTo(User, {
    foreignKey: "user_id"
});

Vote.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Vote, {
    foreignKey: "user_id"
});

Post.hasMany(Vote, {
    foreignKey: "post_id"
});



//comments associations
Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id"
})

Post.hasMany(Comment, {
    foreignKey: "post_id"
})

module.exports ={User, Post, Vote, Comment};
