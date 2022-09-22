const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const User = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number},
    email: { type: String, index: true,unique: [true, 'That email address is taken.'],lowercase: true,
    validate: [validator.isEmail, 'Enter a valid email address.'] },
    password: { type: String, min:6 },
    passwordConfirm: {
      type: String,
      required: [true, 'Retype your password.'],
      validate: {
          validator: function(el) {
          return el === this.password;
      }, message: 'Passwords don\'t match.'
  }
},
    deptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "depts",
        required:true
    },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now },
    buff: Buffer 
  },{ versionKey: false });// remove _v:0 version
  
  // a setter
  User.path('name').set(function (v) {
    return capitalize(v);
  });
  function capitalize (val) {
    if (typeof val !== 'string') val = '';
    return val.charAt(0).toUpperCase() + val.substring(1);
  }  
  
  // middleware
  User.pre('save', function (next) {
     console.log("Data Saved");
    next();
  });

  module.exports = mongoose.model('user',User);