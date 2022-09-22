// Using Node.js `require()`
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGODB_URL;
 mongoose.connect(MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected With Database");
 }).catch(err=>{
   console.log(err.message)
 });

