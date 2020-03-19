<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout class="basic-layout">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256"
      >
        <div class="logo">
          ant design vue admin
        </div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['user']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <Header />
        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>
<script>
import Header from './Header';
import Footer from './Footer';
import SiderMenu from './SiderMenu';
import SettingDrawer from '@/components/SettingDrawer/index';
export default {
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark';
    },
    navLayout() {
      return this.$route.query.navLayout || 'left';
    }
  },
  data() {
    return {
      collapsed: true
    };
  }
};
</script>
<style lang="less" scoped>
.basic-layout {
  min-height: 100vh;
  .trigger {
    padding: 0 20px;
    line-height: 64px;
    &:hover {
      background: #eeeeee;
    }
  }
  .logo {
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
  }
}
.nav-theme-dark {
  .logo {
    color: #fff;
  }
}
</style>
