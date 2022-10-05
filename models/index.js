const User = require("./User");
const Post = require("./Post");

//creating associations between User n Posts
User.hasMany(Post, {
    //user_id in Post model
    foreignKey: "user_id"
});

Post.belongsTo(User, {
    //user_id in Post model
    foreignKey: "user_id"
});

module.exports ={User, Post};
