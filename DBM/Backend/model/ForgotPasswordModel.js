const db = require('../config/database.js');
const dbFun = require('../config/databaseFunction');

exports.getPasswordById = (email_id) => {
    return new Promise((resolve, reject) => {
        queryString = `SELECT count(*) as count FROM users WHERE email_id = ?`
        db.query(queryString, [email_id], (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    })
}

