<template>
  <div class="bg">
    <div id="box"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  mounted() {
    let myChart = this.$echart.init(document.getElementById("box"));
    let options = {
      xAxis: {
        type: "category",
        data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [12, 44, 91, 254, 190, 510, 10],
          type: "line",
          smooth: true,
        },
      ],
    };
    myChart.setOption(options);
  },
};
</script>

<style lang="" scoped>
p {
  float: left;
  font-size: 38px;
  font-weight: bold;
}
#box {
  width: 1500px;
  height: 800px;
}
</style>
