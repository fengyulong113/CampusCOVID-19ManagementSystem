<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>我的通知</span>
          </div>

          <el-table
            :data="allNoticeData"
            border
            :default-sort="{ prop: 'date', order: 'descending' }"
            style="width: 100%"
          >
            <el-table-column prop="createtime" label="发布时间"></el-table-column>
            <el-table-column prop="title" label="主题"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="readType" label="状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="readN(scope.$index, scope.row)"
                >
                  未读
                </el-button>
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="readY(scope.$index, scope.row)"
                >
                  已读
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="block" style="text-align: center; margin-top: 20px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20, 25]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="noticeNum"
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
  getNoticeRequest,
  getNoticeReadRequest,
  goUnreadRequest,
  goReadRequest,
} from "@/api/request";
import { formatTime } from '@/api/utils';
export default {
  data() {
    return {
      noticeNum: 0, //通知总数
      allNoticeData: [], //获取的所有通知
      currentPage: 1,
      pageSize: 5,
      pageNo: 1,
    };
  },
  created() {
    this.getAllNotice(this.pageSize, this.pageNo);
  },
  methods: {
    /**
     * 我的通知分页获取数据与数量
     * */
    getAllNotice(pageNum, currPage) {
      getNoticeRequest({ pageNum: pageNum, currPage: currPage - 1 })
        .then((res) => {
          this.noticeNum = res.total;
          res.data.forEach((v) => {
            v.readType = "未读";
          });
          this.allNoticeData = res.data.map(item => {
            return {
              ...item,
              createtime: formatTime(item.createtime)
            }
          });
          this.getRead();
        })
        .catch((err) => console.log(err));
    },
    /**
     * 获取的我通知已读列表(供已读未读状态渲染)
     */
    getRead() {
      getNoticeReadRequest()
        .then((res) => {
          res.forEach((item) => {
            let val = item.n_id;
            this.allNoticeData.forEach((value) => {
              if (val === value.n_id) {
                value.readType = "已读";
              }
            });
          });
        })
        .catch((err) => console.log(err));
    },
    /**
     * 已读与未读转换
     * @param index
     * @param row
     */
    readN(_, row) {
      goUnreadRequest({ n_id: row.n_id })
        .then((res) => {
          this.$message.success("已修改为未读");
          this.getAllNotice(this.pageSize, this.pageNo);
        })
        .catch((err) => console.log(err));
    },
    readY(_, row) {
      goReadRequest({ n_id:row.n_id })
        .then((res) => {
          this.getRead();
          this.$message.success("已修改为已读");
        })
        .catch((err) => console.log(err));
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

<style scoped>
</style>
