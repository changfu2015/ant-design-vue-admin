<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
// import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW';
import enUS from 'ant-design-vue/lib/locale-provider/en_US';

import moment from 'moment'; //日历等部分组件内用的是moment 需要单独切换
export default {
  data() {
    return {
      locale: zhCN
    };
  },
  watch: {
    '$route.query.locale': function(value) {
      this.locale = value === 'enUS' ? enUS : zhCN;
      moment.locale(value === 'enUS' ? 'en' : 'zh-cn');
    }
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
