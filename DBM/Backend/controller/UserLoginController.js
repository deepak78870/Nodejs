const loginModel = require("../model/UserLoginModel")
const helper = require("../helper/helper");
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken');

exports.userLogin = async (req, res, next) => {
    try {
        const inputs = req.body;
        console.log(inputs)
        const check = validation_data(inputs);
        if(check){
            res.json(check);
        }else{
            const email_id = req.body.email;
            const password = req.body.password;
            const userData = await loginModel.getPasswordById(email_id);
            console.log("qwertyu",userData);
    
            if (empty(userData)) {
    
                const dbPassword = userData[0].password;
                const isMatched = await bcrypt.compare(password, dbPassword);
                if (isMatched) {
                    console.log(userData[0].Id)
                    let payload = {};
                    payload.email =userData[0].email;
                    payload.user_id = userData[0].Id;
                    let jwt_token =  await jwt.sign(JSON.stringify(payload),process.env.SECRET_KEY);
                    console.log(jwt_token);
                    const update_token = await loginModel.updateusertable(jwt_token,userData[0].Id);
                    const data = await loginModel.getUserDetailsById(email_id);
                    
                    res.json({ message: 'User sign-In Successfully', status: 1, data: data });
                } else {
                    res.json({ message: 'Password is incorrect.', status: 0 });
                }
    
            } else {
                res.json({ message: ' This email is not registered.', status: 0 });
            }
        }
        }catch (err) {
            console.log("sdfsd");
            res.status(500).json({ message: 'error', status: 0 });
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
   
    return false;
}

/* end  */

/**Get Contact Us Details */
 exports.get_contactus_details =  async function(req,res){
     var inputs = req.body;
     contactModel.get_contactus(inputs,async function(err, result){
        if(err)
           res.json({status: false, message: err});
        else
          res.json({status: true, message: 'Data Fetched successfully', data: result  });            
     });
 }
