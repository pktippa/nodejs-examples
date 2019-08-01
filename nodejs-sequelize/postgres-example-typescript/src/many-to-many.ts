import { Sequelize, Model, STRING, INTEGER, JSONB, Op } from 'sequelize';
import { underscoredIf } from 'sequelize/types/lib/utils';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/banyan_swm');
class Patient extends Model {
}
Patient.init({
  // attributes
  patient_id : {
    type: INTEGER,
    primaryKey: true
  },
  pat_name: {
    type: STRING,
    allowNull: false
  }  
}, {
  sequelize,
  tableName: 'patient',
  timestamps: false,
  underscored: true
  // options
});


class Doctor extends Model {

}

Doctor.init({
  // attributes
  doctor_id : {
    type: INTEGER,
    primaryKey: true
  },
  doc_name: {
    type: STRING,
    allowNull: false
  }  
}, {
  sequelize,
  tableName: 'doctor',
  timestamps: false,
  underscored: true
  // options
});


class Appointment extends Model {

}


Appointment.init({
  patient_id: {
    type: INTEGER,
    // references: {
    //   model: Patient,
    //   key: 'patient_id'
    // }
  },
  doctor_id: {
    type: INTEGER,
    // references: {
    //   model: Doctor,
    //   key: 'doctor_id'
    // }
  }
}, {
  sequelize,
  tableName: 'appointment',
  modelName: 'Appointment',
  timestamps: false,
  underscored: true,
  
});
Appointment.removeAttribute('id');
Patient.hasMany(Appointment, { foreignKey: 'patient_id' });
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id' });

const authenticate = async () => {
  try {
    await sequelize.authenticate();

    const patients_with_doctors = await Patient.findAll({
      include: [{
        model: Appointment,
        where: {
          doctor_id: 2
        }
        // through: {
        //   attributes: ['doc_name'],
        //   where: {doctor_id: 2, patient_id: Sequelize.col('patient.patient_id')}
        // }
      }]
    });
    console.log('Find many ', patients_with_doctors);
    // const addresses = await Patient.findAll(
    //   {
    //     where: {
    //       "jsonb_col": {
    //         [Op.contains]: [3]
    //       }
    //     }
    //   }
    // );
    // console.log('Connection good');
    // console.log('Find many ', addresses);
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