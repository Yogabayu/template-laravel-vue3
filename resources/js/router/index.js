import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        const userToken = localStorage.getItem("userToken");
        // return userToken ? "/dashboard" : "/login";
        return "/login";
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
      // beforeEnter: (to, from, next) => {
      //   const userToken = localStorage.getItem("userToken");
      //   if (userToken) {
      //     if (userToken.isAdmin) {
      //       next("/dashboard");
            
      //     } else {
      //       next('/user-dashboard');
      //     }
      //   } else {
      //     next();
      //   }
      // },
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
      path: "/account-profile",
      component: () => import("../layouts/admin/default.vue"),
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
    // {
    //   path: "/a-division",
    //   component: () => import("../layouts/admin/default.vue"),
    //   children: [
    //     {
    //       path: "",
    //       component: () => import("../pages/admin/division/index.vue"),
    //       beforeEnter: (to, from, next) => {
    //         checkAdminLogin(next);
    //       },
    //     },
    //   ],
    // },
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
      path: "/a-perposition/:posId",
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
      path: "/a-percategory/:catId",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/percategory/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },

    {
      path: "/a-popular",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/popular/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-popular-list/:fileId",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/popular/listuser.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-filedetail/:fileId",
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
      path: "/a-filedetail/:fileId",
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
      path: "/a-deviceuser/:userUuid",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/device/index.vue"),
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
    {
      path: "/a-devices",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/devices/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-devices/:userId",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/devices/detail.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-filehistory",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/riwayatuser/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-filehistory/:userUuid",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/file/riwayatuser/listfileuser.vue"),
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
    {
      path: "/u-filedetail/:fileId",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/file/detail.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/u-favorite",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/favorites/index.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/u-read",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/read/index.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/u-search",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/search/index.vue"),
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
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    
    alert("You need to login to access this page.");
    next("/login");
  }
}

function checkAdminLogin(next) {
  const userToken = localStorage.getItem("userToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userToken && userData && userData.isAdmin) {
    next();
  } else {
    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: "top-end",
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   didOpen: (toast) => {
    //     toast.addEventListener("mouseenter", Swal.stopTimer);
    //     toast.addEventListener("mouseleave", Swal.resumeTimer);
    //   },
    // });
    // Toast.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: "Silahkan Login ulang",
    // });
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    
    alert("You need to have admin permission to access this page.");
    next("/login"); // Redirect non-admin users to their dashboard
  }
}

export default router;
