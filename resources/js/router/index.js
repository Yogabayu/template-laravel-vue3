import { createRouter, createWebHistory } from "vue-router";

import Swal from "sweetalert2";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: to => {
        const userToken = localStorage.getItem("userToken");
        // Redirect to dashboard if user is logged in, otherwise redirect to login
        return userToken ? "/dashboard" : "/login";
      }
    },
    {
      path: "/login",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/auth/login.vue")
        },
      ],
      beforeEnter: (to, from, next) => {
        const userToken = localStorage.getItem("userToken");
        // If user is already logged in, redirect to dashboard
        if (userToken) {
          next("/dashboard");
        } else {
          next(); // Proceed to login
        }
      },
    },
    {
      path: "/register",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "", // This will match /register itself
          component: () => import("../pages/register.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/[...all].vue"),
        },
      ],
    },

    // authenticated
    {
      path: "/account-profile",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/profile/index.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/account-settings",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/account-settings.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/typography",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/typography.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/icons",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/icons.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/cards",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/cards.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/tables",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/tables.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/form-layouts",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/form-layouts.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/dashboard",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/dashboard.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
  ],
});

function checkLogin(next) {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    next();
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "Oops...",
      text: "Anda perlu login terlebih dahulu",
    });
    
        // this.$showToast('error', 'Sorry', 'Anda perlu login terlebih dahulu')
    next("/login");
  }
}

export default router;
