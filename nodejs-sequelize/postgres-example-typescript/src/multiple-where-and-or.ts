import { Sequelize, Model, STRING, INTEGER, JSONB, Op, DATE } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/test_db_2');
class Account extends Model {
}
Account.init({
  // attributes
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING
  },
  p_phn: {
    type: STRING
  },
  s_phn: {
    type: STRING
  },
  id : {
    type: INTEGER,
    primaryKey: true
  },
  createdat: {
    type: DATE
  },
  lastmodifiedat: {
    type: DATE
  }
}, {
  sequelize,
  modelName: 'account',tableName: 'account',
  timestamps: false
  // options
});

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    const addresses = await Account.findAll(
      {
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  name: {
                    [Op.iLike]: '%john%'
                  }
                }, {
                  email: {
                    [Op.iLike]: '%john%'
                  }
                }
              ]
            },
            {
              [Op.or]: [
                {
                  p_phn: {
                    [Op.iLike]: '%900%'
                  }
                }, {
                  s_phn: {
                    [Op.iLike]: '%900%'
                  }
                }
              ]
            }
          
          ]
        },
        raw: true
          
        
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