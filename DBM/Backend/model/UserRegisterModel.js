const db = require('../config/database.js');
const dbFun = require('../config/databaseFunction');

exports.UserSignUp = (inputs) => {
    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO users(name,email, password,mobile) VALUES(?,?,?,?)`
        db.query(queryString, [inputs.name, inputs.email, inputs.password,inputs.mobile], (error, result, fields) => {
            if (error) {
                console.log(error);
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    })
}

exports.getUserDataById = (user_id) => {
    return new Promise((resolve, reject) => {
        queryString = `SELECT * FROM users WHERE Id = ?`
        db.query(queryString, [user_id], (error, result, fields) => {
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

exports.getUserDetailsByEmailId = async (email_id) => {
    return new Promise((resolve, reject) => {
        const queryString = `SELECT count(*) as countData FROM users WHERE email = ?`;
        db.query(queryString, [email_id], (error, result, fields) => {
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
