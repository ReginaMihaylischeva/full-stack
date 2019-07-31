module.exports = {
  development: {
    db: {
      name: 'social_network',
      username: 'root',
      password: 'cnbdty',
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      logging: true
    }
  },
  test: {
    db: {
      name: 'example_test',
      username: 'root',
      password: 'cnbdty',
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      logging: false
    }
  }
};

