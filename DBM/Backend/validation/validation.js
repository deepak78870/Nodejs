const userRegisterModel = require("../model/UserRegisterModel");

exports.user_register_validation = async (req, res, next) => {
    try {
        const email_id = req.body.email;
        const is_Exist = await userRegisterModel.getUserDetailsByEmailId(email_id);
        const userData = is_Exist[0].countData;
        console.log("hsdgsgfhgf",userData);
        if (userData > 0) {
            res.status(405).json({ message: 'This email is already register.', status: 0 });
        } else {
            next();
        }

    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }

};

// exports.user_login_validation = async (req, res, next) => {
//     try {
//         const phone_number = req.body.phone_number;
//         const isBlocked = await userLoginModel.getCheckUserIsBlocked(phone_number);
//         if (isBlocked[0].is_blocked == 1) {
//             response.isBlockedResponse(res, 'Your account has been blocked.');
//         } else {
//             next();
//         }

//     } catch (err) {
//         return res.status(400).send({ 'message': err.message });
//     }

// };