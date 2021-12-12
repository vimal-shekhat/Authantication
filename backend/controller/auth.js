const { validateUserLogin, validateUserRegister, EditUserRegister, User } = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const {transporter} = require('../middleware/mailer');


exports.Logout = async (req, res) => {


    return res.send({ status: 200, message: 'Loogout succefull' });
}
exports.Login = async (req, res) => {


    //validate data
    const { error } = await validateUserLogin(req.body)

    if (error) {

        return res.send({ status: 400, error: ' email not valid' })
    }
    // user exists or not 
    const user = await User.findOne({ email: req.body.email })
    if (!user) {

        return res.send({ status: 400, error: ' email not found' })
    }

    // password check 
    const valid_password = await bcrypt.compare(req.body.password, user.password)
    if (!valid_password) {
        return res.send({ status: 400, error: 'invalid email and password' })
    }

    //generate token    
    jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {

        if (err) { console.log(err) }

        res.send({ token: token, user: user, message: "loggin successfully", status: 200 });

    });

}

exports.Register = async (req, res) => {


    //validate data
    const { error } = await validateUserRegister(req.body)
    if (error) {
        return res.send({ status: 400, error: error.details[0].message })
    }

    // user exists or not 
    const exist_user = await User.findOne({ email: req.body.email })
    if (exist_user) {
        return res.send({ status: 400, error: 'this user is already registered' })
    }

    // hash password 
    const hashpassword = bcrypt.hashSync(req.body.password, 10)

    //register data 
    const data = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
        mobile: req.body.mobile,
        profile: req.body.profile, //req.file.path
        countory: req.body.countory
    })
    const data1 = await data.save();
    res.send({ status: 200, message: "registered successfully" });

}


exports.EditData = async (req, res) => {
    // validation
    const { error } = await EditUserRegister(req.body)
    if (error) return res.send(error.details[0].message)

    //edit data
    const data = req.body
    const updateData = await User.findOneAndUpdate({ _id: req.body.id }, { $set: data }, { new: true })
    res.send({ status: 200, message: "update successfully", data: updateData })

}
exports.AllData = async (req, res) => {

    res.send({ status: 200, data: "Athantication Demo Here we can Access Profile Page As Private" })


}

exports.DisplayData = async (req, res) => {

    //edit data
    const view_Data = await User.findById({ _id: req.body.id })
    res.send({ status: 200, data: view_Data })

}
// exports.PostForgot = (req,res)=>{
//     const reset_url = "http://localhost:5000/reset/61a463ae674476021003a36d"
//     var mainOptions = {
//         from: '"Parth Panchal" <process.env.email>',
//         to: "parthp.cmarix@gmail.com",
//         subject: 'reset_password',
//         html: reset_url,
//     } ; 
//     transporter.sendMail(mainOptions,()=>{
//         console.log('mail has been send ...!')
//     });
//     res.render('forgot',{msg : "mail has been sent"})
// }