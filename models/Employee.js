const mongoose = require("mongoose");

const emp_schema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
    },
    password:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true,
    },
    mobile:{
        type: Number,
        required: true
    },
    name: {
        type : String,
        required : true
    },
    role: {
        type : Number,
        required : true
    },
    banned: {
        type : Boolean,
        default: false
    },
    designation:{
        type : String,
        required: true
    },
    created_on: {
        type : String,
        required: true
    },
    timestamp: {
        type : Number,
        required : true
    },
    is_logged_in:{
        type : Boolean //true : logged in, false : logged out
    },
    profile_image : {
        type: String,
        required: false
    }
},{
    versionKey : false
});

module.exports = mongoose.model("Employee", emp_schema);