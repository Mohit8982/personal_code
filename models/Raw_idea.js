const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;

const raw_idea_schema = new mongoose.Schema({
    description : {
        type: String,
        required: true,
    },
    detail : {
        type: String,
        required: true
    },
    arn_id : {
        type: String,
        required: false
    },
    deskType:{
        type: String,
        required: false
    },
    idea_relation:{
        type: String,
        required: true
    },
    created_on: {
        type: String,
        required: true
    } ,
    timestamp:{
        type: Number,
        required: false
    },
    img_path:[{
        type: String,
        required: false
    }],
    idea_stage:{
        type: Number, //0: Pending, 1: Accepted or Final, 2: Declined, 3: UI Design, 4: Development,  5: testing, 6: Ready To Live
        required: false
    },
    macro_Section_name:{
        type : String,
        required: false
    },
    micro_section_name:{
        type : String,
        required: false
    },
    sales_importance:{
        type : String,
        required: false
    },
    client_benefit:{
        type : String,
        required: false
    },
    priority_level:{
        type : String,
        required: false
    },
    time_duration:{
        type : String,
        required: false
    }
},{
    versionKey : false
});

module.exports = mongoose.model("raw_idea",raw_idea_schema);