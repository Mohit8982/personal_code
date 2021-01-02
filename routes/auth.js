const router = require("express").Router();
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkSession } = require("../helper_function/session");
const { findQuery, updateQuery } = require('../services/crud_operation');

router.post('/login', async(req, res)=>{
    try {
        let redirect_url;
        const { username, password } = req.body;
        const cond = {username : username};
        const findEmployee = await findQuery('Employee', cond, "2", 0, 0, {})
        
        if(findEmployee == null){
            return res.json({
                status: 0,
                message: `Invalid Username, Please Try Again`
            });
        }
        
        const {name, _id, designation, mobile, role, profile_image} = findEmployee;
        const validPass = await bcrypt.compare( password, findEmployee.password);
        if(validPass === false){
            return res.json({
                status : 2,
                message : `Invalid Password, Enter Correct Password`
            });
        }
        //assign and create token
        const token = jwt.sign(
            { key: _id },
            process.env.token_secret,
            { expiresIn: "6h" }
        );

        let details = {
            name: name,
            _id: _id,
            username: username,
            designation: designation,
            mobile: mobile,
            role: role,
            profile_img : profile_image
        };
        req.session.details = details;
        req.session.token = token;

        const date = moment().format('DD/MM/YYYY');
        const timestamp = moment(date, 'DD/MM/YYYY').unix();
        const current_timestamp = moment().unix();
        const where = {user_id : _id, timestamp : timestamp};
        const updateData = {
                $set : {
                    username : username,
                    user_id : _id,
                    date : moment().format('DD/MM/YYYY hh:mm a'),
                    timestamp: timestamp
                },
                $push : { login_log :  {
                    time : moment().format('hh:mm:ss a'),
                    login_logout : true, //true : login , false : logout
                    current_timestamp : current_timestamp
                }
            }
        }

        await updateQuery('login_record', where, updateData, '2') //modelName, where, updateData, status

        switch (role) {
            case '0':
                redirect_url = '/admin'
                break;
            case '1':
                redirect_url = '/developer'
                break;
            case '2':
                redirect_url = '/UI_developer'
                break;
            default:
                redirect_url = '/tester'
                break;
        }

        return res.json({
            status : 1,
            message : "Login Success",
            redirect_url : redirect_url,
        });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.post('/check-name', async (req, res)=>{
    try {
        const {username} = req.body;
        const cond = {username : username};
        const check_username = await findQuery('Employee', cond, "2", 0, 0, {});
  
        if(check_username == null){
            return res.json({
                status : 2,
                message : `Invalid Username!!!`
            })
        }

        return res.json({
            status : 1,
            message : `Username Available`
        })
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.message}`
        })
    }
});

router.get('/logout', checkSession, async(req, res)=>{
    try { 
        const {_id, username} = req.session.details;
        const date = moment().format('DD/MM/YYYY');
        const timestamp = moment(date, 'DD/MM/YYYY').unix();
        const current_timestamp = moment().unix();
        const where = {user_id : _id, timestamp : timestamp};
        const updateData = {
                $set : {
                    username : username,
                    user_id : _id,
                    date : moment().format('DD/MM/YYYY hh:mm a'),
                    timestamp: timestamp
                },
                $push : { login_log :  {
                    time : moment().format('hh:mm:ss a'),
                    login_logout : false, //true : login , false : logout
                    current_timestamp : current_timestamp
                }
            }
        }

        await updateQuery('login_record', where, updateData, '2') //modelName, where, updateData, status

        req.session.destroy(function (err) {
            if(err) throw err
            res.redirect('/');
        })
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

module.exports = router;