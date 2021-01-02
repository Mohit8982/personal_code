const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;

const daily_login_schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    user_id : {
        type : ObjectId,
        ref : "employee"
    },
    date : {
        type : String,
        required : true
    },
    timestamp:{
        type : Number,
        required : true
    },
    login_log : [{
        time : { type : String },
        login_logout : { type : Boolean }, //true : login , false : logout
        current_timestamp : {type :String}
    }],
},{
    versionKey : false
});

module.exports = mongoose.model("login_record", daily_login_schema);