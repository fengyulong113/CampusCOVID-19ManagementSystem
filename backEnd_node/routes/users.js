var express = require('express');
var router = express.Router();
const user = require('../dao/users_dao')
const fileUp = require('../utils/fileUtils')
const jwtUtil = require('../utils/jwtUtils')

String.prototype.IsPicture = function () {
  let strFilter = ".jpeg|.gif|.jpg|.png|.svg|.pic|.bmp|"
  if (this.indexOf('.') > -1) {
    let p = this.lastIndexOf(".")
    let strPostfix = this.substring(p, this.length) + "|"
    strPostfix = strPostfix.toLowerCase()
    if (strPostfix.indexOf(strPostfix) > -1) return true
  }
  return false;
}


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('users进入路由根目录');
});

/**
 * 登录
 */
router.post('/login', function (req, res) {
  user.Login(req, res)
});

/**
 * 通过token获取用户信息
 */
router.get('/getUserDataByToken', function (req, res) {
  user.getUserDataByToken(req, res)
})

/**
 * 根据用户类型进行用户信息获取(分页获取总数量与数据)
 */
router.get('/getUsersByTypePage', function (req, res) {
  user.getUsersByTypePage(req, res)
})

/**
 * 用户删除
 */
router.get('/delUserdata', function (req, res) {
  if (req.query.u_id == 0) res.send("您不能删除管理员")
  else user.delUserdata(req, res)
})

/**
 * 更改用户信息
 */
router.post('/upUserdata', function (req, res) {
  user.upUserdata(req, res)
})

/**
 * 将redis的xlsx数据写入数据库
 */
router.post('/setXlsxData', function (req, res) {
  user.setXlsxData(req, res)
})

/**
 * 修改密码
 */
router.post('/upPwd', function (req, res) {
  user.upPwd(req, res)
})

/**
 * 修改头像
 */
router.post('/upicon', async function (req, res) {
  let head_imgUrl = await fileUp.upload(req)
  req.head_imgUrl = head_imgUrl
  let isPicture = head_imgUrl.IsPicture();
  if (!isPicture) res.send("没有选择图片或者选择的不是图片")
  else {
    let verify = await jwtUtil.verifysync(req.query.token, globalKey)
    req.u_id = verify.id
    user.upUserHead(req, res)
  }
})

module.exports = router;
