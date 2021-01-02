const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;

const idea_schema = new mongoose.Schema({
    primary_task_title : {
        type : String,
        required : true
    },
    primary_task :{
        type : ObjectId,
        required :true,
        ref : "raw_idea"
    },
    secondry_task: [{
        type : ObjectId,
        required : true,
        ref : "raw_idea"
    }],
    assigned_to: {
        type : ObjectId,
        ref: "stages",
        required : true
    },
    assigned_by: {
        type : ObjectId,
        ref: "Employee",
        required : true
    },
    idea_discussion:[{
        comment_by : String,
        comment_type : Number,  //0 : Alert Comment, 1: General Comment
        comment_by_id : ObjectId,
        comment : String,
        date : String
    }],
    idea_docs:[{ type : String }],
    created_on : { type : String }
},{
    versionKey : false
});

module.exports = mongoose.model("merged_idea", idea_schema);