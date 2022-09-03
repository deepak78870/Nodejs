const database = require('./database')

function connectionCheck() {
    return new Promise((resolve, reject) => {
        database.getConnection(function (err, connection) {
            if (err) {
                if (connection) connection.release();
                reject(err)
            } else {
                resolve('successfully')
            }
        })
    })
}

function connectionRelease() {
    database.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });
}

module.exports = {
    connectionCheck: connectionCheck(),
    connectionRelease: connectionRelease()
}