const jwtUtil = require('../utils/jwtUtils')
module.exports = class student_dao extends require('../model/student_mod') {

  /**
   * 分页获取我的通知与数量
   */
  static async getNotice(req, resp) {
    let verify = await jwtUtil.verifysync(req.query.token, globalKey)
    let u_classes = verify.classes
    let pageNum = req.query.pageNum
    let currPage = req.query.currPage
    let data = await this.getNoticeMod(u_classes, pageNum, currPage)
    let total = await this.getNoticeTotal(u_classes)
    resp.send({ data, total: total[0].count })
  }

  /**
   * 获取的我通知已读列表(供已读未读状态渲染
   */
  static async getNoticeRead(req, resp) {
    let verify = await jwtUtil.verifysync(req.query.token, globalKey)
    let u_id = verify.id
    let data = await this.getNoticeReadMod(u_id)
    resp.send(data)
  }

  /**
   * 已读转未读
   */
  static async goUnread(req, resp) {
    let verify = await jwtUtil.verifysync(req.query.token, globalKey)
    let u_id = verify.id
    let n_id = req.query.n_id
    let results = await this.goUnreadMod(u_id, n_id)
    resp.send(results)
  }

  /**
   * 未读转已读
   */
  static async goRead(req, resp) {
    let verify = await jwtUtil.verifysync(req.query.token, globalKey)
    let u_id = verify.id
    let n_id = req.query.n_id
    let results = await this.goReadMod(u_id, n_id)
    resp.send(results)
  }

  /**
   * 健康填报表提交
   */
  static async setHealth(req, resp) {
    let body = req.body
    let token = body.token
    let temperature = body.temperature
    let isHot = body.isHot
    let isLeave = body.isLeave
    let PCR = body.PCR
    let verify = await jwtUtil.verifysync(token, globalKey)
    let u_id = verify.id
    let u_name = verify.username
    let u_classes = verify.classes
    let data = await this.setHealthMod(u_id, u_name, u_classes, temperature, isHot, isLeave, PCR)
    resp.send(data)
  }

  /**
   * 分页获取当天填报表与总数量
   */
  static async gethealthNowDayPage(req, resp) {
    let date = new Date();
    let Month = ""
    if ((date.getMonth() + 1) < 10) Month = "0" + String((date.getMonth() + 1))
    else Month = (date.getMonth() + 1) + ""
    let newDate = "" + date.getFullYear() + Month + date.getDate()
    let lastDate = "" + date.getFullYear() + Month + (date.getDate() + 1)
    let currPage = req.query.currPage
    let pageNum = req.query.pageNum
    let data = await this.gethealthNowDayPageMod(newDate, lastDate, currPage, pageNum)
    let total = await this.gethealthNowDayPageTotal(newDate, lastDate)
    resp.send({ data, total: total[0].count })
  }

  /**
   * 获取当天某用户报表
   */
  static async getHealthNowDayByid(req, resp) {
    let verify = await jwtUtil.verifysync(req.query.token, globalKey)
    let u_id = verify.id
    let newDate = this.getNowAndLastDate().newDate
    let lastDate = this.getNowAndLastDate().lastDate
    let data = await this.getHealthNowDayByidMod(u_id, newDate, lastDate)
    resp.send(data)
  }

  /**
   * 获取当天所有填报表
   */
  static async getHealthNowDay(req, resp) {
    let nowDate = this.getNowAndLastDate().newDate
    let lasDate = this.getNowAndLastDate().lastDate
    let data = await this.getHealthNowDayMod(nowDate, lasDate)
    resp.send(data)
  }
  /**
   * 获取当月所有填报表
   */
  static async getHealthNowMonth(req, resp) {
    let nowDate = this.getNowAndLastDate().nowMonth
    let lasDate = this.getNowAndLastDate().lastMonth
    let data = await this.getHealthNowMonthMod(nowDate, lasDate)
    resp.send(data)
  }

  /**
   * 获取所有填报表
   */
  static async getAllHealth(req, resp) {
    let data = await this.getAllHealthMod()
    resp.send(data)
  }

  /**
   * 获取某个用户健康报表
   */
  static async getHealthById(req, resp) {
    let u_id = req.query.u_id
    let data = await this.getHealthByIdMod(u_id);
    resp.send(data)
  }

  /**
   * 通过类型查询学生当日健康信息
   */
  static async getStuHealthByType(req, resp) {
    let queryType = req.query.queryType
    let queryContent = req.query.queryContent
    let nowDate = this.getNowAndLastDate().newDate
    let lastDate = this.getNowAndLastDate().lastDate
    let data = await this.getStuHealthByTypeMod(queryType, queryContent, nowDate, lastDate)
    resp.send(data)
  }

  /**
   * 查询当日体温过高的学生健康信息
   */
  static async getStuHealthByTemp(req, resp) {
    let nowDate = this.getNowAndLastDate().newDate
    let lastDate = this.getNowAndLastDate().lastDate
    let data = await this.getStuHealthByTempMod(nowDate, lastDate)
    resp.send(data)
  }

  /**
   * 报名志愿者
   */
  static async getEnterVolunteer(req, resp) {
    let verify = await jwtUtil.verifysync(req.query.token, globalKey)
    let u_id = verify.id
    let u_name = verify.username
    let data = await this.getEnterVolunteerMod(u_id, u_name);
    console.log(data);
    resp.send(data)
  }

  /**
   * 获取所有志愿者
   */
  static async getAllVolunteer(req, resp) {
    let data = await this.getAllVolunteerMod()
    resp.send(data)
  }

  /**
   * 通过ID获取志愿者信息
   */
  static async getVolunteerById(req, resp) {
    let verify = await jwtUtil.verifysync(req.query.token, globalKey)
    let u_id = verify.id
    let data = await this.getVolunteerByIdMod(u_id);
    resp.send(data)
  }

  /**
   * 学生物资申请
   */
  static async setMaterial(req, resp) {
    let body = req.body
    let apart = body.apart
    let dorm = body.dorm
    let delivery = body.delivery
    let mask = body.mask
    let disi = body.disi
    let water = body.water
    let remarks = body.remarks
    let data = await this.setMaterialMod(apart, dorm, delivery, mask, disi, water, remarks)
    resp.send(data)
  }
  
}