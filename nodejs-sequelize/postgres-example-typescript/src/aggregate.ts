import { Sequelize, Model, STRING, INTEGER, JSONB, Op, DATE } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/playfield');
class User extends Model {
}
User.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    field: 'id'
  },
  oid: {
    type: INTEGER,
    field: 'oid'
  },
  score: {
    type: INTEGER,
    field: 'score'
  }
}, {
  sequelize,
  modelName: 'user',tableName: 'user',
  timestamps: false
  // options
});

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    const users = await User.findAll({
      attributes: ['oid', [Sequelize.fn('sum', Sequelize.col('score')), 'total'],
      [Sequelize.fn('avg', Sequelize.col('score')), 'average']],
      group : ['user.oid'],
      raw: true
    });
    console.log('Connection good');
    console.log('Find many ', users);
    return;
  } catch (error) {
    console.error('Unable to connect to the database:');
    throw error;
  }
}

authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });