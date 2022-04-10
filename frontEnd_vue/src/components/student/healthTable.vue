<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>健康信息上报</span>
          </div>
          <el-table :data="userDataList" border style="width: 100%">
            <el-table-column prop="username" label="姓名"> </el-table-column>
            <el-table-column prop="classes" label="班级"> </el-table-column>
            <el-table-column prop="id" label="学号"> </el-table-column>
          </el-table>
        </el-card>
        <el-divider></el-divider>

        <el-card v-if="!healthShow">
          <div slot="header" style="text-align: center">
            <span>今日检测情况</span>
          </div>
          <el-alert title="今日申请表提交成功" type="success" center show-icon>
          </el-alert>
          <el-table :data="subFromData" border style="width: 100%">
            <el-table-column prop="temperature" label="当前体温">
            </el-table-column>
            <el-table-column prop="isHot" label="是否发热、咳嗽">
            </el-table-column>
            <el-table-column prop="isLeave" label="是否离开过学校">
            </el-table-column>
            <el-table-column prop="PCR" label="核酸检测是否为阴性">
            </el-table-column>
          </el-table>
        </el-card>

        <el-card v-else-if="healthShow">
          <el-form ref="form" :model="healthForm" label-width="150px">
            <el-form-item label="当前体温">
              <el-input v-model="healthForm.temp" style="width: 130px"></el-input>
            </el-form-item>
            <el-form-item label="是否发热、咳嗽">
              <el-radio-group v-model="healthForm.isHot">
                <el-radio label="否"></el-radio>
                <el-radio label="是"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否离开过学校">
              <el-radio-group v-model="healthForm.isLeave">
                <el-radio label="否"></el-radio>
                <el-radio label="是"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="核酸检测是否为阴性">
              <el-radio-group v-model="healthForm.PCR">
                <el-radio label="否"></el-radio>
                <el-radio label="是"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="popUp">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getUserDataByToken,
  getHealthNowDayByidRequest,
  setHealthRequest,
} from "@/api/request";
import { formatID } from '@/api/utils';
export default {
  data() {
    return {
      healthShow: true, //健康表单显示/隐藏
      userDataList: [], //用户数据
      subFromData: [], //提交的表单数据
      healthForm: {
        temp: "",
        isHot: "",
        isLeave: "",
        PCR:"",
      },
    };
  },
  created() {
    getUserDataByToken()
      .then((res) => {
        this.userDataList.push({
          ...res,
          id:formatID(res.id)
        });
      })
      .catch((err) => console.log(err));
    this.getNowDay();
  },
  methods: {
    /**
     * 获取当天某用户报表并且决定是否允许填写
     */
    getNowDay() {
      getHealthNowDayByidRequest().then((res) => {
        if (res.length == 0) this.healthShow = true;
        else {
          this.healthShow = false;
          this.subFromData.push(res[0]);
        }
      });
    },
    /**
     * 提交健康表单
     */
    onSubmit() {
      if (
        !this.healthForm.temp ||
        !this.healthForm.isHot ||
        !this.healthForm.isLeave ||
        !this.healthForm.PCR
      )
        this.$message.warning("填报表不可留空");
      else {
        let reg =
          /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
        let tempBool = reg.test(this.healthForm.temp);
        if (!tempBool) this.$message.warning("体温请输入数字");
        else {
          setHealthRequest({
            temperature: this.healthForm.temp,
            isHot: this.healthForm.isHot,
            isLeave: this.healthForm.isLeave,
            PCR:this.healthForm.PCR
          }).then((res) => {
            this.$message({
              type: "success",
              message: "提交成功",
            });
            if (res.length != 0) {
              this.getNowDay();
            }
          });
        }
      }
    },
    /**
     * 提交健康表单弹窗
     */
    popUp() {
      this.$confirm("提交健康报表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.onSubmit();
        })
        .catch(() => {
          this.$message.info("已取消提交");
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
