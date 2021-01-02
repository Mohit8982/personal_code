const mongoose = require("mongoose");

const macro_schema = new mongoose.Schema({
    macro_section_name : {
        type : String,
        required : true
    },
    micro_section_name : [{
        name : {
            type : String,
            required : false
        },
        added_on:{
            type : String,
            required: false
        }
    }],
    created_on : {
        type : String,
        required : true
    },
},{
    versionKey : false
});

module.exports = mongoose.model("macrosections", macro_schema);