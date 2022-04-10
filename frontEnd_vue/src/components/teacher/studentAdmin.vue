<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>搜索</span>
          </div>
          <el-select
            v-model="queryType"
            placeholder="请选择查询类型"
            style="width: 20%; margin-right: 10px"
          >
            <el-option label="学号" value="id"></el-option>
            <el-option label="姓名" value="username"></el-option>
            <el-option label="籍贯" value="address"></el-option>
            <el-option label="班级" value="classes"></el-option>
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
          <el-button
            type="primary"
            size="small"
            style="float: right"
            v-show="!excelShow"
            color="#F56C6C"
            @click="excelShow = !excelShow"
            ><i class="el-icon-upload el-icon--left"></i>上传
          </el-button>
        </el-card>
        <transition name="el-zoom-in-top">
          <el-card class="box-card" v-show="excelShow" style="margin-top: 10px">
            <div slot="header" class="clearfix" style="text-align: center">
              <span>上传excel表格（.xlsx）</span>
            </div>
            <div class="transition-box" style="display: flex; margin-top: 40px">
              <el-upload
                ref="uploadRef"
                class="upload-demo"
                drag
                :action="filePath"
                multiple
                style="margin: auto"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div
                  class="el-upload__tip"
                  slot="tip"
                  style="text-align: center"
                >
                  文件上传速度跟当前环境有关，请耐心等待
                  <el-row :gutter="20" style="margin-top: 10px">
                    <el-col :span="12">
                      <el-button
                        size="small"
                        @click="excelShow = !excelShow"
                        style="width: 100%"
                        >关闭
                      </el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button
                        size="small"
                        type="primary"
                        @click="importxlsx"
                        style="width: 100%"
                        >导入
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-upload>
            </div>
          </el-card>
        </transition>

        <el-card
          style="margin-top: 20px; margin-bottom: 5rem"
          v-if="stuShow == false"
        >
          <div slot="header" class="clearfix" style="text-align: center">
            <span>学生名单</span>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" sortable label="学号"> </el-table-column>
            <el-table-column prop="username" label="姓名"> </el-table-column>
            <el-table-column prop="sex" label="性别"> </el-table-column>
            <el-table-column prop="address" label="生源地"> </el-table-column>
            <el-table-column prop="classes" label="班级"> </el-table-column>
            <el-table-column label="类型"> 学生 </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="removeOne(scope.$index, scope.row)"
                >
                  删除
                </el-button>
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="fixUserInfo(scope.$index, scope.row)"
                >
                  编辑
                </el-button>
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
              :total="UserSize"
            >
            </el-pagination>
          </div>
        </el-card>
        <el-card style="margin-top: 20px" v-else-if="stuShow == true">
          <el-page-header @back="goBack" content="详情页面"> </el-page-header>
          <br />
          <el-form
            ref="form"
            v-model="formDetails"
            label-width="80px"
            style="width: 50%"
          >
            <el-form-item label="姓名">
              <el-input
                v-model="formDetails.name"
                style="width: 40%"
                :placeholder="user.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="formDetails.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="籍贯">
              <el-input
                v-model="formDetails.address"
                style="width: 40%"
                
                :placeholder="user.address"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateSub">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getUsersByTypeAndCharRequest,
  getUsersByTypePageRequest,
  setXlsxDataRequset,
  upUserdataRequest,
  delUserdataRequest
} from "@/api/request";
import { baseURL } from "@/api/config";
import { formatID } from '@/api/utils';
export default {
  data() {
    return {
      filePath: baseURL + "/upload/upload", // 上传路径
      formDetails: {
        //学生详情表单
        name: "",
        sex: "",
        address: "",
        type: "",
      },
      queryType: "", //查询类型
      queryContent: "", //查询内容
      stuShow: false, //学生详情显示/隐藏
      excelShow: false, //excel表格上传显示/隐藏
      tableData: [], //学生名单数据
      user: "", //某个用户
      userType: "", //用户类型
      UserSize: 0,
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
    };
  },

  created() {
    // 加载获取学生信息
    this.getUsers(this.pageSize, this.pageNo);
  },
  methods: {
    /**
     * 分页搜索学生信息
     * */
    searchStu() {
      if (!this.queryContent)
        this.$message.warning("请输入要搜索的关键字!!!!!!");
      else {
        getUsersByTypeAndCharRequest({
          type: 2,
          inputText: this.queryContent,
          CharType: this.queryType,
          pageNum: this.pageSize,
          currPage: this.pageNo - 1,
        })
          .then((res) => {
            this.UserSize = res.total;
            this.tableData = res.data.map((item) => {
              return {
                ...item,
                id: formatID(item.id),
              };
            });
          })
          .catch((err) => console.log(err));
      }
    },

    /**
     * 重置
     */
    resetValuse() {
      this.getUsers(this.pageSize, this.pageNo);
      this.queryContent = "";
      this.queryType = "";
    },

    /**
     * 导入文件操作
     */
    importxlsx() {
      if (this.$refs.uploadRef.uploadFiles.length == 0)
        this.$message.warning("请选择要导入的文件");
      else {
        this.$confirm("将文件导入,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            setXlsxDataRequset().then(res => {
              this.$message.success(res)
            }).catch(err => this.$message.error(err))
          })
          .catch(() => {
            this.$message.info("文件导入已经取消");
          });
        this.getUsers(this.pageSize, this.pageNo);
      }
    },

    /**
     * 获取学生列表(分页)
     */
    getUsers(pageNum, currPage) {
      getUsersByTypePageRequest({
        type: 2,
        pageNum: pageNum,
        currPage: currPage - 1,
      }).then((res) => {
        this.UserSize = res.total;
        this.tableData = res.data.map((item) => {
          return {
            ...item,
            id: formatID(item.id),
          };
        });
      });
    },

    /**
     * 学生信息编辑
     */
    fixUserInfo(_, row) {
      this.stuShow = true;
      this.user = row;
      this.formDetails.sex = row.sex;
      this.formDetails.name = "";
      this.formDetails.address = "";
      if (row.type == 2) {
        this.formDetails.type = "学生";
      }
      if (row.type == 3) {
        this.formDetails.type = "教师";
      }
    },

    /**
     * 返回列表
     */
    goBack() {
      this.stuShow = false;
    },

    /**
     * 提交修改
     */
    updateSub() {
      if (
        !this.formDetails.name ||
        !this.formDetails.sex ||
        !this.formDetails.address ||
        !this.formDetails.type
      ) {
        this.$message.warning("不可为空");
      } else {
        if (this.formDetails.type == "学生") this.userType = 2;
        if (this.formDetails.type == "教师") this.userType = 3;
        upUserdataRequest({
          u_id: this.user.id,
          username: this.formDetails.name,
          sex: this.formDetails.sex,
          address: this.formDetails.address,
        }).then(res => {
          this.$message.success(res);
          this.stuShow = false;
          this.getUsers(this.pageSize, this.pageNo);
        }).catch(err => this.$message.error(err))
      }
    },

    /**
     * 删除弹窗操作
     * */
    removeOne(index, row) {
      this.$confirm("此操作将继续, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del(index, row);
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    /**
     * 删除学生信息
     * */
    del(_, row) {
      delUserdataRequest({ u_id: row.id }).then(res => {
        this.getUsers(this.pageSize, this.pageNo);
      }).catch(err => console.log(err))
    },

    /**
     * 分页
     */
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.queryContent && this.queryType) {
        this.searchStu();
      } else {
        this.getUsers(this.pageSize, this.pageNo);
      }
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      if (this.queryContent && this.queryType) {
        this.searchStu();
      } else {
        this.getUsers(this.pageSize, this.pageNo);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
