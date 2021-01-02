const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;

const macro_schema = new mongoose.Schema({
    stage_name : {   //this can be emp name or random stage name
        type : String,
        required : true,
        trim : true
    },
    stage_id : {
        type : ObjectId, //this is employee id which is generated on employee registration
        ref : "Employee",
        required : false
    },
    department_name : {
        type : String, 
        required : false,
        default: null
    },
    flag: Number,
    default: {
        type : Boolean,
        required : true,
    },
    ideas_under : [{
       type : ObjectId,
       ref : "merged_idea"
    }]
},{
    versionKey : false
});

module.exports = mongoose.model("stages", macro_schema);