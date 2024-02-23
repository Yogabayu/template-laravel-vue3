import Swal from "sweetalert2";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        const userToken = localStorage.getItem("userToken");
        return userToken ? "/dashboard" : "/login";
      },
    },
    {
      path: "/login",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/auth/login.vue"),
        },
      ],
      beforeEnter: (to, from, next) => {
        const userToken = localStorage.getItem("userToken");
        if (userToken) {
          next("/dashboard");
        } else {
          next();
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
    {
      path: "/unauthorized",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/auth/unauthorized.vue"),
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
    
    //admin
    {
      path: "/dashboard",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/dashboard.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-profile",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/profile/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-user",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/user/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-position",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/position/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-category",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/category/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-division",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/division/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-file",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-filedivision",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/perdivision/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-filedivisionid/:divisionId",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/perdivision/perdivisionid.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
          props:true,
        },
      ],
    },
    {
      path: "/a-filedivisioniddetail/:fileId",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/show.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
          props:true,
        },
      ],
    },
    {
      path: "/a-filecategory",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/perposition/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-useractivity",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/useractivity/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },


    //user
    {
      path: "/user-dashboard",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/dashboard.vue"),
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

    next("/login");
  }
}

function checkAdminLogin(next) {
  const userToken = localStorage.getItem("userToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userToken && userData && userData.isAdmin) {
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
      text: "Unauthorized action",
    });
    next("/unauthorized"); // Redirect non-admin users to their dashboard
  }
}

export default router;
