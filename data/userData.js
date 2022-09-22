const userModel =  require('../models/userSchema');

exports.save_user = async (inputs)=>{
    const user = new userModel(inputs);
    return await user.save();
    //console.log(req.body);
}
exports.user_login = async (inputs)=>{
    return await userModel.find(inputs);
    //console.log(req.body);
}

exports.check_exist_user = async (inputs)=>{
    //console.log(userModel.find().stats());
    return await userModel.find({email:inputs});
}