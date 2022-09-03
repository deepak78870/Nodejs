const resetPasswordModel = require("../model/ResetPasswordModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.resetPassword = async (req, res, next) => {
    try {
        const newPassword = await bcrypt.hash(req.body.newPassword, 10);

        let decode = jwt.decode(req.headers.token, process.env.SECRET_KEY);
        const email_id = decode.data.email;
        await resetPasswordModel.updatePasswordById(newPassword, email_id);
        res.status(200).json({ message: 'Password update successfully.', status: 1 });


    } catch (err) {
        res.status(500).json({ message: 'error', status: 0 });
    }
}
