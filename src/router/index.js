import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '@/views/404.vue';
import Forbbidden from '@/views/403.vue';

// import RenderRouterView from "../components/RenderRouterView"
import findLast from 'lodash/findLast';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { check, isLogin } from '@/utils/auth';
import { notification } from 'ant-design-vue';
Vue.use(VueRouter);
//
// 当路由没有name 的key 直接忽略  name 主要过滤redirect跳转页面不需要渲染菜单
// hideChildrenMenu //隐藏子擦菜单
// hideInMenu 隐藏菜单
// 枚举

const routes = [
  {
    path: '*',
    // name: '404',
    hideInMenu: true,
    component: NotFound
  },
  {
    path: '/403',
    // name: '403',
    hideInMenu: true,
    component: Forbbidden
  },
  {
    path: '/user',
    // component: RenderRouterView,
    // component: {
    //     render: h => h("router-view")
    // },
    hideInMenu: true,
    component: () => import('@/layouts/UserLayout'),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import('@/views/User/Login')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import('@/views/User/Register')
      }
    ]
  },
  {
    path: '/',
    meta: { authority: ['user', 'admin'] },
    component: () => import('@/layouts/BasicLayout'),
    children: [
      {
        path: '/',
        redirect: '/dashboard/analysis'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { icon: 'dashboard', title: '仪表盘' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            meta: { title: '分析页' },
            component: () => import('@/views/Dashboard/Analysis')
          }
        ]
      },
      {
        // form
        path: '/form',
        name: 'form',
        component: { render: h => h('router-view') },
        meta: { icon: 'form', title: '表单', authority: ['admin'] },
        children: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            meta: { title: '基础表单' },
            component: () =>
              import(/* webpackChunkName: "form" */ '@/views/Forms/BasicForm')
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            hideChildrenInMenu: true,
            meta: { title: '分布表单' },
            component: () =>
              import(/* webpackChunkName: "form" */ '@/views/Forms/StepForm'),
            children: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info'
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '@/views/Forms/StepForm/Step1'
                  )
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '@/views/Forms/StepForm/Step2'
                  )
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '@/views/Forms/StepForm/Step3'
                  )
              }
            ]
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, form, next) => {
  if (to.path != form.path) {
    NProgress.start();
  }
  console.log('matched');
  console.log(to.matched);
  const record = findLast(to.matched, record => record.meta.authority);

  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({ path: 'user/login' });
    } else if (to.path !== '/403') {
      notification.error({
        message: '403',
        description: '你没有权限访问'
      });
      next({ path: '/403' });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
