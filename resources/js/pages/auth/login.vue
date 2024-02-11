<!-- <script setup>
import mainURL from "@/axios";
import { ref } from "vue";

const userData = ref(null);
const userToken = ref(null);
const form = ref({
  email: "",
  password: "",
  remember: false,
});

const isPasswordVisible = ref(false);
const saveUserDataAndToken = (data) => {
  localStorage.setItem("userData", JSON.stringify(data.user));
  localStorage.setItem("userToken", data.token.token);
};
// Function to retrieve user data and token from local storage
const getUserDataAndToken = () => {
  const savedUserData = localStorage.getItem("userData");
  const savedUserToken = localStorage.getItem("userToken");

  if (savedUserData && savedUserToken) {
    userData.value = JSON.parse(savedUserData);
    userToken.value = savedUserToken;
  }

  // console.log(savedUserData);
};

const login = async () => {
  try {
    const response = await mainURL.post("/login", {
      email: form.value.email,
      password: form.value.password,
    });

    if (response.status == 200) {
      saveUserDataAndToken(response.data);

      getUserDataAndToken();
      // router.push('/dashboard');
    }
  } catch (error) {
    console.error("Gagal login:", error);
  }
};
</script> -->

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div class="d-flex text-primary" v-html="logo" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold"> sneat </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Welcome to sneat! 👋🏻</h5>
        <p class="mb-0">Please sign-in to your account</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div
                class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
              >
                <VCheckbox v-model="form.remember" label="Remember me" />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn block type="submit"> Login </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core-scss/template/pages/page-auth.scss";
</style>
<script>
import mainURL from "@/axios";
import logo from "@images/logo.svg?raw";

export default {
  data() {
    return {
      userData: null,
      userToken: null,
      form: {
        email: "",
        password: "",
        remember: false,
      },
      isPasswordVisible: false,
      logo: logo,
    };
  },
  methods: {
    saveUserDataAndToken(data) {
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token.token);
    },

    async login() {
      try {
        const response = await mainURL.post("/login", {
          email: this.form.email,
          password: this.form.password,
        });

        if (response.status === 200) {
          this.saveUserDataAndToken(response.data);

          this.$showToast("success", "Yeay", "Selamat anda berhasil login");
          this.$router.push("/dashboard");
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal login. Silakan coba lagi.";
          this.$showToast("error", "Sorry", errorMessage);
        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Gagal login. Silakan coba lagi.";
        this.$showToast("error", "Sorry", errorMessage);
      }
    },
  },
};
</script>
