const userData = require('../data/userData');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Save User Details
exports.save_user = async (body) => {
   const password = body.password;
   const salt = bcrypt.genSaltSync(10);
   const hash_password = bcrypt.hashSync(password, salt);
   body.password = hash_password;
   return await userData.save_user(body);
}
//Login User
exports.user_login = async (body) => {
   const data = await userData.check_exist_user(body.email);
   const arr = {};
   if(data){
      const db_password = data[0].password;
      const match_password = await bcrypt.compare(body.password, db_password);
      if(match_password){
         // const data = await userData.user_login(body);
         const token = await jwt.sign({ data, iat: Math.floor(Date.now() / 1000) - 30 }, process.env.SCREATE_KEY);
         const result_data = data[0];
         arr._id = result_data._id;
         arr.name = result_data.name;
         arr.age = result_data.age;
         arr.email = result_data.email;
         arr.password = result_data.password;
         arr.deptId = result_data.deptId;
         arr.bio = result_data.bio;
         arr.date = result_data.date;
         arr.token = token;
         return arr;
      } else {
         arr.message = "Password Not Matched";
         return arr;
      }

   } else {
      arr.message = "Email Id Not Exist";
      return arr;
   }
}
//If check email is exist or not 
exports.check_exist_user = async(email)=>{
   return await userData.check_exist_user(email);
}
