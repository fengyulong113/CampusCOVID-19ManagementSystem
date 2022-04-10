module.exports = class student_mod extends require('./model') {
  
  static getNoticeMod(u_classes, pageNum, currPage) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(currPage * pageNum)
    return new Promise((resolve, reject) => {
      let sql = "select * from notice where class like '%" + u_classes + "%' limit ?,? "
      this.query(sql, this.formatParams(currPage, pageNum)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getNoticeTotal(u_classes) {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from notice  where class like '%" + u_classes + "%'"
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getNoticeReadMod(u_id) {
    return new Promise((resolve, reject) => {
      let sql = "select * from `read` where u_id= ? "
      this.query(sql, this.formatParams(u_id)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static goUnreadMod(u_id, n_id) {
    u_id = Number(u_id)
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "delete from `read` where u_id = ? and n_id = ? "
      this.query(sql, this.formatParams(u_id, n_id)).then(res => {
        resolve("已读转未读成功")
      }).catch(err => {
        reject("已读转未读失败")
      })
    })
  }

  static goReadMod(u_id, n_id) {
    u_id = Number(u_id)
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "insert into `read` (u_id,n_id) values (?,?) "
      this.query(sql, this.formatParams(u_id, n_id)).then(res => {
        resolve("未读转已读成功")
      }).catch(err => {
        reject("未读转已读失败")
      })
    })
  }

  static setHealthMod(u_id, u_name, u_classes, temperature, isHot, isLeave, PCR) {
    return new Promise((resolve, reject) => {
      let sql = "insert into health(u_id, u_name, u_classes, temperature, isHot, isLeave, PCR) values (?,?,?,?,?,?,?)"
      this.query(sql, this.formatParams(u_id, u_name, u_classes, temperature, isHot, isLeave, PCR))
        .then(res => {
          resolve("健康填报表提交成功")
        }).catch(err => {
          reject("健康填报表提交失败")
        })
    })
  }

  static gethealthNowDayPageMod(newDate, lastDate, currPage, pageNum) {
    currPage = Number(currPage)
    pageNum = Number(pageNum)
    currPage = Number(currPage * pageNum)
    return new Promise((resolve, reject) => {
      let sql = "select * from health where createtime between ? and ? LIMIT  ?,? "
      this.query(sql, this.formatParams(newDate, lastDate, currPage, pageNum)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static gethealthNowDayPageTotal(newDate, lastDate) {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count  from health where createtime between ? and ?"
      this.query(sql, this.formatParams(newDate, lastDate)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getHealthNowDayByidMod(u_id, newDate, lastDate) {
    return new Promise((resolve, reject) => {
      let sql = "select * from health where (createtime between ? and ?) and u_id = ?"
      this.query(sql, this.formatParams(newDate, lastDate, u_id)).then(res => {
        resolve(res)
      }).catch(err => {
        reject("查询失败")
      })
    })
  }

  static getHealthNowDayMod(nowDate, lasDate) {
    return new Promise((resolve, reject) => {
      let sql = "select * from health where createtime between ? and ?"
      this.query(sql, this.formatParams(nowDate, lasDate)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getHealthNowMonthMod(nowDate, lasDate) {
    return new Promise((resolve, reject) => {
      let sql = "select * from health where createtime between ? and ?"
      this.query(sql, this.formatParams(nowDate, lasDate)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getAllHealthMod() {
    return new Promise((resolve, reject) => {
      let sql = "select * from health"
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getHealthByIdMod(u_id) {
    return new Promise((resolve, reject) => {
      let sql = `select * from health where u_id=${u_id}`
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject('获取学生个人健康信息失败')
      })
    })
  }

  static getStuHealthByTypeMod(queryType, queryContent, nowDate, lastDate){
    return new Promise((resolve, reject)=>{
      let sql = `select * from health where ${queryType} like "%${queryContent}%" and createtime between ${nowDate} and ${lastDate}`
      this.query(sql).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject('查询失败')
      })
    })
  }

  static getStuHealthByTempMod(nowDate, lastDate){
    return new Promise((resolve, reject)=>{
      let sql = `select * from health where temperature > 37.2 and createtime between ${nowDate} and ${lastDate}`
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject('查询失败')
      })
    })
  }

  static getEnterVolunteerMod(u_id, u_name) {
    u_id = Number(u_id)
    return new Promise((resolve, reject) => {
      let sql = "insert into `volunteer` (u_id, u_name) values (?,?)"
      this.query(sql, this.formatParams(u_id, u_name)).then(() => {
        resolve('报名成功')
      }).catch(err => {
        reject(err, '报名失败')
      })
    })
  }

  static getAllVolunteerMod() {
    return new Promise((resolve, reject) => {
      let sql = "select * from volunteer"
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getVolunteerByIdMod(u_id) {
    u_id = Number(u_id)
    return new Promise((resolve, reject) => {
      let sql = "select * from volunteer where u_id = ?"
      this.query(sql, this.formatParams(u_id)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setMaterialMod(apart, dorm, delivery, mask, disi, water, remarks) {
    return new Promise((resolve, reject) => {
      let sql = "insert into material (apart, dorm, delivery, mask, disi, water, remarks) values (?,?,?,?,?,?,?)"
      this.query(sql, this.formatParams(apart, dorm, delivery, mask, disi, water, remarks)).then(res => {
        resolve("物资申请提交成功")
      }).catch(err => {
        reject("物资申请提交失败")
      })
    })
  }
  
}