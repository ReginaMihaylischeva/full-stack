const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const UsersFriends = sequelize.define('UsersFriends', {

 relations: {
          type: Sequelize.STRING(10),

    },
   /* user_id_1: {
      type: Sequelize.INTEGER,
     references: {
        model: 'User',
        key: 'id',
      }
    },

    user_id_2: {
      type: Sequelize.INTEGER,
     references: {
        model: 'User',
        key: 'id',
      }
    },*/
  }, {
    tableName: 'users_friends'
  });


  UsersFriends.associate = function (models) {
  UsersFriends.belongsTo(models.User);
  };

  return UsersFriends;
};