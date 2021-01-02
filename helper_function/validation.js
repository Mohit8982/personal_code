const { body, validationResult } = require('express-validator')

const resgitrationVali = () => {
    return [
        body('fname_fr', 'Full Name Cannot Be Empty').not().isEmpty(),
        body('username_fr', 'Username Cannot Be Empty').not().isEmpty(),
        body('email_fr').not().isEmpty().withMessage('Email Cannot Be Empty').isEmail().withMessage('Invalid Email'),
        body('password_fr', 'Password Cannot Be Empty').not().isEmpty(),
        body('cpassword', 'Confirm Password Cannot Be Empty').not().isEmpty(),
        body('mobile_fr').not().isEmpty().withMessage('Mobile Number Cannot Be Empty').isLength({ min: 10 , max : 10}).withMessage('Mobile Number Must Contain 10 Digits'),
        body('designation_fr', 'Designation Cannot Be Empty').not().isEmpty(),
    ]
}

const changePass = () => {
    return [
        body('oldPassword', 'Password Cannot Be Empty').not().isEmpty(),
        body('newPass', 'Password Cannot Be Empty').not().isEmpty(),
        body('conNewPass', 'Confirm Password Cannot Be Empty').not().isEmpty(),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    let errNEW = errors.errors
    let custArr = {}

    for(index in errNEW){
        let keyname = errNEW[index].param
        let msgNew = errNEW[index].msg
        custArr[keyname]  = msgNew
    }

    return res.status(200).json({
        status: 3,
        errors: custArr,
    })
}

module.exports = { resgitrationVali, changePass, validate }