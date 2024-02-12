<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          User Profile
        </VCardTitle>
      </VCardItem>
      <!-- 👉 Form -->
      <VForm class="mt-6" @submit.prevent="updateUserProfile">
        <VRow>
          <!-- 👉 First Name -->
          <VCol md="6" cols="12">
            <VTextField
              placeholder="John"
              label="Nama"
              v-model="dataForm.name"
              autofocus
            />
          </VCol>

          <!-- 👉 Email -->
          <VCol cols="12" md="6">
            <VTextField
              label="E-mail"
              placeholder="johndoe@gmail.com"
              type="email"
              v-model="dataForm.email"
            />
          </VCol>

          <!-- 👉 Address -->
          <VCol cols="12" md="6">
            <VTextField
              v-model="dataForm.password"
              label="Password"
              placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>

          <!-- 👉 Form Actions -->
          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <VBtn type="submit">Update changes</VBtn>

            <VBtn color="secondary" variant="tonal" type="reset"> Reset </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCard>
  </div>
</template>

<script>
import mainURL from "@/axios";
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
  data() {
    return {
      dataForm: {
        name: "",
        email: "",
        password: null,
      },
      isPasswordVisible: false,
      
    };
  },
  methods: {
    cekForm() {
      console.log(this.dataForm);
    },
    async updateUserProfile() {
      try {
        const router = useRouter();
        const savedUserToken = localStorage.getItem("userToken");
        const config = {
          headers: { Authorization: `Bearer ${savedUserToken}` },
        };
        const response = await mainURL.put(
          "/updateUserProfile",
          this.dataForm,
          config
        );

        if (response.status === 200) {
          if (this.dataForm.password != null) {
            this.logout();
          }
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.message);
      }
    },
    async getUserProfile() {
      try {
        const savedUserToken = localStorage.getItem("userToken");
        const config = {
          headers: { Authorization: `Bearer ${savedUserToken}` },
        };
        const response = await mainURL.get("/userProfile", config);

        if (response.status === 200) {
          this.dataForm.name = response.data.data.name;
          this.dataForm.email = response.data.data.email;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.data.data.message);
      }
    },
  },
  mounted() {
    this.getUserProfile();
  },
};
</script>
