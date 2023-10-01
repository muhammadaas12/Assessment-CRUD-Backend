const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema


const userschema = new Schema({

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})
// static method for signup
userschema.statics.signup = async function (email, password) {

    // validation for email and password 

    if (!email || !password) {
        throw Error('All Fields Must Be Filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email Is Not Valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password Not Strong Enough')
    }


    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email Already In Use')
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)


    const user = await this.create({ email, password: hash });

    return user;

}
// static method for login
userschema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All Fields Must Be Filled')
    }
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect Password')
    }
    return user


}



module.exports = mongoose.model('User', userschema)