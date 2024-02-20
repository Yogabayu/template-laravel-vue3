<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          User Profile
        </VCardTitle>
      </VCardItem>
      <!-- 👉 Form -->

      <div class="profile-container">
        <img class="profile-image" :src="displayPhoto" alt="User Profile Photo" />
      </div>


      <VForm class="mt-6" @submit.prevent="updateUserProfile">
        <VRow>
          <!-- 👉 First Name -->
          <VCol md="6" cols="12">
            <VTextField placeholder="John" label="Nama" v-model="dataForm.name" autofocus />
          </VCol>

          <!-- 👉 Email -->
          <VCol cols="12" md="6">
            <VTextField label="E-mail" placeholder="johndoe@gmail.com" type="email" v-model="dataForm.email" />
          </VCol>

          <!-- 👉 NIK -->
          <VCol cols="12" md="6">
            <VTextField label="NIK" v-model="dataForm.nik" />
          </VCol>

          <!-- 👉 Address -->
          <VCol cols="12" md="6">
            <VTextField v-model="dataForm.password" label="Password" placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible" />
          </VCol>

          <!-- 👉 NIK -->
          <VCol cols="12" md="6">
            <v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="Pick an photo" prepend-icon="mdi-camera"
              label="Photo" @change="handlePhotoChange"></v-file-input>
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

export default {
  data() {
    return {
      dataForm: {
        name: "",
        email: "",
        password: null,
        nik: null,
        uuid: null,
        photo: null
      },
      displayPhoto: null,
      isPasswordVisible: false,
    };
  },
  methods: {
    cekForm() {
      console.log(this.dataForm);
    },
    handlePhotoChange(event) {
      const selectedFile = event.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.dataForm.photo = selectedFile;
      } else {
        this.$showToast("error", "Error", "Hanya file JPEG atau PNG yang diizinkan.");
        event.target.value = null;
      }
    },
    async updateUserProfile() {
      try {
        const formData = new FormData();
        formData.append('uuid', this.dataForm.uuid);
        formData.append('name', this.dataForm.name);
        formData.append('email', this.dataForm.email);
        formData.append('password', this.dataForm.password);
        formData.append('nik', this.dataForm.nik);
        if (this.dataForm.photo) {
          formData.append('photo', this.dataForm.photo);
        }
        formData.append('_method', 'PUT');

        const response = await mainURL.post("/updateUserProfile", formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Tentukan tipe konten sebagai multipart/form-data
          }
        });

        if (response.status === 200) {
          if (this.dataForm.password==null) {
            // Don't logout immediately if the password is being updated
            this.getUserProfile(); // Refresh user profile after updating
            this.$showToast("success", "Success", response.data.message);
            console.log(this.dataForm.password);
          } else {
            // console.log(this.dataForm.password);
            this.logout();
          }
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async getUserProfile() {
      try {
        const response = await mainURL.get("/userProfile");

        if (response.status === 200) {
          this.dataForm.name = response.data.data.name;
          this.dataForm.email = response.data.data.email;
          this.dataForm.nik = response.data.data.nik;
          this.dataForm.uuid = response.data.data.uuid;
          this.displayPhoto = `http://localhost:8000/user/photo/${response.data.data.photo}`;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.data.data.message);
      }
    },
    async logout() {
      mainURL.post('/logout')
        .then(response => {
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
            text: 'Berhasil logout'
          });

           this.$router.push("/login");
        })
        .catch(error => {
          console.error('Error during logout:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat melakukan logout'
          });
        });
    }
  },
  mounted() {
    this.getUserProfile();
  },
};
</script>
<style>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
