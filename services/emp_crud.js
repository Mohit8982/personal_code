const employee = require('../models/Employee');
const login_logs = require('../models/Daily_login_rec');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const empInsert = async (empInsertData, file) =>{

    const { fname, mobile, desig, email, username, password}  = empInsertData
    const hashedPassword = await bcrypt.hash(password, salt);
    const date = moment().format('DD/MM/YYYY hh:mm a');
    const timestamp = moment().unix();

    const str = desig.split("||");

    const empData = new employee({
        username: username,
        password: hashedPassword,
        email: email,
        mobile: mobile,
        name: fname,
        role: str[1],
        designation: str[0],
        created_on: date,
        timestamp: timestamp,
        profile_image : file.path
    })

    const saveEmployee = await empData.save();

    return saveEmployee;
}

const findEmp = async (findData)=>{
    try {
        const data = await employee.findOne(findData);
        return data;
    } catch (error) {
        return error
    }
}

const updateEmp = async (where, update) =>{

    const updateEmp = await employee.updateOne(where,{
        $set : update
    });

    return updateEmp;
}

const deleteEmp = async (where)=>{
    const dltEmp = await employee.deleteOne(where);
    return dltEmp;
}

const empfindandUpdate = async (empDetail, status)=>{

    const { _id, username } = empDetail;
    const date = moment().format('DD/MM/YYYY');
    const timestamp = moment(date, 'DD/MM/YYYY').unix();
    const current_timestamp = moment().unix();

    const arr_data = {
        time : moment().format('hh:mm:ss a'),
        login_logout : status, //true : login , false : logout
        current_timestamp : current_timestamp
    }

    const update = await login_logs.findOneAndUpdate(
        {user_id : _id, timestamp : timestamp},
        {
            $set : {
                username : username,
                user_id : _id,
                date : moment().format('DD/MM/YYYY hh:mm a'),
                timestamp: timestamp
            },
            $push : { login_log : arr_data }
        },{upsert:true});

    return update;

}

module.exports = {empInsert, findEmp, updateEmp, empfindandUpdate, deleteEmp};