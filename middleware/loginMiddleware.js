const jwt = require('jsonwebtoken');

exports.login_varify = async(req,res,next)=>{
    const header = req.headers['authorization'];
    const token = header.split(" ");
    console.log(token[1]);
    await jwt.verify(token[1], process.env.SCREATE_KEY, function(err, data) {
        if(err){
            req.user = null; 
            res.json({status:false,message:"Error Occured",data:err}); 
        }else{
            req.user = data; 
            next();
        }
      });
}
