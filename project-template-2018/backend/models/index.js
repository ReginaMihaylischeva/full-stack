const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
//const env ='test';
const { db } = require('../config')[env];

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  logging: db.logging,
  operatorsAliases: false
});



const User = require('./user')(sequelize);
const Post = require('./post')(sequelize);
const UsersFriends = require('./users_friends')(sequelize);

const models = {
  [User.name]: User,
  [Post.name]: Post,
  [UsersFriends.name]: UsersFriends
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
