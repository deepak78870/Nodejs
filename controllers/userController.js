const userService = require('../services/userService');
const { body, validationResult ,sanitizeBody} = require('express-validator');
const debug  =  require('debug');
debugWarn = debug('warn');
debugError = debug('error');
exports.save_user = [
  body('name').not().isEmpty().withMessage('Name must be required'),
  body('age').isLength({ max: 2,min:1}).not().isEmpty().trim().escape().withMessage('Age must be required'),
  body('deptId').notEmpty().withMessage('DeptId must be required'),
  body('email').isEmail().notEmpty().trim().escape().withMessage('Email must be required'),
  body('password').notEmpty().escape().withMessage('Password must be required'),
  // body('email').custom(value => {
  //   return userService.check_exist_user(value).then(user => {
  //     if (user) {
  //       return Promise.reject('E-mail already in use');
  //     }
  //   });
  // }),
  async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
   const inputs  = req.body;
   const data = await userService.save_user(inputs);
   if(data)
     res.json({status:true,message:"Data Saved",result:data})
}
]

exports.user_login = [
  body('email').isEmail().notEmpty().trim().escape().withMessage('Email must be required'),
  body('password').notEmpty().escape().withMessage('Password must be required'),
  // body('email').custom(value => {
  //   return userService.check_exist_user(value).then(user => {
  //     if (!user) {
  //       return Promise.reject('E-mail not exist!');
  //     }else{

  //     }
  //   });
  // }),
  async(req,res)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }else{
          const inputs = req.body;
          debugWarn(inputs);
          await userService.user_login(inputs).then(async data=>{
                 res.json({status:true,message:"Data fetched",result:data})
              }).catch(err=>{
                 res.json({status:false,message:"Data Not fetched",result:err.message})
             })
      }
 }
]
