<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>填写物品清单</span>
          </div>
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="当前所在地">
              <el-select v-model="form.apart" placeholder="请选择所在公寓">
                <el-option label="一公寓" value="一公寓"></el-option>
                <el-option label="三公寓" value="三公寓"></el-option>
                <el-option label="四公寓" value="四公寓"></el-option>
                <el-option label="五公寓" value="五公寓"></el-option>
                <el-option label="六公寓" value="六公寓"></el-option>
                <el-option label="八公寓" value="八公寓"></el-option>
                <el-option label="九公寓" value="九公寓"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="寝室">
              <el-input
                v-model="form.dorm"
                placeholder="请输入寝室门号"
                style="width: 186px"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否急需">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="口罩">
              <div class="block">
                <el-slider
                  v-model="form.mask"
                  show-input
                  style="width: 400px"
                ></el-slider>
              </div>
            </el-form-item>
            <el-form-item label="消毒液">
              <el-input-number
                v-model="form.disi"
                :min="0"
                :max="10"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="饮用水">
              <el-radio v-model="form.water" :label="false">否</el-radio>
              <el-radio v-model="form.water" :label="true">是</el-radio>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                v-model="form.remarks"
                placeholder="其他所需物品，如无需可不填写"
                style="width: 400px"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setMaterialRequest } from "@/api/request";
export default {
  name: "material",
  data() {
    return {
      form: {
        apart: "", //地点
        dorm: "", //寝室
        delivery: false, //急需
        mask: 0, //口罩
        disi: 0, //消毒液
        water: false, //饮用水
        remarks: "", //备注
      },
    };
  },
  methods: {
    onSubmit() {
      setMaterialRequest(this.form)
        .then((res) => {
          this.$message.success("提交成功");
          this.$nextTick(function(){
            this.form.apart = '';
            this.form.dorm = '';
            this.form.delivery = false;
            this.form.mask = 0;
            this.form.disi = 0;
            this.form.water = false;
            this.form.remarks = '';
          })
        })
        .catch((err) => {
          this.$message.error("提交失败");
        });
    },
  },
};
</script>

<style>
</style>