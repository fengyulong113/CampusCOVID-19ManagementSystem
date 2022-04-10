var express = require('express');
var router = express.Router();
const student = require('../dao/student_dao')

router.get('/', function (req, res) {
  res.send("students进入根目录")
})

/**
 * 我的通知分页获取数据
 */
router.get('/getNotice', function (req, res) {
  student.getNotice(req, res)
})
/**
 * 获取的我通知已读列表(供已读未读状态渲染)
 */
router.get('/getNoticeRead', function (req, res) {
  student.getNoticeRead(req, res)
})
/**
 * 已读转未读
 */
router.get('/goUnread', function (req, res) {
  student.goUnread(req, res)
})
/**
 * 未读转已读
 */
router.get('/goRead', function (req, res) {
  student.goRead(req, res)
})

/**
 *  健康填报表提交
 */
router.post('/setHealth', function (req, res) {
  student.setHealth(req, res)
})

/**
 * 分页获取当天填报表与总数量
 */
router.get('/gethealthNowDayPage', function (req, res) {
  student.gethealthNowDayPage(req, res)
})
/**
 * 获取当天某用户健康表
 */
router.get('/getHealthNowDayByid', function (req, res) {
  student.getHealthNowDayByid(req, res)
})
/**
 * 获取当天所有填报表
 */
router.get('/getHealthNowDay', function (req, res) {
  student.getHealthNowDay(req, res)
})
/**
 * 获取当月所有填报表
 */
router.get('/getHealthNowMonth', function (req, res) {
  student.getHealthNowMonth(req, res)
})
/**
 * 获取所有填报表
 */
router.get('/getAllHealth', function (req, res) {
  student.getAllHealth(req, res)
})

/**
 * 获取某个用户健康报表
 */
router.get('/getHealthById',function(req,res){
  student.getHealthById(req, res)
})

/**
 * 通过类型查询学生当日健康信息
 */
router.get('/getStuHealthByType',function(req,res){
  student.getStuHealthByType(req, res)
})

/**
 * 查询当日体温过高的学生健康信息
 */
router.get('/getStuHealthByTemp',function(req,res){
  student.getStuHealthByTemp(req,res)
})


/**
 * 报名志愿者
 */
router.get('/getEnterVolunteer',function(req,res){
  student.getEnterVolunteer(req, res)
})

/**
 * 获取所有志愿者
 */
router.get('/getAllVolunteer', function(req, res){
  student.getAllVolunteer(req,res)
})

/**
 * 通过ID获取志愿者信息
 */
router.get('/getVolunteerById', function(req, res){
  student.getVolunteerById(req,res)
})

/**
 * 学生物资申请
 */
 router.post('/setMaterial',function(req,res){
  student.setMaterial(req,res)
})

module.exports = router;