const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    mobile : {
        type: Number,
        required :true
    },
    profile :{
        type : String
    },
    countory : {
        type : String
    }

})

exports.validateUserLogin = function validate(body) {
    
    const schema = Joi.object({
        email : Joi.string().email() ,
        password :  Joi.string().required()
    })
    return schema.validate(body)
}

exports.validateUserRegister = function validate(body) {
    
    
    const schema = Joi.object({
        name :Joi.string().required(),
        email : Joi.string().required(),
        password :  Joi.string().required(),    
        mobile : Joi.string().required(),
        profile : Joi.string(),
        countory : Joi.string().required()
    })

    return schema.validate(body)
}

exports.EditUserRegister = function validate(body) {
    
    const schema = Joi.object({
        name :Joi.string(),
        email : Joi.string().email(),
        password :  Joi.string(),    
        Mobile_no : Joi.number(),
        profile : Joi.string(),
        country : Joi.string()
    })

    return schema.validate(body)
}
exports.User=mongoose.model('User',userSchema);
