<template>
  <div ref="chartDom"></div>
</template>
<script>
import echarts from 'echarts/lib/echarts'; //echart 核心包
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
// 单独引入柱状图需要组件减少引入包大小
import debounce from 'lodash/debounce';
import { addListener, removeListener } from 'resize-detector';
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }//深度监听比较耗性能
    option(val) {
      this.chart.setOption(val);
    }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    // 注销事件收尾工作，移除监听与echart 实例，防止内存泄漏
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose(); //销毁实例
    this.chart = null; //销毁变量
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.option);
    }
  }
};
</script>
