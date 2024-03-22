/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core-scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import Swal from 'sweetalert2'
import { createApp } from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(createPinia())
app.use(router)

app.config.globalProperties.$handleRightClick =(event)=>{
  event.preventDefault();
};

app.directive('prevent-right-click', {
  beforeMount: (el, binding) => {
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  },
  unmounted: (el,binding) => {
    el.removeEventListener('contextmenu', binding.value);
  },
});


// Mount vue app
app.mount('#app')

// Define the showToast method
const showToast = (icon, title, text) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: icon,
    title: title,
    text: text
  })
}

// Make showToast method globally available
app.config.globalProperties.$showToast = showToast

/** localhost */
// app.config.globalProperties.$userPhotoUrl = 'http://localhost:8000/user/photo/';
/** development */
// app.config.globalProperties.$userPhotoUrl = 'https://templatevue.yogabayuap.com/user/photo/';
/** production */
app.config.globalProperties.$userPhotoUrl = 'https://kma.bankarthaya.com/user/photo/';

/** localhost */
// app.config.globalProperties.$filePath = 'http://localhost:8000/file/file/';
/** development */
// app.config.globalProperties.$filePath = 'https://templatevue.yogabayuap.com/file/file/';
/** production */
// app.config.globalProperties.$filePath = 'https://kma.bankarthaya.com/file/file/';

/** localhost */
app.config.globalProperties.$draftUrl = 'http://localhost:8000/draft/';
/** development */
// app.config.globalProperties.$draftUrl = 'https://templatevue.yogabayuap.com/draft/';
/** production */
// app.config.globalProperties.$draftUrl = 'https://kma.bankarthaya.com/draft/';

/** localhost */
app.config.globalProperties.$drafCommenttUrl = 'http://localhost:8000/draft/comment/';
/** development */
// app.config.globalProperties.$drafCommenttUrl = 'https://templatevue.yogabayuap.com/draft/';
/** production */
// app.config.globalProperties.$drafCommenttUrl = 'https://kma.bankarthaya.com/draft/';
app.config.globalProperties.$filePath = 'https://kma.bankarthaya.com/file/file/';
