const profileModel = require("../model/ViewProfileModel");
const helper = require('../helper/helper');
const bcrypt = require('bcryptjs')
exports.getProfile = async (req, res, next) => {
    try {
        const user_id = req.params['id'];
        console.log(user_id)
        const userData = await profileModel.getUserDataById(user_id);
        console.log(userData);
        res.json({ message: 'user sign-up Successfully', status: 1, data: userData });

    } catch (err) {
        res.json({ message: 'error', status: 0 });
    }
}

exports.updateProfile = async (req,res,next)=>{
    try {
        const inputs = req.body;
        const check = validation_data(inputs);
        if(check){
            res.json(check);
        }else{
            const password =inputs.password;  
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password.toString(), salt);
            inputs.password = hash;
            const userData = await profileModel.updateUserDataById(inputs);
        res.json({ message: 'user profile updated Successfully', status: 1, data: userData });

    } 
}catch (err) {
        res.json({ message: 'error', status: 0 });
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
    if (helper.validate_field('user_id', user_data.user_id)) {
        return helper.validate_field('user_id', user_data.user_id);
    }   
   
    return false;
}