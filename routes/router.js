const express = require('express')
const router = express.Router()
//Middleware
const logindata = require('../middleware/loginMiddleware');
const errorControllr  =require('../controllers/errorController')

//require all controller here
const userController = require('../controllers/userController');
const deptController = require('../controllers/deptController');
const getdetailsController = require('../controllers/getdetailsController');
const socketController  =  require('../controllers/socketController');

//middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date())
  next()
})

//define the home page route
router.post('/user',errorControllr.errorData,userController.save_user);
router.post('/login',userController.user_login);
router.post('/dept',deptController.save_dept);
router.get('/all_records',logindata.login_varify,getdetailsController.get_details);
//socket
router.get('/livechat',socketController.socket_listen);
router.get('/login_user',socketController.login_page);


module.exports = router;