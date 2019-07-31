const app = require('../../app');

before(async function() {
  this.timeout(10000);
  this.app = await app;
});
