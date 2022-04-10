<template>
  <div>
    <el-row>
      <el-col>
        <el-card style="margin-bottom: 10px">
          <div slot="header" class="clearfix" style="text-align: left">
            <span>查询学生健康信息</span>
          </div>
          <el-select
            v-model="queryType"
            placeholder="请选择查询类型"
            style="width: 20%; margin-right: 10px"
          >
            <el-option label="班级" value="u_classes"></el-option>
            <el-option label="学号" value="u_id"></el-option>
            <el-option label="姓名" value="u_name"></el-option>
            <el-option label="体温高于37.2℃" value="q_tempHigh"></el-option>
          </el-select>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="queryContent"
            style="width: 20%"
          >
          </el-input>
          <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="searchStu"
            >搜索</el-button
          >
          <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="resetValuse"
            >重置</el-button
          >
        </el-card>
        <el-card v-if="!stuHealthShow">
          <div slot="header" class="clearfix" style="text-align: center">
            <span>学生健康管理</span>
          </div>
          <el-table :data="stuList" border style="width: 100%">
            <el-table-column prop="u_id" label="学号"> </el-table-column>
            <el-table-column prop="u_classes" label="班级"> </el-table-column>
            <el-table-column prop="u_name" label="姓名"> </el-table-column>
            <el-table-column prop="temperature" label="今日体温">
            </el-table-column>
            <el-table-column prop="PCR" label="今日核酸是否为阴性">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="selectUserHealth(scope.$index, scope.row)"
                >
                  查看健康信息
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card v-else-if="stuHealthShow">
          <div slot="header" class="clearfix" style="text-align: center">
            <span>{{stuHealthData[0].u_name}}的个人健康填报信息</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="closeHealth"
              >关闭</el-button
            >
          </div>
          <el-table :data="stuHealthData" border style="width: 100%">
            <el-table-column prop="createtime" label="填报时间"> </el-table-column>
            <el-table-column prop="temperature" label="体温"> </el-table-column>
            <el-table-column prop="isHot" label="是否发热"> </el-table-column>
            <el-table-column prop="PCR" label="核酸检测"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getHealthNowDayRequest,
  getHealthByIdRequest,
  getStuHealthByTypeRequest,
  getStuHealthByTempRequest
} from "@/api/request";
import { formatID, formatTime } from '@/api/utils';
export default {
  name: "stuHealth",
  data() {
    return {
      stuList: [], //今日学生健康信息
      queryType: "", //查询类型（班级/学号/体温）
      queryContent: "", //查询内容
      stuHealthShow: false,
      stuHealthData: [], //学生个人健康信息
    };
  },
  created() {
    this.getAllHealthToday()
  },
  methods: {
    /**
     * 获取今日所有已填报健康信息的学生信息
     */
    getAllHealthToday() {
      getHealthNowDayRequest().then((res) => {
        this.stuList = res.map((item) => {
          return {
            ...item,
            u_id: formatID(item.u_id),
          };
        });
      });
    },

    /**
     * 查询
     */
    searchStu() {
      if(this.queryType === 'q_tempHigh'){
        this.searchByTemp()
      }else{
        if(!this.queryContent) this.$message.warning("请输入要搜索的内容")
        else this.searchByType()
      }
    },

    /**
     * 通过类型查询
     */
    searchByType(){
      getStuHealthByTypeRequest({
        queryType: this.queryType,
        queryContent: this.queryContent,
      })
        .then((res) => {
          this.stuList = res.map((item) => {
            return {
              ...item,
              u_id: formatID(item.u_id),
            };
          });
        })
        .catch((err) => this.$message.error(err));
    },

    /**
     * 通过体温查询
     */
    searchByTemp(){
      getStuHealthByTempRequest().then(res => {
        this.stuList = res.map((item) => {
            return {
              ...item,
              u_id: formatID(item.u_id),
            };
          });
      }).catch(err => this.$message.error(err))
    },

    /**
     * 重置
     */
    resetValuse() {
      this.getAllHealthToday()
      this.queryType = '';
      this.queryContent = '';
    },
    /**
     * 查看学生个人的所有健康信息
     */
    selectUserHealth(_, row) {
      getHealthByIdRequest({
        u_id: row.u_id,
      }).then((res) => {
        this.stuHealthData = res.map(item => {
          return {
            ...item,
            createtime: formatTime(item.createtime)
          }
        });
        this.stuHealthShow = true;
      });
    },
    //关闭学生个人的所有健康信息
    closeHealth() {
      this.stuHealthShow = false;
    },
  },
};
</script>

<style>
</style>