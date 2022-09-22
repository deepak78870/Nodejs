const app = require('./app');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const process = require('process');

//for socket 
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
     console.log('Connected...')
    socket.on('message', (msg) => {
        //io.sockets.emit('message', msg) //will send to all the clients
        socket.broadcast.emit('message', msg)//will send the message to all the other clients except the newly created connection
    })
})


require('dotenv').config();
require('./config/database');

const port = process.env.PORT || 3600;


if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

  http.listen(port, () => {
      console.log(`Server listening on ${port}`)
  });

  console.log(`Worker ${process.pid} started`);
}
