<template>
  <VListItemTitle @click="logout">Logout</VListItemTitle>
</template>

<script>
import Swal from 'sweetalert2';
import { useRouter } from "vue-router";


export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");

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
      });

      Toast.fire({
        icon: 'success',
        title: 'Yeay',
        text: 'Berhasil update data silahkan login ulang'
      });

      router.push("/login");
    };

    return { logout };
  },
};
</script>
