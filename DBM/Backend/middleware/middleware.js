const jwt = require('jsonwebtoken');
const tokenmodel = require('../model/userTokenModel');

exports.userAuthentication = async (req, res, next) => {
    const token = req.headers.jwt;
    console.log(token);
    try {
        console.log("qwdd")
        await jwt.verify(token,process.env.SECRET_KEY, async (error, decode) => {
            if (error) {
                console.log('12345',error);
                res.json({status:false,message:error})
            } else if (!decode) {
                res.json({status:false,message:'User Not Authorised'})
            } else {
                user_id = decode.user_id;
                const jwt_verify_data = await tokenmodel.getUserIdByAuthToken(user_id);
                let db_jwt = jwt_verify_data[0].jwt;
                console.log(db_jwt);
                if(db_jwt == token){
                    next();
                }else{
                    res.json({status:false,message:'User Not Authorised'});
                    console.log(db_jwt);
                }
                
            }
        })
    } catch (error) {
        res.json({ message: "Please provide jwt in header", status: false });
    }
}