const {
    UsersFriends,
    User,
    Post,
    sequelize
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const addPost = async (ctx) => {
    const user = await User.findOne({
        where: {
            'email': ctx.request.body.email
        }
    })
    if (!user) {
        ctx.status = 401;
        ctx.message = 'Unauthenticated';
    } else {
        ctx.request.body.date = new Date();
        ctx.body = await Post.create(ctx.request.body);
    }
}

const getMyPosts = async (ctx) => {

    ctx.status = 200;
    await Post.findAll({
                where: {
                    'UserId': ctx.request.body.UserId
                },
                attributes: ['content', 'date'],
                group: ['date']
            }).then(function(data) {
               ctx.body = data;
             })

}

const getPosts = async (ctx) => {
    const dataMass = [];
    ctx.status = 200;
    const friends = await UsersFriends.findAll({
        where: {
             relations: 'friend',
                        [Op.or]: [{
                            UserId: ctx.request.body.UserId
                        }, {
                            friendId: ctx.request.body.UserId
                        }]
        }
    })
    for (let name of friends) {
        await Post.findAll({
                where: {
                    'UserId': name.friendId
                },
                attributes: ['content', 'date'],
                include: [{
                    model: User,
                    where: {
                        'id': name.friendId
                    },
                    attributes: ['name', 'surname']
                }],
                order: [ ['date' , 'DESC'] ]
            })
            .then(function(data) {
                dataMass.push(data);
            })
    }
    ctx.body = dataMass;
}

module.exports = {
    getMyPosts,
    addPost,
    getPosts
};