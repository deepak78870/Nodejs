const userModel = require('../models/userSchema');

exports.get_details = async ()=>{
    return await userModel.find().populate("deptId");
}