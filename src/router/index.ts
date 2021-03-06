import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";
import store from "@/store";

Vue.use(VueRouter);

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/login/index.vue")
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "", // 默认子路由
        name: "home",
        component: () =>
          import(/* webpackChunkName: 'home' */ "@/views/home/index.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: 'role' */ "@/views/role/index.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: 'menu' */ "@/views/menu/index.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ "@/views/resource/index.vue"
          ),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/course",
        name: "course",
        component: () =>
          import(/* webpackChunkName: 'course' */ "@/views/course/index.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: 'user' */ "@/views/user/index.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: 'advert' */ "@/views/advert/index.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ "@/views/advert-space/index.vue"
          )
      },
      {
        path: "/menu/create",
        name: "menu-create",
        component: () =>
          import(
            /* webpackChunkName: 'menu-create' */ "@/views/menu/create.vue"
          ),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/menu/:id/edit",
        name: "menu-edit",
        component: () =>
          import(/* webpackChunkName: 'menu-edit' */ "@/views/menu/edit.vue"),
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: '404' */ "@/views/error-page/404.vue")
  }
];

const router = new VueRouter({
  routes
});

// 路由钩子
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      next({
        name: "login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
