<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol cols="12" md="12">
      <AnalyticsCongratulations />
    </VCol>

    <VCol cols="12" sm="12">
      <VRow>
        <VCol cols="12" md="3">
          <CardStatisticsVertical
            v-bind="{
              title: 'Total File',
              image: docs,
              stats: `${tFile}`,
              link: 'a-file',
            }"
          />
        </VCol>

        <VCol cols="12" md="3">
          <CardStatisticsVertical
            v-bind="{
              title: 'Total User',
              image: user,
              stats: `${tUser}`,
              link: 'a-user',
            }"
          />
        </VCol>

        <VCol cols="12" md="3">
          <CardStatisticsVertical
            v-bind="{
              title: 'Total Kategori',
              image: cats,
              stats: `${tCategory}`,
              link: 'a-category',
            }"
          />
        </VCol>

        <VCol cols="12" md="3">
          <CardStatisticsVertical
            v-bind="{
              title: 'Total Jabatan',
              image: pos,
              stats: `${tPosition}`,
              link: 'a-position',
            }"
          />
        </VCol>
      </VRow>
    </VCol>

    <v-divider
      :thickness="3"
      class="border-opacity-100"
      color="info"
    ></v-divider>

    <v-col cols="12" md="4" sm="6" order="3">
        <VCard title="File Populer">
          <template #append>
            <div class="me-n3 mt-n2">
              <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" class="ellipsis-icon"
                    >mdi-dots-vertical</v-icon
                  >
                </template>

                <v-list>
                  <v-list-item color="primary" @click="getMostView">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-refresh"></v-icon>
                    </template>

                    <v-list-item-title> refresh</v-list-item-title>
                  </v-list-item>
                  <v-list-item color="primary" @click="toLink('a-popular')">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-details"></v-icon>
                    </template>

                    <v-list-item-title> detail</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>

          <VCardText>
            <VList class="card-list">
              <VListItem v-for="(item, index) in mostViews" :key="index">
                <template v-slot:prepend>
                  <VAvatar
                    rounded
                    variant="tonal"
                    color="primary"
                    :image="docs"
                    class="me-3"
                  />
                </template>

                <VListItemSubtitle class="text-disabled mb-1">
                  Pengunggah: {{ item.username }}
                </VListItemSubtitle>
                <VListItemTitle>
                  {{ item.name }}
                </VListItemTitle>

                <template v-slot:append>
                  <VListItemAction>
                    <span class="me-1">
                      {{
                        item.views_count > 1000
                          ? (item.views_count / 1000).toFixed(1) + "K"
                          : item.views_count
                      }}
                    </span>
                    <span class="text-disabled"> kali</span>
                  </VListItemAction>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
    </v-col>
    <v-col cols="12" md="4" sm="6" order="3">
        <VCard title="User Paling Aktif">
          <template #append>
            <div class="me-n3 mt-n2">
              <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" class="ellipsis-icon"
                    >mdi-dots-vertical</v-icon
                  >
                </template>

                <v-list>
                  <v-list-item color="primary" @click="getMostUserView">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-refresh"></v-icon>
                    </template>

                    <v-list-item-title> refresh</v-list-item-title>
                  </v-list-item>
                  <v-list-item color="primary" @click="toLink('a-filehistory')">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-details"></v-icon>
                    </template>

                    <v-list-item-title> detail</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>

          <VCardText>
            <VList class="card-list">
              <VListItem v-for="(item, index) in mostUsers" :key="index">
                <template v-slot:prepend>
                  <VAvatar
                    rounded
                    variant="tonal"
                    color="primary"
                    :image="user"
                    class="me-3"
                  />
                </template>

                <VListItemSubtitle class="text-disabled mb-1">
                  Jabatan: {{ item.position }}
                </VListItemSubtitle>
                <VListItemTitle>
                  {{ item.name }}
                </VListItemTitle>

                <template v-slot:append>
                  <VListItemAction>
                    <span class="me-1">
                      {{
                        item.views_count > 1000
                          ? (item.views_count / 1000).toFixed(1) + "K"
                          : item.views_count
                      }}
                    </span>
                    <span class="text-disabled"> kali</span>
                  </VListItemAction>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
    </v-col>
  </VRow>
</template>

<script>
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";
import AnalyticsFinanceTabs from "@/views/dashboard/AnalyticsFinanceTab.vue";
import AnalyticsOrderStatistics from "@/views/dashboard/AnalyticsOrderStatistics.vue";
import AnalyticsProfitReport from "@/views/dashboard/AnalyticsProfitReport.vue";
import AnalyticsTotalRevenue from "@/views/dashboard/AnalyticsTotalRevenue.vue";
import AnalyticsTransactions from "@/views/dashboard/AnalyticsTransactions.vue";

// Images
import cats from "@images/cards/categories.png";
import chart from "@images/cards/chart-success.png";
import card from "@images/cards/credit-card-primary.png";
import docs from "@images/cards/docs.png";
import paypal from "@images/cards/paypal-error.png";
import pos from "@images/cards/position.png";
import user from "@images/cards/user.png";
import wallet from "@images/cards/wallet-info.png";

import mainURL from "@/axios";

export default {
  components: {
    AnalyticsCongratulations,
    AnalyticsFinanceTabs,
    AnalyticsOrderStatistics,
    AnalyticsProfitReport,
    AnalyticsTotalRevenue,
    AnalyticsTransactions,
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
      cats: cats,
      pos: pos,
      tFile: null,
      tUser: null,
      tCategory: null,
      tPosition: null,
      mostViews: null,
      mostUsers: null,
    };
  },
  methods: {
    toLink(link) {
      this.$router.push(`/${link}`);
    },
    getUserDataAndToken() {
      const savedUserData = localStorage.getItem("userData");
      const savedUserToken = localStorage.getItem("userToken");

      if (savedUserData && savedUserToken) {
        this.userData = JSON.parse(savedUserData);
        this.userToken = savedUserToken;
      }
    },

    async getTotalFile() {
      try {
        const response = await mainURL.get("/total-file");

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
    async getTotalUser() {
      try {
        const response = await mainURL.get("/total-user");

        if (response.status === 200) {
          this.tUser = response.data.data;
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
    async getTotalCat() {
      try {
        const response = await mainURL.get("/total-category");

        if (response.status === 200) {
          this.tCategory = response.data.data;
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
    async getTotalPosition() {
      try {
        const response = await mainURL.get("/total-position");

        if (response.status === 200) {
          this.tPosition = response.data.data;
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
    async getMostView() {
      try {
        const response = await mainURL.get("/mostfileviews");

        if (response.status === 200) {
          this.mostViews = response.data.data;
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
    async getMostUserView() {
      try {
        const response = await mainURL.get("/getmostuserview");

        if (response.status === 200) {
          this.mostUsers = response.data.data;
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
  },
  mounted() {
    this.getTotalFile();
    this.getTotalUser();
    this.getTotalCat();
    this.getTotalPosition();
    this.getMostView();
    this.getMostUserView();
  },
};
</script>
