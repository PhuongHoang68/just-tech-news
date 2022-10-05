const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");


// create our User model
class User extends Model {
    //method to run on instance per data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
User.init(
  {
    // define an id column
    id: {
        //Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        //equivalent of mysql "NOT NULL" option
        allowNull: false,
        //letting them know this is primary key
        primaryKey: true,
        //auto increment
        autoIncrement: true
    },
    //define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //define an email column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        //no duplicate emails
        unique: true,
        //if allowNull is false, then we verify info before creatinf table
        validate: {
            isEmail: true
        }
    },
    //define a password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //this means the password must be at least four characters long
            len: [4]
        }
    }
  },
  {
        //creating beforeCreatehook, a lifecycle event that occurs before or after a callback function
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password= await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //creating beforeUpdate hook
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        
        },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;