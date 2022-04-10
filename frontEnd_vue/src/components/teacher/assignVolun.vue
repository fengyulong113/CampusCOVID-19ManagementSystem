<template>
  <div>
    <el-row>
      <el-col>
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>已报名志愿者名单</span>
          </div>
          <el-table
            :data="volunteerListNo"
            border
            :default-sort="{ prop: 'u_id', order: 'descending' }"
            style="width: 100%"
          >
            <el-table-column
              prop="createtime"
              sortable
              label="报名时间"
            ></el-table-column>
            <el-table-column prop="u_id" label="学号"></el-table-column>
            <el-table-column prop="u_name" label="姓名"> </el-table-column>
            <el-table-column label="操作" :width="500">
              <template slot-scope="scope">
                <el-select
                  v-model="group"
                  placeholder="选择小组"
                  style="margin-left: 10px; width: 150px"
                >
                  <el-option
                    v-for="item in groups"
                    :key="item.g_id"
                    :label="item.g_name"
                    :value="item.g_name"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="address"
                  placeholder="选择地点"
                  style="margin-left: 10px"
                >
                  <el-option
                    v-for="item in places"
                    :key="item.p_id"
                    :label="item.p_name"
                    :value="item.p_name"
                  >
                  </el-option>
                </el-select>
                <el-button
                  style="margin: 10px 0 0 20px"
                  type="primary"
                  @click="allotVolunteer(scope.$index, scope.row)"
                  >确定</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-divider></el-divider>
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>现有志愿者</span>
          </div>
          <el-table
            :data="allVolunteer"
            border
            :default-sort="{ prop: 'createtime', order: 'descending' }"
            style="width: 100%"
          >
            <el-table-column
              prop="createtime"
              sortable
              label="报名时间"
            ></el-table-column>
            <el-table-column prop="address" label="地点"></el-table-column>
            <el-table-column prop="group" label="小组"></el-table-column>
            <el-table-column prop="u_id" label="学号"></el-table-column>
            <el-table-column prop="u_name" label="姓名"></el-table-column>
          </el-table>
          <div class="block" style="text-align: center; margin-top: 20px">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { groups, places } from "@/api/utils";
import { getAllVolunteerByTeacherRequest, setVolunteer } from "@/api/request";
import { formatID, formatYear } from "@/api/utils";
export default {
  name: "assign",
  data() {
    return {
      volunteerListNo: [], //未分配的志愿者信息
      groups: groups, //志愿分配组默认值
      group: "", //分配组
      places: places, //志愿分配地点默认值
      address: "", //分配地点
      allVolunteer: [], //所有志愿者
    };
  },
  created() {
    this.getAllVolunteer();
  },
  methods: {
    /**
     * 分配地点和小组
     */
    allotVolunteer(_, row) {
      setVolunteer({
        u_id: Number(row.u_id),
        u_name: row.u_name,
        address: this.address,
        group: this.group,
      })
        .then((res) => {
          this.$message.success(res);
          this.getAllVolunteer();
        })
        .catch((err) => this.$message.error(err));
    },
    /**
     * 获取所有志愿者
     */
    getAllVolunteer() {
      getAllVolunteerByTeacherRequest().then((res) => {
        let array = res.map((item) => {
          return {
            ...item,
            createtime: formatYear(item.createtime),
            u_id: formatID(item.u_id),
          };
        });
        this.volunteerListNo = array.filter(
          (item) => item.address === null && item.group === null
        );
        this.allVolunteer = array.filter(
          (item) => item.address !== null && item.group !== null
        );
      });
    },
  },
};
</script>

<style>
</style>