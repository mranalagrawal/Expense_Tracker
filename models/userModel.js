const mongoose = require('mongoose');

// schema design

const userSchema = mongoose.Schema({
name:{
    type:String,
    required:[true,'Name is Required']
},
email:{
    type:String,
    required:[true,'Email is Required & Should be unique'],
    unique:true
},
password:{
    type:String,
    required:[true,'Password is Required'],
},
},{timeStamps:true})


// export
const userModel = mongoose.model('users',userSchema);

module.exports = userModel
