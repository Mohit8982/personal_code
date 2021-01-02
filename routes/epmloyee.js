const router = require('express').Router();
const { upload } = require('../services/file_upload');
const { insertquery, findQuery , updateQuery } = require('../services/crud_operation');
const { resgitrationVali, changePass, validate } = require('../helper_function/validation');
const { ajaxSession } = require('../helper_function/session');
const moment = require('moment');
const bcrypt = require('bcryptjs');

router.post('/registerEmp', ajaxSession, upload.single('user_img'), resgitrationVali(), validate, async (req, res) => {
    try {
        const file = req.file;
        const { fname_fr, email_fr, username_fr, mobile_fr, password_fr, cpassword, designation_fr } = req.body;
        const cond = {$or: [{ email : email_fr }, { mobile : mobile_fr }, {username: username_fr}]};
        const check = await findQuery("Employee", cond, "2", 0, 0, {});

        if(check){
            const { email, mobile, username } = check;
            let message = '';
            if(email === email_fr){
                message = `${email} Already Taken`;
            }else if(username === username_fr){
                message = `Ooposs Username ${username} Already Taken`;
            }else{
                message = `Mobile Number "${mobile}" is already registered`;
            }
            return res.json({ status : 0, message : message })
        }

        if(password_fr !== cpassword){
            return res.json({
                status : 0,
                message : "Enter Same Password..!!!"
            })
        }
        let path = null;
        if(file){
            path = file.path;
            path = path.replace('public','');
        }
        const str = designation_fr.split("||");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password_fr, salt);
        const data = {
            username: username_fr,
            password: hashedPassword,
            email: email_fr,
            mobile: mobile_fr,
            name: fname_fr,
            role: str[0],
            designation: str[1],
            timestamp: moment().unix(),
            created_on: moment().format('DD/MM/YYYY'),
            profile_image : path
        }   
        const insertEmp = await insertquery("Employee", data, "1");

        return res.json({
            status : 1,
            message : "Registered Successfully",
            data : insertEmp
        });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.post('/changePass', ajaxSession, changePass(), validate, async(req, res)=>{
    try {

        const {oldPassword, newPass, conNewPass } = req.body;
        const { _id } = req.session.details;

        if(newPass === conNewPass){
            return res.json({
                status : 0,
                message : "Password not same"
            })
        }

        const cond =  {_id : _id};
        const findUser = await findQuery('Employee', cond, "2", 0, 0, {});

        if(findUser == null){
            return res.json({
                status : 0,
                message : "Employee Not Found"
            })
        }

        const validPass = await bcrypt.compare( oldPassword, findUser.password);

        if(validPass === false){
            return res.json({
                status : 0,
                message : "Sorry your old password is different."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password_fr, salt);
        const updateData = { 
            $set : { password : hashedPassword }
        }

        await updateQuery('Employee', cond, updateData, "1");

        return res.json({
            status : 1,
            message : "Password Updated Successfully"
        })

    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        })
    }
});

router.post('/create_stage', ajaxSession, async(req, res)=>{
    try {
        const { stage_name, flag,  department_name  } = req.body
        const findEmp = await findQuery('Employee',{ username : stage_name }, '2', 0, 0, {_id : 1, name : 1, username :1})
        const data = {
            stage_name : stage_name,
            stage_id : findEmp._id,
            department_name : department_name,
            flag: flag,
            default: false,
        }
        const insert_data = await insertquery('stages', data, "1");
        return res.json({
            status : 1,
            message : "Success",
            data : insert_data
        });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

module.exports = router;