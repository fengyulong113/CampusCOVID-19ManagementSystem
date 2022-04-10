<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card v-if="!isVolun">
          <div slot="header" class="clearfix" style="text-align: center">
            <span>志愿者报名</span>
          </div>
          <div style="text-align: center">
            <el-button type="primary" @click="enterVolun">报名</el-button>
          </div>
        </el-card>
        <el-card v-else-if="isVolun">
          <el-alert title="已报名志愿者" type="success" center show-icon>
          </el-alert>
          <el-table :data="userVolun" border style="width: 100%">
            <el-table-column prop="u_id" label="学号"> </el-table-column>
            <el-table-column prop="u_name" label="姓名"> </el-table-column>
            <el-table-column prop="address" label="分配地点"> </el-table-column>
            <el-table-column prop="group" label="分配小组"> </el-table-column>
            <el-table-column prop="createtime" label="报名时间">
            </el-table-column>
          </el-table>
        </el-card>
        <el-divider></el-divider>
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>志愿者名单</span>
          </div>
          <el-table
            :data="volunteerList"
            style="width: 100%"
            :default-sort="{ prop: 'createtime', order: 'descending' }"
          >
            <el-table-column
              prop="createtime"
              label="报名日期"
              sortable
              width="230"
            >
            </el-table-column>
            <el-table-column prop="u_id" label="学号" sortable width="230">
            </el-table-column>
            <el-table-column prop="u_name" label="姓名" sortable width="230">
            </el-table-column>
            <el-table-column
              prop="address"
              label="分配地点"
              sortable
              width="230"
            >
            </el-table-column>
            <el-table-column prop="group" label="分配小组" sortable width="230">
            </el-table-column>
          </el-table>

          <div class="block" style="text-align: center; margin-top: 20px">
            <el-pagination layout="prev, pager, next" :total="50">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getUserDataByToken,
  getHealthNowDayByidRequest,
  getEnterVolunteerRequset,
  getAllVolunteerRequest,
  getVolunteerByIdRequest,
} from "@/api/request";
import { formatID, formatYear } from "@/api/utils";
export default {
  name: "volunteer",
  data() {
    return {
      userInfo: "", //用户个人信息
      volunteerList: [], //所有志愿者列表
      isVolun: false, //志愿者报名显示/隐藏
      userVolun: [], //志愿者信息
    };
  },
  created() {
    getUserDataByToken().then((res) => {
      this.userInfo = res;
    });
    getAllVolunteerRequest().then((res) => {
      res.forEach((item) => {
        if (this.userInfo.id === item.u_id) {
          this.$nextTick(function () {
            this.isVolun = true;
          });
        }
      });
      this.volunteerList = res.map((item) => {
        return {
          ...item,
          createtime: formatYear(item.createtime),
          u_id: formatID(item.u_id),
        };
      });
    });
    getVolunteerByIdRequest().then((res) => {
      console.log(res);
      this.userVolun = res.map((item) => {
        return {
          ...item,
          createtime: formatYear(item.createtime),
          u_id: formatID(item.u_id),
        };
      });
    });
  },
  methods: {
    //报名志愿者
    enterVolun() {
      getHealthNowDayByidRequest().then((res) => {
        if (!res.length) {
          this.$message.warning("你今天还未完成健康填报，请先完成健康填报");
        }
        if (res[0].PCR === "否") {
          this.$message.error("抱歉，你当前不能报名志愿者");
        }
        this.$confirm("是否确认报名志愿者?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            getEnterVolunteerRequset()
              .then(() => {
                this.$message.success("报名成功!请等待老师与你联系");
              })
              .catch((err) => {
                this.$message.warning("你已经完成志愿者报名，请勿重复提交");
              });
          })
          .catch(() => {
            this.$message.info("已取消");
          });
      });
    },
  },
};
</script>

<style>
</style>