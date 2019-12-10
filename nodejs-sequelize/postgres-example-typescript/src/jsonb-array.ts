import { Sequelize, Model, STRING, INTEGER, JSONB, Op, DATE } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/playfield');
class Point extends Model {
}
Point.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    field: 'point_id'
  },
  location: {
    type: JSONB,
    field: 'location'
  }
}, {
  sequelize,
  modelName: 'point',tableName: 'point',
  timestamps: false
});

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    const addresses = await Point.findAll(
      {
        attributes: [ [(sequelize as any).json("location.country"), "location.country"]],
        where: { location: { country: "India" } }
      }
    ).map((model: any) => model.get("location.country"));
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