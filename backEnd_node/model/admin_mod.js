module.exports = class admin_mod extends require('./model') {

  static getUsersByTypeAndCharMod(type, inputText, CharType, currPage, pageNum) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(currPage * pageNum)
    return new Promise((resolve, reject) => {
      let sql = `select * from user where ${CharType} like "%${inputText}%" and type=${type} order by modifytime desc LIMIT ${currPage}, ${pageNum}`
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getUsersByTypeAndCharTotal(type, inputText, CharType) {
    return new Promise((resolve, reject) => {
      let sql = 'select count(1) as count from user where  ' + CharType + '  like "%' + inputText + '%" and type = ' + type
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static announceMod(title, classes, content) {
    return new Promise((resolve, reject) => {
      let sql = "insert into `notice` (title,class,content) values (?,?,?)"
      this.query(sql, this.formatParams(title, classes,content)).then((res) => {
        resolve("发布成功")
      }).catch(err => {
        console.log(`发布公告出错:${err.message}`)
        reject("由于网络原因,您的公告并没有发出")
      })

    })
  }

  static getAllNoticeMod(pageNum, currPage) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(pageNum * currPage)
    return new Promise((resolve, reject) => {
      let sql = "select * from notice order by createtime desc LIMIT ?,? "
      this.query(sql, this.formatParams(currPage, pageNum)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })

  }

  static getAllNoticeTotal() {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from notice"
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject("由于网络原因:获取数量失败")
      })
    })
  }

   static getreadNum(n_id) {
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from `read` where n_id= " + n_id
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getreadId(n_id) {
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "select u_id from `read` where n_id= " + n_id
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getreadByidArr(readIdArr) {
    let sql = ""
    for (let i = 0; i < readIdArr.length; i++) {
      if (i == 0)
        sql += "select id,username,head,classes,createtime from `user` where  id=  " + readIdArr[i].u_id
      else
        sql += " or id= " + readIdArr[i].u_id
    }
    // sql+=
    return new Promise((resolve, reject) => {
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static NoticeDetailsMod(n_id) {
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "select * from `notice` where n_id =" + n_id
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static NoticeDetailsTotal(classes) {
    let sql = ""
    let classesArr = classes.split(";")
    for (let i = 0; i < classesArr.length; i++) {
      if (i == 0)
        sql += "select count(1) as count from `user` where classes= '" + classesArr[i] + "'"
      else
        sql += " or classes = '" + classesArr[i] + "'"
    }
    return new Promise((resolve, reject) => {
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(`获取失败${err}`)
        reject(err)
      })
    })

  }

  static getreadTime(n_id) {
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "select u_id,readtime from `read` where n_id= " + n_id
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static delNoticeMod(n_id) {
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "delete from `notice` where n_id= " + n_id
      this.query(sql).then(res => {
        resolve("删除该公告成功")
      }).catch(err => {
        reject("删除该公告失败")
      })
    })
  }

  static delReadMod(n_id) {
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "delete from `read` where n_id =" + n_id
      this.query(sql).then(() => {
        resolve(",该公告的阅读记录删除成功")
      }).catch(() => {
        reject("该公告的阅读记录删除失败")
      })
    })
  }


  static getAllVolunteerByTeacherMod(){
    return new Promise((resolve, reject) => {
      let sql = "select * from `volunteer`"
      this.query(sql).then(res=>{
        resolve(res)
      }).catch(err => {
        reject('请求所有志愿者失败')
      })
    })
  }

  static setVolunteerMod(u_id, u_name, address, group){
    return new Promise((resolve, reject)=>{
      let sql = "update `volunteer` set address = ? , `group` = ? where u_id = ? and u_name =  ? "
      this.query(sql, this.formatParams(address,group,u_id,u_name)).then(res => {
        resolve('志愿者分配成功')
      }).catch(err => {
        reject('志愿者分配失败')
      })
    })
  }

  static getAllStudentsMod(){
    return new Promise((resolve, reject)=>{
      let sql = "select * from `user` where type = 2"
      this.query(sql).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject('获取失败')
      })
    })
  }

  static getAllMaterialMod(){
    return new Promise((resolve, reject)=>{
      let sql = `select * from material`
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject('获取失败')
      })
    })
  }

}

