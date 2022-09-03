const forgotPasswordModel = require("../model/ForgotPasswordModel")
const bcrypt = require('bcrypt')
const sendOtpModel = require('../helper/sendEmail');
const jwt = require("jsonwebtoken");

exports.forgotPassword = async (req, res, next) => {
    try {
        const email_id = req.body.email_id;
        const userData = await forgotPasswordModel.getPasswordById(email_id);
        if (userData[0].count > 0) {
            let token = jwt.sign({ data: { email: email_id } }, process.env.SECRET_KEY);

            await sendOtpModel.sendOtpForgotPassword(email_id, 'Forgot password', token);

            res.status(200).json({ message: 'Link send successfully please check email..', status: 1 });

        } else {
            res.status(401).json({ message: ' This email is not registered.', status: 0 });
        }

    } catch (err) {
        res.status(500).json({ message: 'error', status: 0 });
    }
}



