const passport = require('../models/users/passport');
const password = require('../models/users/password');

//const registration = require('../routers/registration');
const {
    User,
    sequelize
} = require('../models');

const getCurrentUser = async (ctx) => {
    if (ctx.isUnauthenticated()) {
           ctx.status = 401;

    }else{
    ctx.status = 200;
    }
    const user = await User.findOne({
        where: {
            'id': ctx.request.body.id
        }
    });
    ctx.body = {
        email: user.email,
        surname: user.surname,
        name: user.name,
        year: user.year
    }

};



const getCurrentUserId = async (ctx) => {
    const user = await User.findOne({
        where: {
            'email': ctx.request.body.email
        }
    });
     if (user) {
    ctx.status = 200;
    ctx.body = {
        id: user.id
        // email: ctx.request.body.email
     }
    }
    else{
        ctx.status = 404;
    }

};


const registration = async (ctx) => {
    const user = await User.findOne({
        where: {
            'email': ctx.request.body.email
        }
    })
    if (!user) {
        const user = new User({
            email: ctx.request.body.email,
            password: ctx.request.body.password
        });
        const hash = await password.hashPassword(ctx.request.body.password);
        delete ctx.request.body.confirmationPassword;
        ctx.request.body.password = hash;
        ctx.body = await User.create(ctx.request.body);
        ctx.login(user);
    } else {
        ctx.status = 401;
        ctx.message = 'Authenticated';
    }

}

const login = async (ctx) => {
    if (ctx.isAuthenticated()) {
        return   (
         ctx.message = 'Authenticated')
    }

    await passport.authenticate('local', {}, async (err, user) => {
        if (!user) {

            ctx.throw(401, 'Incorrect login/password');
        }

        ctx.login(user, (err) => {
            if (err) {

                ctx.throw(401, err.message);
            }
            ctx.status = 200;
            ctx.body = user;
        });
    })(ctx);
};




const logout = async (ctx) => {
    if (ctx.isAuthenticated()) {
        await ctx.logout();
        return ctx.redirect('/login');
    }

    ctx.throw(401, 'Unauthenticated');
};




module.exports = {
    getCurrentUserId,
    getCurrentUser,
    login,
    logout,
    registration
};