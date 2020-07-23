const constant   = require(__basePath + '/app/config/constant');
const database   = require(constant.path.app + 'core/database');
const utility    = require(constant.path.app + 'util/utility');
const underscore = require("underscore");

 
class AppointmentModel{

    constructor() {
        this.databaseObj = database.getInstance();
    }

    static get DB() {
        return {
            READSLAVE: 'READSLAVE',
            MASTER   : 'MASTER'
        };
    }

    insertAppointment(appointmentData, callback) {
        let data = {
            userId              : appointmentData.userId,
            slot                : appointmentData.slot
        };

        let query = `
            INSERT INTO 
            appointment (
                userId, 
                slot
                ) 
            VALUES (
                :userId, 
                :slot
            ) 
        `;

        this.databaseObj.query(
            AppointmentModel.DB.MASTER,
            {
                sql   : query,
                values: data
            },
            callback,
            {queryFormat: 'namedParameters'}
        );
    };


    getAppointments(userId, callback) {

        let query = `
            SELECT
                slot
            FROM 
               appointment
            WHERE
               userId = ?
        `;

        this.databaseObj.query(
            AppointmentModel.DB.READSLAVE,
            {
                sql   : query,
                values: [userId]
            },
            callback
        );
    };

}

module.exports = AppointmentModel;
