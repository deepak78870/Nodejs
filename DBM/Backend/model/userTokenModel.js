const db = require('../config/database.js');
const dbFun = require('../config/databaseFunction');

exports.getUserIdByAuthToken = async (user_id) => {
    return new Promise((resolve, reject) => {
        const queryString = "SELECT jwt FROM users WHERE Id = '"+user_id+"'";
        db.query(queryString,(error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        })
    })
}