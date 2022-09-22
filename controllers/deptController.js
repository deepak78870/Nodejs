const deptService = require('../services/deptService');
const { body, validationResult } = require('express-validator');


exports.save_dept =[
  body('name').notEmpty().withMessage('Dept name must be required'),
  body('Salary').notEmpty().withMessage('Salary must be required'),
  body('Project.name').notEmpty().withMessage('Project Name must be required'),
  async (req,res,next)=>{
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }else{

    const inputs  = req.body;
    const data = await deptService.save_dept(inputs);
    if(data)
      res.json({status:true,message:"Data Saved",result:data})
    else
      res.json({status:false,message:"Data Not Saved",result:{}}) 
 }
}

] 
