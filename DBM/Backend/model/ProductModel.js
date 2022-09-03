const db = require('../config/database.js');
const dbFun = require('../config/databaseFunction');

exports.getproduct = ()=>{
    return new Promise((resolve, reject) => {
        queryString = "SELECT * FROM products"
        db.query(queryString,(error, result, fields) => {
            if (error) {
                console.log(error)
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    })
}
exports.addproduct = (data) => {
    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO products(image,title,category,description,amount) VALUES(?,?,?,?,?)`
        db.query(queryString, ['',data.title,data.category,data.description,data.amount], (error, result, fields) => {
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
exports.updateproduct = (data) => {
    return new Promise((resolve, reject) => {
        queryString = 'UPDATE products SET image = "'+data.image+'",title="'+data.title+'",category="'+data.category+'",description="'+data.description+'",amount="'+data.amount+'" WHERE Id = "'+data.product_Id+'"'//update
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
exports.deleteproduct = (data) => {
    return new Promise((resolve, reject) => {
        queryString = 'DELETE FROM products WHERE Id = "'+data.product_Id+'"'
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
exports.filterbycategoryproduct = async (data) => {
    return new Promise((resolve, reject) => {
        queryString = "SELECT * FROM products WHERE category LIKE '%"+data.category+"%'"
        db.query(queryString,(error, result, fields) => {
            if (error) {
                console.log(error)
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    })
}
exports.filterbytitleproduct = async (data) => {
    return new Promise((resolve, reject) => {
        queryString = "SELECT * FROM products WHERE title LIKE '%"+data.title+"%'"
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