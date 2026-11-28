const express = require('express')
const route = express.Router();

const {loginSuperAdmin} = require('../controllers/superAdminController')

route.post('/login', loginSuperAdmin)


module.exports = route