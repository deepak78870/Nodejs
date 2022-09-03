const db = require('../config/database.js');
const dbFun = require('../config/databaseFunction');

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

exports.updateUserDataById = (data)=>{
    console.log(data);
   return new Promise((resolve, reject) => {
    queryString = 'UPDATE users SET name = "'+data.name+'",email="'+data.email+'",mobile="'+data.mobile+'",password="'+data.password+'" WHERE Id = "'+data.user_id+'"';
    db.query(queryString, (error, result, fields) => {
        if (error) {
            console.log(error)
            dbFun.connectionRelease;
            reject(error);
        } else {
            console.log(result)
            dbFun.connectionRelease;
            resolve(result);
        }
    });
})
}