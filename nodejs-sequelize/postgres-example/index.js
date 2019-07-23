const Sequelize = require('sequelize');

// Option 2: Passing a connection URI
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/banyan_swm');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });