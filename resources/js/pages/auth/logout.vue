<template>
  <VListItemTitle @click="logout">Logout</VListItemTitle>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      // Clear user data and token from local storage
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");

      // Optionally, clear user data and token from Vuex state
      // commit('clearUserData');

      // Navigate to the login page
      router.push("/login");
    };

    return { logout };
  },
};
</script>
