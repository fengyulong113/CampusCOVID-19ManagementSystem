var express = require('express');
var router = express.Router();
const admin = require('../dao/admin_dao')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('admin进入路由根目录');
});

/**
 * 根据用户类型与查询字段模糊查询
 */
router.get('/getUsersByTypeAndChar', function (req, res, next) {
  admin.getUsersByTypeAndChar(req, res)
});

/**
 * 发布公告
 */
router.post('/announce', function (req, res) {
  admin.announce(req, res)
});
/**
 * 分页获取所有通知与数量
 */
router.get('/getAllNotice', function (req, res, next) {
  admin.getAllNotice(req, res)
});

/**
 * 获取通知详情
 */
router.get("/NoticeDetails", function (req, res) {
  admin.NoticeDetails(req, res)
})

/**
 * 删除通知
 */
router.get("/delNotice", function (req, res) {
  admin.delNotice(req, res)
})


/**
 * 获取所有志愿者
 */
 router.get('/getAllVolunteerByTeacher',function(req,res){
   admin.getAllVolunteerByTeacher(req,res)
 })

 /**
  * 分配志愿者地点、小组
  */
 router.post("/setVolunteer",function(req,res){
   admin.setVolunteer(req,res)
 })

 /**
  * 获取学生表
  */
 router.get("/getAllStudents",function(req,res){
   admin.getAllStudents(req,res)
 })

 /**
  * 获取物资申请
  */
router.get('/getAllMaterial', function(req,res){
  admin.getAllMaterial(req, res)
})


module.exports = router;
