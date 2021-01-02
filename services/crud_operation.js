const mongoose = require('mongoose');

const findQuery = async(modelName, condition, status, limit, skip, select, populate_field) =>{
    const groupModel = mongoose.model(modelName);
    let find ='';
    switch (status) {
        case "1":
            find = await groupModel.find(condition, select);
            break;
        case "2":
            find = await groupModel.findOne(condition, select);
            break;
        case "3":
            find = await groupModel.find(condition).sort({_id: -1}).limit(parseInt(limit));
            break;
        case "4":
            find = await groupModel.find(condition).populate({
                        path:'ideas_under',
                        options: {
                            limit: parseInt(limit),
                            sort: { _id: -1},
                            skip: parseInt(skip)
                        }
                    }).sort({default : -1});
            break;
        case "5":
            find = await groupModel.findOne(condition).populate('primary_task').populate(populate_field, { description: 1, created_on: 1, arn_id: 1, deskType: 1, detail: 1, idea_stage :1 });
            break;
        default:
            find = await groupModel.find(condition).sort({_id: -1}).limit(parseInt(limit)).skip(parseInt(skip));
            break;
    }
    return find;
}

const updateQuery = async(modelName, where, updateData, status)=>{
    const groupModel = mongoose.model(modelName);
    let update='';
    switch (status) {
        case '1':
            update = await groupModel.updateOne(where, updateData);        
            break;
        case '2':
        update = await groupModel.findOneAndUpdate(where, updateData, {upsert:true, new : true});        
            break;
        default:
            update = await groupModel.updateMany(where, updateData);
            break;
    }
    return update;
}

const deleteQuery = async(modelName, condition, status)=>{
    const groupModel = mongoose.model(modelName);
    let delete_data = '';
    switch (status) {
        case "1":
            delete_data = await groupModel.deleteOne(condition);
            break;
        default:
            delete_data = await groupModel.deleteMany(condition);
            break;
    }
    return delete_data;
}

const insertquery = async(modelName, data, status)=>{
    const groupModel = mongoose.model(modelName);
    let insert ='';
    switch (status) {
        case "1":
            insert = await groupModel.create(data);
            break;
        default:
            insert = await groupModel.insertMany(data);
            break;
    }
    return insert;
}

module.exports = { findQuery, updateQuery, deleteQuery, insertquery }