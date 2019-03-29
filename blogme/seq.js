const Sequelize = require('sequelize')
const UserModel = require('./model/model_user')
const PostModel = require('./model/model_post')

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  operatorsAliases: false,
});

const User = UserModel(database, Sequelize)
const Post = PostModel(database, Sequelize)

/*Relationships Between Entities*/
Post.belongsTo(User);
User.hasMany(Post);

database.sync({force: true})
    .then(() => {
      console.log('Database & tables created!')
  })

module.exports = {
  User,
  Post
}
