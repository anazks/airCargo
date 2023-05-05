var express = require('express');
var router = express.Router();
var checkUser = require('../middleware/checkUser')
var {
  hetHomePage,
  getLoginPage,
  getRegisterPage,
  doRegister,
  doLogin,
  getMyorderPage,
  addTocart,
  logout
} = require('../controllers/userController')
/* GET home page. */
router.get('/',hetHomePage)
router.get('/login',getLoginPage)
router.get('/myorder',checkUser,getMyorderPage)
router.get('/register',getRegisterPage)
router.post('/register',doRegister)
router.post('/login',doLogin)
router.get('/logout',logout)

router.get('/add-to-cart/:Pid',addTocart)
module.exports = router;
