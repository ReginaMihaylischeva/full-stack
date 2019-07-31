const Router = require('koa-router');
const send = require('koa-send');

const {
  getCurrentUserId,
  getCurrentUser,
  login,
  logout,
  registration
  } = require('./auth');
const{
addPost,
getPosts,
getMyPosts
}=require('./posts');

const {
getFriends,
requestFriends,
addFriend,
getUsers,
searchUsers
}=require('./users');

const router = new Router();
router.post('/id', getCurrentUserId);
router.get('/getUsers', getUsers);
router.post('/getPosts', getPosts);
router.post('/requestFriends',requestFriends);
router.post('/getFriends', getFriends);
router.post('/getMyPosts', getMyPosts);
router.post('/searchUsers', searchUsers);

router.post('/me', getCurrentUser);
router.post('/login', login);
router.get('/logout', logout);
router.post('/addFriend',addFriend);
router.post('/addPost',addPost);
router.post('/registration',registration);
//router.get('/*', ctx => send(ctx, './public/index.html'));
router.get('/id', ctx => send(ctx, './public/index.html'));
router.get('/getUsers', ctx => send(ctx, './public/index.html'));
router.get('/getPosts', ctx => send(ctx, './public/index.html'));
router.get('/requestFriends', ctx => send(ctx, './public/index.html'));
router.get('/getFriends', ctx => send(ctx, './public/index.html'));
router.get('/getMyPosts', ctx => send(ctx, './public/index.html'));
router.get('/searchUsers', ctx => send(ctx, './public/index.html'));
router.get('/me', ctx => send(ctx, './public/index.html'));
router.get('/login', ctx => send(ctx, './public/index.html'));
router.get('/logout', ctx => send(ctx, './public/index.html'));
router.get('/addFriend', ctx => send(ctx, './public/index.html'));
router.get('/addPost', ctx => send(ctx, './public/index.html'));
router.get('/registration', ctx => send(ctx, './public/index.html'));
router.get('*/profile/:id*', ctx => send(ctx, './public/index.html'));




module.exports = router;

