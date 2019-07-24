import { Sequelize, Model, STRING, INTEGER, JSONB, Op } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/banyan_swm');
class Address extends Model {
}
Address.init({
  // attributes
  string_col: {
    type: STRING,
    allowNull: false
  },
  int_col: {
    type: INTEGER
    // allowNull defaults to true
  },
  jsonb_col: {
    type: JSONB
  },
  test_delete_table_id : {
    type: INTEGER,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'test_delete_table',
  timestamps: false
  // options
});

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    const addresses = await Address.findAll(
      {
        where: {
          "jsonb_col": {
            [Op.contains]: [7]
          }
        }
      }
    );
    console.log('Connection good');
    console.log('Find many ', addresses);
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