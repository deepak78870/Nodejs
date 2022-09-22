const express = require('express');
const app = express();

const morgan = require('morgan');

const router = require('./routes/router');
const ErrorControler  =  require('./controllers/errorController');
const AppError = require('./utils/AppError');
//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));



app.use(express.static(__dirname + '/public'))

app.use(express.json());

app.use(morgan('dev'));

app.use(router);
//app.use(ErrorControler);

/*
app.use('/', (req, res, next) => {
    console.log('you hit the middleware stack');
    next();
})

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

 */

module.exports =app;