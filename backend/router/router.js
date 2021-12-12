const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')
const auth = require('../authentication/auth_user')
const { Uploader } = require('../middleware/upload_file')

// routers
router.get('/all', authController.AllData)
router.put('/edit', authController.EditData)
router.get('/display', authController.DisplayData)
// auth routers
router.post('/login', authController.Login)
router.post('/logout', authController.Logout)
router.post('/signup', Uploader.single('profile'), authController.Register)


module.exports = router
