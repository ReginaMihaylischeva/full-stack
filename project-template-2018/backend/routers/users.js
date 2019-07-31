const {
    User,
    sequelize
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {
    UsersFriends
} = require('../models');
const addFriend = async (ctx) => {
    const user1 = await User.findOne({
        where: {
            'email': ctx.request.body.email1
        }
    });
    const user2 = await User.findOne({
        where: {
            'email': ctx.request.body.email2
        }
    });

    if (ctx.request.body.relations === 'request') {
        await user1.addFriend(user2);
    }
    if (ctx.request.body.relations === 'delete') {
        UsersFriends.destroy({
            where: {
                UserId: user1.id,
                friendId: user2.id
            }
        });
    }

    if (ctx.request.body.relations !== 'request' && ctx.request.body.relations !== 'delete' && ctx.request.body.relations !== 'friend') {
        ctx.status = 404;
        ctx.message = 'Not correct';
        return;
    }
    await UsersFriends.update({
        relations: ctx.request.body.relations
    }, {
        where: {
            UserId: user1.id,
            friendId: user2.id
        }
    });
    ctx.status = 200;
}
const getUsers = async (ctx) => {
 if (ctx.isUnauthenticated()) {
           ctx.status = 401;

    }else{
    ctx.status = 200;
    await User.findAll({
            attributes: ['name', 'surname', 'year', 'email', 'id']
        })
        .then(function(data) {
            ctx.body = data;
        })
        }
}

const requestFriends = async (ctx) => {
    ctx.status = 200;
    const dataMass = [];
    const friends = await UsersFriends.findAll({
        where: {
            relations: ctx.request.body.relations,
            friendId: ctx.request.body.id
        }
    })
    for (let id of friends) {
        await User.findAll({
                where: {
                    'id': id.UserId
                },
                attributes: ['name', 'surname', 'email']
            })
            .then(function(data) {
                dataMass.push(data);
            })
    }
    ctx.body = dataMass;
}

getFriends = async (ctx) => {
    ctx.status = 200;
    const dataMass = [];
    const id = ctx.request.body.UserId;
    const friends = await UsersFriends.findAll({
        where: {
            relations: ctx.request.body.relations,
            [Op.or]: [{
                UserId: id
            }, {
                friendId: id
            }]
        }
    })
    for (let id of friends) {
        if (id.UserId == ctx.request.body.UserId) {
            await User.findOne({
                    where: {
                        'id': id.friendId
                    },
                    attributes: ['email']
                })
                .then(function(data) {
                    dataMass.push(data);
                })
        } else {
            await User.findOne({
                    where: {
                        'id': id.UserId
                    },
                    attributes: ['email']
                })
                .then(function(data) {
                    dataMass.push(data);
                })
        }

    }
    ctx.body = dataMass;
}

searchUsers=async(ctx)=>{
    const nameSurname = ctx.request.body.nameSurname.split(' ');
     if (nameSurname.length==1){
         ctx.status = 200;
         ctx.body  = await User.findAll({
             where: {
                 [Op.or]: [{
                     name: nameSurname
                 }, {
                     surname: nameSurname
                 }]
             },  attributes: ['name', 'surname', 'email']
         })
     }else if(nameSurname.length==2){
         ctx.status = 200;
        ctx.body  = await Users.findAll({
                  where: {
                      [Op.and]: [{
                          name: nameSurname[0]
                      }, {
                          surname: nameSurname[1]
                      }]
                  },  attributes: ['name', 'surname', 'email']
              })
          }else{
              ctx.status = 404;
               }



}

module.exports = {
    getFriends,
    requestFriends,
    addFriend,
    getUsers,
    searchUsers
};