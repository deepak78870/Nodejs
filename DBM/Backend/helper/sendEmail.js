const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.mandrillapp.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
});
exports.sendOtpForgotPassword = (email_id, emailSubject, token) => {
    const url = 'http://localhost:3000/';
    // ${url}reset-password/${token}
    var mailOptions = {
        from: 'From Deepak  ' + process.env.USER_EMAIL,
        to: email_id,
        subject: emailSubject,
        html: `Dear user, <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; A request has been received to change the password for your account.<br><br><br>
        <center> <a href="${url}resetPassword/${token}" 
        style="border: 0;
        background: #9EA8F5;
        color: #FFFFFF;
        text-decoration: none;
        padding: 0.25rem 1.5rem;
        cursor: pointer;" >Reset Password</a></center><br><br>
        if you didn't request a password reset, you can ignore this email. Your password will not be changed.<br><br><br>
        <center><small>The Rashid App Team.</small></center>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent Sucessfully');
        }
    });
}