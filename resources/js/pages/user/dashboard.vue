<template>
  <VRow>
    <VCol cols="12" md="12">
      <AnalyticsCongratulations />
    </VCol>
    <v-container>
      <v-row>
        <VCol cols="4" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: 'File Tersedia',
              image: docs,
              stats: `${tFile}`,
              link: '/u-search',
            }"
          />
        </VCol>
        <VCol cols="4" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: 'File Dibaca',
              image: openFile,
              stats: `${tRead}`,
              link: '/u-read',
            }"
          />
        </VCol>
        <VCol cols="4" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: 'File Favorite',
              image: fileFavorite,
              stats: `${tFav}`,
              link: '/u-favorite',
            }"
          />
        </VCol>
      </v-row>
    </v-container>

    <v-divider
      :thickness="2"
      class="border-opacity-100"
      color="info"
    ></v-divider>
    <div class="mt-2">
      <div>
        <v-btn class="ma-2" color="primary" variant="outlined">
          File Pilihan
          <v-icon end icon="mdi-pencil-lock" color="purple-darken-2"></v-icon>
        </v-btn>
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" md="6" v-if="fileRandom == null">
            Getting Data ...<v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-col>
        </v-row>
        <v-row>
          <VCol
            v-if="fileRandom != null"
            v-for="(item, index) in fileRandom"
            :key="index"
            cols="12"
            md="6"
          >
            <v-card
              class="mb-2 card-style"
              height="200px"
              hover
              @click="toDetailFile(item.file.id)"
            >
              <v-img
                src="https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg"
                height="20px"
                cover
              ></v-img>
              <v-card-title>
                {{ item.file.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.file.author.name }}
              </v-card-subtitle>
              <v-card-text>
                {{ item.file.summary.substring(0, 40) + "..." }}
              </v-card-text>
            </v-card>
          </VCol>
        </v-row>
      </v-container>
    </div>

    <div class="mt-2">
      <div>
        <v-btn class="ma-2" color="primary" variant="outlined">
          File Popular
          <v-icon end icon="mdi-fire" color="purple-darken-2"></v-icon>
        </v-btn>
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" md="6" v-if="fileFav == null">
            Getting Data ...<v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-col>
        </v-row>
        <v-row>
          <VCol
            v-if="fileFav != null"
            v-for="(item, index) in fileFav"
            :key="index"
            cols="12"
            md="6"
          >
            <v-card
              class="mb-2 card-style"
              height="200px"
              hover
              @click="toDetailFile(item.id)"
            >
              <v-img
                src="https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg"
                height="20px"
                cover
              ></v-img>
              <v-card-title>
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle>
                dilihat: {{ item.views_count }}x
              </v-card-subtitle>
              <v-card-text>
                {{ item.summary.substring(0, 100) + "..." }}
              </v-card-text>
            </v-card>
          </VCol>
        </v-row>
      </v-container>
    </div>
  </VRow>
</template>

<script>
import mainURL from "@/axios";
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";

// Images
import chart from "@images/cards/chart-success.png";
import card from "@images/cards/credit-card-primary.png";
import docs from "@images/cards/docs.png";
import fileFavorite from "@images/cards/favorite-file.png";
import fileSave from "@images/cards/file-save.png";
import openFile from "@images/cards/open-file.png";
import paypal from "@images/cards/paypal-error.png";
import user from "@images/cards/user.png";
import wallet from "@images/cards/wallet-info.png";

export default {
  components: {
    AnalyticsCongratulations,
  },
  data() {
    return {
      userData: null,
      userToken: null,
      chart: chart,
      card: card,
      paypal: paypal,
      wallet: wallet,
      docs: docs,
      user: user,
      openFile: openFile,
      fileSave: fileSave,
      fileFavorite: fileFavorite,
      tFile: null,
      tRead: null,
      tFav: null,
      fileRandom: null,
      fileFav: null,
    };
  },
  methods: {
    toDetailFile(item) {
      this.$router.push(`/u-filedetail/${item}`);
    },
    getUserDataAndToken() {
      const savedUserData = localStorage.getItem("userData");
      const savedUserToken = localStorage.getItem("userToken");

      if (savedUserData && savedUserToken) {
        this.userData = JSON.parse(savedUserData);
        this.userToken = savedUserToken;
      }
    },
    async getTotalFileAvailable() {
      try {
        const response = await mainURL.get("/user/total-file");

        if (response.status === 200) {
          this.tFile = response.data.data;
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal. Silakan coba lagi.";
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
    async getTotalFileRead() {
      try {
        const response = await mainURL.get("/user/total-read");

        if (response.status === 200) {
          this.tRead = response.data.data;
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal. Silakan coba lagi.";
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
    async getTotalFileFav() {
      try {
        const response = await mainURL.get("/user/total-fav");

        if (response.status === 200) {
          this.tFav = response.data.data;
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal. Silakan coba lagi.";
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
    async getDashboard() {
      try {
        const response = await mainURL.get("/user/index");

        if (response.status === 200) {
          this.fileRandom = response.data.data;
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal. Silakan coba lagi.";
          this.$showToast("error", "Sorry", errorMessage);
        }

        const response2 = await mainURL.get("/user/fileFav");

        if (response2.status === 200) {
          this.fileFav = response2.data.data;
        } else {
          const errorMessage =
            response2 && response2.data && response2.data.message
              ? response2.data.message
              : "Gagal. Silakan coba lagi.";
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
  mounted() {
    this.getTotalFileAvailable();
    this.getTotalFileRead();
    this.getTotalFileFav();
    this.getDashboard();
  },
};
</script>

<style scoped>
.card-style {
  box-shadow: 9px 9px 9px rgba(20, 20, 20, 0.6);
}
</style>
