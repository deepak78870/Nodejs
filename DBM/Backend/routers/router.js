const Router = require("express");
const express = require("express");
const routes = express.Router();


const userRegisterController = require("../controller/userRegisterController")
const UserSignInController = require("../controller/UserLoginController")
const userValidation = require("../validation/validation");
const ForgotPasswordController = require("../controller/ForgotPasswordController");
const ResetPasswordController = require("../controller/ResetPasswordController")
const ViewProfileController = require('../controller/ViewProfileController');
const ProdutData = require('../controller/ProductController');
//Middleware for authenticaton
const middle = require('../middleware/middleware');

routes.post("/signup", userValidation.user_register_validation, userRegisterController.userSignUp);
routes.post("/signin", UserSignInController.userLogin);

routes.post("/send-link", middle.userAuthentication,ForgotPasswordController.forgotPassword);
routes.post("/reset-password",middle.userAuthentication, ResetPasswordController.resetPassword);

routes.get("/get_profile/:id",middle.userAuthentication,ViewProfileController.getProfile);
routes.post("/update_profile",middle.userAuthentication,ViewProfileController.updateProfile);

routes.post("/addproduct",middle.userAuthentication,ProdutData.addproduct);
routes.post("/updateproduct",middle.userAuthentication,ProdutData.updateproduct);
routes.get("/deleteproduct", middle.userAuthentication,ProdutData.deleteproduct);
routes.get("/getproduct",middle.userAuthentication,ProdutData.getproduct);

routes.get("/filterbycategory",middle.userAuthentication, ProdutData.filterbycategory);
routes.get("/filterbytitle",middle.userAuthentication,ProdutData.filterbytitle);


module.exports = routes;