const express = require('express')

const userController = require('./user_ctrl');
const router = express.Router();

router.post('/id/duplica', userController.check_duplication)
router.put('/', userController.signup)
router.post('/signin', userController.signin)
router.post('/loss/secret', userController.getPassword)
router.get('/list', userController.getUserList)

/* 요청하신 목록에는 없는 api지만 혹시 쓰일 일이 있을까 싶어서 추가해두었습니다
router.get('/one/:service_id', userController.getUser)
router.get('/list', userController.getUserList)
*/

module.exports = router;