const jwt = require('jsonwebtoken');

const checkSession = async (req, res, next) => {
    try
    {
        const { token } = req.session;
        if(token){
            jwt.verify(token, process.env.token_secret, function (err, decoded) {
                if (err) {
                    return res.redirect('/');
                }
                else {
                    req.auth = decoded;
                    next()
                }
            });
        }
        else{
            return res.redirect('/');
        }
    }
    catch (error) {
        return res.json({
            status: 0,
            message: `Server Error ${error.toString()}`
        });
    }
};

const ajaxSession = async (req, res, next) => {
    try
    {
        const { token } = req.session;
        if(token){
            jwt.verify(token, process.env.token_secret, function (err, decoded) {
                if (err) {
                    return res.json({
                        status: 55,
                        message: `Session Timeout or JWT Expire ${err.toString()}`
                    });
                }
                else {
                    req.auth = decoded;
                    next()
                }
            });
        }
        else{
            return res.json({
                status: 55,
                message: `Session Timeout, Please Login Again`
            });
        }
    }
    catch (error) {
        return res.json({
            status: 0,
            message: `Server Error ${error.toString()}`
        });
    }
};

const loginSession = async(req, res, next)=>{
    try {
        const { token, details } = req.session;
        if(token && details){
            jwt.verify(token, process.env.token_secret, function (err, decoded) {
                if (err) {
                    return res.redirect('/tester');
                }
                else {
                    const { role } = details;
                    let redirect_url = '';
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
                    return res.redirect(redirect_url);
                }
            });
        }else{
            next()
        }
    } catch (error) {
        return res.json({
            status: 0,
            message: `Server Error ${error.toString()}`
        });
    }
}

module.exports = { checkSession, ajaxSession, loginSession }