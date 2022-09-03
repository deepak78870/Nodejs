const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());

const med_routes = require('../routers/router');
const dbConfig = require('../config/databaseFunction');

function initilization() {
    setUpDatabase();
    setupBodyParser();
    setUpRoutes();
    setupError404Handler();
    setupErrorHandler();
}

initilization();

function setupBodyParser() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
}

function setUpDatabase() {
    dbConfig.connectionCheck.then((data) => {
        console.log(`Database connected ${data}`);
    }).catch((err) => {
        console.log(err);
    });
}

function setUpRoutes() {
    app.use('/api', med_routes);
}

function setupError404Handler() {
    app.use((req, res) => {
        res.status(404).json({
            message: 'NOT FOUND',
            status: 404,
        });
    });
}

function setupErrorHandler() {
    app.use((err, req, res, next) => {

        res.status(req.errorStatus || 500).json({
            message: err.message || "Something went wrong. Please try again later",
            status: req.errorStatus || 500
        });
    });
}

empty = function empty(obj){
	for(var key in obj){
		if(Object.prototype.hasOwnProperty.call(obj,key)){
			return true;
		}else{
			return false;
		}
	}
}

module.exports = app;
