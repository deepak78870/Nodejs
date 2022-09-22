const mongoose = require('mongoose');
const { Schema } = mongoose;

const Project  =  new Schema ({ 
    name :{type:String,default:"" ,required:true},
    location :{type:String,default:"",required:true},
});

const Department = new Schema({
    name: { type: String, default: '' },
    Salary: { type: Number, min: 4, required:true}, 
    Project:[Project]
  },{ versionKey: false });
  
  // a setter
  Department.path('name').set(function (v) {
    return capitalize(v);
  });
  function capitalize (val) {
    if (typeof val !== 'string') val = '';
    return val.charAt(0).toUpperCase() + val.substring(1);
  }  
//

Department.pre('save', function (next) {  
  var user = this; 
  const name_data= user.isModified('name');
   if(name_data)
    return next(new Error("Already Exist !"));
  next();
});

  module.exports = mongoose.model('depts',Department);