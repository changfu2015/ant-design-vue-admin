import Vue from 'vue';
// import Antd from "ant-design-vue";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  LocaleProvider,
  Dropdown
} from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Authorized from '@/components/Authorized';
import Auth from '@/directives/auth';

// import "ant-design-vue/dist/antd.less"
// import "ant-design-vue/lib/button/style";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(LocaleProvider);
Vue.use(Dropdown);

// 指令 控制权, 使用use注册组件必须是一个方法，或者提供install方法
Vue.use(Auth);
Vue.component('Authorized', Authorized);
// 指令实现：方便但是不够灵活，不能动态修改
// 组件实现：1、比较灵活但是不大方便，每次都要写一次组件

// Icon 自定义图标管理
// const MyIcon = Icon.createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js' // 在 iconfont.cn 上生成
// });
// Vue.component('MyIcon', MyIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
