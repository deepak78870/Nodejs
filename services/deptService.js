const deptData = require('../data/deptData');
exports.save_dept = async(body)=>{
   return await deptData.save_dept(body);
}