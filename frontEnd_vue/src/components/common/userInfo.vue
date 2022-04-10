<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>个人信息</span>
          </div>
          <el-table :data="userInfoData" border style="width: 100%">
            <el-table-column prop="username" label="姓名"> </el-table-column>
            <el-table-column prop="classes" label="班级"> </el-table-column>
            <el-table-column prop="sex" label="性别"> </el-table-column>
            <el-table-column prop="address" label="籍贯"> </el-table-column>
            <el-table-column prop="createtime" label="入网时间"> </el-table-column>
            <el-table-column label="身份">
              <template slot-scope="scope">{{
                scope.row.type | type
              }}</template>
            </el-table-column>
          </el-table>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card
                style="
                  width: 80%;
                  position: relative;
                  left: 50%;
                  transform: translateX(-50%);
                "
              >
                <div slot="header" class="clearfix" style="text-align: center">
                  <span>修改头像</span>
                </div>
                <el-upload
                  class="avatar-uploader"
                  :action="iconUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                style="
                  width: 80%;
                  position: relative;
                  left: 50%;
                  transform: translateX(-50%);
                "
              >
                <div slot="header" class="clearfix" style="text-align: center">
                  <span>修改密码</span>
                </div>
                <div style="text-align: center">
                  <el-input
                    prefix-icon="el-icon-lock"
                    placeholder="请输入旧密码"
                    v-model="old_pwd"
                    show-password
                    style="margin-top: 10px"
                  ></el-input>
                  <el-input
                    prefix-icon="el-icon-lock"
                    placeholder="请输入新密码"
                    v-model="new_pwd1"
                    show-password
                    style="margin-top: 10px"
                  ></el-input>
                  <el-input
                    prefix-icon="el-icon-lock"
                    placeholder="请再输入密码"
                    v-model="new_pwd2"
                    show-password
                    style="margin-top: 10px"
                  ></el-input>
                  <el-button
                    type="primary"
                    style="margin-top: 10px"
                    @click="repwd"
                    >提交修改</el-button
                  >
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserDataByToken, upPwdRequest } from "@/api/request";
import { baseURL } from "@/api/config";
import { formatTime } from '@/api/utils';
export default {
  data() {
    return {
      old_pwd: "",
      new_pwd1: "",
      new_pwd2: "",
      userInfoData: [],
      imageUrl: "",
      imgPath: baseURL + "/file/",
      iconUrl: "",
    };
  },
  created() {
    getUserDataByToken().then((res) => {
      this.userInfoData.push({...res, createtime: formatTime(res.createtime)});
    });
    let token = window.localStorage.token;
    this.iconUrl = baseURL + `/users/upicon?token=${token}`;
  },
  filters: {
    type(i) {
      if (i == 2) {
        return "学生";
      }
      if (i == 3) {
        return "教师";
      }
    },
  },
  methods: {
    /**
     * 修改密码调用(需要补充格式验证)
     */
    repwd() {
      let reg = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/;
      if (this.new_pwd1 == this.new_pwd2) {
        if (reg.test(this.new_pwd1)) {
          this.$confirm("提交本次修改, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.upPwd();
            })
            .catch(() => {
              this.$message.info("已取消提交");
            });
        } else this.$message.warning("密码至少8位数,并且需要字母与数字混合");
      } else this.$message.warning("输入的两次密码不一致");
    },
    /**
     * 修改密码函数
     */
    upPwd() {
      upPwdRequest({
        oldpassword: this.old_pwd,
        newpassword: this.new_pwd1,
      }).then((res) => {
        if (res == "密码修改成功") {
          this.$message.success(res);
          this.$nextTick(function () {
            this.old_pwd = "";
            this.new_pwd1 = "";
            this.new_pwd2 = "";
          });
        } else {
          this.$message.error(res);
          this.$nextTick(function () {
            this.old_pwd = "";
            this.new_pwd1 = "";
            this.new_pwd2 = "";
          });
        }
      });
    },

    handleAvatarSuccess(res, file) {
      this.$message.success("头像修改成功,待下次登陆更换显示");
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
