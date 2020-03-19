<template>
  <div>
    <Echart style="height:400px" :option="chartData" />
  </div>
</template>
<script>
// import random from 'lodash/random';
import Echart from '@/components/Echart';
import request from '@/utils/request';
export default {
  components: {
    Echart
  },
  data() {
    return {
      chartData: {}
    };
  },
  mounted() {
    // this.interval = setInterval(() => {
    //   this.chartData.series[0].data = this.chartData.series[0].data.map(() => {
    //     return random(100);
    //   });
    //   this.chartData = { ...this.chartData };
    // }, 1000);
    this.getChartData();
  },
  methods: {
    getChartData() {
      request({
        url: '/api/dashboard/chart',
        method: 'Get',
        params: { id: 1212 }
      }).then(response => {
        this.chartData = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: response.data
            }
          ]
        };
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
