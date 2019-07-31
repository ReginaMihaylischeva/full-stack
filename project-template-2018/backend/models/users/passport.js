const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const hashPassword = require('./password');
const bcrypt = require('bcryptjs');

const options = {
  usernameField: 'email',
  passwordField: 'password',

};

var User = require('../index').User;

passport.use('local',  new LocalStrategy(options, async (email, password, done) => {
 const user = await User.findOne({where:{ 'email': email }});
 const id= user.id;
    bcrypt.compare(password,user.password, function(err, res){
        if(res){
         return done(null, {
            email,
            password,
            id
         });
   }
     else{
         return done(null, false);
     }
 });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async(userId, done) => {
 const user=await User.findByPk(userId.email);
  done(null,{
  user
  });
});

module.exports = passport;
