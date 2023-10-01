const express = require('express');

// controller functions

const { signupuser, loginuser } = require('../controllers/usercontroller')


const router = express.Router();


// login route

router.post('/login', loginuser)



// signup route
router.post('/signup', signupuser)


module.exports = router