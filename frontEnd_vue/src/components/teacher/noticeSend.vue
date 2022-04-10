<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header" style="text-align: center">
            <span>填写通知</span>
          </div>
          <div class="writeNotice">
            <div style="margin: auto 0">
              <span>通知主题：</span><br>
              <el-input v-model="theme" placeholder="主题" style="width:188px"></el-input>
            </div>

            <div style="margin: auto 0">
              <span>选择发布通知的班级：</span><br>
              <el-select
                v-model="selectClass"
                multiple
                placeholder="班级（多选）"
              >
                <el-option
                  v-for="item in options"
                  :key="item.c_id"
                  :label="item.c_class"
                  :value="item.c_class"
                >
                </el-option>
              </el-select>
            </div>

            <div style="margin: auto 0">
              <span>通知内容：</span><br>
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="content"
                style="width:500px"
              >
              </el-input>
            </div>

            <div style="margin: auto 0">
              <el-button type="primary" @click="noticeSend">发布</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="24">
        <el-card v-if="!show" shadow="hover">
          <div slot="header" class="clearfix" style="text-align: center">
            <span>通知详情查看</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="cls"
              >关闭</el-button
            >
          </div>
          <el-table :data="notcieData" border style="width: 100%">
            <el-table-column prop="title" label="主题"> </el-table-column>
            <el-table-column prop="class" label="通知的班级"> </el-table-column>
            <el-table-column prop="createtime" label="发布时间"> </el-table-column>
          </el-table>
          <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="8">
              <el-card style="height: 300px" shadow="hover">
                <ve-pie
                  :data="chartData"
                  :settings="Settings"
                  :legend-visible="false"
                >
                </ve-pie>
              </el-card>
            </el-col>
            <el-col :span="16">
              <el-card shadow="hover">
                <div slot="header" class="clearfix" style="text-align: center">
                  <span>访问的用户</span>
                </div>
                <el-row
                  :gutter="20"
                  style="overflow-y: scroll; height: 12.5rem"
                >
                  <el-col
                    :span="4"
                    v-for="item in users"
                    :key="item.id"
                    class="ca"
                    style="margin-bottom: 3rem; margin-top: 0.7rem"
                  >
                    <el-tooltip placement="top">
                      <div slot="content">
                        阅读时间：{{ item.readtime }}
                      </div>
                      <el-card
                        shadow="hover"
                        :body-style="{ padding: '0px' }"
                        style="min-height: 11rem"
                        class="imgcar"
                      >
                        <div style="width: 100%; height: 6rem">
                          <img
                            :src="imgPath + item.head"
                            style="width: 100%; height: 100%; object-fit: cover"
                          />
                        </div>
                        <div
                          style="
                            margin-top: 0.8rem;
                            padding-left: 0.8rem;
                            padding-right: 0.8rem;
                            margin-bottom: 1rem;
                            height: 5rem;
                            margin-bottom: 5px;
                            overflow-y: scroll;
                          "
                        >
                          <span>{{ item.username }}</span>
                          <div
                            class="bottom clearfix"
                            style="height: 3rem; overflow: hidden"
                          >
                            <time class="time">{{ item.classes }}</time>
                          </div>
                        </div>
                      </el-card>
                    </el-tooltip>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-else-if="show" shadow="hover">
          <div slot="header" style="text-align: center">
            <span>已发布的通知</span>
          </div>
          <el-table
            :data="allNoticeData"
            border
            :default-sort="{ prop: 'n_id', order: 'descending' }"
            style="width: 100%"
          >
            <el-table-column prop="n_id" sortable label="序列号">
            </el-table-column>
            <el-table-column prop="title" label="主题"></el-table-column>
            <el-table-column prop="createtime" label="发布时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="removeOne(scope.$index, scope.row)"
                  >删除</el-button
                >
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="selectNoticeDetail(scope.$index, scope.row)"
                  >查看详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align: center; margin-top: 20px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="allNoticeNum"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getAllNoticeRequest,
  announceRequest,
  NoticeDetailsRequest,
  delNoticeRequest,
} from "@/api/request";
import { baseURL } from "@/api/config";
import { classes, formatTime } from '@/api/utils';
export default {
  data() {
    return {
      Settings: {
        offsetY: 120,
        radius: 50,
        itemStyle: {
          center: ["20%", "10%"],
        },
        label: {
          normal: {
            fontSize: 16,
            formatter: "{b}" + "\n\r" + "{c}" + "\n\r" + "({d}%)",
          },
        },
      },
      imgPath: baseURL + "/file/",
      show: true,
      theme: "", //通知主题
      content:'', //通知的内容
      options: classes, //班级默认值
      selectClass: "", //选择的班级
      allNoticeNum: 0, //所有已发布的通知数量
      allNoticeData: [], //所有已发布的通知
      notcieData: [], //某条通知数据
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      users: [], //读取通知的用户
      readtime: [], //读取通知的时间
      chartData: {
        columns: ["类型", "用户"],
        rows: [],
      },
    };
  },
  created() {
    this.getAllNotice(this.pageSize, this.pageNo);
  },
  methods: {
    /**
     * 发布通知
     */
    noticeSend() {
      if (this.selectClass.length == 0 || !this.theme) {
        this.$message.warning("输入不可为空,请输入内容再发布");
      } else {
        let s = this.selectClass.join(";");
        announceRequest({
          title: this.theme,
          content: this.content,
          classes: s,
        })
          .then((res) => {
            this.$message.success(res || "恭喜你，这是一条成功消息");
            this.getAllNotice(this.pageSize, this.pageNo);
            this.theme = "";
            this.selectClass = "";
            this.content = ''
          })
          .catch((err) => this.$message.error(err));
      }
    },

    /**
     * 查看通知详情
     * */
    selectNoticeDetail(_, row) {
      NoticeDetailsRequest({
        n_id: row.n_id,
      })
        .then((res) => {
          this.notcieData = res.data.map(item => {
            return {
              ...item,
              createtime: formatTime(item.createtime)
            }
          })
          this.users = res.users.map(item=> {
            return {
              ...item,
              readtime: formatTime(item.readtime)
            }
          });
          this.readtime = res.idAndtime;
          this.chartData.rows.push(
            { 类型: "已读", 用户: res.readNum },
            { 类型: "未读", 用户: res.total - res.readNum }
          );
          this.show = false;
        })
        .catch((err) => console.log(err));
    },

    /**
     * 删除通知
     * */
    removeOne(index, row) {
      this.$confirm("此操作将继续, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delNotice(index, row);
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    delNotice(_, row) {
      delNoticeRequest({
        n_id: row.n_id,
      })
        .then(() => {
          this.getAllNotice(this.pageSize, this.pageNo);
        })
        .catch((err) => console.log(err));
    },

    /**
     * 分页获取所有通知
     */
    getAllNotice(pageNum, currPage) {
      getAllNoticeRequest({
        pageNum: pageNum,
        currPage: currPage - 1,
      })
        .then((res) => {
          this.allNoticeData = res.data.map(item => {
            return {
              ...item,
              createtime: formatTime(item.createtime)
            }
          });
          this.allNoticeNum = res.total;
        })
        .catch((err) => console.log(err));
    },

    //关闭通知详情
    cls() {
      this.chartData.rows = [];
      this.show = true;
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAllNotice(this.pageSize, this.pageNo);
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getAllNotice(this.pageSize, this.pageNo);
    },
  },
};
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  display: none;
}
.writeNotice{
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex:1;
}
.writeNotice div{
  margin: 5px 0;
}
.imgcar {
  min-height: 11rem;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 40px;
  height: 40px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>