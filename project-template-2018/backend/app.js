'use strict';

const PORT = 3000;

const Koa = require('koa');
const serve = require('koa-static');
const webpack = require('webpack');
const { sequelize } = require('./models');
const koaBody = require('koa-bodyparser');
const session = require('koa-generic-session');
const SequelizeSessionStore = require('koa-generic-session-sequelize');
const passport = require('./models/users/passport');
const router = require('./routers');
//const winston = require('winston');
//const winston = require('./../log.js');
//const logger = require('koa-logger');
const logger = require('./../logBunyan');
const koaLogger = require('koa-bunyan');


const port = process.env.PORT || PORT;
const app = new Koa();
//app.use(logger());
app.use(koaLogger(logger));

const compiler = webpack(require('../webpack.config.js'), (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log('There are webpack exception', err, stats.toJson('minimal'));
    return;
  }

  console.log('webpack initialized successfully');
});

compiler.watch({}, () => {
  console.log('building...');
});

app.use(serve('public'));
app.use(koaBody());
app.keys = ['secret'];

const runServer = async function () {
//{ force: true }

  await sequelize.sync();

  app.use(session({
    store: new SequelizeSessionStore(
      sequelize, {
        tableName: 'sessions',
      },
    )
  }));

 app.use(passport.initialize());
  app.use(passport.session());
  app.use(router.routes());

  return app.listen(port, () => {
    console.log(`Server is started on ${port} port`);
  });
};


const server = runServer();

module.exports = server;
