const signUpModel = require("../model/UserRegisterModel")
const helper = require('../helper/helper');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

exports.userSignUp = async (req, res, next) => {
    try {
        const inputs = req.body;
        const check = validation_data(inputs);
        if(check){
            res.json(check);
        }else{
        const password =inputs.password;  
        const salt = bcrypt.genSaltSync(10);
        console.log(salt) 
        const hash = bcrypt.hashSync(password.toString(), salt);
        inputs.password = hash;
        const data = await signUpModel.UserSignUp(inputs);
        const user_id = (data.insertId);

        const userData = await signUpModel.getUserDataById(user_id);
        res.status(200).json({ message: 'user sign-up Successfully', status: 1, userData: userData });

    }
    }catch (err) {
        res.status(400).json({ message: 'error', status: 0 });
    }
}
function validation_data(user_data) {
    if (! empty(user_data)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    if (helper.validate_field('email', user_data.email)) {
        return helper.validate_field('email', user_data.email);
    } 
    if (helper.validate_field('password', user_data.password)) {
        return helper.validate_field('password', user_data.password);
    } 
    if (helper.validate_field('name', user_data.name)) {
        return helper.validate_field('name', user_data.name);
    } 
    if (helper.validate_field('mobile', user_data.mobile)) {
        return helper.validate_field('mobile', user_data.mobile);
    }   
   
    return false;
}