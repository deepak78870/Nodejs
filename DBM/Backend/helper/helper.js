const jwt = require('jsonwebtoken');
exports.validate_field = function (field, value) {
    if (value == undefined)
        return {status: false, message: field + ' field is required'};
    if (value == "")
        return {status: false, message: field + ' cannot be empty'};
}
// exports.create_jwt = function create_jwt(data) {
//     const claims = data;
//     console.log(claims);
//     const token = jwt.sign(claims.Id, '12345678asdasdmasdmsamdmsklnkwnh872738272hdu2d88h');
//     console.log(token)
//     token.setExpiration(new Date().getTime() + ((30 * 86400) * 1000)) // 30 days
//     var jwt_token = token.compact();

//     return jwt_token;
// }