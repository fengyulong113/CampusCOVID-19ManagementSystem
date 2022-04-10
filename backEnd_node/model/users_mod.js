
const tools = require('../utils/tools')

module.exports = class users_mod extends require('./model') {

  static LoginUser(username, password, type) {
    type = Number(type)
    return new Promise((resolve, reject) => {
      let sql = "select * from user where binary username='" + username + "' and password='" + password + "' and type= " + type
      console.log(sql)
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject('登录失败')
      })
    })
  }

  static getUsersByTypePageMod(type, currPage, pageNum) {
    pageNum = Number(pageNum);
    currPage = Number(currPage);
    currPage = Number(currPage * pageNum)
    return new Promise((resolve, reject) => {
      let sql = 'select * from user where type = ' + type + ' order by modifytime desc LIMIT ?,?'
      this.query(sql, this.formatParams(currPage, pageNum)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getAllUserX() {
    return new Promise((resolve, reject) => {
      let sql = 'select * from user '
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static inXlsxData(inXlsxArr) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < inXlsxArr.length; i++) {
        let sql = "insert into user (id,username,password,head,address,sex,classes,type) values(" + inXlsxArr[i].id + ", '" + inXlsxArr[i].username + "' , '" + inXlsxArr[i].password + "', '" + inXlsxArr[i].head + "'," +
          "'" + inXlsxArr[i].address + "', '" + inXlsxArr[i].sex + "', '" + inXlsxArr[i].classes + "', '" + inXlsxArr[i].type + "')"
        this.query(sql).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }

  static getUsersByTypePageTotal(type) {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from user where type = " + type
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static delUserdataMod(id) {
    return new Promise((resolve, reject) => {
      let sql = "delete from user where id = " + id
      console.log(sql)
      this.query(sql).then(res => {
        resolve("删除用户表用户成功")
      }).catch(err => {
        reject("删除用户表用户失败")
      })
    })
  }

  static delRead(id) {
    return new Promise((resolve, reject) => {
      let sql = "delete from `read` where u_id = " + id
      console.log(sql)
      this.query(sql).then(res => {
        resolve(".删除阅读表用户成功")
      }).catch(err => {
        reject(",删除阅读表用户失败")
      })
    })
  }

  static upUserdataMod(u_id, username, sex, address) {
    let currTime = tools.getDate19()
    return new Promise((resolve, reject) => {
      let sql = "update `user` set username= '" + username + "', sex='" + sex + "' , address='" + address + "' , modifytime= '" + currTime + "' where id=" + u_id
      this.query(sql).then(res => {
        resolve("更新成功")
      }).catch(err => {
        reject("可能是因为网络不好,更新失败")
      })

    })
  }

  static upPwdMod(u_id, oldpassword, newpassword) {
    return new Promise((resolve, reject) => {
      let sql = 'update `user` set password = ? where password = ? and id = ?'
      this.query(sql, this.formatParams(newpassword, oldpassword, u_id)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static upUserHeadMod(head_imgUrl, u_id) {
    return new Promise((resolve, reject) => {
      let sql = "update `user` set head= '" + head_imgUrl + "' where id = " + u_id
      this.query(sql).then(res => {
        resolve("上传成功")
      }).catch(err => {
        reject(err)
      })
    })
  }
}