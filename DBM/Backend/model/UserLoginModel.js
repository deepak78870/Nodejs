 const db = require('../config/database.js');
const dbFun = require('../config/databaseFunction');

exports.getUserDetailsById = (email_id) => {
    return new Promise((resolve, reject) => {
        queryString = 'SELECT * FROM users WHERE email= "'+email_id+'"';
        db.query(queryString,(error, result, fields) => {
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

exports.getPasswordById = (email_id) => {
    return new Promise((resolve, reject) => {
        queryString = `SELECT count(*) as count,password,email,Id FROM users WHERE email = ? GROUP BY password`
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

exports.updateusertable = (jwt_token,user_id)=>{
    return new Promise((resolve, reject) => {
        queryString = "UPDATE users SET jwt = '"+jwt_token+"' WHERE Id = '"+user_id+"'";
        db.query(queryString,(error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
                console.log(result)
            }
        });
    })
}