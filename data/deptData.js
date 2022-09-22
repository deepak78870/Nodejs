const deptModel =  require('../models/depSchema');

exports.save_dept = async (inputs)=>{
    const dept = new deptModel(inputs);
    return await dept.save();
    //console.log(req.body);
}