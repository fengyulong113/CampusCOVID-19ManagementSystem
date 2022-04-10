<template>
  <div>
    <el-row>
      <el-col>
        <el-card style="margin-bottom: 10px">
          <div class="clearfix" style="text-align: center">
            <span>物资管理</span>
          </div>
        </el-card>
        <el-card v-if="!showMate">
          <div slot="header" class="clearfix" style="text-align: center">
            <span>物资申请表</span>
          </div>
          <el-table :data="materialList" border style="width: 100%">
            <el-table-column
              prop="createtime"
              label="申请时间"
            ></el-table-column>
            <el-table-column prop="delivery" label="是否急需"></el-table-column>
            <el-table-column prop="apart" label="申请地点"></el-table-column>
            <el-table-column prop="dorm" label="寝室号"></el-table-column>
            <el-table-column prop="mask" label="所需口罩数量"></el-table-column>
            <el-table-column prop="disi" label="所需消毒水数量"></el-table-column>
            <el-table-column prop="water" label="是否需要饮用水"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatTime } from '@/api/utils'
import { getAllMaterialRequest } from "@/api/request";
export default {
  name: "matetialAdmin",
  data() {
    return {
      materialList: [], //物资申请表
      showMate: false, //查看物资详情
      materialDetails: [], //申请详情
    };
  },
  created() {
    this.materialApply();
  },
  methods: {
    /**
     * 获取物资申请
     */
    materialApply() {
      getAllMaterialRequest()
        .then((res) => {
          this.materialList = res.map(item =>{
            return {
              ...item,
              createtime:formatTime(item.createtime),
              delivery:item.delivery === 1 ? '是' : '否',
              water: item.water === 1 ? '是' : '否'
            }
          })
        })
        .catch((err) => this.$message.error(err));
    },
  },
};
</script>

<style>
</style>