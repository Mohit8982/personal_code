const mongoose = require('mongoose');

const later_idea = new mongoose.Schema({
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
    img_path:{
        type: String,
        required: false
    },
    deleted_on:{
        type: String,
        required: false
    }
},{
    versionKey : false
});

module.exports = mongoose.model('later_idea', later_idea);