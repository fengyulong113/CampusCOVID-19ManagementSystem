<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
          <div class="inner">
            <h3>{{ UserSize }}</h3>
            <p>总检测人数</p>
          </div>
          <div class="icon">
            <i class="ion ion-bag"></i>
          </div>
          <a href="#" class="small-box-footer"
            >More info <i class="fas fa-arrow-circle-right"></i
          ></a>
        </div>
      </div>
      <div class="col-lg-3 col-6">
        <div class="small-box bg-success">
          <div class="inner">
            <h3>{{ fill }}</h3>
            <p>今日已填报健康信息人数</p>
          </div>
          <div class="icon">
            <i class="ion ion-stats-bars"></i>
          </div>
          <a href="#" class="small-box-footer"
            >More info <i class="fas fa-arrow-circle-right"></i
          ></a>
        </div>
      </div>
      <div class="col-lg-3 col-6">
        <div class="small-box bg-danger">
          <div class="inner">
            <h3>{{ hotTmp }}</h3>
            <p>今日体温过高人数</p>
          </div>
          <div class="icon">
            <i class="ion ion-pie-graph"></i>
          </div>
          <a href="#" class="small-box-footer"
            >More info <i class="fas fa-arrow-circle-right"></i
          ></a>
        </div>
      </div>
      <div class="col-lg-3 col-6">
        <div class="small-box bg-warning">
          <div class="inner">
            <h3>{{ pcrNum }}</h3>
            <p>今日核酸检测为阴性人数</p>
          </div>
          <div class="icon">
            <i class="ion ion-person-add"></i>
          </div>
          <a href="#" class="small-box-footer"
            >More info <i class="fas fa-arrow-circle-right"></i
          ></a>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6" style="width: 50%">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>本月汇报情况</span>
          </div>
          <ve-line :data="chartData" height="24rem"></ve-line>
        </el-card>
      </div>
      <div class="col-lg-6" style="width: 50%">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>今日核酸检测</span>
          </div>
          <ve-pie :data="pcrTotal" height="24rem"></ve-pie>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUsersByTypePageRequest,
  getHealthNowDayRequest,
  getHealthNowMonthRequest,
} from "@/api/request";
export default {
  data() {
    return {
      UserSize: "", //总检测人数 ==> 学生人数
      fill: "", //今日已经填报人数
      hotTmp: 0, //今日高温人数
      pcrNum: 0, //核酸检测阴性人数
      pcrTotal: {
        columns: ["类型", "访问用户"],
        rows: [],
      },
      chartData: {
        columns: ["月份", "填报人数"],
        rows: [],
      },
    };
  },
  created() {
    /**
     * 获取当天健康表信息
     */
    getHealthNowDayRequest().then((res) => {
      this.fill = res.length;
      let negative = 0; //阴性
      let positive = 0; //阳性
      res.forEach((item) => {
        if (item.temperature >= 38) this.hotTmp++;
        if (item.PCR) this.pcrNum++;
        if (item.PCR === "是") {
          negative++;
        } else {
          positive++;
        }
      });
      this.pcrTotal.rows.push(
        { 类型: "核酸检测阴性", 访问用户: negative },
        { 类型: "核酸检测阳性", 访问用户: positive }
      );
    });
    /**
     *根据用户类型进行用户信息获取(该方法主要用来获取总检测人数==>学生人数)
     */
    getUsersByTypePageRequest({
      type: 2,
      currPage: 0,
      pageNum: 1,
    }).then((res) => {
      this.UserSize = res.total;
    });
    /**
     * 获取当月所有报表
     */
    getHealthNowMonthRequest().then((res) => {
      let allNum = {},
        end = 31;
      for (let i = 1; i <= end; i += 1) {
        allNum[`num${i}`] = 0;
      }
      res.forEach((value) => {
        let date = value.createtime;
        let newDate = new Date(date);
        let newDateNow = newDate.getDate();
        for (let i = 1; i <= end; i += 1) {
          if (newDateNow === i) {
            allNum[`num${i}`]++;
          }
        }
      });
      let obj = [];
      for (let i = 1; i <= end; i += 1) {
        obj.push({
          月份: String(i),
          填报人数: allNum[`num${i}`],
        });
      }
      this.chartData.rows.push(...obj);
    });
  },
};
</script>

<style scoped lang="scss">
</style>