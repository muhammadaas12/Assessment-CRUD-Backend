const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, 'MohdAasIsASecretYoutubeInfluencer', { expiresIn: '3d' })
}




const loginuser = async (req, res) => {

    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        // create token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}

const signupuser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)
        // create token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupuser, loginuser }