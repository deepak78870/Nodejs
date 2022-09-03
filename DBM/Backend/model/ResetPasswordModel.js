const db = require('../config/database.js');
const dbFun = require('../config/databaseFunction');


exports.updatePasswordById = (newPassword, email_id) => {
    return new Promise((resolve, reject) => {
        queryString = `UPDATE users SET password = ?,is_expires = 1 WHERE email_id = ?`
        db.query(queryString, [newPassword, email_id], (error, result, fields) => {
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