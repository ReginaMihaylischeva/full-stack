const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
     date :{
          type: Sequelize.DATE
    },
    content: {
      type: Sequelize.STRING(2048),
    }
  },
  {
   // underscored: true,
    tableName: 'post'
  });

  Post.associate = function (models) {
Post.belongsTo(models.User);
};

/*  Post.associate = function (models) {
    Post.belongsToMany(models.user, {
    through: models.user
    });
  };
*/
  return Post;
};
