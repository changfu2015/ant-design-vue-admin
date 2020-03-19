<template>
  <div style="width: 256px">
    <a-menu
      :SelectedKeys="selectdKeys"
      :OpenKeys="openKeys"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="
            () =>
              parent.goRouter({ path: item.path, query: parent.$route.query })
          "
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu';
import GoRouter from '@/mixins/GoRouter';
import { check } from '@/utils/auth';
export default {
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  components: {
    'sub-menu': SubMenu
  },
  mixins: [GoRouter],
  data() {
    this.openKeysMap = {};
    this.selectKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectdKeys: this.selectKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  watch: {
    // '$route.path': function(val) {
    //   this.selectedKeys = this.selectedKeysMap[val];
    //   this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    // }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectdKeys) {
      // 初始化按协议映射菜单
      const menuData = [];
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          // routes.forEach(item => {
          // 获取打开列表
          this.openKeysMap[item.path] = parentKeys;
          this.selectKeysMap[item.path] = [item.path || selectdKeys];
          //
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectdKeys ? parentKeys : [...parentKeys, item.path],
              selectdKeys || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
        // });
      }
      // console.log(menuData);
      // console.log(this.openKeysMap);
      // console.log(this.selectKeysMap);
      return menuData;
    }
  }
};
</script>
