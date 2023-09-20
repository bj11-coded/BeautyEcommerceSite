const express = require('express');

const route = express.Router();

const authControllers = require('../controllers/auth')

route.get('/register',authControllers.getRegister);
route.get('/login',authControllers.getLogin);
route.get('/resetPassword',authControllers.getResetPassword)

route.post('/resetPassword',authControllers.postResetPassword)
route.post('/register',authControllers.postRegister);
route.post('/login',authControllers.postLogin);
route.get('/logout',authControllers.postLogout);


module.exports = route;